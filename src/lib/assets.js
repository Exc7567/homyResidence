// Prefix root-relative paths with the Vite base (supports hosting under a sub-path, e.g. /REPO/).
// Data files keep root-relative paths; apply asset() only inside components.
export const asset = (p) => (p && p.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p);
