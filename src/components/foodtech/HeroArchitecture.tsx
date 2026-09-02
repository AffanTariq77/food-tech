const flow = "animate-dash-flow";

const Box = ({
  x,
  y,
  w,
  h,
  label,
  meta,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  meta?: string;
  accent?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={2}
      className={accent ? "fill-accent/10 stroke-accent" : "fill-panel stroke-current opacity-100"}
      strokeWidth={1}
      stroke={accent ? undefined : "currentColor"}
      strokeOpacity={accent ? 1 : 0.18}
    />
    <text
      x={x + w / 2}
      y={meta ? y + h / 2 - 3 : y + h / 2 + 4}
      textAnchor="middle"
      className={accent ? "fill-accent" : "fill-current"}
      style={{ fontSize: 12, letterSpacing: "0.14em", fontFamily: "ui-monospace, monospace" }}
    >
      {label}
    </text>
    {meta && (
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        className="fill-current opacity-45"
        style={{ fontSize: 9, letterSpacing: "0.18em", fontFamily: "ui-monospace, monospace" }}
      >
        {meta}
      </text>
    )}
  </g>
);

const Link = ({ d, delay = 0 }: { d: string; delay?: number }) => (
  <path
    d={d}
    fill="none"
    strokeWidth={1}
    strokeDasharray="5 7"
    className={`stroke-accent ${flow}`}
    strokeOpacity={0.75}
    style={{ animationDelay: `${delay}ms` }}
  />
);

/** Mirrors the hero copy: ordering, till & payments and the AI phone all flow through
    AirBridge into one report per location — not a generic tech-stack diagram. */
const HeroArchitecture = () => (
  <svg
    viewBox="0 0 560 420"
    role="img"
    aria-label="AirBridge system flow: your restaurant's ordering, till and phone all feed into the AirBridge integration layer, producing one report across every location."
    className="h-auto w-full max-w-[560px] text-foreground"
  >
    <defs>
      <linearGradient id="ab-hero-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
      </linearGradient>
    </defs>

    <rect x="0" y="0" width="560" height="420" fill="url(#ab-hero-fade)" />

    <text x="20" y="24" className="fill-current opacity-40" style={{ fontSize: 9, letterSpacing: "0.28em", fontFamily: "ui-monospace, monospace" }}>
      SYSTEM / DATA FLOW
    </text>

    <Box x={150} y={40} w={260} h={52} label="YOUR RESTAURANT" meta="WEBSITE · TILL · PHONE" />
    <Link d="M280 92 V126" />

    <Box x={150} y={126} w={80} h={44} label="ORDER" />
    <Box x={240} y={126} w={80} h={44} label="TILL" />
    <Box x={330} y={126} w={80} h={44} label="PHONE" />

    <Link d="M190 170 V196 H280 V214" delay={120} />
    <Link d="M280 170 V214" delay={240} />
    <Link d="M370 170 V196 H280 V214" delay={360} />

    <Box x={110} y={214} w={340} h={66} label="AIRBRIDGE" meta="INTEGRATION LAYER" accent />

    <Link d="M280 280 V310" delay={80} />

    <Box x={150} y={310} w={260} h={56} label="REPORTING" meta="EVERY LOCATION · ONE PLACE" />

    {[
      [280, 109],
      [280, 295],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3} className="fill-accent animate-pulse-node" style={{ transformOrigin: `${cx}px ${cy}px` }} />
    ))}
  </svg>
);

export default HeroArchitecture;
