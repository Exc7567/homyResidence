import { ArrowDown } from 'lucide-react';
import { BRAND } from '../../data/brand';
import ImageWithFallback from '../common/ImageWithFallback';
import Text from '../common/Text';

// Homepage hero, after the owner's reference: soft brand-colored glow, big centered
// two-line "HOMY RESIDENCE" in Nura, the tagline, a dark pill button, and a row of five
// tall photos on a gentle curve. No WhatsApp button here: the header (desktop) and the
// floating button (mobile) already offer it.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true">
        <span className="hero__glow-blob hero__glow-blob--green" />
        <span className="hero__glow-blob hero__glow-blob--sand" />
        <span className="hero__glow-blob hero__glow-blob--teal" />
      </div>

      <div className="container hero__inner">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-heavy animate-fade-up">Homy</span>{' '}
          <span className="hero__title-light animate-fade-up [animation-delay:90ms]">Residence</span>
        </h1>
        <Text as="p" value={BRAND.tagline} className="hero__subtitle animate-fade-up [animation-delay:180ms]" />
        <a href="#properti" className="hero__btn animate-fade-up [animation-delay:260ms]">
          <span>Lihat Property</span>
          <span className="hero__btn-icon" aria-hidden="true">
            <ArrowDown />
          </span>
        </a>
      </div>

      <HeroPhotoArc photos={BRAND.heroPhotos} />
    </section>
  );
}

// Five photos (BRAND.heroPhotos, left to right) on a curve: the middle one sits lowest, the outer
// ones higher and turned towards the viewer, cut off by the screen edges. Decorative only.
function HeroPhotoArc({ photos = [] }) {
  const mid = (photos.length - 1) / 2;
  return (
    <div className="hero-arc" aria-hidden="true">
      <ul className="hero-arc__track">
        {photos.map((img, i) => {
          const k = i - mid; // -2 … 2
          return (
            <li key={i} className="hero-arc__card" style={{ '--k': k, '--k2': k * k }}>
              <div className="hero-arc__frame animate-fade-up" style={{ animationDelay: `${320 + Math.abs(k) * 90}ms` }}>
                <ImageWithFallback image={img} className="hero-arc__img" sizes="(min-width: 1024px) 300px, 25vw" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
