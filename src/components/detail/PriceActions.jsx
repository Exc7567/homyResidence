import { useEffect, useRef } from 'react';
import { BedDouble } from 'lucide-react';
import { priceFrom } from '../../lib/property';
import Rupiah from '../common/Rupiah';
import WhatsAppButton from '../common/WhatsAppButton';
import { scrollToSection } from '../../lib/sections';

// Desktop sticky price card (right column).
export function StickyActionCard({ property }) {
  return (
    <aside className="price-card animate-fade-up [animation-delay:200ms]" aria-label="Harga dan booking">
      <span className="small muted">Mulai dari</span>
      <p>
        <span className="price"><Rupiah value={priceFrom(property)} /></span>
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
// Publishes its height as --mobile-bar-h so the page can end above it (see .detail in detail.css).
export function MobileActionBar({ property }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const root = document.documentElement;
    // Height 0 = hidden behind an open photo viewer: keep the last value so the page does not jump.
    const ro = new ResizeObserver(() => {
      if (node.offsetHeight) root.style.setProperty('--mobile-bar-h', `${node.offsetHeight}px`);
    });
    ro.observe(node);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--mobile-bar-h');
    };
  }, []);

  return (
    <div ref={ref} className="mobile-bar" role="region" aria-label="Harga dan booking">
      <div className="mobile-bar__price">
        <span className="small muted">Mulai dari</span>
        <p>
          <span className="price"><Rupiah value={priceFrom(property)} /></span>
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
