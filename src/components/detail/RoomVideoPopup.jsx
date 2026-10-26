import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useEscape, useFocusTrap, useScrollLock } from '../../lib/hooks';

const BG_WIDTH = 48; // the blurred background is a tiny copy of the video, scaled up (cheap to draw)
const BG_FPS = 12;

// Full-screen room video: the 9:16 video fills the screen height, the sides show a blurred, darkened
// copy of the same video. Always muted. Closes with X, Esc, a tap beside the video or the phone's back gesture.
export default function RoomVideoPopup({ src, caption, onClose }) {
  const ref = useRef(null);
  const video = useRef(null);
  const canvas = useRef(null);
  useScrollLock(true);
  useFocusTrap(ref, true);
  useEscape(onClose);

  // The source is set here (not as a prop) so that closing can also stop the download.
  useEffect(() => {
    const v = video.current;
    v.muted = true;
    v.src = src;
    v.play().catch(() => {}); // muted autoplay is allowed everywhere; the play button is there otherwise
    return () => {
      v.pause();
      v.removeAttribute('src');
      v.load();
    };
  }, [src]);

  // Blurred background: draw the current frame into a small canvas (cover crop) about 12 times a second.
  useEffect(() => {
    const v = video.current;
    const c = canvas.current;
    const ctx = c.getContext('2d');
    let raf = 0;
    let last = 0;
    const size = () => {
      c.width = BG_WIDTH;
      c.height = Math.max(1, Math.round((BG_WIDTH * window.innerHeight) / window.innerWidth));
    };
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 1000 / BG_FPS || v.readyState < 2) return;
      last = now;
      const vr = v.videoWidth / v.videoHeight;
      const cr = c.width / c.height;
      let sw = v.videoWidth, sh = v.videoHeight, sx = 0, sy = 0;
      if (vr > cr) { sw = sh * cr; sx = (v.videoWidth - sw) / 2; } else { sh = sw / cr; sy = (v.videoHeight - sh) / 2; }
      ctx.drawImage(v, sx, sy, sw, sh, 0, 0, c.width, c.height);
    };
    size();
    window.addEventListener('resize', size);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  // No sound: if the volume control is used anyway, stay muted.
  const keepMuted = (e) => { if (!e.currentTarget.muted) e.currentTarget.muted = true; };

  return createPortal(
    <div
      ref={ref}
      className="video-popup animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Video ${caption}`}
      onClick={(e) => { if (e.target === e.currentTarget || e.target === canvas.current) onClose(); }}
    >
      <canvas ref={canvas} className="video-popup__bg" aria-hidden="true" />
      <video
        ref={video}
        className="video-popup__video"
        controls
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onVolumeChange={keepMuted}
      />
      <div className="video-popup__top">
        <span className="video-popup__caption">{caption}</span>
        <button type="button" className="video-popup__close" aria-label="Tutup video" onClick={onClose}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
