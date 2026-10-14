import { Images } from 'lucide-react';
import { useMediaQuery } from '../../lib/hooks';
import ImageCarousel from '../common/ImageCarousel';
import ImageWithFallback from '../common/ImageWithFallback';
import Logo from '../common/Logo';

// Desktop: Rukita mosaic (1 big + 4 small, "+N" on the last tile).
// Mobile: full-bleed swipe carousel. Any tap opens the lightbox.
export default function GalleryMosaic({ property, onOpen }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const images = property.gallery;

  if (!isDesktop) {
    return (
      <section id="foto" className="gallery-mobile detail-anchor" aria-label="Foto">
        <ImageCarousel
          images={images}
          aspect="4/3"
          name={property.name}
          priority
          hideArrowsOnTouch
          showDots={false}
          onImageClick={onOpen}
        />
      </section>
    );
  }

  const tiles = images.slice(0, 5);
  const extra = images.length - 5;

  return (
    <section id="foto" className="gallery-mosaic detail-anchor" aria-label="Foto">
      {tiles.map((img, i) => {
        const isLast = i === tiles.length - 1 && extra > 0;
        return (
          <button
            key={i}
            type="button"
            className={`gallery-mosaic__tile ${i === 0 ? 'gallery-mosaic__tile--big' : ''} animate-fade-in`}
            style={{ animationDelay: `${i * 70}ms` }}
            aria-label={`Buka foto ${i + 1}`}
            onClick={() => onOpen(i)}
          >
            <ImageWithFallback image={img} priority={i === 0} className="gallery-mosaic__img" />
            {i === 0 && (
              <span className="gallery-mosaic__logo" aria-hidden="true"><Logo small light /></span>
            )}
            {isLast && (
              <span className="gallery-mosaic__more">
                <span className="gallery-mosaic__more-pill">
                  <Images size={18} aria-hidden="true" /> +{extra}
                </span>
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
}
