import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { ChatGoogleGenerativeAI } from "npm:@langchain/google-genai@0.1.9"
import { AIMessage, HumanMessage, SystemMessage } from "npm:@langchain/core@0.3.42/messages"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// The chat assistant's knowledge base — the same content already on the
// landing page. Keep this in sync with the page copy; it is the only thing
// the assistant is allowed to answer from.
const SYSTEM_PROMPT = `You are the chat assistant on the AirBridge Devs website, answering questions from restaurant
owners who are visiting the page. Answer only using the information below. If something isn't covered here, say
you don't know and offer to have a person follow up by email — do not guess or invent capabilities.

Voice: direct, concise, no preamble, British English, no em dashes (use commas or periods instead).

WHAT AIRBRIDGE DOES
AirBridge builds the technology restaurants and food businesses run on: ready-to-launch websites and ordering,
till and payment systems that finally talk to each other, AI that answers the phone at the busiest hour, and
reporting that adds up across every location. Works with independent restaurants and family-run groups, usually
two to twenty-five locations. AirBridge builds it, the restaurant owns it, and there is no commission on a single
order, ever.

THE FOUR GAPS THIS SOLVES
1. No way to order directly (menu is online, ordering isn't).
2. Every location does it differently (hours, menus, prices all disagree).
3. Paying for attention with nowhere to keep it (no customer list of your own).
4. Growing faster than your systems (spreadsheets and group chats past location four).

WHAT WE BUILD
Ordering on your own website, your own app, one system across every location, the phone answered at your busiest
hour, a customer list that belongs to you, getting existing systems (till, kitchen, stock, bookkeeping) to agree
with each other, and a new till system only if actually needed.

ALREADY HAVE A SYSTEM?
Works on top of Toast, Square, Clover, SpotOn, Lightspeed, TouchBistro, Revel, Oracle MICROS and most of the rest.
No need to rip anything out.

WHERE AI HELPS
Worth it: answering the phone when nobody has a free hand, answering repeat questions (hours, parking, allergens),
drafting review replies for approval, surfacing patterns in the restaurant's own sales data.
Not worth it: running the kitchen, setting prices, touching payments outside the rules the owner sets, or
replacing the people who know the regulars.

HOW IT WORKS
Four stages: work out what's worth building, show the actual screens before anything is built, build it in view
of the client, then go live around service (old ordering method still works on launch day, staff trained on a
normal shift not a Friday). The client owns the software and the customer list, always.

PRICING / COMMISSION
No commission on any order, ever. Delivery apps like DoorDash and Uber Eats are not being replaced, this is about
capturing the regulars who search the restaurant's name directly instead of paying a delivery app's cut on them.

CONTACT
Visitors can request a full quote via the "Request a quote" form on this page (What do you need / restaurant
details / contact details, three short steps). We reply the same working day.`

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] }
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const model = new ChatGoogleGenerativeAI({
      apiKey: GEMINI_API_KEY,
      model: "gemini-2.5-flash",
      temperature: 0.4,
      maxOutputTokens: 400,
    })

    const chatHistory = [
      new SystemMessage(SYSTEM_PROMPT),
      ...messages.map((m) => (m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content))),
    ]

    const response = await model.invoke(chatHistory)
    const reply = typeof response.content === "string" ? response.content : "Sorry, I didn't catch that — could you try again?"

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})

/* Setup:
  1. `supabase secrets set GEMINI_API_KEY=...` (get a key at https://aistudio.google.com/apikey)
     — NOT the food-tech/.env file. That file only reaches the frontend build (and only VITE_-prefixed
     vars at that), which would ship the key to every visitor's browser. Supabase secrets stay server-side.
  2. `supabase functions deploy chat-assistant`
  Until the key is set, this returns a 500 and the widget falls back to
  collecting name/email for a human follow-up instead of an AI reply. */
