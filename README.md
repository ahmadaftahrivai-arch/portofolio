# Portfolio Website

Website portofolio satu halaman (dark space theme) — dibuat dengan HTML, CSS, dan JavaScript murni (tanpa build tool), terinspirasi dari referensi video yang diberikan: intro loading dengan efek petir, starfield di background, navbar pill mengambang, dan section Home / About / Portfolio (Projects, Certificates, Awards, Tech Stack) / Contact + Guestbook.

## Cara menjalankan

Cukup buka `index.html` di browser, atau jalankan local server:

```bash
python3 -m http.server 8080
```

lalu buka `http://localhost:8080`.

## Cara kustomisasi

1. **Identitas & teks** — edit langsung di `index.html`:
   - Nama, judul `<title>`, headline di section `#home`.
   - Bio, riwayat pendidikan & organisasi di section `#about`.
   - Link sosial media (GitHub, LinkedIn, Instagram, email) di section `#home` dan `#contact`.
   - Ganti inisial avatar (`AA`) dengan foto asli: ganti `<div class="w-40 h-40 ...">AA</div>` dengan `<img>`.

2. **Projects / Certificates / Awards / Tech Stack** — edit array data di bagian atas
   `assets/js/main.js` (`projectsData`, `certificatesData`, `awardsData`, `techStackData`).
   Tampilan akan otomatis mengikuti data tersebut.

3. **Resume** — ganti file `assets/resume.pdf` dengan CV asli kamu (nama file harus tetap sama,
   atau ubah link `href` di tombol "View Resume").

4. **Form kontak** — form saat ini hanya menampilkan notifikasi lokal (belum terhubung ke
   backend). Untuk membuatnya benar-benar mengirim email, hubungkan ke layanan seperti
   [Formspree](https://formspree.io) atau [EmailJS](https://www.emailjs.com/):
   lihat komentar `EDIT:` di `assets/js/main.js` bagian `initContactForm()`.

5. **Guestbook** — komentar disimpan di `localStorage` browser pengunjung (demo, tidak
   dibagikan antar pengunjung). Untuk guestbook publik sungguhan, perlu backend/database.

## Struktur folder

```
index.html
assets/
  css/style.css   -> semua styling & animasi
  js/main.js      -> data konten + interaktivitas (starfield, loader, tabs, dll)
  img/            -> favicon & aset gambar
  resume.pdf      -> placeholder CV (ganti dengan CV asli)
```

## Deploy

Bisa langsung di-deploy ke Vercel, Netlify, atau GitHub Pages karena hanya file statis
(tidak butuh build step).
