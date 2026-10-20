export type Theme = {
  id: string;
  name: string;
  bg: string;
  bgWarm: string;
  accent: string;
  hill: string;
  hillText: string;
  btn: string;
  glow: string;
};

export const THEMES: Theme[] = [
    {
    id: "cosmic-sapphire",
    name: "Cosmic Sapphire",
    bg: "#050e1d",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(59, 130, 246, 0.45), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(147, 51, 234, 0.2), transparent 50%), #050e1d",
    accent: "#38bdf8",
    hill: "#3b82f6",
    hillText: "#ffffff",
    btn: "#2563eb",
    glow: "rgba(56, 189, 248, 0.2)",
  },
  {
    id: "warm-amber",
    name: "Warm Amber",
    bg: "#160e08",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(217, 119, 6, 0.45), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(251, 191, 36, 0.2), transparent 50%), #160e08",
    accent: "#fbbf24",
    hill: "#f59e0b",
    hillText: "#1c1004",
    btn: "#d97706",
    glow: "rgba(251, 191, 36, 0.2)",
  },
  {
    id: "obsidian",
    name: "Obsidian Void",
    bg: "#0c0c0d",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(92, 58, 32, 0.5), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(40, 30, 20, 0.25), transparent 50%), #0c0c0d",
    accent: "#2de2a8",
    hill: "#c084fc",
    hillText: "#161616",
    btn: "#a855f7",
    glow: "rgba(45, 226, 168, 0.15)",
  },
  {
    id: "cyber-violet",
    name: "Cyber Violet",
    bg: "#10061e",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(168, 85, 247, 0.45), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(236, 72, 153, 0.25), transparent 50%), #10061e",
    accent: "#d8b4fe",
    hill: "#a855f7",
    hillText: "#ffffff",
    btn: "#ec4899",
    glow: "rgba(216, 180, 254, 0.2)",
  },
  {
    id: "matrix-emerald",
    name: "Matrix Emerald",
    bg: "#03140e",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(16, 185, 129, 0.45), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(52, 211, 153, 0.2), transparent 50%), #03140e",
    accent: "#34d399",
    hill: "#10b981",
    hillText: "#022c22",
    btn: "#059669",
    glow: "rgba(52, 211, 153, 0.2)",
  },
  {
    id: "velvet-ruby",
    name: "Velvet Ruby",
    bg: "#170509",
    bgWarm:
      "radial-gradient(ellipse 70% 55% at 92% -10%, rgba(244, 63, 94, 0.45), transparent 58%), radial-gradient(ellipse 40% 40% at 10% 0%, rgba(251, 113, 133, 0.2), transparent 50%), #170509",
    accent: "#fb7185",
    hill: "#f43f5e",
    hillText: "#ffffff",
    btn: "#e11d48",
    glow: "rgba(251, 113, 133, 0.2)",
  },
];
