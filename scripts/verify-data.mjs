// Checks src/data against the owner's sources (UPDATE-01): room totals, Fanta only in Deluxe,
// and every POI route URL identical to update-md/homy-properties-poi.md. Usage: npm run verify:data
import fs from 'node:fs';
import { PROPERTIES } from '../src/data/properties.js';

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
const a7 = PROPERTIES.find((p) => p.slug === 'a7').pois.find((x) => x.id === 'uph-college');
if (a7.routeUrl !== 'https://www.google.com/maps/dir/?api=1&origin=-6.228501,106.586875&destination=-6.228131,106.611514&travelmode=two-wheeler') fail('A7 → UPH College example URL');

for (const p of PROPERTIES.filter((x) => x.status === 'open')) {
  console.log(`${p.slug.padEnd(12)} ${p.totalRooms} kamar | ${p.roomTypes.map((r) => `${r.name} ${r.units} [${r.rooms ?? 'Semua'}]`).join(' · ')}`);
  console.log(`             ${p.pois.map((x) => `${x.category}:${x.name} ${x.minutes}`).join(' | ')}`);
}
if (errors) { console.error(`\n${errors} problem(s)`); process.exit(1); }
console.log('\nAll data checks passed.');
