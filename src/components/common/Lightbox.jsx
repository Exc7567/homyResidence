import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { useEscape, useFocusTrap, useScrollLock } from '../../lib/hooks';

// Full-screen photo viewer: counter, close, arrows, keyboard, swipe, thumbnails (≥768).
export default function Lightbox({ images, startIndex = 0, title = '', onClose }) {
  const [index, setIndex] = useState(startIndex);
  const ref = useRef(null);
  const swipe = useRef(null);
  const total = images.length;

  const go = useCallback((n) => setIndex(((n % total) + total) % total), [total]);
  useScrollLock(true);
  useFocusTrap(ref, true);
  useEscape(onClose);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  const onPointerDown = (e) => { swipe.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(index + (dx < 0 ? 1 : -1));
  };

  return createPortal(
    <div
      ref={ref}
      className="lightbox animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri foto ${title}`}
      onKeyDown={onKeyDown}
    >
      <div className="lightbox__top">
        <span className="lightbox__counter tabular">
          {index + 1} / {total}
        </span>
        <button type="button" className="lightbox__close" aria-label="Tutup galeri" onClick={onClose}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {total > 1 && (
          <button type="button" className="lightbox__arrow lightbox__arrow--prev" aria-label="Foto sebelumnya" onClick={() => go(index - 1)}>
            <ChevronLeft size={28} aria-hidden="true" />
          </button>
        )}
        <div key={index} className="lightbox__img animate-fade-in">
          <ImageWithFallback image={images[index]} fit="contain" className="lightbox__frame" />
        </div>
        {total > 1 && (
          <button type="button" className="lightbox__arrow lightbox__arrow--next" aria-label="Foto berikutnya" onClick={() => go(index + 1)}>
            <ChevronRight size={28} aria-hidden="true" />
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="lightbox__thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`lightbox__thumb ${i === index ? 'is-active' : ''}`}
              aria-label={`Buka foto ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            >
              <ImageWithFallback image={img} aspect="1/1" />
            </button>
          ))}
        </div>
      )}
      <span className="sr-only" aria-live="polite">{`Foto ${index + 1} dari ${total}`}</span>
    </div>,
    document.body,
  );
}
