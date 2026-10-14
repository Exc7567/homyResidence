// Prefix root-relative paths with the Vite base (supports https://USER.github.io/REPO/).
// Data files keep root-relative paths; apply asset() only inside components.
export const asset = (p) => (p && p.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p);
