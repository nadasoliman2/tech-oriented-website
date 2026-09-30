/**
 * Pinned statement scene (animated by [data-manifesto] in Animations.tsx): while it holds the
 * screen the backdrop shifts dark → brand teal → dark and the statement fills in word by word.
 */
export default function Manifesto({ text }: { text: string }) {
  return (
    <section className="manifesto" data-manifesto>
      <div className="manifesto__stage">
        <p className="manifesto__text">{text}</p>
      </div>
    </section>
  );
}
