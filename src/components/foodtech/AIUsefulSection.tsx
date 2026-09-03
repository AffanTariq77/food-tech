import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const worthIt = [
  {
    title: "The phone that never gets answered.",
    body: "At 7pm nobody has a free hand. Something picks up every call, takes the straightforward orders, and passes you anything unusual: an allergy, a big catering order, somebody upset. Every missed call at your busiest hour was an order that went somewhere else.",
  },
  {
    title: "The questions you answer forty times a day.",
    body: "Are you open Sunday, is there parking, do you have anything gluten free, can you do a party of twelve. Answered straight away, in your words.",
  },
  {
    title: "Reviews you never got round to.",
    body: "A reply written for every review, in your voice, waiting for you to approve it. Written, not posted. You still press the button.",
  },
  {
    title: "The patterns in your own numbers.",
    body: "What is not selling, what runs out every Friday, which regulars have stopped coming in. That is already sitting in your systems and almost nobody reads it.",
  },
];

const AIUsefulSection = () => (
  <section id="ai-useful" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="Where AI is actually useful"
        title="Where AI is actually useful in a restaurant, and where it is not."
        description="Every company selling to you added the letters AI to their homepage in the last two years. Most of it is a report with a new name on it. Here is where we have seen it do real work, and where we tell owners not to bother."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
        <div>
          <p className="ab-label">Worth it</p>
          <div className="mt-6 space-y-8">
            {worthIt.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="ab-panel flex flex-col justify-center p-8 lg:p-10">
          <p className="ab-label text-sm">Not worth it, and we will say so</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            It does not run your kitchen. It does not set your prices. It does not touch payments outside rules
            you set. It does not replace anybody. And it does not replace the person who knows every regular by
            name. That person is your business, and anything that gets between them and your customers is a step
            backwards dressed up as progress.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AIUsefulSection;
