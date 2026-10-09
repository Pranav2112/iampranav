/* From Pranav's current résumé (October 2026). Kept deliberately short; the résumé has the rest. */

export type Role = {
  title: string;
  org: string;
  place: string;
  dates: string;
  summary: string;
};

export const EXPERIENCE: Role[] = [
  {
    title: "Graduate Assistant, Undergraduate Admissions",
    org: "Stevens Institute of Technology",
    place: "Hoboken, NJ",
    dates: "Mar 2026 – present",
    summary:
      "Verify applicant records in Slate and reconcile active student records across Slate and Workday, tracking down where the two systems disagree.",
  },
  {
    title: "Software Developer Intern",
    org: "Skopus AI",
    place: "Remote",
    dates: "Jul 2025 – Jan 2026",
    summary:
      "Built candidate- and enterprise-facing features in Next.js, TypeScript and Supabase, and debugged production issues across authentication, APIs and Vercel deployments.",
  },
  {
    title: "Founder and lead full-stack developer",
    org: "CodeMonkeys",
    place: "India",
    dates: "Mar 2024 – Dec 2025",
    summary:
      "Led a six-person team building client web applications: Node.js and Express APIs, MongoDB schemas, React front ends, deployment and post-launch support.",
  },
];

export const EDUCATION = [
  {
    degree: "MS, Computer Science",
    school: "Stevens Institute of Technology",
    dates: "Expected Dec 2027",
  },
  {
    degree: "BE, Computer Science",
    school: "Terna Engineering College, University of Mumbai",
    dates: "2021 – 2025",
  },
];
