import logo from "@/assets/airbridge-logo.png";
import ThemeToggle from "@/components/foodtech/ThemeToggle";
import { scrollToSection } from "@/lib/scroll";

const columns = [
  {
    title: "Navigate",
    links: [
      { label: "What we build", target: "what-we-build" },
      { label: "How it works", target: "how-it-works" },
      { label: "FAQ", target: "faq" },
      { label: "Contact", target: "contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "The math", target: "the-math" },
      { label: "The four gaps", target: "four-gaps" },
      { label: "Already have a system?", target: "existing-system" },
      { label: "Where AI helps", target: "ai-useful" },
    ],
  },
];

const SiteFooter = () => (
  <footer className="bg-background">
    <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <img src={logo} alt="AirBridge" width={284} height={86} className="h-7 w-auto dark:brightness-0 dark:invert" loading="lazy" decoding="async" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            AirBridge Devs. We build ordering, apps and the systems behind them for restaurants.
          </p>
          <ThemeToggle className="mt-7" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="ab-label">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.target)}
                      className="text-left text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t ab-hairline">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">© 2026 AirBridge Devs</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Contact · Privacy · Terms · Unsubscribe</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
