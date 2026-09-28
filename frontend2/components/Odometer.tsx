const ROLL = Array.from({ length: 30 }, (_, i) => i % 10);

/** Rolling-digit number (Parallel odometer). Animated by <Animations/>. */
export default function Odometer({ value }: { value: string }) {
  return (
    <span className="odo" aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span className="odo__col" data-digit={ch} key={i} aria-hidden="true">
            {ROLL.map((d, j) => (
              <span key={j}>{d}</span>
            ))}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
