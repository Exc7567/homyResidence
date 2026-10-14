import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { OPEN_PROPERTIES } from '../../data/properties';
import { formatRupiah } from '../../lib/format';
import { priceFrom } from '../../lib/property';
import ImageWithFallback from '../common/ImageWithFallback';
import Reveal from '../common/Reveal';
import Text from '../common/Text';

// Horizontal scroll-snap row of the other open properties (never parking info).
export default function OtherProperties({ current }) {
  const others = OPEN_PROPERTIES.filter((p) => p.slug !== current.slug).sort((a, b) => a.order - b.order);
  if (!others.length) return null;
  return (
    <section className="other-props" aria-labelledby="other-title">
      <div className="container">
        <Reveal>
          <h2 id="other-title" className="section-title">Hunian Homy Lainnya</h2>
        </Reveal>
      </div>
      <ul className="other-props__row">
        {others.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 90} className="other-props__cell">
            <Link to={`/${p.slug}`} className="mini-card group">
              <div className="mini-card__media">
                <ImageWithFallback image={p.gallery[0]} aspect="4/3" imgClassName="mini-card__img" />
              </div>
              <div className="mini-card__body">
                <span className="mini-card__name">{p.name}</span>
                <span className="mini-card__loc">
                  <MapPin size={14} aria-hidden="true" />
                  <Text value={p.locationLabel} className="mini-card__loc-text" />
                </span>
                <span className="small">
                  Mulai dari <span className="price mini-card__price">{formatRupiah(priceFrom(p))}</span>
                  <span className="price-suffix"> /bulan</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
