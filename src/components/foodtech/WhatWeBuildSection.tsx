import BrowserMockup from "@/components/foodtech/BrowserMockup";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const items = [
  {
    index: "01",
    title: "Ordering on your own website",
    description: "Your name in the address bar, your prices, your customer. No commission on the order.",
  },
  {
    index: "02",
    title: "Your own app",
    description:
      "On their home screen. Order again in two taps. And a way to tell them about Tuesday without paying an app company to pass on the message.",
  },
  {
    index: "03",
    title: "One system across every location",
    description: "One menu to change, one price to update, one place where the numbers from every location add up. Change it once and it changes everywhere.",
  },
  {
    index: "04",
    title: "The phone answered at your busiest hour",
    description: "Straightforward orders taken automatically when nobody has a free hand. Anything unusual comes to a person.",
  },
  {
    index: "05",
    title: "A customer list that belongs to you",
    description: "Who came back, who has not been in for three months, what they usually order. Yours to keep, and yours to take with you if you ever fire us.",
  },
  {
    index: "06",
    title: "Getting your systems to agree with each other",
    description: "Your till, your kitchen, your stock, your bookkeeping. Right now somebody re-types the same numbers between them on a Sunday night. That stops.",
  },
  {
    index: "07",
    title: "A new till system, but only if you actually need one",
    description:
      "Sometimes the terminal really is the problem: fees that grow every time you open a location, no way to get your own numbers out of it, a service style it was never built for. We build that too. We just do not start there.",
  },
];

const WhatWeBuildSection = () => (
  <section id="what-we-build" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
        <SectionHeader
          eyebrow="What we build"
          title="We build the part you do not have."
          description="Built for your restaurant, not a template with your logo on it. And you are not renting it from us afterwards."
        />
        <Reveal delay={90}>
          <BrowserMockup />
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.index}
            delay={i * 70}
            as="article"
            className={`ab-panel-hover p-7 lg:p-9 ${i === items.length - 1 ? "md:col-span-2 lg:col-span-3" : ""}`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{item.index}</span>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">{item.title}</h3>
            <p className={`mt-3 text-base leading-relaxed text-muted-foreground ${i === items.length - 1 ? "max-w-2xl" : ""}`}>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhatWeBuildSection;
