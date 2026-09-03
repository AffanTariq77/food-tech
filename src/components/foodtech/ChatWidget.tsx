import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { askChatAssistant, sendNotification, type ChatMessage } from "@/lib/supabaseClient";

const transcriptText = (messages: ChatMessage[]) =>
  messages.map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`).join("\n\n");

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState<{ name: string; email: string } | null>(null);
  const [intro, setIntro] = useState({ name: "", email: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }));

  const handleIntroChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIntro((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const startChat = (event: FormEvent) => {
    event.preventDefault();
    if (!intro.name || !intro.email) return;
    setContact({ name: intro.name, email: intro.email });
    setMessages([{ role: "assistant", content: `Hi ${intro.name}, ask me anything about what AirBridge builds.` }]);
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim() || !contact) return;

    const next = [...messages, { role: "user" as const, content: draft.trim() }];
    setMessages(next);
    setDraft("");
    setSending(true);
    scrollToEnd();

    let reply: string;
    try {
      reply = await askChatAssistant(next);
      setOffline(false);
    } catch {
      setOffline(true);
      reply = "I can't reach our AI assistant right now, but I've noted your question — a person will follow up at the email you gave.";
    }

    const withReply = [...next, { role: "assistant" as const, content: reply }];
    setMessages(withReply);
    setSending(false);
    scrollToEnd();

    void sendNotification({
      kind: "notifyBusiness",
      subject: `Chat transcript: ${contact.name}`,
      replyTo: contact.email,
      fields: { Visitor: `${contact.name} <${contact.email}>`, Transcript: transcriptText(withReply) },
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="ab-panel mb-3 flex h-[440px] w-[320px] flex-col overflow-hidden sm:w-[360px]" role="dialog" aria-label="Chat with AirBridge">
          <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-3 ab-hairline">
            <p className="text-sm font-semibold">Ask AirBridge</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          {!contact ? (
            <form onSubmit={startChat} className="flex flex-1 flex-col justify-center gap-3 p-5">
              <p className="text-sm text-muted-foreground">Quick intro before we start — who am I talking to?</p>
              <input
                id="name"
                value={intro.name}
                onChange={handleIntroChange}
                placeholder="Your name"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-accent ab-hairline"
                required
              />
              <input
                id="email"
                type="email"
                value={intro.email}
                onChange={handleIntroChange}
                placeholder="Email"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-accent ab-hairline"
                required
              />
              <button type="submit" className="rounded-md bg-primary py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground hover:bg-sky-400">
                Start chatting →
              </button>
            </form>
          ) : (
            <>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.content}
                  </div>
                ))}
                {sending && <div className="max-w-[85%] rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">Typing…</div>}
              </div>
              {offline && <p className="px-4 pb-1 text-[11px] text-muted-foreground">AI assistant offline — questions are still logged for a human reply.</p>}
              <form onSubmit={sendMessage} className="flex gap-2 border-t p-3 ab-hairline">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a question…"
                  className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:border-accent ab-hairline"
                />
                <button type="submit" disabled={sending} className="rounded-md bg-primary px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-panel transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-blue"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidget;
