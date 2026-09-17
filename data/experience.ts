export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "full-time" | "part-time" | "freelance" | "contract";
  description: string;
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: "Graduate Assistant — Undergraduate Admissions",
    company: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    period: "2024 – Present",
    type: "part-time",
    description:
      "Operating inside the admissions office at a top-25 engineering school, handling student-facing operations, inquiry coordination, and cross-departmental communication — while completing a full graduate course load in Computer Science.",
    highlights: [
      "Student-facing support across inquiry, application, and enrollment stages",
      "Cross-functional coordination with academic departments and university offices",
      "Data handling and record management within university systems",
      "Representing Stevens to prospective students and international applicants",
    ],
    tags: ["Communication", "Operations", "University Systems", "Coordination"],
  },
  {
    role: "Freelance Web Developer",
    company: "Independent",
    location: "Remote",
    period: "2023 – 2024",
    type: "freelance",
    description:
      "Delivered production web applications for clients — including a full-stack event ticketing platform with real users, booking flows, payment processing, and AWS-backed infrastructure. Client-facing from requirements through deployment.",
    highlights: [
      "Scoped, designed, and delivered a ticketing platform with real business users",
      "Built responsive UI, booking engine, QR ticket system, and Stripe payment flow",
      "AWS S3 and Lambda integration for storage and event-driven notifications",
      "Handled client communication, revision cycles, and production deployment",
    ],
    tags: ["Next.js", "AWS", "Client Delivery", "Product", "Full-Stack"],
  },
  {
    role: "Blockchain Developer",
    company: "Tychee SDK / Independent",
    location: "Remote",
    period: "2024 – Present",
    type: "contract",
    description:
      "Designing and building a Web3 SDK for blockchain-based card tokenization on Stellar Soroban. Work spans Rust smart contracts, cryptographic design, and a TypeScript SDK layer for developer consumption.",
    highlights: [
      "Soroban smart contract development in Rust on Stellar testnet",
      "AES-256-GCM encryption design for secure card data handling",
      "TypeScript SDK interface for JS/TS developer consumption",
      "Account abstraction patterns for improving wallet UX",
    ],
    tags: ["Rust", "Soroban", "Stellar", "TypeScript", "Cryptography", "Web3"],
  },
];
