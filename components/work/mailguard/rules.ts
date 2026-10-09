/*
 * A faithful port of MailGuard's rule gate (backend/app/services/rules/signals.py and engine.py):
 * the same signal names, adjustments, confidences and the same should_use_ai expression.
 * The messages are synthetic, on example.com.
 */

export type Message = {
  id: string;
  label: string;
  from: string;
  subject: string;
  headers?: string[];
  gmailLabels?: string[];
  body: string;
};

export type Signal = {
  name: string;
  category?: string;
  adjustment: number;
  confidence: number;
  forceUseAi?: boolean;
  forceSkipAi?: boolean;
};

export const MESSAGES: Message[] = [
  {
    id: "newsletter",
    label: "Newsletter",
    from: "digest@newsletter.example.com",
    subject: "Your weekly digest",
    headers: ["List-Unsubscribe: <mailto:unsub@newsletter.example.com>"],
    body: "Five stories we think you'll like this week.",
  },
  {
    id: "security",
    label: "Security alert",
    from: "no-reply@accounts.example.com",
    subject: "Security alert: new sign-in on a Windows device",
    body: "If this wasn't you, reset your password.",
  },
  {
    id: "promo",
    label: "Promotion with a deadline",
    from: "offers@shop.example.com",
    subject: "Last day to use your 20% code",
    gmailLabels: ["CATEGORY_PROMOTIONS"],
    body: "Your code expires at midnight.",
  },
  {
    id: "reply",
    label: "A reply from a person",
    from: "sam@example.com",
    subject: "Re: notes from Thursday",
    body: "Thanks, I added two questions at the end of the doc.",
  },
];

const GMAIL_LABELS: Record<string, [string, number, number]> = {
  CATEGORY_PROMOTIONS: ["PROMOTION", -25, 0.85],
  CATEGORY_SOCIAL: ["SOCIAL", -15, 0.7],
  CATEGORY_FORUMS: ["OTHER", -10, 0.6],
};

const AUTOMATED = ["noreply", "no-reply", "donotreply", "do-not-reply", "notifications", "notification"];
const SECURITY = ["verify your account", "password reset", "reset your password", "suspicious sign-in", "suspicious activity", "security alert", "unauthorized access", "unusual sign-in activity", "confirm your identity", "new sign-in", "your account was accessed"];
const DEADLINE = ["deadline", "due date", "due by", "expires on", "expires today", "action required", "reminder:", "last day to", "submission deadline"];

type Evaluator = { name: string; test: (m: Message) => Signal | null };

/** In MailGuard's registration order (ALL_SIGNAL_EVALUATORS). Finance extraction is not ported. */
export const EVALUATORS: Evaluator[] = [
  {
    name: "gmail_label",
    test: (m) => {
      for (const [label, [category, adjustment, confidence]] of Object.entries(GMAIL_LABELS)) {
        if (m.gmailLabels?.includes(label)) return { name: `gmail_label:${label}`, category, adjustment, confidence, forceSkipAi: true };
      }
      return null;
    },
  },
  {
    name: "automated_sender_pattern",
    test: (m) =>
      AUTOMATED.some((p) => m.from.split("@")[0].toLowerCase().includes(p))
        ? { name: "automated_sender_pattern", adjustment: -10, confidence: 0.5 }
        : null,
  },
  {
    name: "unsubscribe_or_bulk_header",
    test: (m) =>
      m.headers?.some((h) => h.startsWith("List-Unsubscribe"))
        ? { name: "unsubscribe_or_bulk_header", category: "NEWSLETTER", adjustment: -20, confidence: 0.7, forceSkipAi: true }
        : null,
  },
  {
    name: "security_keyword",
    test: (m) =>
      SECURITY.some((k) => `${m.subject}\n${m.body}`.toLowerCase().includes(k))
        ? { name: "security_keyword", category: "SECURITY_ALERT", adjustment: 30, confidence: 0.6, forceUseAi: true }
        : null,
  },
  {
    name: "deadline_keyword",
    test: (m) =>
      DEADLINE.some((k) => `${m.subject}\n${m.body}`.toLowerCase().includes(k))
        ? { name: "deadline_keyword", adjustment: 15, confidence: 0.4, forceUseAi: true }
        : null,
  },
  {
    name: "reply_or_forward_indicator",
    test: (m) =>
      /^(re:|fwd:|fw:)/i.test(m.subject.trim()) ? { name: "reply_or_forward_indicator", adjustment: 5, confidence: 0.2 } : null,
  },
];

export type Analysis = {
  fired: Signal[];
  adjustment: number;
  category: string | null;
  shouldUseAi: boolean;
  reason: string;
};

export function evaluate(m: Message): Analysis {
  const fired = EVALUATORS.map((e) => e.test(m)).filter((s): s is Signal => s !== null);
  const total = Math.max(-50, Math.min(50, fired.reduce((n, s) => n + s.adjustment, 0)));
  const withCategory = fired.filter((s) => s.category);
  const category = withCategory.length ? withCategory.reduce((a, b) => (b.confidence > a.confidence ? b : a)).category! : null;
  const forceUse = fired.some((s) => s.forceUseAi);
  const forceSkip = fired.some((s) => s.forceSkipAi);
  const shouldUseAi = forceUse || !forceSkip;
  const reason = forceUse
    ? forceSkip
      ? "A rule asks for the model, and that outranks a rule that would skip it."
      : "A high-stakes rule asks for the model."
    : forceSkip
      ? "A confident low-value rule fired. The rules decide on their own."
      : "No rule is confident either way, so the model takes a look.";
  return { fired, adjustment: total, category, shouldUseAi, reason };
}
