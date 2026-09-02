import { useEffect, useState } from "react";
import logo from "@/assets/airbridge-logo.png";
import ThemeToggle from "@/components/foodtech/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { id: "what-we-build", label: "What we build" },
  { id: "existing-system", label: "Already have a system?" },
  { id: "how-it-works", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-panel transition-shadow duration-300",
        "ab-hairline",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3"
          aria-label="AirBridge home"
        >
          <img
            src={logo}
            alt="AirBridge"
            width={284}
            height={86}
            className="h-6 w-auto sm:h-7 dark:brightness-0 dark:invert"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-transform duration-200 hover:scale-105 hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => goTo("contact")}
            className="hidden rounded-md bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue sm:inline-flex"
          >
            Send it over →
          </button>
          <button
            type="button"
            className="rounded-md border p-2 md:hidden ab-hairline"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="block h-4 w-5">
              <span className={cn("block h-px w-full bg-foreground transition-transform duration-300", menuOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("mt-[6px] block h-px w-full bg-foreground transition-opacity duration-200", menuOpen && "opacity-0")} />
              <span className={cn("mt-[6px] block h-px w-full bg-foreground transition-transform duration-300", menuOpen && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t ab-hairline bg-panel px-5 py-4 shadow-sm md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className="border-b py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground ab-hairline"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="flex-1 rounded-md bg-primary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue"
            >
              Send it over →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
