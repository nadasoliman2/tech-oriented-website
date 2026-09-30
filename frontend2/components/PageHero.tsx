import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import AmbientBg from "./AmbientBg";
import Scene3D, { type SceneVariant } from "./Scene3D";

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
  /** real-time 3D object in the hero (each page places its own) */
  model?: SceneVariant;
  /** shown in place of the title text (the title stays as its accessible name) */
  logo?: ReactNode;
};

/** Inner-page hero: Fantasy-scale title, body offset to the right column. */
export default function PageHero({ title, body, meta, wide, condensed, lang = "en", ambient, logo, model }: Props) {
  const chars = condensed && lang !== "ar";
  return (
    <section className={`page-hero site-max${ambient ? " page-hero--ambient" : ""}`}>
      {ambient && <AmbientBg />}
      {model && <Scene3D variant={model} className="page-hero__model" />}
      <div className="page-hero__label">
        {meta}
      </div>
      {logo ? (
        <h1 className="page-hero__logo" aria-label={title}>
          {logo}
        </h1>
      ) : (
      <h1
        className={`${condensed ? "c1" : "h2"} page-hero__title${wide ? " is-wide" : ""}`}
        data-split={chars ? "chars" : "lines"}
      >
        {title}
      </h1>
      )}
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
