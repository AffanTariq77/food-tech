import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const stages = [
  {
    index: "01",
    title: "We work out what is worth doing.",
    description: "We go through how people order from you today and where it leaks, and tell you what we would build first. You get that answer whether or not you hire us.",
  },
  {
    index: "02",
    title: "You see it before it exists.",
    description: "You look at the actual screens your customers will use before anything is built. Change them then. It costs nothing at that stage.",
  },
  {
    index: "03",
    title: "We build it in front of you.",
    description: "You see working pieces as they are finished, so nothing is a surprise at the end.",
  },
  {
    index: "04",
    title: "We go live around your service.",
    description: "Not through it. Staff are trained on a normal shift, not a Friday, and on the day it goes live your old way of taking orders still works.",
  },
];

const ProcessSection = () => (
  <section id="how-it-works" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader eyebrow="How it works" title="Four stages, and you know what you are getting at each one." />

      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => (
          <Reveal key={stage.index} delay={i * 90} as="li" className="ab-panel-hover p-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{stage.index}</span>
            <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em]">{stage.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120} className="mt-10 max-w-2xl space-y-2 border-l-2 border-accent pl-5">
        <p className="text-lg font-medium text-foreground">You own it. The software, the customer list, all of it.</p>
        <p className="text-lg font-medium text-foreground">There is no commission on an order. Not now, not later.</p>
      </Reveal>
    </div>
  </section>
);

export default ProcessSection;
