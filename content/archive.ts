/*
 * Secondary work. Descriptions come from each repository's README or its GitHub description.
 * Omitted on purpose: Amupedia (no contribution found), ApplyFlow (superseded by Job Tracker),
 * empty or near-empty repositories.
 */

export type ArchiveEntry = {
  name: string;
  year: string;
  kind: string;
  summary: string;
  stack: string;
  code: string;
  note?: string;
};

export const ARCHIVE: ArchiveEntry[] = [
  {
    name: "Job Tracker",
    year: "2026",
    kind: "Product",
    summary:
      "An internship and job application tracker: a 12-stage pipeline, autofill from Greenhouse, Lever and Ashby posting URLs, a calendar and contacts.",
    stack: "React · TypeScript · Supabase · Vite",
    code: "https://github.com/Pranav2112/job-tracker",
    note: "Hosted demo currently offline.",
  },
  {
    name: "FinSight AI",
    year: "2026",
    kind: "Finance",
    summary:
      "Enter a ticker, get a structured research report: returns, volatility, drawdown, moving averages, RSI and a rule-based bullish, neutral or bearish signal with its reasons. No language model involved.",
    stack: "Next.js · FastAPI · pandas · yfinance",
    code: "https://github.com/Pranav2112/finsight-ai",
  },
  {
    name: "MaternaSense",
    year: "2026",
    kind: "Machine learning",
    summary:
      "A clinical decision-support prototype for preeclampsia risk screening that turns a risk estimate into a care-planning output.",
    stack: "Python · scikit-learn · JavaScript",
    code: "https://github.com/Pranav2112/maternasense",
    note: "Prototype. No recorded evaluation yet.",
  },
  {
    name: "AvaxPay",
    year: "2026",
    kind: "Web3",
    summary:
      "A payment processor for Avalanche shaped like Stripe: deeplink checkout, subscriptions and mock stablecoin settlement on the Fuji testnet.",
    stack: "Solidity · TypeScript · Next.js",
    code: "https://github.com/Pranav2112/AvaxPay",
  },
  {
    name: "FlashBet",
    year: "2026",
    kind: "Web3 · hackathon",
    summary: "Live in-game prediction markets on Monad, built during the Monad NYC hackathon.",
    stack: "Solidity · TypeScript",
    code: "https://github.com/Pranav2112/flashbet-monad",
  },
];
