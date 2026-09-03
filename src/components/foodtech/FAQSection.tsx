import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";

const faqs = [
  {
    question: "We already have DoorDash and Uber Eats. Why would I stop?",
    answer:
      "Do not stop. DoorDash, Uber Eats and Grubhub put you in front of people who have never heard of you, and that is worth paying for. This is about the other ones, the regulars who searched your name and still ended up ordering through one of those apps. You already earned those customers. Moving that share to your own ordering is the whole idea. Most of the owners we work with keep the apps running and simply stop paying a cut on the orders that were always going to come to them anyway.",
  },
  {
    question: "Do you work with Toast?",
    answer:
      "Yes, and with Square, Clover, SpotOn, Lightspeed, TouchBistro, Revel and most of the rest. The question we would ask back is what you want that it is not giving you, because sometimes the honest answer is that you already own the feature and nobody switched it on.",
  },
  {
    question: "Who owns all this when it is finished?",
    answer:
      "You do. The software, the customer list, the lot. If we ever part ways you can hand it to another team, and we will help with the handover instead of making it difficult.",
  },
  {
    question: "I am tied into a contract until next year.",
    answer:
      "That is normal and it is not a blocker. We build the part that does not clash now, and the rest lands when your contract does. Bring the contract to the first call. The renewal date usually decides the order we build in.",
  },
  {
    question: "What happens to my restaurant while you are building?",
    answer:
      "Nothing. The work happens away from your service, going live is scheduled around your quiet hours, and your current way of taking orders still works on the day it launches.",
  },
  {
    question: "We tried an app once and nobody used it.",
    answer:
      "Most restaurant apps fail for one of two reasons. There was nothing in it worth a second visit, or nobody was ever told it existed. Both are fixable, and both are the first things we look at.",
  },
  {
    question: "My nephew built our website.",
    answer:
      "Good, that saves a step, and we are not here to insult it. A website that shows a menu and a system that takes orders and keeps track of your customers are two different jobs. The second one is ours.",
  },
  {
    question: "You are not local. Does that matter?",
    answer:
      "Our team is international and our clients are not in one place. What matters is who answers when your ordering has a problem on a Saturday night, and what happens if we are ever gone. That is why you own everything we build.",
  },
];

const FAQSection = () => (
  <section id="faq" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader eyebrow="The questions we get asked" title="Questions we get asked." centered />

      <Reveal className="mx-auto mt-10 max-w-5xl">
        <Accordion type="single" collapsible className="columns-1 gap-10 lg:columns-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="break-inside-avoid ab-hairline">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);

export default FAQSection;
