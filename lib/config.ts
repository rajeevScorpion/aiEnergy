export const config = {
  energyPer1kTokens: parseFloat(process.env.ENERGY_PER_1K_TOKENS || "0.002"),
  showEnergyResponse: process.env.SHOW_ENERGY_RESPONSE !== "false",
  showEnergyThread: process.env.SHOW_ENERGY_THREAD !== "false",
  showEnergyDashboard: process.env.SHOW_ENERGY_DASHBOARD !== "false",
  energyMode: (process.env.ENERGY_MODE || "both") as "numeric" | "equivalent" | "both",

  // Session / interaction extensions
  chatMode: (process.env.NEXT_PUBLIC_CHAT_MODE || "AWARENESS") as "AWARENESS" | "GUIDED",
  enableSessionTracking: process.env.ENABLE_SESSION_TRACKING !== "false",
  enablePromptValidation: process.env.ENABLE_PROMPT_VALIDATION !== "false",
  enablePromptEnhancement: process.env.ENABLE_PROMPT_ENHANCEMENT !== "false",
};

export function calculateEnergy(tokensUsed: number): number {
  return (tokensUsed / 1000) * config.energyPer1kTokens;
}

export function formatEnergy(energyKwh: number, mode: typeof config.energyMode = config.energyMode): string {
  const numeric = `⚡ ${energyKwh.toFixed(4)} kWh`;
  const minutes = Math.round(energyKwh / 0.000017); // ~0.000017 kWh to charge phone 1 min
  const equivalent =
    minutes < 1
      ? "< 1 min phone charge"
      : minutes < 60
      ? `≈ ${minutes} min phone charge`
      : `≈ ${(minutes / 60).toFixed(1)}h phone charge`;

  if (mode === "numeric") return numeric;
  if (mode === "equivalent") return equivalent;
  return `${numeric} · ${equivalent}`;
}
