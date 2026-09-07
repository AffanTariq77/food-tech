import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitForm } from "@/lib/supabaseClient";

const NewsletterPopup = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const timerElapsed = useRef(false);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const maybeShow = () => {
      if (timerElapsed.current && hasScrolled.current) setVisible(true);
    };

    const timer = window.setTimeout(() => {
      timerElapsed.current = true;
      maybeShow();
    }, 5000);

    const onScroll = () => {
      if (window.scrollY > 80) {
        hasScrolled.current = true;
        maybeShow();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!form.name || !form.email) {
      setError("Name and email, please.");
      return;
    }
    setStatus("loading");
    try {
      await submitForm({ platform: "AirBridge-Newsletter", full_name: form.name, work_email: form.email });
      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" role="dialog" aria-label="Newsletter signup">
      <div className="ab-panel relative w-full max-w-sm p-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="py-2 pr-4">
            <p className="text-sm font-semibold">You're on the list.</p>
            <p className="mt-1 text-xs text-muted-foreground">We'll only email when it's worth your time.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="pr-4">
            <p className="text-sm font-semibold">Get the occasional useful email.</p>
            <p className="mt-1 text-xs text-muted-foreground">No spam, just what's actually worth knowing.</p>

            <div className="mt-4 space-y-2.5">
              <input
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent ab-hairline"
              />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent ab-hairline"
              />
            </div>

            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-3 w-full rounded-md bg-primary py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Sign up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
