// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] as string))

const row = (label: string, value: string, shaded: boolean) =>
  `<tr style="background:${shaded ? "#f1f5f9" : "#fff"};"><td style="padding:10px 16px;font-weight:bold;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:10px 16px;white-space:pre-line;">${value}</td></tr>`

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  try {
    const body = await req.json()
    // `kind` selects the email template. `notifyBusiness` (default) sends the
    // internal lead notification; `ackVisitor` sends the visitor's confirmation.
    const { kind = "notifyBusiness", subject, to, replyTo, fields } = body as {
      kind?: "notifyBusiness" | "ackVisitor"
      subject: string
      to?: string
      replyTo?: string
      fields: Record<string, string | undefined>
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
    // Configurable so the receiving address can change without a code deploy.
    const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL")
    // Must be a domain verified in Resend before this will deliver in production.
    const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev"

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const recipient = kind === "ackVisitor" ? to : to ?? NOTIFY_EMAIL
    if (!recipient) {
      return new Response(JSON.stringify({ error: "No recipient configured (set NOTIFY_EMAIL or pass `to`)" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const rowsHtml = Object.entries(fields ?? {})
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([label, value], i) => row(label, escapeHtml(String(value)), i % 2 === 0))
      .join("")

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;padding:32px;border-radius:12px;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e293b;font-size:1.5rem;margin-bottom:16px;">${escapeHtml(subject)}</h2>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
      </div>`

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: recipient,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      return new Response(JSON.stringify({ error: `Resend error: ${errorText}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
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

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Set secrets: `supabase secrets set RESEND_API_KEY=... NOTIFY_EMAIL=you@yourdomain.com RESEND_FROM_EMAIL=notifications@yourdomain.com`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-notification' \
    --header 'Authorization: Bearer <anon key>' \
    --header 'Content-Type: application/json' \
    --data '{"subject":"Test","fields":{"Name":"Jamie"}}'

*/
