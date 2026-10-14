// House rules / policies, all shown in the detail page's Tata Tertib section
// (together with "Tentang Hunian" = property.description and the deposit = property.deposit).
// Edit DEFAULT_HOUSE_INFO for all properties, or override per property in HOUSE_INFO_BY_SLUG,
// e.g. a7: { smoking: 'Dilarang merokok di dalam kamar' }.

export const DEFAULT_HOUSE_INFO = {
  occupantPolicy: '[ISI: penghuni putra / putri / campur, contoh: "Kost campur dengan lantai terpisah"]',
  additionalOccupants: '[ISI: aturan tambahan penghuni, contoh: "Tambahan penghuni tidak diperbolehkan"]',
  checkInOut: '[ISI: jam check-in dan check-out, contoh: "Check-in 08.00-20.00, check-out maks 12.00"]',
  minimumStay: '[ISI: minimal masa sewa, contoh: "Minimal 1 bulan"]',
  cancellation: '[ISI: kebijakan pembatalan / pengembalian deposit]',
  access24h: '[ISI: akses 24 jam? kunci/kode/security]',
  overnightGuests: '[ISI: aturan tamu menginap]',
  visitors: '[ISI: aturan bertamu, jam malam, tamu lawan jenis]',
  smoking: '[ISI: aturan merokok]',
  pets: '[ISI: aturan hewan peliharaan]',
  extraRules: '[ISI: aturan tambahan lain (opsional)]',
};

export const HOUSE_INFO_BY_SLUG = {
  a7: {}, h14: {}, parahyangan: {}, alamanda: {}, // spread over DEFAULT_HOUSE_INFO; owner overrides per property
};

export const getHouseInfo = (slug) => ({ ...DEFAULT_HOUSE_INFO, ...(HOUSE_INFO_BY_SLUG[slug] || {}) });
