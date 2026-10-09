/*
 * Featured work. Every claim here is checked against the project's repository
 * (see the source comment on each entry). Status lines say what exists, not what is planned.
 */

export type WorkSlug = "atlas" | "netforge" | "mailguard" | "argus";

export type Work = {
  slug: WorkSlug;
  name: string;
  line: string;
  status: string;
  stack: string;
  code: string | null;
};

export const WORK: Record<WorkSlug, Work> = {
  // ~/atlas README (Phase 3 done, Phase 4 recurrence, Phase 5 engine stubs), private repo
  atlas: {
    slug: "atlas",
    name: "Atlas",
    line: "Personal finance software, built ledger-first.",
    status: "In development · private · not deployed",
    stack: "Next.js · FastAPI · PostgreSQL",
    code: null,
  },
  // ~/GitProjects/netforge README: "Status: Phase 0 (repository foundation). No network exists yet."
  netforge: {
    slug: "netforge",
    name: "NetForge",
    line: "A network lab for learning routing, failure and diagnosis by building the environment myself.",
    status: "Phase 0 built · topology and experiments planned",
    stack: "Python · Linux · Colima · FRRouting (planned)",
    code: "https://github.com/Pranav2112/netforge",
  },
  // ~/GitProjects/mailguard-ai README + docs/adr; private repo
  mailguard: {
    slug: "mailguard",
    name: "MailGuard",
    line: "Rule-first email triage: deterministic rules decide when a model call is unnecessary.",
    status: "Built · not deployed · private",
    stack: "FastAPI · PostgreSQL · Next.js · Gmail API",
    code: null,
  },
  // ~/GitProjects/argus README: "Hackathon prototype for contingent business interruption"
  argus: {
    slug: "argus",
    name: "ARGUS",
    line: "A hackathon prototype tracing how an earthquake travels through supplier relationships.",
    status: "Hackathon prototype · 2026",
    stack: "Next.js · TypeScript · USGS feed · LLM extraction",
    code: "https://github.com/Pranav2112/argus",
  },
};

export const WORK_ORDER: WorkSlug[] = ["atlas", "netforge", "mailguard", "argus"];

export function nextWork(slug: WorkSlug): Work {
  const i = WORK_ORDER.indexOf(slug);
  return WORK[WORK_ORDER[(i + 1) % WORK_ORDER.length]];
}
