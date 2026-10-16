// Brand-level content. Edit text here; no component changes needed.
// Any value starting with "[ISI:" is a placeholder (see README / `npm run check:placeholders`).

export const BRAND = {
  name: 'Homy Residence',
  // Hero subtitle, shown under the big "HOMY RESIDENCE" headline.
  tagline: '[ISI: tagline utama, contoh: "Hunian nyaman untuk mahasiswa & profesional"]',
  domain: 'homyresidence.id',
  whatsappNumber: '6281311654066',         // digits only, international format, no plus sign
  logo: null, // later: '/images/brand/logo.svg' (replaces the text logo everywhere)
  ogImage: '/images/brand/og-default.jpg', // placeholder file must exist (see file 08)
  // Homepage hero: five tall photos on a curve, left to right (decorative, not links).
  // Put the files in public/images/brand/ (portrait, about 600×860, ≤ 250 KB) and set src, e.g.
  //   { src: '/images/brand/hero-1.jpg', alt: 'Kamar Homy Permata A7' }
  heroPhotos: [
    { src: null, alt: 'Foto hero 1 (placeholder)', label: 'Hero 1' },
    { src: null, alt: 'Foto hero 2 (placeholder)', label: 'Hero 2' },
    { src: null, alt: 'Foto hero 3 (placeholder)', label: 'Hero 3' },
    { src: null, alt: 'Foto hero 4 (placeholder)', label: 'Hero 4' },
    { src: null, alt: 'Foto hero 5 (placeholder)', label: 'Hero 5' },
  ],
};

export const SHARED_FACILITY_IDS = ['ac', 'wifi', 'electricity_token'];

// Each note is rendered in exactly one place per page (UPDATE-01 §8).
export const NOTES = {
  depositTemplate: (amount) =>
    `Deposit di awal sebesar ${amount}. Detail ketentuan dikonfirmasi melalui WhatsApp.`,
};
