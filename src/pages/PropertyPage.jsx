import { lazy, Suspense, useEffect } from 'react';
import { BRAND } from '../data/brand';
import { getProperty } from '../data/properties';
import { useMediaQuery } from '../lib/hooks';
import { useOverlayState } from '../lib/useOverlayState';
import SiteHeader from '../components/layout/SiteHeader';
import DetailTopBar from '../components/detail/DetailTopBar';
import SectionTabs from '../components/detail/SectionTabs';
import Breadcrumb from '../components/detail/Breadcrumb';
import GalleryMosaic from '../components/detail/GalleryMosaic';
import HeaderBlock from '../components/detail/HeaderBlock';
import { MobileActionBar, StickyActionCard } from '../components/detail/PriceActions';
import FacilitiesSection from '../components/detail/FacilitiesSection';
import RoomsSection from '../components/detail/RoomsSection';
import LocationSection from '../components/detail/LocationSection';
import TataTertibSection from '../components/detail/TataTertibSection';
import FaqSection from '../components/detail/FaqSection';
import OtherProperties from '../components/detail/OtherProperties';
import NotFoundPage from './NotFoundPage';

const Lightbox = lazy(() => import('../components/common/Lightbox'));

// Photo sets the lightbox can show: the gallery, or one room type ("room:<id>").
function photoSet(property, set) {
  if (set?.startsWith('room:')) {
    const room = property.roomTypes.find((r) => `room:${r.id}` === set);
    if (room) return { images: room.photos, title: `Tipe ${room.name}` };
  }
  return { images: property.gallery, title: property.name };
}

// Rukita-style property detail page. Everything comes from src/data.
// Section order = tab order (src/lib/sections.js): Foto, Fasilitas, Kamar, Lokasi (+ Point of Interest), Tata Tertib, FAQ.
export default function PropertyPage({ slug }) {
  const property = getProperty(slug);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [photo, openPhoto, closePhoto] = useOverlayState('photo'); // { set, index }

  useEffect(() => {
    if (property) document.title = `${property.name} | ${BRAND.name}`;
  }, [property]);

  useEffect(() => {
    document.body.classList.add('has-bottom-bar');
    return () => document.body.classList.remove('has-bottom-bar');
  }, []);

  if (!property || property.status !== 'open') return <NotFoundPage />;
  const lightbox = photo ? photoSet(property, photo.set) : null;

  return (
    <>
      <SiteHeader hideOnMobile />
      {!isDesktop && <DetailTopBar property={property} />}
      <main id="main" className="detail" key={slug}>
        {!isDesktop && <SectionTabs variant="mobile" />}
        {isDesktop && (
          <div className="container detail__crumbs">
            <Breadcrumb property={property} />
          </div>
        )}
        <div className="detail__gallery">
          <GalleryMosaic property={property} onOpen={(index) => openPhoto({ set: 'gallery', index })} />
        </div>

        <div className="container detail__layout">
          <div className="detail__main">
            <HeaderBlock property={property} />
            {isDesktop && <SectionTabs variant="desktop" />}
            <FacilitiesSection property={property} />
            <RoomsSection property={property} onOpenPhotos={(set, index) => openPhoto({ set, index })} />
            <LocationSection property={property} />
            <TataTertibSection property={property} />
            <FaqSection property={property} />
          </div>
          {isDesktop && (
            <div className="detail__aside">
              <StickyActionCard property={property} />
            </div>
          )}
        </div>

        <OtherProperties current={property} />
      </main>
      {/* WhatsApp on this page: header "Book Now" (desktop) or the bottom bar (mobile/tablet). */}
      {!isDesktop && <MobileActionBar property={property} />}

      {lightbox && (
        <Suspense fallback={null}>
          <Lightbox
            key={photo.set}
            images={lightbox.images}
            startIndex={photo.index ?? 0}
            title={lightbox.title}
            onClose={closePhoto}
          />
        </Suspense>
      )}
    </>
  );
}
