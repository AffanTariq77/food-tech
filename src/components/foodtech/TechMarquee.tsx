const items = [
  "Toast", "Square", "Clover", "SpotOn", "Lightspeed", "TouchBistro", "Revel", "Oracle MICROS",
  "DoorDash", "Uber Eats", "Grubhub",
];

const TechMarquee = () => (
  <div className="overflow-hidden border-b ab-hairline bg-panel/40 py-3" aria-hidden="true">
    <div className="flex w-max animate-marquee gap-8 whitespace-nowrap will-change-transform">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex gap-8">
          {items.map((item) => (
            <span key={`${copy}-${item}`} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              {item}
              <span className="text-accent">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TechMarquee;
