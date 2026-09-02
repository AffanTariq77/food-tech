import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/foodtech/Reveal";
import { submitForm } from "@/lib/supabaseClient";

const locationOptions = ["1", "2 to 4", "5 to 9", "10 to 24", "25+"];
const tillOptions = ["Toast", "Square", "Clover", "SpotOn", "Lightspeed", "TouchBistro", "Revel", "Oracle MICROS", "Something else", "Not sure"];

const fieldClass =
  "mt-2.5 h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent ab-hairline";

const ContactSection = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    website: "",
    name: "",
    email: "",
    locations: locationOptions[0],
    tillSystem: tillOptions[0],
    annoying: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.restaurantName || !form.website || !form.name || !form.email) {
      setError("Please add your restaurant name, website or social page, your name and email.");
      return;
    }

    setStatus("loading");
    try {
      await submitForm({
        platform: "AirBridge-FoodTech",
        full_name: form.name,
        work_email: form.email,
        company_name: form.restaurantName,
        project_details: form.annoying,
        metadata: { website: form.website, locations: form.locations, till_system: form.tillSystem },
      });
      setStatus("success");
      setForm({ restaurantName: "", website: "", name: "", email: "", locations: locationOptions[0], tillSystem: tillOptions[0], annoying: "" });
    } catch (submissionError) {
      setStatus("idle");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative border-b ab-hairline">
      <div className="ab-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(50%_60%_at_50%_100%,hsl(var(--accent)/0.14),transparent_70%)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_520px] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="ab-label flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            The ask
          </p>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Tell us what you are running.
            <br />
            We will tell you what is missing.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Send us your website and roughly what you use, whatever you can remember off the top of your head.
            Somebody who knows this industry will come back to you with where the gaps are and what we would
            build first. Plain English, no slide deck, no obligation.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <form onSubmit={handleSubmit} className="ab-panel p-6 sm:p-8" noValidate>
            <p className="ab-label">Send it over</p>

            <div className="mt-6">
              <label htmlFor="restaurantName" className="ab-label">
                Restaurant name *
              </label>
              <input id="restaurantName" value={form.restaurantName} onChange={handleChange} className={fieldClass} required />
            </div>

            <div className="mt-5">
              <label htmlFor="website" className="ab-label">
                Website or social page *
              </label>
              <input
                id="website"
                value={form.website}
                onChange={handleChange}
                placeholder="yourrestaurant.com, or your Facebook or Instagram page"
                className={fieldClass}
                required
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="ab-label">
                  Your name *
                </label>
                <input id="name" value={form.name} onChange={handleChange} className={fieldClass} required />
              </div>
              <div>
                <label htmlFor="email" className="ab-label">
                  Email *
                </label>
                <input id="email" type="email" value={form.email} onChange={handleChange} className={fieldClass} required />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="locations" className="ab-label">
                  How many locations *
                </label>
                <select id="locations" value={form.locations} onChange={handleChange} className={fieldClass} required>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tillSystem" className="ab-label">
                  What till system are you on *
                </label>
                <select id="tillSystem" value={form.tillSystem} onChange={handleChange} className={fieldClass} required>
                  {tillOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="annoying" className="ab-label">
                What is the most annoying part right now
              </label>
              <textarea
                id="annoying"
                value={form.annoying}
                onChange={handleChange}
                rows={4}
                placeholder="Four delivery apps and I still cannot tell what we actually make"
                className={`${fieldClass} h-auto py-3`}
              />
            </div>

            {error && (
              <p role="alert" className="mt-4 border border-destructive/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-destructive">
                {error}
              </p>
            )}
            {status === "success" && (
              <p role="status" className="mt-4 border border-accent/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Received — one reply from a person, same working day.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full rounded-md bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send it over →"}
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              One reply from a person, same working day. No sales sequence you cannot get out of.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
