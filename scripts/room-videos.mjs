// Room videos (Update 06). Scans public/property-videos/ at build time (and on every change in `npm run dev`)
// and hands the result to the site as the module 'virtual:room-videos'. GitHub Pages cannot list folders,
// so a new video shows up after the next build, with no code change.
//
// Accepted layouts (folder and file names are matched case-insensitively):
//   property-videos/<property>/<room type>.mp4           e.g. A7/Deluxe.mp4
//   property-videos/<property>/<room type>/<any>.mp4     e.g. A7/DELUXE/deluxe.mp4 (first .mp4 by name)
// <property> = the property slug (a7, h14, parahyangan, alamanda); <room type> = the room id or name
// (standard, superior, deluxe, executive, small). Only .mp4 is used; other video formats are reported.
import fs from 'node:fs';
import path from 'node:path';

export const VIDEO_DIR = 'property-videos';
const IGNORED = /^(\.ds_store|thumbs\.db|desktop\.ini|readme(\.md|\.txt)?)$/i;
const OTHER_VIDEO = /\.(mov|m4v|webm|avi|mkv|wmv|3gp|hevc)$/i;
const WARN_MB = 50;
const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

// H.264 header (avcC) of an mp4: lists stored SPS/PPS whose first byte is repeated ("67 67 …" / "68 68 …").
// Those files stop after a few frames in Chrome/Edge with hardware decoding (fix: npm run video:fix).
// → { box: start of the avcC box, duplicates: [{ lengthAt, byteAt }] } or null.
export function findAvcC(buf) {
  const box = buf.indexOf('avcC') - 4;
  if (box < 0) return null;
  const duplicates = [];
  let p = box + 13; // size, 'avcC', version, profile, compatibility, level, length size → number of SPS
  const check = (header) => {
    const len = buf.readUInt16BE(p);
    if (buf[p + 2] === header && buf[p + 3] === header) duplicates.push({ lengthAt: p, byteAt: p + 3 });
    p += 2 + len;
  };
  const sps = buf[p++] & 0x1f;
  for (let i = 0; i < sps; i++) check(0x67);
  const pps = buf[p++];
  for (let i = 0; i < pps; i++) check(0x68);
  return { box, duplicates };
}
// The header sits in the first part of the file when moov comes first; otherwise the whole file is read.
const brokenHeader = (file) => {
  const fd = fs.openSync(file, 'r');
  const head = Buffer.alloc(Math.min(fs.fstatSync(fd).size, 4 * 1024 * 1024));
  fs.readSync(fd, head, 0, head.length, 0);
  fs.closeSync(fd);
  const info = head.includes('avcC') ? findAvcC(head) : findAvcC(fs.readFileSync(file));
  return Boolean(info?.duplicates.length);
};

const sorted = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => !IGNORED.test(d.name))
    .sort((a, b) => natural.compare(a.name, b.name));

// → { videos: { [propertyKey]: { [roomKey]: { url, file, mb } } }, warnings: [] } (keys in lower case)
export function scanRoomVideos(publicDir = 'public') {
  const root = path.join(publicDir, VIDEO_DIR);
  const videos = {};
  const warnings = [];
  if (!fs.existsSync(root)) return { videos, warnings };

  const add = (prop, room, rel) => {
    const mb = fs.statSync(path.join(root, rel)).size / 1024 / 1024;
    if (mb > 100) warnings.push(`${rel}: ${mb.toFixed(1)} MB — GitHub rejects files above 100 MB`);
    else if (mb > WARN_MB) warnings.push(`${rel}: ${mb.toFixed(1)} MB (above ${WARN_MB} MB)`);
    if (brokenHeader(path.join(root, rel))) {
      warnings.push(`${rel}: broken H.264 header, may not play in Chrome/Edge → npm run video:fix -- ${path.join(root, rel).replace(/\\/g, '/')}`);
    }
    const key = room.toLowerCase();
    videos[prop] ??= {};
    if (videos[prop][key]) { warnings.push(`${rel}: ignored, ${videos[prop][key].file} is already used for this room type`); return; }
    videos[prop][key] = { url: encodeURI(`/${VIDEO_DIR}/${rel}`), file: rel, mb };
  };
  const checkOther = (rel) => { if (OTHER_VIDEO.test(rel)) warnings.push(`${rel}: not used, only .mp4 is supported`); };

  for (const p of sorted(root).filter((d) => d.isDirectory())) {
    const prop = p.name.toLowerCase();
    for (const entry of sorted(path.join(root, p.name))) {
      const rel = `${p.name}/${entry.name}`;
      if (entry.isDirectory()) {
        const files = sorted(path.join(root, rel)).filter((d) => d.isFile());
        files.forEach((f) => checkOther(`${rel}/${f.name}`));
        const mp4 = files.filter((f) => /\.mp4$/i.test(f.name));
        if (mp4.length > 1) warnings.push(`${rel}/: ${mp4.length} .mp4 files, only ${mp4[0].name} is used`);
        if (mp4.length) add(prop, entry.name, `${rel}/${mp4[0].name}`);
      } else if (/\.mp4$/i.test(entry.name)) {
        add(prop, entry.name.replace(/\.mp4$/i, ''), rel);
      } else checkOther(rel);
    }
  }
  return { videos, warnings };
}

// Vite plugin: `import ROOM_VIDEOS from 'virtual:room-videos'` → { a7: { deluxe: '/property-videos/…mp4' } }
export function roomVideosPlugin() {
  const ID = 'virtual:room-videos';
  const RESOLVED = '\0' + ID;
  let publicDir = 'public';
  return {
    name: 'homy-room-videos',
    configResolved(config) { publicDir = config.publicDir; },
    resolveId(id) { return id === ID ? RESOLVED : null; },
    load(id) {
      if (id !== RESOLVED) return null;
      const { videos, warnings } = scanRoomVideos(publicDir);
      for (const w of warnings) this.warn(w);
      const urls = Object.fromEntries(
        Object.entries(videos).map(([prop, rooms]) => [prop, Object.fromEntries(Object.entries(rooms).map(([r, v]) => [r, v.url]))]),
      );
      return `export default ${JSON.stringify(urls)};`;
    },
    configureServer(server) {
      // Dev server: adding or removing a video refreshes the page with the new list.
      const dir = path.join(publicDir, VIDEO_DIR);
      const refresh = (file) => {
        if (!path.resolve(file).startsWith(path.resolve(dir))) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(dir);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
      server.watcher.on('addDir', refresh);
      server.watcher.on('unlinkDir', refresh);
    },
  };
}
