# Supabase untuk buku doa Maulid

## Atur database

1. Buka SQL Editor proyek Supabase dan jalankan `supabase-schema.sql`. Skrip ini mengatur agar doa baru langsung tampil, termasuk doa lama yang sebelumnya masih menunggu.
2. Pengunjung boleh membaca dan mengirim doa. Pengunjung umum tidak mendapat izin mengubah atau menghapus doa melalui API.
3. Untuk menghapus doa yang tidak berkenan, panitia dengan akses proyek dapat membuka **Table Editor → maulid_doa**, memilih baris, lalu menghapusnya. Berikan akses proyek hanya kepada panitia tepercaya.

## Konfigurasi halaman

`assets/supabase-config.js` berisi Project URL dan publishable key. Publishable key memang dipakai di browser dan dibatasi oleh RLS. Jangan masukkan `service_role` atau secret key ke file publik.

Halaman mengirim ke tabel `maulid_doa`, lalu memuat ulang daftar doa terbaru. Jika Supabase tidak terkonfigurasi, penyimpanan lokal browser digunakan sebagai fallback.
