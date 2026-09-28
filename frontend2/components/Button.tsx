import type { ReactNode } from "react";
import TLink from "./TLink";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "dark";
  size?: "md" | "sm";
  className?: string;
  type?: "button" | "submit";
  cursor?: string;
  disabled?: boolean;
};

export function Arrow({ className = "btn__icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 10.5 10.5 1.5M3.5 1.5h7v7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Pill button with Fantasy-style fill wipe and text roll. */
export default function Button({ href, children, variant = "solid", size = "md", className = "", type = "button", cursor, disabled }: Props) {
  const cls = [
    "btn",
    variant === "outline" && "btn--outline",
    variant === "dark" && "btn--dark",
    size === "sm" && "btn--sm",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className="btn__text">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <Arrow />
    </>
  );

  if (href) {
    return (
      <TLink href={href} className={cls} data-cursor={cursor} data-magnetic>
        {inner}
      </TLink>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} data-magnetic>
      {inner}
    </button>
  );
}
