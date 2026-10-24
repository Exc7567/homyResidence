// Minimal line drawing of a room (window, bed, wardrobe) for a room/property photo slot without a photo.
// Decorative: the slot around it carries the label ("Foto belum tersedia"). Colors: .room-illus in common.css.
export default function RoomIllustration({ className = '' }) {
  return (
    <svg className={`room-illus ${className}`} viewBox="0 0 160 104" aria-hidden="true" focusable="false">
      {/* window */}
      <rect className="room-illus__soft room-illus__line" x="22" y="16" width="36" height="28" rx="2" />
      <path className="room-illus__line" d="M40 16v28M22 30h36" />
      {/* wardrobe */}
      <rect className="room-illus__soft room-illus__line" x="114" y="26" width="30" height="62" rx="2" />
      <path className="room-illus__line" d="M129 26v62" />
      <circle className="room-illus__dot" cx="125" cy="58" r="1.6" />
      <circle className="room-illus__dot" cx="133" cy="58" r="1.6" />
      {/* bed: headboard, frame, blanket, pillow, legs */}
      <rect className="room-illus__soft room-illus__line" x="28" y="54" width="7" height="34" rx="2" />
      <rect className="room-illus__soft room-illus__line" x="35" y="68" width="68" height="12" rx="3" />
      <rect className="room-illus__sand room-illus__line" x="56" y="63" width="47" height="17" rx="3" />
      <rect className="room-illus__bg room-illus__line" x="39" y="61" width="15" height="7" rx="3" />
      <path className="room-illus__line" d="M99 80v8" />
      {/* floor */}
      <path className="room-illus__line" d="M12 88h136" />
    </svg>
  );
}
