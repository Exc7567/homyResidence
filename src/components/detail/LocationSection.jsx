import { CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import Reveal from '../common/Reveal';
import Text from '../common/Text';
import WhatsAppButton from '../common/WhatsAppButton';
import MapEmbed from './MapEmbed';
import PoiList from './PoiList';

// Map + address, then the Point of Interest block (its own tab, id="poi"), then Visit.
export default function LocationSection({ property: p }) {
  return (
    <section id="lokasi" className="detail-section detail-anchor" aria-labelledby="lokasi-title">
      <Reveal>
        <h2 id="lokasi-title" className="section-title">Lokasi</h2>
        <MapEmbed map={p.map} title={p.name} />
        <div className="address-panel">
          <p className="address-panel__text">
            <MapPin size={20} aria-hidden="true" />
            <Text value={p.address || '[ISI: alamat lengkap]'} />
          </p>
          {p.map?.openUrl && (
            <a href={p.map.openUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm address-panel__btn">
              <ExternalLink aria-hidden="true" /> Buka di Maps
            </a>
          )}
        </div>
      </Reveal>

      {p.pois?.length > 0 && (
        <div id="poi" className="detail-subblock detail-anchor poi-block">
          <Reveal>
            <h3 id="poi-title" className="detail-subtitle">Point of Interest</h3>
            <PoiList pois={p.pois} />
          </Reveal>
        </div>
      )}

      <Reveal className="visit-block">
        <h3 className="detail-subtitle">Visit Hunian</h3>
        <p className="muted">
          Jika kamu ingin melihat hunian secara langsung, kamu bisa menjadwalkan visit ke hunian ini.
        </p>
        <WhatsAppButton intent="visit" property={p} variant="outline" block icon={<CalendarDays aria-hidden="true" />} />
      </Reveal>
    </section>
  );
}
