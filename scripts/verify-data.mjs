// Checks src/data against the owner's sources (UPDATE-01, UPDATE-03): room totals, Fanta only in Deluxe,
// and every POI route URL identical to update-md/homy-properties-poi.md. Usage: npm run verify:data
import fs from 'node:fs';
import { PROPERTIES } from '../src/data/properties.js';
import { houseRulesFor } from '../src/data/houseRules.js';
import { scanRoomVideos } from './room-videos.mjs';

let errors = 0;
const fail = (m) => { errors += 1; console.error('✗ ' + m); };

for (const p of PROPERTIES.filter((x) => x.status === 'open')) {
  const sum = p.roomTypes.reduce((n, r) => n + r.units, 0);
  if (sum !== p.totalRooms) fail(`${p.slug}: rooms add up to ${sum}, totalRooms is ${p.totalRooms}`);
  for (const r of p.roomTypes) {
    if (/Fanta/.test(r.rooms || '') && r.id !== 'deluxe') fail(`${p.slug}: Fanta outside Deluxe`);
  }
}

const src = 'update-md/homy-properties-poi.md';
if (fs.existsSync(src)) {
  const md = fs.readFileSync(src, 'utf8');
  const sections = md.split(/\n## \d+\. /).slice(1);
  const slugOf = { 'Homy Residence H14': 'h14', 'Homy Permata A7': 'a7', 'Homy Budget Alamanda': 'alamanda', 'Homy Parahyangan': 'parahyangan' };
  let checked = 0;
  for (const sec of sections) {
    const title = Object.keys(slugOf).find((t) => sec.startsWith(t));
    const p = PROPERTIES.find((x) => x.slug === slugOf[title]);
    const rows = [...sec.matchAll(/^\| (.+?) \| 🏍️ ~(\d+) min \| \[Route\]\((.+?)\) \|$/gm)];
    if (rows.length !== p.pois.length) fail(`${p.slug}: ${rows.length} POIs in source, ${p.pois.length} on site`);
    for (const [, name, min, url] of rows) {
      const poi = p.pois.find((x) => x.name === name);
      if (!poi) { fail(`${p.slug}: missing POI "${name}"`); continue; }
      if (poi.minutes !== Number(min)) fail(`${p.slug}: ${name} minutes ${poi.minutes} ≠ ${min}`);
      if (poi.routeUrl !== url) fail(`${p.slug}: ${name} route URL differs\n   site: ${poi.routeUrl}\n   src:  ${url}`);
      checked += 1;
    }
  }
  console.log(`Route URLs checked: ${checked}`);
}
// Update 03: owner-confirmed kost type and exact address of each kost.
const UPDATE_03 = {
  h14: ['putri', 'Jl. Rungkut Mejoyo Selatan IX No 15 Blok H14, Kali Rungkut, Kec. Rungkut, Surabaya, Jawa Timur 60293'],
  alamanda: ['putri', 'Jl. Alamanda IV Blok J.3 No.13, RT.7/RW.7, Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810'],
  parahyangan: ['campur', 'Jl. Taman Parahyangan I No.88, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810'],
  a7: ['campur', 'Jl. Permata Sari sektor 5 Blok A7 No.33, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810'],
};
for (const [slug, [type, address]] of Object.entries(UPDATE_03)) {
  const p = PROPERTIES.find((x) => x.slug === slug);
  if (p.kostType !== type) fail(`${slug}: kostType "${p.kostType}" ≠ "${type}"`);
  if (p.address !== address) fail(`${slug}: address differs from the owner's text`);
}

const a7 = PROPERTIES.find((p) => p.slug === 'a7').pois.find((x) => x.id === 'uph-college');
if (a7.routeUrl !== 'https://www.google.com/maps/dir/?api=1&origin=-6.228501,106.586875&destination=-6.228131,106.611514&travelmode=two-wheeler') fail('A7 → UPH College example URL');

// Update 06: room letters written out (no ranges), Tata Tertib totals per property.
for (const p of PROPERTIES.filter((x) => x.status === 'open')) {
  for (const r of p.roomTypes) if (/[–-]/.test(r.rooms || '')) fail(`${p.slug} ${r.name}: room range "${r.rooms}" (write every letter)`);
}
const RULE_TOTALS = { a7: 23, h14: 24, parahyangan: 24, alamanda: 22 };
for (const [slug, n] of Object.entries(RULE_TOTALS)) {
  if (houseRulesFor(slug).length !== n) fail(`${slug}: ${houseRulesFor(slug).length} Tata Tertib rules, expected ${n}`);
}

// Room videos (public/property-videos/, scripts/room-videos.mjs): each one must match an open property's room type.
const { videos, warnings } = scanRoomVideos();
for (const w of warnings) console.warn('! video: ' + w);
for (const [prop, rooms] of Object.entries(videos)) {
  const p = PROPERTIES.find((x) => x.slug.toLowerCase() === prop && x.status === 'open');
  for (const [room, v] of Object.entries(rooms)) {
    const r = p?.roomTypes.find((x) => x.id.toLowerCase() === room || x.name.toLowerCase() === room);
    if (r) console.log(`video ${p.slug}/${r.id}: ${v.file} (${v.mb.toFixed(1)} MB)`);
    else fail(`video ${v.file}: no matching ${p ? 'room type' : 'property'} (folder names must be the property slug and the room type)`);
  }
}

for (const p of PROPERTIES.filter((x) => x.status === 'open')) {
  console.log(`${p.slug.padEnd(12)} ${p.kostType} | ${p.totalRooms} kamar | ${p.roomTypes.map((r) => `${r.name} ${r.units} [${r.rooms ?? 'Semua'}]`).join(' · ')}`);
  console.log(`             ${p.pois.map((x) => `${x.category}:${x.name} ${x.minutes}`).join(' | ')}`);
}
if (errors) { console.error(`\n${errors} problem(s)`); process.exit(1); }
console.log('\nAll data checks passed.');
