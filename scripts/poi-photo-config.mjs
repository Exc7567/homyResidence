// POI photo settings for scripts/process-poi-photos.mjs (edit here, then run `npm run poi:photos`).
//
// aliases: file/folder name fragments that identify the POI (lowercase, letters/digits only).
//          The longest matching alias wins, so "uphcollege" beats "uph" and "rsubaya" beats "ubaya".
// focus:   where the subject sits in the ORIGINAL photo, as fractions (x: 0 = left, 1 = right;
//          y: 0 = top, 1 = bottom). The 4:3 crop is centred on this point as far as possible.
//          Omit it to use the default (centre; slightly higher for portrait photos).
export const POI_PHOTO_CONFIG = {
  'ubaya':                    { aliases: ['ubaya', 'universitassurabaya'] },
  'transmart-rungkut':        { aliases: ['transmart'] },
  'plasa-marina':             { aliases: ['plasamarina'] },
  'trans-icon-mall':          { aliases: ['transicon'] },
  'alfamidi-rungkut':         { aliases: ['alfamidi'] },
  'indomaret-raya-tenggilis': { aliases: ['indomaretrayatenggilis', 'indomaretrayatengglis'], focus: { y: 0.52 } }, // signboard + storefront
  'palapa-swalayan':          { aliases: ['palapa'], focus: { y: 0.45 } }, // diagonal signboard
  'chicco-swalayan':          { aliases: ['chicco'] },
  'ubaya-medical-center':     { aliases: ['ubayamedical', 'ubayamedicalcenter'] },
  'rs-ubaya':                 { aliases: ['rsubaya'] },
  'pramita':                  { aliases: ['pramita', 'universitaspramita'] },
  'uph-college':              { aliases: ['uphcollege'] },
  'uph':                      { aliases: ['uph', 'universitaspelitaharapan', 'pelitaharapan'], focus: { y: 0.7 } }, // campus sign sits low
  'supermal-karawaci':        { aliases: ['supermal', 'supermall'] },
  'maxxbox-lippo-village':    { aliases: ['maxxbox'] },
  'indomaret-taman-permata':  { aliases: ['indomarettamanpermata', 'indomarettaman', 'indotaman'] },
  'alfamart-permata-raya':    { aliases: ['alfamartpermataraya', 'alfamartpermata', 'alfapermata'] },
  'indomaret-harapan-kita':   { aliases: ['indomaretharapankita', 'indomaretharapan', 'indoharapan'] },
  'siloam-lippo-village':     { aliases: ['siloam'] },
};

export const OUTPUT = {
  dir: 'public/images/poi',
  sizes: [
    { suffix: '', width: 800, height: 600, quality: 78 },   // cards (≥768px) and default src
    { suffix: '-sm', width: 400, height: 300, quality: 72 }, // mobile list thumbnails
  ],
};
