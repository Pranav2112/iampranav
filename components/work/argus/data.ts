import type { FacilityId } from "@/lib/kyushu";

/*
 * From the public ARGUS repository (data/entities.json, data/edges.json, data/accounts.json).
 * Plant positions are city-level approximations. Every insured account is synthetic.
 */

export type Origin = "PUBLIC_VERIFIED" | "INFERRED" | "SYNTHETIC";

export type Plant = { id: FacilityId; name: string; short: string };

export const PLANTS: Plant[] = [
  { id: "aisin-kumamoto", name: "Aisin plant (Kumamoto)", short: "Aisin" },
  { id: "renesas-kawajiri", name: "Renesas Kawajiri plant", short: "Renesas" },
  { id: "toyota-kyushu-miyata", name: "Toyota Motor Kyushu Miyata plant", short: "Toyota Miyata" },
  { id: "tsmc-kumamoto", name: "TSMC Kumamoto fab (JASM, Kikuyo)", short: "TSMC" },
  { id: "sony-kumamoto", name: "Sony semiconductor plant (Kumamoto)", short: "Sony" },
  { id: "tel-kyushu", name: "Tokyo Electron factory (Kumamoto area)", short: "Tokyo Electron" },
  { id: "honda-kumamoto", name: "Honda motorcycle factory (Ozu, Kumamoto)", short: "Honda Ozu" },
  { id: "fcc-uki", name: "FCC clutch plant (Uki city)", short: "FCC" },
  { id: "giken-kogyo", name: "Giken Kogyo parts plant", short: "Giken Kogyo" },
  { id: "daihatsu-kyushu", name: "Daihatsu Kyushu factories (Oita, Kurume)", short: "Daihatsu" },
  { id: "nissan-kyushu", name: "Nissan Motor Kyushu (Kanda)", short: "Nissan" },
];

export type Edge = { from: FacilityId; to: string; label: string; origin: Origin; memory2016: boolean };

export const EDGES: Edge[] = [
  { from: "aisin-kumamoto", to: "Toyota Kyushu Miyata plant", label: "Aisin parts to Toyota", origin: "PUBLIC_VERIFIED", memory2016: true },
  { from: "renesas-kawajiri", to: "Toyota Kyushu Miyata plant", label: "Renesas ECU chips to Toyota", origin: "PUBLIC_VERIFIED", memory2016: true },
  { from: "aisin-kumamoto", to: "Nissan Motor Co.", label: "Aisin parts to Nissan", origin: "PUBLIC_VERIFIED", memory2016: false },
  { from: "aisin-kumamoto", to: "Mitsubishi Motors", label: "Aisin parts to Mitsubishi", origin: "PUBLIC_VERIFIED", memory2016: false },
  { from: "aisin-kumamoto", to: "Daihatsu Motor", label: "Aisin parts to Daihatsu", origin: "PUBLIC_VERIFIED", memory2016: false },
  { from: "fcc-uki", to: "Honda Motor", label: "FCC motorcycle clutches to Honda", origin: "PUBLIC_VERIFIED", memory2016: false },
  { from: "giken-kogyo", to: "Honda Motor", label: "Giken Kogyo (Honda-affiliated) parts", origin: "INFERRED", memory2016: false },
  { from: "aisin-kumamoto", to: "Lakeshore Drivetrain Supply", label: "Aisin transmission parts", origin: "SYNTHETIC", memory2016: true },
  { from: "renesas-kawajiri", to: "Voltaic Mobility", label: "Renesas microcontrollers", origin: "SYNTHETIC", memory2016: true },
  { from: "renesas-kawajiri", to: "Brightline Robotics", label: "Renesas microcontrollers", origin: "SYNTHETIC", memory2016: true },
  { from: "toyota-kyushu-miyata", to: "Harborline Auto Logistics", label: "Harborline ships Toyota Kyushu exports", origin: "SYNTHETIC", memory2016: true },
  { from: "tsmc-kumamoto", to: "Cascade Sensor Systems", label: "Automotive MCUs fabbed at TSMC Kumamoto", origin: "SYNTHETIC", memory2016: false },
  { from: "sony-kumamoto", to: "Northfield Imaging", label: "Sony image sensors", origin: "SYNTHETIC", memory2016: false },
  { from: "tel-kyushu", to: "Keystone Fab Services", label: "Tokyo Electron tool spares", origin: "SYNTHETIC", memory2016: false },
  { from: "fcc-uki", to: "Ridgeway Powersports", label: "FCC clutch packs", origin: "SYNTHETIC", memory2016: false },
  { from: "honda-kumamoto", to: "Lone Star Moto Distribution", label: "Kumamoto-built Honda motorcycles", origin: "SYNTHETIC", memory2016: false },
  { from: "daihatsu-kyushu", to: "Pacific Crest Auto Distributors", label: "Daihatsu vehicles from Kyushu", origin: "SYNTHETIC", memory2016: false },
];

export const ORIGIN_TEXT: Record<Origin, string> = {
  PUBLIC_VERIFIED: "Public, verified",
  INFERRED: "Inferred",
  SYNTHETIC: "Synthetic account",
};

export const COLORS = {
  bg: "#0b0e13",
  ink: "#d6dbe3",
  dim: "#8e98a8",
  accent: "#5aa9e6",
  review: "#e5484d",
};
