import HeroArchitecture from "@/components/foodtech/HeroArchitecture";
import { scrollToSection } from "@/lib/scroll";

const HeroSection = () => (
  <section id="top" className="relative overflow-hidden border-b ab-hairline">
    <div className="ab-grid pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--accent)/0.16),transparent_70%)]" aria-hidden="true" />

    <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-40">
      <div className="animate-fade-up">
        <p className="ab-label flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          AirBridge Devs
        </p>

        <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
          Technology for the modern food industry.
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          AirBridge builds the technology restaurants and food businesses run on: ready-to-launch websites and
          ordering, till and payment systems that finally talk to each other, AI that answers the phone at your
          busiest hour, and reporting that adds up across every location.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToSection("what-we-build")}
            className="group rounded-md bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue"
          >
            See what we build <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("four-gaps")}
            className="rounded-md border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:border-accent/60 hover:text-foreground ab-hairline"
          >
            Show me where to start
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Built around the way you already work, and yours to keep once it is built.
        </p>
      </div>

      <div className="relative">
        <div className="ab-panel relative p-4 sm:p-8">
          <div className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" aria-hidden="true" />
          <HeroArchitecture />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
