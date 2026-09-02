import MarketMapDesktop from "@/components/foodtech/MarketMapDesktop";
import Reveal from "@/components/foodtech/Reveal";
import SectionHeader from "@/components/foodtech/SectionHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reasons = [
  "One company can now sell you almost your entire setup. That is convenient until the day you want your customer list in a usable form, or a better price, or one thing they do not build.",
  "A lot of what is still being sold to you has already folded. Upserve is now Lightspeed. Waitr, which became ASAP, filed for bankruptcy and stopped operating. The person selling to you is not always the one who mentions it.",
  "Most of what goes wrong is not a bad system. It is the gap between two of them. Nobody sold you something broken. You were sold seven good things that were never introduced to each other.",
];

const groups = [
  { name: "Till and payments", does: "Where the sale actually happens", names: "Toast, Square, Clover, Lightspeed, TouchBistro, SpotOn, Revel, Oracle MICROS" },
  { name: "Ordering and delivery", does: "Your website orders, the apps, the aggregators", names: "Olo, ChowNow, Owner.com, DoorDash, Uber Eats, Grubhub, Otter" },
  { name: "Reservations and front of house", does: "Bookings, waitlist, tables", names: "OpenTable, Resy, SevenRooms, Tock" },
  { name: "Loyalty and marketing", does: "Getting people back in without paying twice", names: "Punchh, Paytronix, Thanx, Klaviyo, Popmenu, Mailchimp" },
  { name: "Kitchen", does: "Tickets, screens, prep, getting food out", names: "Toast KDS, Fresh KDS, QSR Automations, Meez" },
  { name: "Stock and food cost", does: "What you bought, what you used, what it cost", names: "MarketMan, MarginEdge, xtraCHEF, Craftable, BlueCart" },
  { name: "Rotas and payroll", does: "The schedule and everybody on it", names: "7shifts, HotSchedules, Homebase, Gusto, ADP" },
  { name: "Bookkeeping", does: "Where the numbers finally land", names: "QuickBooks, Xero, Restaurant365, DAVO" },
  { name: "Reviews and listings", does: "What people see before they choose you", names: "Google Business Profile, Yelp, Ovation, Birdeye" },
  { name: "Safety and admin", does: "Temps, checklists, certificates, equipment", names: "Jolt, Zenput, ServSafe, Ecotrak" },
  { name: "Reporting", does: "Whether you can see every location at once", names: "Delaget, Crunchtime, Tenzo, Bikky, Avero" },
];

const MarketKnowledgeSection = () => (
  <section id="market-knowledge" className="border-b ab-hairline">
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="How we know your business"
            title="Before we built anything for a restaurant, we spent months learning what restaurants already run on."
          />

          <Reveal className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              We went through the whole US market and catalogued every piece of software a restaurant can buy, in
              eleven groups, from the till at the counter to the reporting you look at on a Sunday. 1,303 products.
              Which are still going, which have quietly shut down or been bought by somebody else, and which
              companies are quietly the same company.
            </p>
            <p>That matters to you for three reasons.</p>
          </Reveal>

          <ul className="mt-6 max-w-2xl space-y-4">
            {reasons.map((reason, i) => (
              <Reveal key={reason.slice(0, 24)} delay={i * 70} as="li" className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                {reason}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={220} className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              So when we tell you what to build, we are not guessing, and we are not selling you the only thing we
              know how to make.
            </p>
          </Reveal>
        </div>

        <Reveal delay={90} className="lg:pt-8">
          <MarketMapDesktop />
        </Reveal>
      </div>

      <Reveal delay={280} className="ab-panel mt-14 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>The eleven groups</TableHead>
              <TableHead>What it does in your restaurant</TableHead>
              <TableHead>Names you would know</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.name}>
                <TableCell className="font-medium text-foreground">{group.name}</TableCell>
                <TableCell className="text-muted-foreground">{group.does}</TableCell>
                <TableCell className="text-muted-foreground">{group.names}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Reveal>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Most restaurants are running six to nine of these right now, bought at different times from different
        salespeople, and none of them were built to talk to each other. That is not a criticism. It is what
        happens when you buy software one problem at a time for fifteen years.
      </p>
    </div>
  </section>
);

export default MarketKnowledgeSection;
