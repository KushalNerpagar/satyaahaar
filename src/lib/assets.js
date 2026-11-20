/**
 * Resolves a file inside `public/assets/home` for the current base URL.
 * Keeps every asset reference working on GitHub Pages and in dev.
 */
export function homeAsset(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return encodeURI(`${base}/assets/home/${path}`);
}
