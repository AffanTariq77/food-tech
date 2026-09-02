const groups = [
  { name: "Till & payments", value: "w-[85%]" },
  { name: "Ordering & delivery", value: "w-[70%]" },
  { name: "Loyalty & marketing", value: "w-[55%]" },
  { name: "Reporting", value: "w-[40%]" },
];

/** Desktop frame — the market-map research is a data-catalogue narrative, so it gets a dashboard. */
const MarketMapDesktop = () => (
  <div className="ab-panel overflow-hidden">
    <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3 ab-hairline">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
      </span>
      <span className="flex-1 truncate rounded-md bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground ab-hairline">
        airbridge.io/market-map
      </span>
    </div>

    <div className="p-6 sm:p-7">
      <p className="ab-label">Software catalogued</p>
      <p className="mt-2 animate-count-hold font-mono text-3xl font-semibold tracking-[-0.02em] text-foreground">1,303</p>
      <p className="text-xs text-muted-foreground">across eleven groups</p>

      <ul className="mt-6 space-y-3.5 border-t pt-5 ab-hairline">
        {groups.map((group) => (
          <li key={group.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground">{group.name}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className={`h-full origin-left animate-bar-grow rounded-full bg-accent ${group.value}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MarketMapDesktop;
