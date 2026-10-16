import { formatNumber } from '../../lib/format';

// Amount shown as "Rp1.700.000" (same text as formatRupiah) with a smaller "Rp",
// so the first digit stays clearly part of the number (Josefin Sans' "1" looks like "l").
export default function Rupiah({ value }) {
  return (
    <>
      <span className="rp-cur">Rp</span>
      {formatNumber(value)}
    </>
  );
}
