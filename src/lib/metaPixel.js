// Meta Pixel helpers. The base code and the first PageView live in index.html.
export function fbqTrack(event, params) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}
