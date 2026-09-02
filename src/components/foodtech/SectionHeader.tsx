import Reveal from "@/components/foodtech/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

const SectionHeader = ({ eyebrow, title, description, className, centered = false }: SectionHeaderProps) => (
  <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
    <p className={cn("ab-label flex items-center gap-3", centered && "justify-center")}>
      <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
      {eyebrow}
    </p>
    <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
  </Reveal>
);

export default SectionHeader;
