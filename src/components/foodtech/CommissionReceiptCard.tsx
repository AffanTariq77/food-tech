/** Card-type animation (no device frame): crossfades a delivery-app statement
    against the same order on your own ordering — visualizing "the math". */
const CommissionReceiptCard = () => (
  <div className="relative mx-auto w-full max-w-[360px]">
    <div className="ab-panel relative overflow-hidden p-7">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--hairline)/0.25) 0 6px, transparent 6px 12px)" }}
        aria-hidden="true"
      />

      {/* Scene A — delivery app statement */}
      <div className="animate-card-scene-a">
        <p className="ab-label text-sm">Delivery app statement</p>
        <dl className="mt-6 space-y-4 font-mono text-base">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Order total</dt>
            <dd>$42.00</dd>
          </div>
          <div className="flex justify-between text-destructive">
            <dt>Commission (18%)</dt>
            <dd>−$7.56</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-baseline justify-between border-t pt-5 ab-hairline">
          <span className="text-base font-semibold">You keep</span>
          <span className="font-mono text-2xl font-semibold">$34.44</span>
        </div>
      </div>

      {/* Scene B — your own ordering */}
      <div className="absolute inset-7 animate-card-scene-b">
        <p className="ab-label text-sm text-accent">Your own ordering</p>
        <dl className="mt-6 space-y-4 font-mono text-base">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Order total</dt>
            <dd>$42.00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Commission</dt>
            <dd>$0.00</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-baseline justify-between border-t pt-5 ab-hairline">
          <span className="text-base font-semibold">You keep</span>
          <span className="font-mono text-2xl font-semibold text-accent">$42.00</span>
        </div>
        <span className="mt-5 inline-block rounded-md bg-accent/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent">
          +$7.56 back in your pocket
        </span>
      </div>
    </div>
  </div>
);

export default CommissionReceiptCard;
