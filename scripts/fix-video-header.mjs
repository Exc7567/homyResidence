// Repairs a room video whose H.264 header (avcC) repeats the first byte of the stored SPS/PPS
// (e.g. "67 67 64 00 1e"). Such a file plays with software decoding but stops after a few frames in
// Chrome/Edge when the graphics card decodes it. The H14 videos had this (Update 06, revision 1).
// Lossless: only the duplicated header bytes are removed, box sizes and chunk offsets are adjusted;
// the video and audio data stay byte for byte the same (checked before the file is written).
// Usage: npm run video:fix -- public/property-videos/H14/standard/standard.mp4 [more files]
import fs from 'node:fs';
import { findAvcC } from './room-videos.mjs';

const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl']);

function listBoxes(b) {
  const boxes = []; // { type, start, parents: [start of each parent box] }
  const walk = (start, end, parents) => {
    let p = start;
    while (p + 8 <= end) {
      const size = b.readUInt32BE(p);
      const type = b.toString('latin1', p + 4, p + 8);
      if (size === 1 || size < 8) throw new Error(`unsupported box size at byte ${p}`);
      boxes.push({ type, start: p, parents });
      if (CONTAINERS.has(type)) walk(p + 8, p + size, [...parents, p]);
      if (type === 'stsd') {
        const q = p + 16; // full box header + entry count
        const etype = b.toString('latin1', q + 4, q + 8);
        boxes.push({ type: etype, start: q, parents: [...parents, p] });
        if (etype === 'avc1') walk(q + 86, q + b.readUInt32BE(q), [...parents, p, q]);
      }
      p += size;
    }
  };
  walk(0, b.length, []);
  return boxes;
}

function repair(file) {
  const b = fs.readFileSync(file);
  const info = findAvcC(b);
  if (!info?.duplicates.length) return console.log(`${file}: OK, nothing to fix`);
  const boxes = listBoxes(b);
  const avcC = boxes.find((x) => x.type === 'avcC');
  const moov = boxes.find((x) => x.type === 'moov');
  const mdat = boxes.find((x) => x.type === 'mdat');
  if (!avcC || avcC.start !== info.box || !moov || !mdat) throw new Error(`${file}: unexpected layout, not changed`);
  const delta = info.duplicates.length;

  const o = Buffer.from(b);
  for (const { lengthAt } of info.duplicates) o.writeUInt16BE(o.readUInt16BE(lengthAt) - 1, lengthAt);
  o[info.box + 12] |= 0xfc; // reserved bits + lengthSizeMinusOne
  o[info.box + 13] |= 0xe0; // reserved bits + number of SPS
  for (const start of [...avcC.parents, avcC.start]) o.writeUInt32BE(o.readUInt32BE(start) - delta, start);
  if (mdat.start > moov.start) {
    // The media data moves back by `delta` bytes: shift every chunk offset.
    for (const box of boxes.filter((x) => x.type === 'stco' || x.type === 'co64')) {
      const n = o.readUInt32BE(box.start + 12);
      for (let i = 0; i < n; i++) {
        if (box.type === 'stco') { const q = box.start + 16 + i * 4; o.writeUInt32BE(o.readUInt32BE(q) - delta, q); }
        else { const q = box.start + 16 + i * 8; o.writeBigUInt64BE(o.readBigUInt64BE(q) - BigInt(delta), q); }
      }
    }
  }
  const parts = [];
  let last = 0;
  for (const { byteAt } of [...info.duplicates].sort((x, y) => x.byteAt - y.byteAt)) { parts.push(o.subarray(last, byteAt)); last = byteAt + 1; }
  parts.push(o.subarray(last));
  const out = Buffer.concat(parts);

  if (!b.subarray(mdat.start).equals(out.subarray(mdat.start - (mdat.start > moov.start ? delta : 0)))) {
    throw new Error(`${file}: media data check failed, not changed`);
  }
  fs.writeFileSync(file, out);
  console.log(`${file}: fixed (${delta} duplicated header byte(s) removed, media data unchanged)`);
}

const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: npm run video:fix -- <file.mp4> [more files]'); process.exit(1); }
for (const f of files) repair(f);
