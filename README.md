# Sutanology

Situs personal dan pengenalan layanan, dengan identitas biru–teal dari gambar pemilik. Portofolio lama sengaja tidak ditampilkan.

- `index.html`: pembuka, kemampuan, profil, alur kerja, dan kontak langsung.
- `home.css`: layout responsif, tema terang/gelap, dan penempatan logo.
- `translations.js`: konten Jepang, Inggris, Indonesia, Mandarin, dan Korea.
- `home.js`: bahasa, tema, navigasi ponsel, dan subjek email sesuai layanan yang dipilih.
- `assets/brand-*.png`: empat gambar asli pemilik, disalin tanpa mengubah file gambar. Penempatan dan pemotongan ruang kosong hanya memakai CSS. Logo S transparan dipakai sebagai favicon; varian S berlatar putih dipakai sebagai Apple touch icon.

Buka `index.html` di browser, atau jalankan `python -m http.server 8000` di folder ini. Tidak ada dependency atau proses build. `profile.html` mempertahankan pengalihan lama ke beranda.

Bahasa Jepang menjadi default setiap membuka situs. Tema disimpan di browser jika penyimpanan tersedia. Kontak memakai email, telepon, dan Instagram yang sudah ada sebelumnya. Tombol email membuka aplikasi email pengunjung; situs tidak mengirim pesan secara otomatis. Memilih salah satu layanan menambahkan subjek pada tautan email tanpa mengirim apa pun.

Deployment menggunakan branch `main` repository `suta-nology/Sutanology` yang terhubung ke Vercel: https://sutanology.vercel.app/ .
