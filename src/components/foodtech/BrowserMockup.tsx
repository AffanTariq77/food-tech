const menu = [
  { name: "Today's special", price: "$18" },
  { name: "House favourite", price: "$14" },
  { name: "Dessert of the day", price: "$9" },
];

/** Static preview of an AirBridge-built ordering site — illustrative, not a real client. */
const BrowserMockup = () => (
  <div className="ab-panel-hover overflow-hidden">
    <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-3 ab-hairline">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
      </span>
      <span className="flex-1 truncate rounded-md bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground ab-hairline">
        yourrestaurant.com
      </span>
    </div>

    <div className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-[-0.01em]">Your Restaurant</span>
        <span className="rounded-md bg-primary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground">
          Order now
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em]">Order ahead, skip the line.</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your menu, your prices, no commission on the order.</p>
      </div>

      <ul className="mt-6 space-y-3 border-t pt-5 ab-hairline">
        {menu.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{item.name}</span>
            <span className="font-mono text-muted-foreground">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default BrowserMockup;
