export type ProjectStatus = "LIVE" | "WIP" | "SHIPPED" | "HACKATHON";
export type ProjectTrack  = "Web3" | "AI/Finance" | "Full-Stack" | "ML/Healthcare" | "FinTech";

export interface Project {
  id:          string;
  name:        string;
  tagline:     string;
  description: string;
  status:      ProjectStatus;
  track:       ProjectTrack;
  tech:        string[];
  github:      string;
  live?:       string;
  year:        string;
  highlight?:  string;
  featured?:   boolean;
}

export const projects: Project[] = [
  {
    id:          "avaxpay",
    name:        "AvaxPay",
    tagline:     "Stripe-like deeplink payments on Avalanche — one URL, no SDK required.",
    description: "Full payment infrastructure on Avalanche Fuji testnet. Three deployed contracts handle one-time charges, recurring subscriptions, and USDC/USDT settlements. A deeplink API lets any app initiate payments from a single URL — no SDK, no integration overhead.",
    status:      "LIVE",
    track:       "Web3",
    tech:        ["Solidity", "Avalanche", "Next.js", "wagmi", "ethers.js", "Hardhat", "WalletConnect"],
    github:      "https://github.com/Pranav2112/AvaxPay",
    live:        "https://avax-pay.vercel.app",
    year:        "2026",
    highlight:   "3 contracts deployed · Fuji testnet · Mainnet-ready",
    featured:    true,
  },
  {
    id:          "trade-recon",
    name:        "Trade Reconciliation Engine",
    tagline:     "Post-trade settlement infrastructure — two feeds, one matching engine, ML-scored breaks.",
    description: "Simulates production-grade post-trade reconciliation. Python generates synthetic equity feeds with intentional discrepancies. A Java/Spring Boot engine ingests both via Kafka, detects breaks, and persists them. Scikit-learn anomaly model scores severity. React dashboard handles analyst resolution with full audit trail.",
    status:      "WIP",
    track:       "FinTech",
    tech:        ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Python", "React", "TypeScript", "Scikit-learn", "Docker"],
    github:      "https://github.com/Pranav2112/trade-reconciliation-engine",
    year:        "2026",
    highlight:   "Kafka streaming · ML anomaly scoring · Audit trail",
    featured:    true,
  },
  {
    id:          "finsight-ai",
    name:        "FinSight AI",
    tagline:     "Enter a ticker — get an analyst-grade research report in seconds.",
    description: "Stock research assistant that auto-generates structured reports. Pulls real-time OHLCV via yfinance, computes RSI, MA20/50/200, volatility, and max drawdown, then applies a rule-based signal engine (Bullish/Neutral/Bearish). No LLM API cost — pure quantitative signal generation.",
    status:      "SHIPPED",
    track:       "AI/Finance",
    tech:        ["Next.js 15", "FastAPI", "Python", "yfinance", "Pandas", "Recharts", "TypeScript"],
    github:      "https://github.com/Pranav2112/finsight-ai",
    year:        "2026",
    highlight:   "Real-time data · Rule-based signal engine · Zero API cost",
    featured:    true,
  },
  {
    id:          "flashbet",
    name:        "FlashBet Protocol",
    tagline:     "Live in-game prediction markets on Monad — open and resolve in under 2 minutes.",
    description: "On-chain YES/NO prediction markets resolving in real time during live sports events. WebSocket oracle creates markets on-chain the moment an event fires. Users bet with real MON, oracle resolves 2 min later, winners claim instantly. Built and shipped at Monad NYC Hackathon.",
    status:      "HACKATHON",
    track:       "Web3",
    tech:        ["Solidity", "Monad", "Next.js 14", "wagmi v2", "Node.js", "WebSocket", "Foundry"],
    github:      "https://github.com/Pranav2112/flashbet-monad",
    year:        "2026",
    highlight:   "Monad NYC Hackathon · 3 contracts · Sub-2min resolution",
    featured:    true,
  },
  {
    id:          "maternasense",
    name:        "MaternaSense",
    tagline:     "Clinical AI for preeclampsia risk — explainable predictions, care plan output.",
    description: "AI decision support for maternal healthcare. Calibrated ensemble models stratify risk into actionable bands. SHAP values explain every prediction to clinicians. Output is a structured care plan — not just a probability score.",
    status:      "SHIPPED",
    track:       "ML/Healthcare",
    tech:        ["Python", "XGBoost", "SHAP", "FastAPI", "React", "Scikit-learn"],
    github:      "https://github.com/Pranav2112/maternasense",
    year:        "2026",
    highlight:   "Explainable risk bands · Care planning output",
  },
  {
    id:          "amupedia",
    name:        "Amupedia",
    tagline:     "Student-built academic platform — live, real users, 333 commits.",
    description: "Open educational platform for ZHCET university students. Hosts exam papers, assignments, and course materials across B.Tech, B.Com, and B.E programs. Built with Next.js, Node.js, and MongoDB. Community-driven with active contributions.",
    status:      "LIVE",
    track:       "Full-Stack",
    tech:        ["Next.js", "Node.js", "MongoDB", "JavaScript", "CSS3"],
    github:      "https://github.com/Pranav2112/Project-Amupedia",
    live:        "https://www.amupedia.com",
    year:        "2023",
    highlight:   "Live · Real users · 333 commits",
  },
  {
    id:          "applyflow",
    name:        "ApplyFlow",
    tagline:     "Full-stack job tracker — status pipeline, auth, analytics.",
    description: "Application tracker with full CRUD, status pipeline (Applied → Interview → Offer → Rejected), Supabase auth, and a dashboard showing response rates and timelines.",
    status:      "SHIPPED",
    track:       "Full-Stack",
    tech:        ["Next.js 15", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github:      "https://github.com/Pranav2112/applyflow",
    year:        "2026",
    highlight:   "Full auth · Status pipeline · Analytics",
  },
  {
    id:          "jobtracker",
    name:        "Job Tracker",
    tagline:     "Fast, minimal internship tracker — live, built for the 2027 cycle.",
    description: "Lightweight TypeScript app for tracking job applications. Keyboard-friendly, fast, used as a daily driver during the 2027 application cycle.",
    status:      "LIVE",
    track:       "Full-Stack",
    tech:        ["TypeScript", "Next.js", "React"],
    github:      "https://github.com/Pranav2112/job-tracker",
    live:        "https://job-tracker-rho-five.vercel.app",
    year:        "2026",
    highlight:   "Daily driver · Live",
  },
  {
    id:          "booking",
    name:        "Concurrent Booking Platform",
    tagline:     "Conflict-free resource booking under concurrent load.",
    description: "Booking system engineered for simultaneous reservation requests. Optimistic locking and transaction isolation prevent double-bookings under concurrent load.",
    status:      "SHIPPED",
    track:       "Full-Stack",
    tech:        ["TypeScript", "Next.js", "PostgreSQL", "Prisma"],
    github:      "https://github.com/Pranav2112/Concurrent-Resource-Booking-Platform",
    year:        "2026",
    highlight:   "Concurrent load · Conflict-free locks",
  },
];
