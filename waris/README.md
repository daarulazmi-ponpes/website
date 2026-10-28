# Kalkulator Faraid — HTML/CSS/JavaScript

Kalkulator waris Islam edukatif dengan UI responsif, pecahan eksak berbasis `BigInt`, rincian langkah, dan peringatan keterbatasan.

## Menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` di browser, atau jalankan server statis lokal.
3. Untuk GitHub Pages, unggah isi folder ke repository dan aktifkan Pages dari branch/folder yang sesuai.

## Cakupan versi awal
- Harta bersih dalam rupiah bulat.
- Pewaris laki-laki/perempuan.
- Istri/para istri atau suami.
- Anak laki-laki/perempuan.
- Ayah dan ibu.
- Bagian dasar pasangan, ibu, ayah (dalam skenario terbatas), dan anak sebagai 'ashabah jika ada anak laki-laki.
- Validasi beberapa ahli waris tambahan sebagai tanda untuk pemeriksaan manual.
- Pecahan rasional memakai `BigInt`.

## Batasan penting
Ini **belum** mesin faraid lengkap dan tidak boleh dipakai sebagai penetapan final untuk kasus nyata. Belum lengkap menghitung seluruh kemungkinan hijab, 'aul, radd, Umariyyatain, kakek bersama saudara, dzawil arham, ahli waris pengganti, kasus kehamilan, beda agama, pembunuhan, harta bersama, wasiat wajibah, dan isu hukum lain. Beberapa kombinasi masih menampilkan estimasi dasar dengan peringatan, bukan jawaban final. Harus diverifikasi ahli faraid/ulama kompeten dan diuji terhadap kasus rujukan mazhab Syafi'i serta konteks hukum Indonesia/KHI.

## Catatan teknis
- Pecahan disimpan sebagai pasangan `BigInt` pembilang/penyebut.
- Nominal kelompok ditampilkan dengan pembulatan ke bawah ke rupiah penuh; pecahan rupiah/sisa harus ditangani dengan kebijakan eksplisit.
- Untuk produksi, perlu suite test otomatis untuk setiap kaidah, audit aturan oleh ahli, dan mode “hasil tidak tersedia” pada semua kasus yang belum didukung penuh.

## Logo
Logo Pondok Pesantren Daarul Azmi ditempatkan pada header dan footer melalui `assets/images/logo-daarul-azmi.png`. Banner kalkulator di area hero memakai gambar Open Graph yang dijelaskan di bawah.

## Pratinjau dan berbagi
- Form harta dimulai kosong; nominal contoh hanya muncul sebagai placeholder. Tombol **Kembalikan contoh awal** tetap memuat data simulasi contoh.
- Gambar `assets/images/kalkulator-faraid-og.png` dipakai sebagai banner dan gambar Open Graph/Twitter berukuran 1200×630.
- Tautan **Website Utama** kembali ke halaman utama Daarul Azmi.

## Pembaruan formulir
- Nama pewaris ditambahkan sebagai kolom opsional untuk membantu identifikasi kasus; kolom ini tidak memengaruhi perhitungan.
- Label pasangan kini otomatis menjadi **Istri pewaris** atau **Suami pewaris** berdasarkan jenis kelamin pewaris.
- Petunjuk pasangan dibuat singkat: “Pasangan dari orang yang meninggal.”
- Label dan tampilan form diperjelas tanpa mengubah `faraid-engine.js` atau rumus perhitungan.
- Mesin perhitungan tetap merupakan prototipe terbatas dan harus ditinjau ahli faraid sebelum dipakai untuk kasus nyata.
