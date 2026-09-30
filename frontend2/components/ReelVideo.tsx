"use client";

import { useRef } from "react";
import { useAutoVideo } from "./useAutoVideo";

/** Home showreel clip — same always-playing behaviour as every other site video. */
export default function ReelVideo({ id }: { id: string }) {
  const video = useRef<HTMLVideoElement>(null);
  useAutoVideo(video, `/media/v/${id}.mp4`);
  return <video ref={video} src={`/media/v/${id}.mp4`} autoPlay preload="auto" muted loop playsInline />;
}
