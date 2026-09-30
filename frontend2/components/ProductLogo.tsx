import { brands } from "@/lib/brands";
import { productLogos } from "@/lib/media";

type Props = { slug: string; name: string; className?: string };

/**
 * A product's logo, themed for dark/light. The product doesn't depend on the asset:
 * with no logo on file it renders the name as a wordmark in the brand colour.
 */
export default function ProductLogo({ slug, name, className = "" }: Props) {
  const logo = productLogos[slug];
  if (!logo) {
    return (
      <span className={`plogo plogo--word ${className}`}>
        <span className={`plogo__word${brands[slug]?.italic ? " is-italic" : ""}`}>{name}</span>
      </span>
    );
  }
  return (
    <span className={`plogo${logo.tall ? " plogo--tall" : ""} ${className}`} role="img" aria-label={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-dark" src={logo.src.replace(".png", "-dark.png")} alt="" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-light" src={logo.src} alt="" loading="lazy" />
    </span>
  );
}
