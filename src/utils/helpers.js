export function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function normalizeRaceNumber(value) {
  return String(value || "").trim();
}
