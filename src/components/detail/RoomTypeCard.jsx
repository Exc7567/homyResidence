import { DoorClosed, Ruler, Users } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
import { hasPlaceholder } from '../../lib/placeholders';
import { roomsLabel } from '../../lib/property';
import Icon from '../common/Icon';
import ImageCarousel from '../common/ImageCarousel';
import Rupiah from '../common/Rupiah';
import Text from '../common/Text';
import WhatsAppButton from '../common/WhatsAppButton';

function RoomStatus({ room }) {
  if (room.status === 'full') return <span className="badge badge-muted">Sedang penuh</span>;
  if (room.status === 'available') return <span className="badge room-badge-available">Tersedia</span>;
  return null;
}

// One room type: name, how many rooms and which ones, room-specific facts, price, Book Now.
// Facilities shared by all types are NOT repeated here (they live in the Fasilitas section).
// No real photo yet (one empty slot with the room illustration) → nothing to open in the photo viewer.
// Size / occupancy are shown only once filled in: an "[ISI: ...]" placeholder is not shown on the card.
const filled = (v) => (v && !hasPlaceholder(v) ? v : null);

export default function RoomTypeCard({ room, property, onOpenPhoto }) {
  const hasPhotos = room.photos.some((ph) => ph.src);
  const size = filled(room.size);
  const occupancy = filled(room.occupancyNote);
  return (
    <article className="room-card" aria-labelledby={`room-${room.id}`}>
      <div className="room-card__media">
        <ImageCarousel
          images={room.photos}
          aspect="4/3"
          name={`Tipe ${room.name}`}
          onImageClick={hasPhotos ? onOpenPhoto : undefined}
        />
      </div>
      <div className="room-card__body">
        <div className="room-card__title-row">
          <h3 id={`room-${room.id}`} className="room-card__name">{room.name}</h3>
          <span className="room-card__count">{room.units} kamar</span>
          <RoomStatus room={room} />
        </div>
        <p className="room-card__rooms">
          <DoorClosed size={16} aria-hidden="true" />
          <span>{roomsLabel(room)}</span>
        </p>
        {(size || occupancy) && (
          <div className="room-meta">
            {size && <span><Ruler size={16} aria-hidden="true" /><Text value={size} /></span>}
            {occupancy && <span><Users size={16} aria-hidden="true" /><Text value={occupancy} /></span>}
          </div>
        )}
        {room.facilityIds?.length > 0 && (
          <ul className="room-features" aria-label="Fasilitas khusus tipe ini">
            {room.facilityIds.map((id) => FACILITIES[id] && (
              <li key={id} className="room-feature">
                <Icon name={FACILITIES[id].icon} size={16} /> {FACILITIES[id].label}
              </li>
            ))}
          </ul>
        )}
        <div className="room-card__footer">
          <p className="room-card__price">
            <span className="price"><Rupiah value={room.price} /></span>
            <span className="price-suffix"> /bulan</span>
          </p>
          <WhatsAppButton intent="room" property={property} room={room} className="room-card__cta" />
        </div>
      </div>
    </article>
  );
}
