import { Check } from "lucide-react";

const layers = ["Ordering", "Your app", "Customer list", "Reporting"];

/** Tablet frame — POS terminals are tablets, so "sits on top of what you run" plays out as a checklist. */
const PosTabletMockup = () => (
  <div className="mx-auto w-full max-w-[400px]">
    <div className="relative rounded-2xl border-[3px] border-primary bg-primary p-1 shadow-panel">
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-xl bg-panel p-6 pb-7">
        <div className="flex items-center justify-between">
          <p className="ab-label text-sm">Toast</p>
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-node" aria-hidden="true" />
            Connected
          </span>
        </div>

        <p className="mt-5 text-base font-semibold">What AirBridge adds on top</p>

        <ul className="mt-5 space-y-3.5">
          {layers.map((layer, i) => (
            <li
              key={layer}
              className="flex animate-tablet-check items-center gap-3 text-sm"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {layer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default PosTabletMockup;
