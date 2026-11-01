# Menyiapkan buku doa Supabase

1. Buka atau buat proyek di https://supabase.com/dashboard/projects.
2. Di SQL Editor, jalankan `supabase-schema.sql` satu kali. Doa baru masuk sebagai `approved = false`; panitia menyetujuinya di Table Editor dengan mengubah `approved` menjadi `true`.
3. Di Project Settings → API Keys, salin Project URL dan publishable key (atau key lama `anon`). Masukkan keduanya ke `assets/supabase-config.js`. Jangan masukkan `service_role`/secret key ke HTML atau file publik.
4. Deploy perubahan. Formulir akan menyimpan doa ke tabel `maulid_doa` dan menampilkan doa yang sudah disetujui. Tanpa konfigurasi, halaman mempertahankan penyimpanan lokal di browser.

Pencarian proyek lokal tidak menemukan URL/key Supabase. Jika akun terlupa, coba masuk ke dashboard Supabase dengan Google/GitHub atau email yang biasa dipakai; cari surel undangan/proyek dari Supabase.
