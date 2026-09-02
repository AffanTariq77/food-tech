import OrderFlowPhone from "@/components/foodtech/OrderFlowPhone";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const WhatWeDoSection = () => (
  <section id="what-we-do" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader eyebrow="What we do" title="Everything a restaurant runs on, built properly and built for you." />

          <Reveal className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              You already have the hard part. A kitchen that works, regulars who come back, a name people type into
              their phones. What we build is the technology around it, so more of that turns into orders you keep.
            </p>
            <p>
              Ordering that runs on your own website. Your own app, when you have the regulars to justify one. One
              system across all your locations instead of four that disagree. The phone answered at 7pm when nobody
              has a free hand. Numbers that finally add up in one place.
            </p>
            <p>
              We work with independent restaurants and family-run groups, usually two to twenty-five locations,
              where the owner still makes the decisions. We build it, you own it, and there is no commission on a
              single order.
            </p>
            <p className="border-t pt-5 text-sm ab-hairline">
              This page walks through what we build, what it is worth to you, and how to tell whether it is worth a
              conversation. Four minutes, and there is a short form at the end if you want us to look at your setup.
            </p>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <OrderFlowPhone />
        </Reveal>
      </div>
    </div>
  </section>
);

export default WhatWeDoSection;
