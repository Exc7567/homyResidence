import { DoorClosed, Ruler, Users } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
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
// `room.tempPhotos`: the photos are stand-ins (not this type yet) → amber outline + reminder line.
export default function RoomTypeCard({ room, property, onOpenPhoto }) {
  return (
    <article className="room-card" aria-labelledby={`room-${room.id}`}>
      <div className={`room-card__media ${room.tempPhotos ? 'room-card__media--temp' : ''}`}>
        <ImageCarousel
          images={room.photos}
          aspect="4/3"
          name={`Tipe ${room.name}`}
          onImageClick={onOpenPhoto}
        />
        {room.tempPhotos && (
          <p className="room-card__temp-note">Foto sementara: ganti dengan foto tipe {room.name} yang benar</p>
        )}
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
        <div className="room-meta">
          <span><Ruler size={16} aria-hidden="true" /><Text value={room.size} /></span>
          <span><Users size={16} aria-hidden="true" /><Text value={room.occupancyNote} /></span>
        </div>
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
