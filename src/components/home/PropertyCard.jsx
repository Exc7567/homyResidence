import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { badgeLabel, cardHighlights, cardPhotos, nearestCampus, priceFrom } from '../../lib/property';
import { formatMinutes } from '../../lib/format';
import HighlightChip from '../common/HighlightChip';
import ImageCarousel from '../common/ImageCarousel';
import Rupiah from '../common/Rupiah';
import Text from '../common/Text';
import WhatsAppButton from '../common/WhatsAppButton';

// ERA-style listing card for an open property: a teaser, not a copy of the detail page.
// Parking is never shown here; AC/WiFi/electricity live in the "Fasilitas di Semua Hunian" strip.
export default function PropertyCard({ property: p, priority = false }) {
  const navigate = useNavigate();
  const href = `/${p.slug}`;
  const highlights = cardHighlights(p);
  const campus = nearestCampus(p);

  return (
    <article className="property-card group" aria-labelledby={`card-${p.slug}`}>
      <div className="property-card__media">
        <ImageCarousel
          images={cardPhotos(p)}
          aspect="4/3"
          name={p.name}
          priority={priority}
          onImageClick={() => navigate(href)}
          imgClassName="property-card__img"
        />
        <div className="property-card__badges">
          <span className="badge badge-primary">{badgeLabel(p)}</span>
        </div>
      </div>

      <div className="property-card__body">
        <h3 id={`card-${p.slug}`} className="property-card__name">
          <Link to={href} className="property-card__name-link">{p.name}</Link>
        </h3>

        <p className="property-card__location">
          <MapPin size={16} aria-hidden="true" />
          <Text value={p.locationLabel} className="property-card__location-text" />
        </p>

        {campus && (
          <p className="property-card__campus">
            <span className="property-card__campus-time tabular">🏍️ {formatMinutes(campus.minutes)}</span>
            <span>ke {campus.name}</span>
          </p>
        )}

        {highlights.length > 0 && (
          <div className="property-card__highlights">
            {highlights.map((label) => <HighlightChip key={label} label={label} />)}
          </div>
        )}

        <hr className="divider" />

        <div className="property-card__price">
          <span className="xs muted">Mulai dari</span>
          <p>
            <span className="price property-card__price-num"><Rupiah value={priceFrom(p)} /></span>
            <span className="price-suffix"> /bulan</span>
          </p>
        </div>

        <div className="property-card__actions">
          <Link to={href} className="btn btn-outline">Lihat Detail</Link>
          <WhatsAppButton intent="property" property={p} />
        </div>
      </div>
    </article>
  );
}
