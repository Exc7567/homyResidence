import { sortedRoomTypes } from '../../lib/property';
import Reveal from '../common/Reveal';
import RoomTypeCard from './RoomTypeCard';

// Room types sorted by price. The property's total rooms are shown once, here.
// Tapping a room photo opens the shared photo viewer (lightbox) of the page.
export default function RoomsSection({ property: p, onOpenPhotos }) {
  const rooms = sortedRoomTypes(p);

  return (
    <section id="kamar" className="detail-section detail-anchor" aria-labelledby="kamar-title">
      <Reveal className="rooms__head">
        <h2 id="kamar-title" className="section-title rooms__title">Kamar</h2>
        <span className="rooms__total">Total {p.totalRooms} kamar</span>
      </Reveal>
      <div className={`rooms__grid ${rooms.length === 1 ? 'rooms__grid--single' : ''}`}>
        {rooms.map((r, i) => (
          <Reveal key={r.id} delay={(i % 2) * 100} className="rooms__cell">
            <RoomTypeCard room={r} property={p} onOpenPhoto={(index) => onOpenPhotos(`room:${r.id}`, index)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
