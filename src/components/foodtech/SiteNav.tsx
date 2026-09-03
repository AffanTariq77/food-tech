import { useEffect, useState } from "react";
import logo from "@/assets/airbridge-logo.png";
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
      className={cn("fixed inset-x-0 top-0 z-50 border-b bg-panel shadow-sm transition-shadow duration-300", "ab-hairline", scrolled && "shadow-md")}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
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
            className="h-7 w-auto sm:h-8 dark:brightness-0 dark:invert"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className="whitespace-nowrap text-lg text-foreground/80 transition-transform duration-200 hover:scale-105 hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => goTo("contact")}
            className="hidden rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue sm:inline-flex"
          >
            Send it over
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
                className="border-b py-3 text-left text-lg text-foreground/80 transition-colors hover:text-foreground ab-hairline"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => goTo("contact")}
            className="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue"
          >
            Send it over
          </button>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
