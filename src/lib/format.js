export const formatRupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');         // Rp1.700.000
export const formatNumber = (n) => Number(n).toLocaleString('id-ID');                 // 1.700.000
export const formatMinutes = (m) => `~${m} min`;                                       // ~4 min (by motorcycle)
