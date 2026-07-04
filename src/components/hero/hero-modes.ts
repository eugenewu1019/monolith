export type HeroMode = "structure" | "texture" | "time";

export const HERO_MODES: Array<{
  id: HeroMode;
  index: string;
  label: string;
  zhLabel: string;
  detail: string;
  zhDetail: string;
  exhibit: string;
  zhExhibit: string;
  accent: string;
  glow: string;
}> = [
  {
    id: "structure",
    index: "01",
    label: "Structure",
    zhLabel: "結構",
    detail: "Load-bearing crust",
    zhDetail: "承重塔殼",
    exhibit:
      "A suspended crust system holds the glaze like geological pressure.",
    zhExhibit: "懸浮塔殼承接釉面，如地層壓力凝結成可食用的建築。",
    accent: "#c59a63",
    glow: "rgba(197,154,99,0.26)",
  },
  {
    id: "texture",
    index: "02",
    label: "Texture",
    zhLabel: "質地",
    detail: "Mineral glaze",
    zhDetail: "礦物釉面",
    exhibit:
      "Fine sugar crystals, smoke, and cacao dust surface under the scan.",
    zhExhibit: "細糖晶、煙燻氣息與可可粉塵在掃描光下浮出表面。",
    accent: "#8d9a75",
    glow: "rgba(141,154,117,0.24)",
  },
  {
    id: "time",
    index: "03",
    label: "Time",
    zhLabel: "時間",
    detail: "Ephemeral collapse",
    zhDetail: "短暫崩解",
    exhibit:
      "Orbit lines slow down, then fracture into a quiet tasting sequence.",
    zhExhibit: "軌道放慢後裂解，成為一段安靜而短暫的品嚐序列。",
    accent: "#9b704a",
    glow: "rgba(155,112,74,0.25)",
  },
];

export function getHeroMode(mode: HeroMode) {
  return HERO_MODES.find((item) => item.id === mode) ?? HERO_MODES[0];
}
