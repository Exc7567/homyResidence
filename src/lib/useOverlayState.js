import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Keeps an overlay (room modal, lightbox) in history *state* so the phone's back
// gesture closes it. The URL itself never changes (shared links stay clean).
export function useOverlayState(key) {
  const location = useLocation();
  const navigate = useNavigate();
  const value = location.state?.[key] ?? null;

  const open = useCallback(
    (v) => navigate(location.pathname + location.search, { state: { ...(location.state || {}), [key]: v } }),
    [navigate, location.pathname, location.search, location.state, key],
  );

  const close = useCallback(() => {
    // Opened in this session → step back; otherwise (e.g. after reload) just clear the state.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(location.pathname + location.search, { replace: true, state: {} });
  }, [navigate, location.pathname, location.search]);

  return [value, open, close];
}
