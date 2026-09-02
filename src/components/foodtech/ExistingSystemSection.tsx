import PosTabletMockup from "@/components/foodtech/PosTabletMockup";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const posSystems = ["Toast", "Square", "Clover", "SpotOn"];

const ExistingSystemSection = () => (
  <section id="existing-system" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader eyebrow="Already have a system?" title="Already on Toast, Square, Clover or SpotOn? Keep it." />

          <Reveal className="mt-4 flex flex-wrap gap-2">
            {posSystems.map((system) => (
              <span key={system} className="rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground ab-hairline">
                {system}
              </span>
            ))}
          </Reveal>

          <Reveal delay={60} className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              We are not going to tell you to rip out a system your staff already know how to use during a Friday
              rush. That is the most expensive advice in this industry and it is usually given by somebody with a
              quota. Most of our work sits on top of what you already run: the ordering, the app, the customer list,
              the reporting the system you bought was never going to give you.
            </p>

            <blockquote className="border-l-2 border-accent py-1 pl-5 text-lg font-medium text-foreground">
              You do not need to replace anything. The missing piece is what sits on top of it.
            </blockquote>

            <p>
              And if what you have is fine and the gap is not worth the money this year, we will say so on the first
              call. Shorter conversation, and you will remember who had it with you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <PosTabletMockup />
        </Reveal>
      </div>
    </div>
  </section>
);

export default ExistingSystemSection;
