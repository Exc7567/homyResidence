// Brand-level content. Edit text here; no component changes needed.
// Any value starting with "[ISI:" is a placeholder (see README / `npm run check:placeholders`).

export const BRAND = {
  name: 'Homy Residence',
  tagline: '[ISI: tagline utama, contoh: "Hunian nyaman untuk mahasiswa & profesional"]',
  heroSubtitle:
    '[ISI: 1-2 kalimat pengantar di hero. Contoh: "Pilih kost Homy yang paling cocok untukmu. Tanya ketersediaan langsung via WhatsApp."]',
  blurb: '[ISI: 1-2 kalimat tentang Homy untuk footer]',
  // heroStats: undefined,  // optional: [{ value: '...', label: '...' }]; leave undefined to hide (never invent numbers)
  domain: 'homyresidence.id',
  whatsappNumber: '6281311654066',         // digits only, international format, no plus sign
  whatsappDisplay: '+62 813-1165-4066',
  email: '[ISI: email kontak (opsional)]',
  address: '[ISI: alamat kantor / pemasaran (opsional)]',
  social: {
    instagram: '[ISI: URL Instagram]',
    tiktok: '[ISI: URL TikTok (opsional)]',
    facebook: '[ISI: URL Facebook (opsional)]',
  },
  logo: null, // later: '/images/brand/logo.svg'
  ogImage: '/images/brand/og-default.jpg', // placeholder file must exist (see file 08)
  // Homepage hero photo (desktop). Later: { src: '/images/brand/hero.jpg', alt: '...' }
  heroImage: { src: null, alt: 'Foto hunian Homy Residence (placeholder)', label: 'Hero Homy Residence' },
};

export const SHARED_FACILITY_IDS = ['ac', 'wifi', 'electricity_token'];

// Each note is rendered in exactly one place per page (UPDATE-01 §8).
export const NOTES = {
  depositTemplate: (amount) =>
    `Deposit di awal sebesar ${amount}. Detail ketentuan dikonfirmasi melalui WhatsApp.`,
};
