import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const MAX_DOTS = 6;
const SWIPE_THRESHOLD = 0.15; // fraction of width
const FLICK_VELOCITY = 0.5;   // px per ms

// Transform-based carousel: arrows, swipe (pointer events), keyboard, dots, counter,
// lazy neighbours, click-vs-drag separation. No autoplay (by design).
export default function ImageCarousel({
  images = [],
  aspect = '4/3',
  name = '',
  onImageClick,
  showCounter = true,
  showDots = true,
  priority = false,
  loop = false,
  hideArrowsOnTouch = false,
  className = '',
  imgClassName = '',
}) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef(null);
  const drag = useRef(null);
  const movedRef = useRef(false);
  const total = images.length;
  const single = total <= 1;

  const go = useCallback(
    (next) => {
      if (loop) setIndex(((next % total) + total) % total);
      else setIndex(Math.max(0, Math.min(total - 1, next)));
    },
    [loop, total],
  );

  const onPointerDown = (e) => {
    if (single || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), axis: null, id: e.pointerId };
    movedRef.current = false;
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag.current = null; return; } // page scroll wins
      if (Math.abs(dx) > 5) {
        d.axis = 'x';
        movedRef.current = true;
        setDragging(true);
        e.currentTarget.setPointerCapture?.(e.pointerId);
      } else return;
    }
    const atEdge = !loop && ((index === 0 && dx > 0) || (index === total - 1 && dx < 0));
    setDragX(atEdge ? dx * 0.3 : dx);
  };

  const endDrag = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== 'x') return;
    const width = viewportRef.current?.offsetWidth || 1;
    const dx = e.clientX - d.x;
    const v = Math.abs(dx) / Math.max(1, performance.now() - d.t);
    if (Math.abs(dx) > width * SWIPE_THRESHOLD || v > FLICK_VELOCITY) go(index + (dx < 0 ? 1 : -1));
    setDragX(0);
    setDragging(false);
  };

  const onSlideClick = (i) => {
    if (movedRef.current) { movedRef.current = false; return; } // a drag is not a click
    onImageClick?.(i);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  const showPrev = !single && (loop || index > 0);
  const showNext = !single && (loop || index < total - 1);

  return (
    <div
      className={`carousel ${hideArrowsOnTouch ? 'carousel--touch-swipe' : ''} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galeri foto ${name}`}
      tabIndex={single ? undefined : 0}
      onKeyDown={single ? undefined : onKeyDown}
    >
      <div className="carousel__viewport" ref={viewportRef} style={{ aspectRatio: aspect }}>
        <div
          className={`carousel__track ${dragging ? 'is-dragging' : ''}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`carousel__slide ${onImageClick ? 'is-clickable' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${total}`}
              aria-hidden={i !== index}
              onClick={() => onSlideClick(i)}
            >
              {Math.abs(i - index) <= 1 || (loop && Math.abs(i - index) === total - 1) ? (
                <ImageWithFallback
                  image={img}
                  priority={priority && i === 0}
                  className="carousel__img"
                  imgClassName={imgClassName}
                />
              ) : (
                <div className="carousel__lazy" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      {showPrev && (
        <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label="Foto sebelumnya" onClick={() => go(index - 1)}>
          <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
      {showNext && (
        <button type="button" className="carousel__arrow carousel__arrow--next" aria-label="Foto berikutnya" onClick={() => go(index + 1)}>
          <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      )}

      {!single && showDots && total <= MAX_DOTS && (
        <div className="carousel__dots" aria-hidden="true">
          {images.map((_, i) => (
            <span key={i} className={`carousel__dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </div>
      )}
      {!single && showCounter && (
        <span className="carousel__counter tabular" aria-hidden="true">
          {index + 1}/{total}
        </span>
      )}
      <span className="sr-only" aria-live="polite">
        {!single ? `Foto ${index + 1} dari ${total}` : ''}
      </span>
    </div>
  );
}
