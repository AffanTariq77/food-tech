import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://peyolawdogcqlndypnnh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Created on demand so a missing key never breaks module import
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseAnonKey) {
    throw new Error('Supabase is not configured: VITE_SUPABASE_ANON_KEY is missing.');
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

// Form submission interface
export interface FormSubmission {
  platform: string;
  full_name: string;
  work_email: string;
  company_name?: string;
  project_details?: string;
  additional_details?: string;
  llm_provider?: string;
  monthly_spend?: string;
  metadata?: Record<string, any>;
}

// Submit form data to Supabase
export async function submitForm(data: FormSubmission) {
  try {
    const { data: result, error } = await getSupabase()
      .from('form_submissions')
      .insert([
        {
          ...data,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Failed to submit form');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

interface NotifyPayload {
  kind?: 'notifyBusiness' | 'ackVisitor';
  subject: string;
  to?: string;
  replyTo?: string;
  fields: Record<string, string | undefined>;
}

// Fire-and-forget email via the send-notification edge function. The
// Supabase row saved by submitForm() is always the source of truth, so a
// failure here (e.g. RESEND_API_KEY not yet configured) is swallowed —
// callers should not block success on it.
export async function sendNotification(payload: NotifyPayload) {
  try {
    const { error } = await getSupabase().functions.invoke('send-notification', { body: payload });
    if (error) console.error('send-notification error:', error);
  } catch (error) {
    console.error('send-notification error:', error);
  }
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Throws if the assistant isn't configured yet (e.g. ANTHROPIC_API_KEY missing) —
// callers should catch this and fall back to human handoff.
export async function askChatAssistant(messages: ChatMessage[]): Promise<string> {
  const { data, error } = await getSupabase().functions.invoke('chat-assistant', { body: { messages } });
  if (error || !data?.reply) {
    throw new Error(error?.message || 'Chat assistant is not available right now.');
  }
  return data.reply as string;
}
