import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import AmbientBg from "./AmbientBg";

type Props = {
  label?: string;
  title: string;
  body?: ReactNode;
  meta?: ReactNode;
  wide?: boolean;
  condensed?: boolean;
  lang?: Lang;
  /** animated brand backdrop behind the hero */
  ambient?: boolean;
};

/** Inner-page hero: Fantasy-scale title, body offset to the right column. */
export default function PageHero({ title, body, meta, wide, condensed, lang = "en", ambient }: Props) {
  const chars = condensed && lang !== "ar";
  return (
    <section className={`page-hero site-max${ambient ? " page-hero--ambient" : ""}`}>
      {ambient && <AmbientBg />}
      <div className="page-hero__label">
        {meta}
      </div>
      <h1
        className={`${condensed ? "c1" : "h2"} page-hero__title${wide ? " is-wide" : ""}`}
        data-split={chars ? "chars" : "lines"}
      >
        {title}
      </h1>
      {body && (
        <div className="page-hero__body">
          <div className="lead muted" data-fade data-delay="0.3">
            {body}
          </div>
        </div>
      )}
    </section>
  );
}
