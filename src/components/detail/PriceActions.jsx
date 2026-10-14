import { BedDouble } from 'lucide-react';
import { formatRupiah } from '../../lib/format';
import { priceFrom } from '../../lib/property';
import WhatsAppButton from '../common/WhatsAppButton';
import { scrollToSection } from '../../lib/sections';

// Desktop sticky price card (right column).
export function StickyActionCard({ property }) {
  return (
    <aside className="price-card animate-fade-up [animation-delay:200ms]" aria-label="Harga dan booking">
      <span className="small muted">Mulai dari</span>
      <p>
        <span className="price">{formatRupiah(priceFrom(property))}</span>
        <span className="price-card__suffix"> /bulan</span>
      </p>
      <button type="button" className="btn btn-primary btn-block" onClick={() => scrollToSection('kamar')}>
        <BedDouble aria-hidden="true" /> Lihat Tipe Kamar
      </button>
      <WhatsAppButton intent="property" property={property} block className="btn-shine" />
    </aside>
  );
}

// Mobile fixed bottom bar (Rukita mobile). Hidden while any overlay is open.
export function MobileActionBar({ property }) {
  return (
    <div className="mobile-bar" role="region" aria-label="Harga dan booking">
      <div className="mobile-bar__price">
        <span className="small muted">Mulai dari</span>
        <p>
          <span className="price">{formatRupiah(priceFrom(property))}</span>
          <span className="price-suffix"> /bulan</span>
        </p>
      </div>
      <div className="mobile-bar__actions">
        <WhatsAppButton intent="property" property={property} />
        <button type="button" className="btn btn-primary" onClick={() => scrollToSection('kamar')}>
          Lihat Tipe Kamar
        </button>
      </div>
    </div>
  );
}
