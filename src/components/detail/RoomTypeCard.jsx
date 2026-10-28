import { Fragment } from 'react';
import { DoorClosed, MessageCircle, Play, Ruler, Users } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
import { hasPlaceholder } from '../../lib/placeholders';
import { roomLetters } from '../../lib/property';
import { roomVideo } from '../../lib/roomVideos';
import { useOverlayState } from '../../lib/useOverlayState';
import Icon from '../common/Icon';
import ImageCarousel from '../common/ImageCarousel';
import Rupiah from '../common/Rupiah';
import Text from '../common/Text';
import WhatsAppButton from '../common/WhatsAppButton';
import RoomVideoPopup from './RoomVideoPopup';

function RoomStatus({ room }) {
  if (room.status === 'full') return <span className="badge badge-muted">Sedang penuh</span>;
  if (room.status === 'available') return <span className="badge room-badge-available">Tersedia</span>;
  return null;
}

// "Kamar A, B, C" / "Semua kamar". A letter with a note (room.roomNotes) gets a small tag right after it.
function RoomsLine({ room }) {
  const letters = roomLetters(room);
  if (!letters.length) return 'Semua kamar';
  return (
    <>
      Kamar{' '}
      {letters.map((letter, i) => {
        const note = room.roomNotes?.[letter];
        return (
          <Fragment key={letter}>
            {i > 0 && ', '}
            {note ? (
              <span className="room-letter">
                {letter}
                <span className="tag-unggulan room-note">
                  <Icon name={note.icon} size={12} strokeWidth={2} />
                  {note.text}
                </span>
              </span>
            ) : letter}
          </Fragment>
        );
      })}
    </>
  );
}

// One room type: name, how many rooms and which ones, room-specific facts, price, Book Now.
// Facilities shared by all types are NOT repeated here (they live in the Fasilitas section).
// No real photo yet (one empty slot with the room illustration) → nothing to open in the photo viewer.
// Size / occupancy are shown only once filled in: an "[ISI: ...]" placeholder is not shown on the card.
// A room video (public/property-videos/, see README) adds "Lihat Video": it opens full screen (RoomVideoPopup).
// The open popup is kept in history state, so the phone's back gesture closes it.
const filled = (v) => (v && !hasPlaceholder(v) ? v : null);

export default function RoomTypeCard({ room, property, onOpenPhoto }) {
  const hasPhotos = room.photos.some((ph) => ph.src);
  const size = filled(room.size);
  const occupancy = filled(room.occupancyNote);
  const video = roomVideo(property, room);
  const [openVideo, setOpenVideo, closeVideo] = useOverlayState('video'); // room id

  return (
    <article className="room-card" aria-labelledby={`room-${room.id}`}>
      <div className="room-card__media">
        <ImageCarousel
          images={room.photos}
          aspect="4/3"
          name={`Tipe ${room.name}`}
          onImageClick={hasPhotos ? onOpenPhoto : undefined}
        />
        {video && (
          <button type="button" className="room-video-btn" onClick={() => setOpenVideo(room.id)}>
            <Play size={14} fill="currentColor" aria-hidden="true" /> Lihat Video
          </button>
        )}
        {video && openVideo === room.id && (
          <RoomVideoPopup src={video} caption={`${property.name} — ${room.name}`} onClose={closeVideo} />
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
          <span><RoomsLine room={room} /></span>
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
          <p className="room-card__note">
            <MessageCircle size={14} aria-hidden="true" />
            Silakan chat kami untuk mengetahui ketersediaan kamar.
          </p>
        </div>
      </div>
    </article>
  );
}
