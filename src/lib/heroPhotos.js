import { HERO_DIR, HERO_IMAGES } from '../data/heroImages';

const CARDS = 5;                       // cards on the hero arc
const LAST_KEY = 'homy:hero-centre';   // centre photo of the previous visit

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Up to 5 different photos in random order. The centre card (the most visible one) is never the
// previous visit's centre photo. Storage may be blocked (private mode, settings): then it is just random.
function pick() {
  let last = null;
  try { last = window.localStorage.getItem(LAST_KEY); } catch { /* storage unavailable */ }

  const files = shuffle(HERO_IMAGES).slice(0, CARDS);
  const mid = Math.floor((files.length - 1) / 2);
  if (files.length > 1 && files[mid] === last) [files[mid], files[0]] = [files[0], files[mid]];

  try { if (files.length) window.localStorage.setItem(LAST_KEY, files[mid]); } catch { /* storage unavailable */ }
  return files.map((file) => ({ src: encodeURI(`${HERO_DIR}/${file}`), alt: 'Foto Homy Residence', label: 'Homy Residence' }));
}

// Chosen once per page load, during the first render (no wrong or empty photo first),
// and kept while the visitor moves around the site.
let chosen = null;
export const heroPhotos = () => (chosen ??= pick());
