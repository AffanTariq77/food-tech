import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/foodtech/Reveal";
import { sendNotification, submitForm } from "@/lib/supabaseClient";

const needsOptions = [
  "Online ordering on our own website",
  "Mobile app for customers",
  "POS or till system",
  "Payment setup",
  "Loyalty and customer list",
  "Managing multiple locations from one place",
  "Kitchen screens and workflow",
  "AI assistant to answer the phone and take orders",
  "Reviews and local listings",
  "Reporting across locations",
  "Connecting the systems we already use",
  "Not sure yet, we would like advice",
];

const locationOptions = ["1", "2 to 4", "5 to 9", "10 to 24", "25 or more"];
const posOptions = ["Toast", "Square", "Clover", "SpotOn", "Lightspeed", "TouchBistro", "Revel", "Oracle MICROS", "Something else", "Not sure"];

const fieldClass =
  "mt-2.5 h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent ab-hairline";

const initialForm = {
  needs: [] as string[],
  restaurantName: "",
  website: "",
  locations: locationOptions[0],
  pos: posOptions[0],
  name: "",
  email: "",
  phone: "",
  notes: "",
  honeypot: "",
};

const ContactSection = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need) ? current.needs.filter((n) => n !== need) : [...current.needs, need],
    }));
  };

  const goNext = () => {
    setError(null);
    if (step === 1 && form.needs.length === 0) {
      setError("Tick at least one, or “Not sure yet.”");
      return;
    }
    if (step === 2 && (!form.restaurantName || !form.website)) {
      setError("Please add your restaurant name and website or social page.");
      return;
    }
    setStep((current) => (current < 3 ? ((current + 1) as 1 | 2 | 3) : current));
  };

  const goBack = () => {
    setError(null);
    setStep((current) => (current > 1 ? ((current - 1) as 1 | 2 | 3) : current));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.name || !form.email) {
      setError("Please add your name and email.");
      return;
    }

    // Honeypot: real visitors never fill this hidden field. Silently "succeed" for bots.
    if (form.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      await submitForm({
        platform: "AirBridge-QuoteRequest",
        full_name: form.name,
        work_email: form.email,
        company_name: form.restaurantName,
        project_details: form.notes,
        metadata: { needs: form.needs, website: form.website, locations: form.locations, pos: form.pos, phone: form.phone },
      });

      const fields = {
        "What they need": form.needs.join(", "),
        "Restaurant name": form.restaurantName,
        "Website or social page": form.website,
        Locations: form.locations,
        "Current POS": form.pos,
        Name: form.name,
        Email: form.email,
        Phone: form.phone || "—",
        Notes: form.notes || "—",
      };
      void sendNotification({
        kind: "notifyBusiness",
        subject: `Quote request: ${form.restaurantName}, ${form.locations} locations`,
        replyTo: form.email,
        fields,
      });
      void sendNotification({
        kind: "ackVisitor",
        to: form.email,
        subject: "We've got your quote request",
        fields: { Message: `Thanks ${form.name}, we received your quote request for ${form.restaurantName}. We reply the same working day.` },
      });

      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again — your answers are still here.");
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
            Request a quote
          </p>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Tell us what you need.
            <br />
            We'll come back ready to act.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            A dedicated form so your enquiry arrives ready to act on. Three short steps, and we reply the same
            working day.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="ab-panel p-6 sm:p-8">
            {status === "success" ? (
              <div role="status" className="py-6 text-center">
                <p className="text-lg font-semibold">Request received.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Thanks{form.name ? `, ${form.name}` : ""} — we've emailed you a confirmation, and somebody who
                  knows this industry will reply the same working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setStep(1);
                    setStatus("idle");
                  }}
                  className="mt-6 rounded-md border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground ab-hairline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center justify-between">
                  <p className="ab-label">Step {step} of 3</p>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[1, 2, 3].map((s) => (
                      <span key={s} className={`h-1 w-6 rounded-full ${s <= step ? "bg-accent" : "bg-muted"}`} />
                    ))}
                  </div>
                </div>

                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <input
                  id="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                />

                {step === 1 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold">What do you need?</p>
                    <p className="mt-1 text-xs text-muted-foreground">Tick as many as apply.</p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {needsOptions.map((need) => (
                        <label
                          key={need}
                          className={`flex cursor-pointer items-start gap-2.5 rounded-md border p-3 text-xs leading-snug transition-colors ab-hairline ${
                            form.needs.includes(need) ? "border-accent bg-accent/5 text-foreground" : "text-muted-foreground hover:border-accent/40"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.needs.includes(need)}
                            onChange={() => toggleNeed(need)}
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-accent"
                          />
                          {need}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6 space-y-5">
                    <div>
                      <label htmlFor="restaurantName" className="ab-label">
                        Restaurant name *
                      </label>
                      <input id="restaurantName" value={form.restaurantName} onChange={handleChange} className={fieldClass} required />
                    </div>
                    <div>
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
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="locations" className="ab-label">
                          Locations *
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
                        <label htmlFor="pos" className="ab-label">
                          Current POS *
                        </label>
                        <select id="pos" value={form.pos} onChange={handleChange} className={fieldClass} required>
                          {posOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
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
                    <div>
                      <label htmlFor="phone" className="ab-label">
                        Phone
                      </label>
                      <input id="phone" type="tel" value={form.phone} onChange={handleChange} className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="notes" className="ab-label">
                        Anything else we should know?
                      </label>
                      <textarea id="notes" value={form.notes} onChange={handleChange} rows={3} className={`${fieldClass} h-auto py-3`} />
                    </div>
                  </div>
                )}

                {error && (
                  <p role="alert" className="mt-4 border border-destructive/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-destructive">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-md border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground ab-hairline"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex-1 rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending…" : "Request a quote →"}
                    </button>
                  )}
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  We reply the same working day. By submitting, you agree to be contacted about your enquiry — see
                  our{" "}
                  <a href="/privacy" className="underline hover:text-foreground">
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
