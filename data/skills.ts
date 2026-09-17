export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
  track: "software" | "finance" | "web3" | "tools";
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "The syntax layer across systems",
    track: "software",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Solidity", "Rust", "C/C++"],
  },
  {
    category: "Frontend",
    description: "Product interfaces that are fast and readable",
    track: "software",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "Angular"],
  },
  {
    category: "Backend & APIs",
    description: "Reliable services, typed endpoints, clean architecture",
    track: "software",
    skills: ["Node.js", "FastAPI", "Flask", "Spring Boot", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    category: "AI / ML / Data",
    description: "From raw data to models that ship",
    track: "finance",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "XGBoost",
      "Random Forest",
      "SVM",
      "SMOTE",
      "Feature Engineering",
      "PyTorch",
      "SHAP",
    ],
  },
  {
    category: "Finance / Quant",
    description: "Market data systems, risk signals, portfolio analytics",
    track: "finance",
    skills: [
      "Portfolio Theory",
      "RSI",
      "MACD",
      "Bollinger Bands",
      "Volatility Metrics",
      "Drawdown Analysis",
      "Sharpe Ratio",
      "yfinance API",
      "Market Data Pipelines",
    ],
  },
  {
    category: "Web3 / Blockchain",
    description: "Smart contracts and on-chain developer tooling",
    track: "web3",
    skills: ["Solidity", "Soroban (Rust)", "Stellar", "Foundry", "ethers.js", "Smart Contracts", "Tokenization", "AES-256-GCM"],
  },
  {
    category: "Cloud & Tools",
    description: "Infra for shipping and operating software",
    track: "tools",
    skills: ["Git", "GitHub", "AWS S3", "AWS Lambda", "Vercel", "Postman", "Docker basics", "VS Code"],
  },
];
