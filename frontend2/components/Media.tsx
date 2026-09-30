"use client";

import { useRef } from "react";
import type { MediaRef } from "@/lib/media";
import { useAutoVideo } from "./useAutoVideo";

type Props = {
  media: MediaRef;
  className?: string;
  parallax?: number;
  eager?: boolean;
  /** video playback speed (stock clips are often slow-motion) */
  speed?: number;
};

/** Photo/video tile (Fantasy radius-media). Video refs render the video alone (no poster) and play whenever on screen. */
export default function Media({ media, className = "", parallax = 0.12, eager = false, speed }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const hasVideo = media.video;
  useAutoVideo(video, `/media/v/${media.id}.mp4`, speed ?? media.rate ?? 1);

  const still = `/media/p/${media.id}.jpg`;

  return (
    <div className={`media ${className}`}>
      <div className="media__fill" data-parallax={parallax || undefined}>
        {hasVideo ? (
          // video only — no still/poster, so the first frame of the real video is what shows
          <video
            ref={video}
            className="media__video"
            src={`/media/v/${media.id}.mp4`}
            autoPlay
            preload="auto"
            muted
            loop
            playsInline
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
