import HeroCanvas from "./HeroCanvas";

/** Full-bleed animated backdrop: drifting brand-colour glows under the interactive dot field. */
export default function AmbientBg() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="ambient__blob ambient__blob--a" />
      <span className="ambient__blob ambient__blob--b" />
      <span className="ambient__blob ambient__blob--c" />
      <HeroCanvas />
    </div>
  );
}
