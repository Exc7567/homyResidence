import { PROPERTIES } from '../../data/properties';
import Reveal from '../common/Reveal';
import PropertyCard from './PropertyCard';
import PropertyCardUnderConstruction from './PropertyCardUnderConstruction';

export default function PropertyGrid() {
  const properties = [...PROPERTIES].sort((a, b) => a.order - b.order);
  return (
    <section id="properti" className="section anchor-target" aria-labelledby="properti-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">PILIHAN HUNIAN</span>
          <h2 id="properti-title">Pilih Hunian Homy</h2>
          <p className="muted">
            Pilih properti, lihat tipe kamar dan fasilitasnya, lalu chat kami via WhatsApp untuk booking.
          </p>
        </Reveal>
        <div className="property-grid">
          {properties.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 110} className="property-grid__cell">
              {p.status === 'open' ? (
                <PropertyCard property={p} priority={i === 0} />
              ) : (
                <PropertyCardUnderConstruction property={p} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
