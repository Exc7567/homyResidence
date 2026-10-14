import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2 } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { useToast } from '../common/Toast';

// Rukita-style mobile top bar: back, title pill, share. Hidden ≥1024 (site header instead).
// The property name only appears in the pill once the page h1 has scrolled out of view.
export default function DetailTopBar({ property }) {
  const navigate = useNavigate();
  const toast = useToast();
  const showName = useTitleScrolledAway('property-title');

  const goBack = () => {
    // React Router stores the in-app history index in history.state.idx.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/');
  };

  return (
    <div className="detail-topbar">
      <button type="button" className="detail-topbar__btn" aria-label="Kembali" onClick={goBack}>
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <div className={`detail-topbar__pill ${showName ? 'has-name' : ''}`}>
        <span className="detail-topbar__brand">{BRAND.name}</span>
        <span className="detail-topbar__name" aria-hidden={!showName}>{property.name}</span>
      </div>
      <ShareButton property={property} toast={toast} className="detail-topbar__btn" />
    </div>
  );
}

function useTitleScrolledAway(id) {
  const [away, setAway] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    // "Away" once it has slid under the sticky bars (about 120px), not while below the fold.
    const TOP = 120;
    const io = new IntersectionObserver(
      ([e]) => setAway(!e.isIntersecting && e.boundingClientRect.top < TOP),
      { rootMargin: `-${TOP}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return away;
}

export function ShareButton({ property, toast, className = '', label = false }) {
  const share = async () => {
    const url = window.location.href;
    const data = { title: `${property.name} | ${BRAND.name}`, text: property.name, url };
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (e) { if (e?.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast('Link disalin');
    } catch {
      toast(url);
    }
  };
  return (
    <button type="button" className={className} aria-label={label ? undefined : 'Bagikan'} onClick={share}>
      <Share2 size={22} aria-hidden="true" />
      {label && <span>Bagikan</span>}
    </button>
  );
}
