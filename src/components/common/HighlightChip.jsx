import { Sparkles } from 'lucide-react';

export default function HighlightChip({ label, className = '', style }) {
  return (
    <span className={`chip-highlight ${className}`} style={style}>
      <Sparkles strokeWidth={1.75} aria-hidden="true" />
      {label}
    </span>
  );
}
