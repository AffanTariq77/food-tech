import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const gaps = [
  {
    code: "01",
    title: "There is no way to order from you directly.",
    body: "The menu is online. The ordering is not, or it only exists inside somebody else's app, under their brand, with their checkout.",
    line: "Every customer who wanted to order and could not just went somewhere that let them.",
  },
  {
    code: "02",
    title: "Every location does it differently.",
    body: "Different hours, different menus, different prices, sometimes a different phone number on the same brand. Head office is you, and you are the only thing holding it together.",
    line: "Your customers notice that before you do.",
  },
  {
    code: "03",
    title: "You are paying for attention and have nowhere to keep it.",
    body: "The ads work. The posts work. Then they eat, they leave, and the only way to reach them again is to pay for them again. You have no list, or the list belongs to a company you rent it from.",
    line: "You are renting the customers you already earned.",
  },
  {
    code: "04",
    title: "You are growing faster than your systems.",
    body: "Two locations was manageable. Four is a spreadsheet and a group chat. Six is somebody's full-time job, and that somebody is usually you at 11pm.",
    line: "Location four is the last cheap moment to sort this out. After that you are untangling, not building.",
  },
];

const FourGapsSection = () => (
  <section id="four-gaps" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="The four gaps"
        title="Most restaurants we talk to have one of these four problems."
        description="You will know yours in about ten seconds."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {gaps.map((gap, i) => (
          <Reveal key={gap.code} delay={i * 90} as="article" className="ab-panel-hover p-7 lg:p-9">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{gap.code}</span>
            <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">{gap.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{gap.body}</p>
            <p className="mt-4 border-t pt-4 text-base font-medium text-foreground ab-hairline">{gap.line}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FourGapsSection;
