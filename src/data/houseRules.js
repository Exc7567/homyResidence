// "Tata Tertib Peraturan Kost", shown in the detail page's Tata Tertib section (owner text, Update 04).
// Stored once for every property. `onlyFor` limits a rule to the listed property slugs; `except` hides it for the listed slugs.
// Do not type numbers into the text: the list numbers itself, so a hidden rule never leaves a gap.

export const HOUSE_RULES = [
  { text: 'Pembayaran uang kost dan deposit harap di transfer ke rekening BCA atas nama Dewi Tjandra dengan nomor rekening 7610797053. Tidak menerima uang cash / tunai.' },
  { text: 'Uang deposit akan di transfer kembali ke penyewa dengan syarat pemberitahuan minimum 1 bulan dari tanggal check out. Jika tidak ada pemberitahuan sebelumnya, uang deposit akan hangus.' },
  { text: 'Bagi penyewa yang membawa mobil disediakan tempat parkir dibawah kanopi dengan biaya Rp. 150.000/bulan. Bagi yang sudah bayar parkir akan disediakan lot parkir private, sehingga orang lain tidak bisa menggunakan lot parkir tersebut.', onlyFor: ['h14'] },
  { text: 'Setiap penyewa wajib menyerahkan foto KTP melalui WA: 081311654066. Setiap penyewa pasutri wajib menyerahkan foto copy KTP dan foto copy surat nikah.', onlyFor: ['a7'] },
  { text: 'Setiap penyewa wajib menyerahkan foto KTP melalui WA: 081311654066.', except: ['a7'] },
  { text: 'Pembayaran uang kost setiap tanggal 1. Akan diberikan tenggang waktu maksimal sampai tanggal 5 setiap bulan. Jika lebih dari tanggal 5, akan dikenakan denda sebesar Rp. 10.000/hari.', except: ['alamanda'] },
  { text: 'Pembayaran uang kost tetap penuh meskipun bulan tersebut bulan liburan.' },
  { text: 'Batas menerima tamu jam 10 malam. Menerima tamu hanya diperbolehkan di ruangan yang tersedia untuk bertamu. Dilarang menerima tamu di dalam kamar.' },
  { text: 'Tamu tidak diperbolehkan untuk menginap, mandi, memasak. Harus atas persetujuan dan izin terlebih dahulu dari pemilik kost.' },
  { text: 'Dilarang membuat keonaran yang dapat mengganggu ketenangan di dalam kost.' },
  { text: 'Dilarang membuat kerusakan atau merusak barang-barang milik kost (remot AC, TV, remot TV, shower, laci, meja, lemari dan sebagainya). Jika terjadi kerusakan akan dikenakan biaya ditanggung oleh penyewa atau penyewa diharuskan mengganti barang yang sudah dirusakkan.' },
  { text: 'Dilarang menggunakan paku, memasang stiker, dan mencoret-coret kamar.' },
  { text: 'Dilarang membawa minuman keras, obat terlarang (narkoba dan sejenisnya), berjudi, merokok di dalam kost.' },
  { text: 'Dilarang menggunakan mesin cuci untuk keperluan pribadi.' },
  { text: 'Penyewa yang include free laundry batas baju maksimal 2 pasang sehari.' },
  { text: 'Bola lampu, baterai remot jika habis menjadi tanggung jawab penyewa kost. (Permulaan kost bola lampu, baterai akan disediakan oleh pemilik kost)' },
  { text: 'Untuk menjaga kebersihan kamar mandi dalam, akan dilakukan pembersihan 2 minggu sekali oleh pembantu kost dengan izin penyewa kost terlebih dahulu.' },
  { text: 'Tidak diperbolehkan mencuci mobil atau sepeda motor di kost.' },
  { text: 'Jika kunci kamar hilang, harap di duplikat dengan biaya sendiri.' },
  { text: 'Penyewa kost diwajibkan mematuhi tata tertib kost yang tersedia oleh pemilik kost.' },
  { text: 'Pemilik kost berhak mengeluarkan penyewa kost apabila tidak mematuhi tata tertib kost.' },
  { text: 'Jika ada keluhan tolong WA di nomor 081311654066.' },
];

export const houseRulesFor = (slug) =>
  HOUSE_RULES.filter((r) => (!r.onlyFor || r.onlyFor.includes(slug)) && !(r.except && r.except.includes(slug))).map((r) => r.text);
