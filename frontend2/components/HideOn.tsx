"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders children everywhere except the given route. */
export default function HideOn({ path, children }: { path: string; children: ReactNode }) {
  return usePathname() === path ? null : <>{children}</>;
}
