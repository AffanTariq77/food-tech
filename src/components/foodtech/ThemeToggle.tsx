import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground",
        "ab-hairline hover:border-accent/50",
        className,
      )}
    >
      <span aria-hidden="true" className="text-sm leading-none text-accent transition-transform duration-500 group-hover:rotate-45">
        {isDark ? "☾" : "☀"}
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
