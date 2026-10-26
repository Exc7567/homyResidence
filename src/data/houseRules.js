// "Tata Tertib Peraturan Kost", shown in the detail page's Tata Tertib section (owner text, Update 04 + Update 06).
// Stored once for every property:
//   onlyFor  → the rule is shown only for the listed property slugs
//   except   → the rule is hidden for the listed property slugs
//   variants → { slug: 'text' } replaces the text for that property (same position in the list)
// Do not type numbers into the text: the list numbers itself, so a hidden rule never leaves a gap.
// The account number and the WhatsApp number below are made clickable wherever they appear in a rule
// (TataTertibSection): keep them written exactly like this in the text.
export const BANK_ACCOUNT_NUMBER = '7610797053';
export const CONTACT_PHONE = '081311654066';

export const HOUSE_RULES = [
  { text: 'Pembayaran uang kost dan deposit harap di transfer ke rekening BCA atas nama Dewi Tjandra dengan nomor rekening 7610797053. Tidak menerima uang cash / tunai.' },
  { text: 'Uang deposit akan di transfer kembali ke penyewa dengan syarat pemberitahuan minimum 1 bulan dari tanggal check out. Jika tidak ada pemberitahuan sebelumnya, uang deposit akan hangus.' },
  { text: 'Bagi penyewa yang membawa mobil disediakan tempat parkir dibawah kanopi dengan biaya Rp. 150.000/bulan. Bagi yang sudah bayar parkir akan disediakan lot parkir private, sehingga orang lain tidak bisa menggunakan lot parkir tersebut.', onlyFor: ['h14'] },
  {
    text: 'Setiap penyewa wajib menyerahkan foto KTP melalui WA: 081311654066.',
    variants: { a7: 'Setiap penyewa wajib menyerahkan foto KTP melalui WA: 081311654066. Setiap penyewa pasutri wajib menyerahkan foto copy KTP dan foto copy surat nikah.' },
  },
  {
    text: 'Pembayaran uang kost setiap tanggal 1. Akan diberikan tenggang waktu maksimal sampai tanggal 5 setiap bulan. Jika lebih dari tanggal 5, akan dikenakan denda sebesar Rp. 10.000/hari.',
    // Alamanda payments are due on each tenant's own due date, not on the 1st.
    variants: { alamanda: 'Pembayaran uang kost dilakukan setiap tanggal jatuh tempo pembayaran masing-masing penyewa. Akan diberikan tenggang waktu maksimal 10 hari sejak tanggal jatuh tempo. Jika lebih dari 10 hari, akan dikenakan denda sebesar Rp. 10.000/hari.' },
  },
  { text: 'Pembayaran uang kost tetap penuh meskipun bulan tersebut bulan liburan.' },
  // Move-out: belongs with the payment rules (Update 06).
  {
    text: 'Penyewa yang ingin keluar wajib melakukan pembayaran terakhir pada tanggal 1, disertai catatan (notes) saat pembayaran bahwa akan keluar pada akhir bulan, serta menginformasikan hal tersebut ke nomor 081311654066.',
    variants: { alamanda: 'Penyewa yang ingin keluar wajib melakukan pembayaran terakhir pada tanggal jatuh tempo, disertai catatan (notes) saat pembayaran bahwa akan keluar pada akhir periode sewa tersebut, serta menginformasikan ke nomor 081311654066.' },
  },
  { text: 'Batas menerima tamu jam 10 malam. Menerima tamu hanya diperbolehkan di ruangan yang tersedia untuk bertamu. Dilarang menerima tamu di dalam kamar.' },
  { text: 'Tamu tidak diperbolehkan untuk menginap, mandi, memasak. Harus atas persetujuan dan izin terlebih dahulu dari pemilik kost.' },
  { text: 'Dilarang membuat keonaran yang dapat mengganggu ketenangan di dalam kost.' },
  { text: 'Dilarang membuat kerusakan atau merusak barang-barang milik kost (remot AC, TV, remot TV, shower, laci, meja, lemari dan sebagainya). Jika terjadi kerusakan akan dikenakan biaya ditanggung oleh penyewa atau penyewa diharuskan mengganti barang yang sudah dirusakkan.' },
  { text: 'Dilarang menggunakan paku, memasang stiker, dan mencoret-coret kamar.' },
  // Middle block (Update 06): AC cleaning first, then the appliance rule(s).
  { text: 'AC dibersihkan oleh pemilik kos setiap 8 bulan sejak tanggal pembersihan terakhir, berdasarkan permintaan (request) penyewa. Jika tidak ada permintaan, AC tidak dibersihkan. Jika permintaan diajukan sebelum 8 bulan sejak pembersihan terakhir, biaya pembersihan ditanggung sendiri oleh penyewa.' },
  // A7 and H14: every bathroom is inside the room → one rule.
  { text: 'Seluruh peralatan (appliance) di dalam kamar dan kamar mandi dalam, termasuk sanitary kamar mandi (seperti shower head dan lain-lain), adalah tanggung jawab penyewa jika rusak. Contohnya bola lampu dan baterai remote: jika mati atau habis, penyewa wajib menggantinya sendiri.', onlyFor: ['a7', 'h14'] },
  // Parahyangan and Alamanda: two rules (bathrooms inside and outside).
  { text: 'Seluruh peralatan (appliance) di dalam kamar adalah tanggung jawab penyewa, bukan pemilik kos. Contohnya bola lampu dan baterai remote: jika mati atau habis, penyewa menggantinya sendiri.', onlyFor: ['parahyangan', 'alamanda'] },
  { text: 'Untuk kamar dengan kamar mandi dalam, seluruh peralatan dan sanitary di kamar mandi adalah tanggung jawab penyewa jika rusak. Untuk kamar mandi luar atau fasilitas bersama, perbaikannya adalah tanggung jawab pemilik kos.', onlyFor: ['parahyangan', 'alamanda'] },
  { text: 'Dilarang membawa minuman keras, obat terlarang (narkoba dan sejenisnya), berjudi, merokok di dalam kost.' },
  // Alamanda has a washing machine on floor 4 for tenants.
  { text: 'Dilarang menggunakan mesin cuci untuk keperluan pribadi.', except: ['alamanda'] },
  {
    text: 'Penyewa yang include free laundry batas baju maksimal 2 pasang sehari.',
    variants: { alamanda: 'Jika ingin mencuci, tersedia mesin cuci di lantai 4.' },
  },
  { text: 'Bola lampu, baterai remot jika habis menjadi tanggung jawab penyewa kost. (Permulaan kost bola lampu, baterai akan disediakan oleh pemilik kost)' },
  // All Alamanda bathrooms are outside.
  { text: 'Untuk menjaga kebersihan kamar mandi dalam, akan dilakukan pembersihan 2 minggu sekali oleh pembantu kost dengan izin penyewa kost terlebih dahulu.', except: ['alamanda'] },
  { text: 'Tidak diperbolehkan mencuci mobil atau sepeda motor di kost.' },
  { text: 'Jika kunci kamar hilang, harap di duplikat dengan biaya sendiri.' },
  { text: 'Penyewa kost diwajibkan mematuhi tata tertib kost yang tersedia oleh pemilik kost.' },
  { text: 'Pemilik kost berhak mengeluarkan penyewa kost apabila tidak mematuhi tata tertib kost.' },
  { text: 'Jika ada keluhan tolong WA di nomor 081311654066.' },
];

export const houseRulesFor = (slug) =>
  HOUSE_RULES.filter((r) => (!r.onlyFor || r.onlyFor.includes(slug)) && !(r.except && r.except.includes(slug)))
    .map((r) => r.variants?.[slug] ?? r.text);
