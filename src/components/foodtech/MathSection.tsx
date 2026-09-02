import CommissionReceiptCard from "@/components/foodtech/CommissionReceiptCard";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const MathSection = () => (
  <section id="the-math" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader eyebrow="The math" title="Do this on the back of a receipt." />

          <Reveal className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Take last month's delivery app sales. Multiply by the commission rate on your own statement, not a
              number somebody quoted you, the one you actually pay. Multiply that by twelve.
            </p>
            <p>That is what the arrangement costs you in a year. Now the part that stings.</p>

            <blockquote className="border-l-2 border-accent py-1 pl-5 text-lg font-medium text-foreground">
              The customer was already yours. You paid a commission to be introduced to somebody who was already
              walking through your door.
            </blockquote>

            <p>
              Nobody is telling you to switch the apps off tomorrow. They bring you people who have never heard of
              you, and that is worth paying for. The argument is about the regulars, the ones who searched your name
              and ended up ordering through an app anyway. Every one of those you move to your own ordering, you
              keep paying yourself for, forever.
            </p>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <CommissionReceiptCard />
        </Reveal>
      </div>
    </div>
  </section>
);

export default MathSection;
