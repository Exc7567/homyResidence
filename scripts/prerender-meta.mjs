// Runs after `vite build`. Writes one HTML file per route with its own <title>,
// description, canonical, Open Graph and Twitter tags, so link previews (WhatsApp,
// Instagram, Facebook) and direct loads work on static GitHub Pages.
// Also regenerates sitemap.xml and robots.txt from the data (villa excluded until open).
import fs from 'node:fs';
import path from 'node:path';
import { KOST_TYPES, PROPERTIES } from '../src/data/properties.js';
import { BRAND } from '../src/data/brand.js';

const SITE = (process.env.SITE_URL || `https://${BRAND.domain}`).replace(/\/$/, '');
const dist = path.resolve('dist');
const pub = path.resolve('public');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const rp = (n) => 'Rp' + n.toLocaleString('id-ID');
const hasPh = (s) => String(s).includes('[ISI:');

const GENERIC_DESC =
  'Homy Residence: kost bulanan untuk mahasiswa dan profesional. Lihat tipe kamar, fasilitas dan lokasi, lalu booking via WhatsApp.';
const DEFAULT_IMAGE = `${SITE}${BRAND.ogImage}`;

function withMeta(html, { title, description, url, image, jsonLd }) {
  const desc = hasPh(description) ? GENERIC_DESC : description; // never leak [ISI: ...] into meta
  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
  if (jsonLd) {
    const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    out = out.replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return out;
}

const open = PROPERTIES.filter((p) => p.status === 'open').sort((a, b) => a.order - b.order);

// Homepage (rewrite so canonical/og use SITE_URL, e.g. the github.io URL before the domain exists).
const homeHtml = withMeta(template, {
  title: `${BRAND.name} | Kost & Villa`,
  description: GENERIC_DESC,
  url: `${SITE}/`,
  image: DEFAULT_IMAGE,
});
fs.writeFileSync(path.join(dist, 'index.html'), homeHtml);

for (const p of open) {
  const from = Math.min(...p.roomTypes.map((r) => r.price));
  const url = `${SITE}/${p.slug}`;
  const ogRel = `/images/${p.slug}/og.jpg`;
  const image = fs.existsSync(path.join(pub, ogRel)) ? `${SITE}${ogRel}` : DEFAULT_IMAGE;
  const html = withMeta(template, {
    title: `${p.name} | ${BRAND.name}`,
    // e.g. "Homy Residence H14: Kost Putri bulanan mulai Rp1.700.000/bulan. ..."
    description: `${p.name}: ${KOST_TYPES[p.kostType]?.label ?? 'kost'} bulanan mulai ${rp(from)}/bulan. Lihat tipe kamar, fasilitas, lokasi dan chat WhatsApp untuk booking.`,
    url,
    image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: p.name, item: url },
      ],
    },
  });
  fs.mkdirSync(path.join(dist, p.slug), { recursive: true });
  fs.writeFileSync(path.join(dist, p.slug, 'index.html'), html);
}

// GitHub Pages fallback for unknown paths: SPA shell with a neutral title.
fs.writeFileSync(
  path.join(dist, '404.html'),
  withMeta(template, { title: BRAND.name, description: GENERIC_DESC, url: `${SITE}/`, image: DEFAULT_IMAGE }),
);

// sitemap.xml + robots.txt driven by data and SITE_URL.
const urls = ['/', ...open.map((p) => `/${p.slug}`)];
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Prerendered meta for ${open.length} properties (SITE_URL=${SITE})`);
