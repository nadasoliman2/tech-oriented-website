"use client";

import { useEffect, useRef } from "react";

export type SceneVariant = "knot" | "globe" | "blob";

/**
 * Real-time WebGL hero objects (three.js, loaded on demand). Physically based materials lit by a
 * studio environment map, so they read as real objects rather than flat shapes:
 *  knot  – polished teal metal torus knot (Our Work)
 *  globe – dark glass planet made of glowing points, atmosphere and orbiting satellites (Industries)
 *  blob  – pearl-like organic form that slowly morphs (About)
 * Rendering pauses while the canvas is off screen.
 */
export default function Scene3D({ variant, className = "" }: { variant: SceneVariant; className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 6.2);

      // teal rim + warm key so the forms pick up the brand colour on their edges
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 4, 5);
      const rim = new THREE.DirectionalLight(0x66c1c0, 3);
      rim.position.set(-4, -1, -3);
      scene.add(key, rim);

      const group = new THREE.Group();
      scene.add(group);
      const disposables: Array<{ dispose: () => void }> = [envTex, pmrem];
      let tick: (t: number) => void = () => {};

      if (variant === "knot") {
        const geo = new THREE.TorusKnotGeometry(1, 0.34, 360, 64, 2, 3);
        const mat = new THREE.MeshPhysicalMaterial({
          color: 0x66c1c0, metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08,
        });
        const knot = new THREE.Mesh(geo, mat);
        group.add(knot);
        disposables.push(geo, mat);
        tick = (t) => {
          knot.rotation.x = t * 0.25;
          knot.rotation.y = t * 0.4;
        };
      } else if (variant === "globe") {
        camera.position.z = 5.4;
        const R = 1.35;
        const coreGeo = new THREE.SphereGeometry(R * 0.985, 96, 96);
        const coreMat = new THREE.MeshPhysicalMaterial({
          color: 0x0a1d1f, metalness: 0.2, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.35, envMapIntensity: 0.35,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);

        // evenly spread points (Fibonacci sphere) for the "data planet" surface
        const N = 2600;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const th = i * Math.PI * (3 - Math.sqrt(5));
          pos.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3);
        }
        const dotGeo = new THREE.BufferGeometry();
        dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const dotMat = new THREE.PointsMaterial({
          color: 0x8fe3e2, size: 0.028, sizeAttenuation: true, transparent: true, opacity: 0.95,
          blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const dots = new THREE.Points(dotGeo, dotMat);

        // fresnel atmosphere
        const atmoGeo = new THREE.SphereGeometry(R * 1.18, 64, 64);
        const atmoMat = new THREE.ShaderMaterial({
          transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
          uniforms: { c: { value: new THREE.Color(0x66c1c0) } },
          vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
          fragmentShader: `uniform vec3 c; varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0,0,1.0)), 3.0); gl_FragColor = vec4(c, 1.0) * i; }`,
        });
        const atmo = new THREE.Mesh(atmoGeo, atmoMat);

        // two satellites on tilted orbits
        const satGeo = new THREE.SphereGeometry(0.07, 32, 32);
        const satMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.6, roughness: 0.2, emissive: 0x66c1c0, emissiveIntensity: 0.6 });
        const orbits = [0.5, -0.9].map((tilt) => {
          const pivot = new THREE.Group();
          pivot.rotation.set(tilt, 0, tilt * 0.6);
          const sat = new THREE.Mesh(satGeo, satMat);
          sat.position.x = R * 1.55;
          const ringGeo = new THREE.TorusGeometry(R * 1.55, 0.004, 8, 200);
          const ringMat = new THREE.MeshBasicMaterial({ color: 0x66c1c0, transparent: true, opacity: 0.35 });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = Math.PI / 2;
          pivot.add(sat, ring);
          disposables.push(ringGeo, ringMat);
          return pivot;
        });

        const planet = new THREE.Group();
        planet.add(core, dots);
        planet.rotation.z = 0.35;
        group.add(planet, atmo, ...orbits);
        disposables.push(coreGeo, coreMat, dotGeo, dotMat, atmoGeo, atmoMat, satGeo, satMat);
        tick = (t) => {
          planet.rotation.y = t * 0.18;
          orbits[0].rotation.y = t * 0.7;
          orbits[1].rotation.y = -t * 0.45;
        };
      } else {
        // indexed (shared-vertex) sphere so recomputed normals stay smooth, not faceted
        const { mergeVertices } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
        const ico = new THREE.IcosahedronGeometry(1.15, 48);
        ico.deleteAttribute("normal");
        ico.deleteAttribute("uv");
        const geo = mergeVertices(ico);
        ico.dispose();
        geo.computeVertexNormals();
        const base = (geo.attributes.position.array as Float32Array).slice();
        const mat = new THREE.MeshPhysicalMaterial({
          color: 0x7fd0cf, metalness: 0.15, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05,
          iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [200, 700], sheen: 0.6, sheenColor: new THREE.Color(0xb9f0ef),
        });
        const blob = new THREE.Mesh(geo, mat);
        group.add(blob);
        disposables.push(geo, mat);
        const p = geo.attributes.position as InstanceType<typeof THREE.BufferAttribute>;
        tick = (t) => {
          // smooth layered waves along the surface normal = slow organic morph
          for (let i = 0; i < p.count; i++) {
            const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
            const n =
              0.13 * Math.sin(x * 2.1 + t * 0.9) * Math.cos(y * 1.7 + t * 0.7) +
              0.08 * Math.sin(z * 3.1 + t * 1.3) +
              0.05 * Math.cos((x + y) * 3.7 - t * 1.1);
            const k = 1 + n;
            p.setXYZ(i, x * k, y * k, z * k);
          }
          p.needsUpdate = true;
          geo.computeVertexNormals();
          blob.rotation.y = t * 0.2;
          blob.rotation.x = Math.sin(t * 0.3) * 0.3;
        };
      }

      // size to the host box
      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      // pointer lean
      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientY / window.innerHeight - 0.5) * 0.5;
        target.y = (e.clientX / window.innerWidth - 0.5) * 0.7;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      const clock = new THREE.Clock();
      let raf = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const t = clock.getElapsedTime();
        tick(t);
        group.rotation.x += (target.x - group.rotation.x) * 0.05;
        group.rotation.y += (target.y - group.rotation.y) * 0.05;
        group.position.y = Math.sin(t * 0.8) * 0.08;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [variant]);

  return <div ref={host} className={`scene3d scene3d--${variant} ${className}`} aria-hidden="true" />;
}
