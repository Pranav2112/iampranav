/* NetForge docs/networking.md, "Topology v1". All of it is planned; Phase 0 built none of it. */

export type RouterId = "R1" | "R2" | "R3" | "R4";

export const ROUTERS: Record<
  RouterId,
  { x: number; y: number; asn: number; loopback: string; lan: string; host: string; hostAddr: string }
> = {
  R1: { x: 130, y: 120, asn: 65001, loopback: "10.255.0.1/32", lan: "10.1.0.0/24", host: "H1", hostAddr: "10.1.0.10" },
  R2: { x: 470, y: 120, asn: 65002, loopback: "10.255.0.2/32", lan: "10.2.0.0/24", host: "H2", hostAddr: "10.2.0.10" },
  R3: { x: 130, y: 320, asn: 65003, loopback: "10.255.0.3/32", lan: "10.3.0.0/24", host: "H3", hostAddr: "10.3.0.10" },
  R4: { x: 470, y: 320, asn: 65004, loopback: "10.255.0.4/32", lan: "10.4.0.0/24", host: "H4", hostAddr: "10.4.0.10" },
};

export type LinkId = "R1-R2" | "R1-R3" | "R2-R3" | "R2-R4" | "R3-R4";

export const LINKS: { id: LinkId; a: RouterId; b: RouterId; subnet: string }[] = [
  { id: "R1-R2", a: "R1", b: "R2", subnet: "10.0.12.0/31" },
  { id: "R1-R3", a: "R1", b: "R3", subnet: "10.0.13.0/31" },
  { id: "R2-R3", a: "R2", b: "R3", subnet: "10.0.23.0/31" },
  { id: "R2-R4", a: "R2", b: "R4", subnet: "10.0.24.0/31" },
  { id: "R3-R4", a: "R3", b: "R4", subnet: "10.0.34.0/31" },
];

export const VIEW = { w: 600, h: 440 };

export const hostPoint = (r: RouterId) => {
  const p = ROUTERS[r];
  return { x: p.x, y: p.y < 200 ? p.y - 82 : p.y + 82 };
};

export const linksOf = (r: RouterId) => LINKS.filter((l) => l.a === r || l.b === r);

/** /31 addressing: the lower-numbered router takes .0, the higher .1. */
export const addressOn = (link: (typeof LINKS)[number], r: RouterId) =>
  link.subnet.replace(/\.0\/31$/, r === link.a ? ".0" : ".1");

export const PHASES = [
  { n: 0, scope: "Repository foundation, tooling, CI, lab VM", done: true },
  { n: 1, scope: "Container topology" },
  { n: 2, scope: "Addressing, static routing, troubleshooting" },
  { n: 3, scope: "FRRouting integration" },
  { n: 4, scope: "eBGP topology and route propagation" },
  { n: 5, scope: "Python CLI and intent model" },
  { n: 6, scope: "Monitoring and state collection" },
  { n: 7, scope: "Failure injection" },
  { n: 8, scope: "Convergence measurement, BFD" },
  { n: 9, scope: "Diagnosis and packet analysis" },
  { n: 10, scope: "Configuration validation and rollback" },
  { n: 11, scope: "Transit AS with IS-IS and iBGP, if justified" },
  { n: 12, scope: "Benchmarks and final documentation" },
];
