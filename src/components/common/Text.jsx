import { hasPlaceholder, IS_DEV, PLACEHOLDER_TOOLTIP } from '../../lib/placeholders';

// Renders a data string. Placeholders ("[ISI: ...]") stay visible; in dev they get an amber outline.
export default function Text({ value, as: Tag = 'span', className = '', ...rest }) {
  const ph = hasPlaceholder(value);
  return (
    <Tag
      className={`${className} ${ph && IS_DEV ? 'ph-dev' : ''}`.trim() || undefined}
      title={ph && IS_DEV ? PLACEHOLDER_TOOLTIP : undefined}
      {...rest}
    >
      {value}
    </Tag>
  );
}
