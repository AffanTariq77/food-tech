import { Check, Plus, ShoppingBag } from "lucide-react";

const menuItems = [
  { name: "Charred flatbread", price: "$9" },
  { name: "House burger", price: "$16" },
  { name: "Lemon tart", price: "$8" },
];

const cartItems = [
  { name: "House burger", qty: "1×", price: "$16" },
  { name: "Lemon tart", qty: "1×", price: "$8" },
];

const steps = ["Placed", "Preparing", "On its way"];

/** Looping menu → order → delivery story. Pure CSS crossfade, no JS state. */
const OrderFlowPhone = () => (
  <div className="mx-auto w-full max-w-[240px]">
    <div className="rounded-[2.5rem] border-[5px] border-primary bg-primary p-1 shadow-panel">
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[1.7rem] bg-panel">
        <span className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-primary/70" aria-hidden="true" />

        {/* Scene 1 — menu */}
        <div className="absolute inset-0 flex animate-phone-scene-a flex-col p-5 pt-8">
          <p className="ab-label">Menu</p>
          <p className="mt-1 text-sm font-semibold">Your Restaurant</p>
          <ul className="mt-5 space-y-3.5">
            {menuItems.map((item, i) => (
              <li key={item.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{item.name}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground">{item.price}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent ${i === 2 ? "animate-pulse-node" : ""}`}
                    aria-hidden="true"
                  >
                    <Plus className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scene 2 — cart */}
        <div className="absolute inset-0 flex animate-phone-scene-b flex-col p-5 pt-8">
          <p className="ab-label flex items-center gap-2">
            <ShoppingBag className="h-3 w-3" /> Your order
          </p>
          <ul className="mt-5 space-y-3 border-b pb-4 ab-hairline">
            {cartItems.map((item) => (
              <li key={item.name} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {item.qty} {item.name}
                </span>
                <span className="font-mono text-foreground">{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="font-mono">$24</span>
          </div>
          <span className="mt-auto mb-6 rounded-md bg-primary py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground">
            Place order →
          </span>
        </div>

        {/* Scene 3 — confirmed */}
        <div className="absolute inset-0 flex animate-phone-scene-c flex-col items-center justify-center p-5 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check className="h-5 w-5" strokeWidth={3} />
          </span>
          <p className="mt-3 text-sm font-semibold">Order confirmed</p>
          <p className="mt-1 text-xs text-muted-foreground">Ready in 18 min</p>
          <div className="mt-6 flex w-full items-center justify-between">
            {steps.map((step, i) => (
              <span key={step} className="flex flex-1 flex-col items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "animate-pulse-node bg-accent" : "bg-muted-foreground/40"}`} aria-hidden="true" />
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">{step}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderFlowPhone;
