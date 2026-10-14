export const isPlaceholder = (v) => typeof v === 'string' && v.startsWith('[ISI:');
export const IS_DEV = import.meta.env.DEV;
export const PLACEHOLDER_TOOLTIP = 'Placeholder: isi nanti';
// True when a placeholder appears anywhere in the string (e.g. inside a sentence).
export const hasPlaceholder = (v) => typeof v === 'string' && v.includes('[ISI:');
