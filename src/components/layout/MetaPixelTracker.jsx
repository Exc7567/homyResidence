import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROPERTIES } from '../../data/properties';
import { fbqTrack } from '../../lib/metaPixel';

// The first PageView is sent by the Meta Pixel base code in index.html.
// Module-level so React StrictMode's double effects never send it twice.
let lastPath = typeof window !== 'undefined' ? window.location.pathname : null;

// Every WhatsApp link on the site is built by src/lib/whatsapp.js as https://wa.me/...
const WA_LINK = 'a[href^="https://wa.me/"]';

// Meta Pixel events for the single-page app (renders nothing):
// PageView on in-app page changes, Contact on every WhatsApp link tap.
export default function MetaPixelTracker() {
  const { pathname } = useLocation();

  // PageView on in-app page changes (not hash / search / modal history entries).
  useEffect(() => {
    if (pathname === lastPath) return;
    lastPath = pathname;
    fbqTrack('PageView');
  }, [pathname]);

  // Contact on every WhatsApp link tap (click, or middle-click to open in a new tab).
  // Only listens: the link opens exactly as before.
  useEffect(() => {
    const onClick = (e) => {
      if (e.type === 'auxclick' && e.button !== 1) return;
      const link = e.target.closest?.(WA_LINK);
      if (!link) return;
      const { intent, property: slug, room } = link.dataset;
      const property = slug ? PROPERTIES.find((p) => p.slug === slug) : null;
      fbqTrack('Contact', {
        content_name: property?.name ?? 'Homy Residence',
        content_category: intent || 'chat',
        ...(room ? { room_type: room } : {}),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);

  return null;
}
