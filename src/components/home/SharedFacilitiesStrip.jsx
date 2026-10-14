import { AirVent, Wifi, Zap } from 'lucide-react';
import Reveal from '../common/Reveal';

const ITEMS = [
  { Icon: AirVent, title: 'AC', text: 'Setiap kamar dilengkapi AC.' },
  { Icon: Wifi, title: 'WiFi', text: 'Internet WiFi tersedia di setiap hunian.' },
  { Icon: Zap, title: 'Listrik Token', text: 'Listrik tidak termasuk. Setiap kamar memakai token meter sendiri.' },
];

export default function SharedFacilitiesStrip() {
  return (
    <section id="fasilitas" className="section facilities-strip anchor-target" aria-labelledby="fasilitas-title">
      <div className="container">
        <Reveal>
          <h2 id="fasilitas-title" className="section-title facilities-strip__title">Fasilitas di Semua Hunian</h2>
        </Reveal>
        <ul className="facilities-strip__list">
          {ITEMS.map(({ Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 120} className="facilities-strip__item group">
              <span className="facilities-strip__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="facilities-strip__item-title">{title}</h3>
                <p className="muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
