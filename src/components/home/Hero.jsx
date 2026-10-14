import { ArrowDown } from 'lucide-react';
import { BRAND } from '../../data/brand';
import ImageWithFallback from '../common/ImageWithFallback';
import Text from '../common/Text';

// Johan-style hero (big headline, subtext, CTA) in Rukita colors.
// No WhatsApp button here: the header (desktop) / floating button (mobile) already offers it.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="hero__blob hero__blob--a animate-float" aria-hidden="true" />
      <span className="hero__blob hero__blob--b animate-float-slow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="hero__eyebrow animate-fade-up">KOST &amp; VILLA</span>
          <h1 id="hero-title" className="hero__title animate-fade-up [animation-delay:80ms]">
            {BRAND.name}
          </h1>
          <Text as="p" value={BRAND.tagline} className="hero__tagline animate-fade-up [animation-delay:160ms]" />
          <Text as="p" value={BRAND.heroSubtitle} className="hero__subtitle animate-fade-up [animation-delay:240ms]" />
          <div className="hero__actions animate-fade-up [animation-delay:320ms]">
            <a href="#properti" className="btn btn-primary btn-shine hero__btn">
              Lihat Properti
              <ArrowDown className="hero__btn-arrow" aria-hidden="true" />
            </a>
          </div>
          {Array.isArray(BRAND.heroStats) && BRAND.heroStats.length > 0 && (
            <dl className="hero__stats animate-fade-up [animation-delay:400ms]">
              {BRAND.heroStats.map((s) => (
                <div key={s.label} className="hero__stat">
                  <dt className="hero__stat-label">{s.label}</dt>
                  <dd className="hero__stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="hero__media animate-fade-up [animation-delay:200ms]">
          <ImageWithFallback image={BRAND.heroImage} aspect="4/3" priority className="hero__img" />
        </div>
      </div>
    </section>
  );
}
