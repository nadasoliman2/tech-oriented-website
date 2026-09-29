"use client";

import { useEffect, useRef } from "react";
import type { MediaRef } from "@/lib/media";

type Props = {
  media: MediaRef;
  className?: string;
  parallax?: number;
  /** play video (if the ref has one); stills otherwise */
  play?: boolean;
  eager?: boolean;
};

/** Photo/video tile (Fantasy radius-media). Video refs render the video alone (no poster) and play only while on screen. */
export default function Media({ media, className = "", parallax = 0.12, play = true, eager = false }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const hasVideo = play && media.video;

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const still = `/media/p/${media.id}.jpg`;

  return (
    <div className={`media ${className}`}>
      <div className="media__fill" data-parallax={parallax || undefined}>
        {hasVideo ? (
          // video only — no still/poster, so the first frame of the real video is what shows
          <video
            ref={video}
            className="media__video"
            src={`/media/v/${media.id}.mp4#t=0.001`}
            muted
            loop
            playsInline
            preload={eager ? "auto" : "metadata"}
            aria-label={media.alt}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="media__img" src={still} alt={media.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
        )}
      </div>
      <span className="media__shade" aria-hidden="true" />
    </div>
  );
}
