/**
 * Turns an Open Food Facts hierarchy tag into a readable label.
 * Example: "en:whole-wheat-flour" -> "whole wheat flour".
 */
export function formatTag(tag) {
  return String(tag ?? "")
    .replace(/^\w+:/, "")
    .replace(/-/g, " ")
    .trim();
}

/**
 * Formats a list of hierarchy tags into one readable sentence.
 */
export function formatTagList(values = []) {
  return values.map(formatTag).filter(Boolean).join(", ");
}

/**
 * Formats a Nutri-Score / Eco-Score grade for display.
 */
export function formatGrade(grade) {
  const value = String(grade ?? "").trim();
  return value ? value.toUpperCase() : "";
}

/**
 * Returns a numeric nutriment value, or null when it is missing.
 */
export function nutrientValue(nutriments = {}, key) {
  const value = nutriments?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
