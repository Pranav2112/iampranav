export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tags?: string[];
  highlight?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2019–2023",
    title: "B.E. Computer Science — India",
    description:
      "Studied computer science fundamentals — algorithms, data structures, systems programming, and early ML coursework. First projects: web apps, ML models, and a growing curiosity about how financial systems work.",
    tags: ["Academic", "CS Fundamentals", "First Projects"],
  },
  {
    year: "2022–2023",
    title: "First ML & Web Projects",
    description:
      "Built plant disease detection CNNs, fraud detection classifiers, and early web applications. Learned that the most interesting problems sit at the intersection of data, systems, and real-world utility.",
    tags: ["ML", "Computer Vision", "Web Dev"],
  },
  {
    year: "2023",
    title: "Freelance Web Developer",
    description:
      "Delivered a production ticketing platform for a real client — end-to-end. First experience owning a product from requirements to deployment. Learned how software behaves when real people use it.",
    tags: ["Client Work", "Full-Stack", "AWS"],
  },
  {
    year: "Aug 2024",
    title: "M.S. Computer Science — Stevens Institute of Technology",
    description:
      "Moved to Hoboken, NJ to pursue a graduate degree at Stevens, ranked among the top engineering schools in the US. Focus areas: AI/ML, distributed systems, software engineering, and financial systems.",
    tags: ["Graduate School", "Stevens", "Hoboken"],
    highlight: true,
  },
  {
    year: "Fall 2024",
    title: "Graduate Assistant — Undergraduate Admissions",
    description:
      "Joined the admissions office at Stevens. Operating in a US professional environment — coordinating student inquiries, working across university departments, and handling structured data workflows.",
    tags: ["Professional", "Stevens", "Operations"],
  },
  {
    year: "2024–2025",
    title: "Blockchain & Web3 Exploration",
    description:
      "Deep dive into Solidity, Soroban, and Stellar. Built FlashBet Protocol at a hackathon. Started designing Tychee SDK — a Rust/Soroban developer toolkit for blockchain card tokenization.",
    tags: ["Web3", "Rust", "Soroban", "Hackathon"],
  },
  {
    year: "2025",
    title: "Finance + AI Systems Focus",
    description:
      "Building FinSight AI — a full-stack financial research assistant combining market data, technical indicators, and AI summaries. Simultaneously working on RL-based portfolio optimization research.",
    tags: ["FinTech", "AI/ML", "Full-Stack"],
    highlight: true,
  },
  {
    year: "2026 →",
    title: "Target: Summer 2027 Internships",
    description:
      "Preparing for software engineering, FinTech/AI, and Web3 internships at companies building serious systems. Every project, every commit, and every course is oriented toward this goal.",
    tags: ["Internships", "SWE", "FinTech", "Web3"],
    highlight: true,
  },
];
