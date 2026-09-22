# Portofolio

Portfolio pribadi — React + TypeScript + Vite + Tailwind CSS v4.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Build production: `npm run build`. Lint: `npm run lint`.

## Struktur

```
src/
  data/        <- SEMUA konten (bio, project, sertifikat, award, tech stack).
               Isi ulang file-file ini dengan data asli kamu, tandai TODO.
  sections/    Home, About, Portfolio, Contact — satu section per file.
  components/  Navbar, Starfield, IntroLoader, kartu-kartu, dst.
  lib/         Hook kecil (active-section tracking, state tab portfolio).
```

## Checklist konten yang perlu kamu isi

Semua ditandai `TODO` di kode agar gampang dicari (`grep -rn "TODO" src`).

- [ ] `src/data/profile.ts` — nama, role, tagline (pendek!), bio, link CV, foto, sosial media
- [ ] `src/data/timeline.ts` — riwayat pendidikan & organisasi/pengalaman
- [ ] `src/data/projects.ts` — daftar project (judul, deskripsi, screenshot, link live/repo)
- [ ] `src/data/certificates.ts` — sertifikat (gambar/scan)
- [ ] `src/data/awards.ts` — penghargaan/pencapaian
- [ ] `src/data/techStack.ts` — tools & bahasa yang benar-benar kamu kuasai
- [ ] `src/data/music.ts` — opsional, widget "Currently Listening" (perlu embed URL Spotify asli)
- [ ] `public/resume.pdf` — CV, lalu set `resumeUrl: '/resume.pdf'` di `profile.ts`
- [ ] `index.html` — ganti `<title>` dan meta description
- [ ] Contact form (`src/sections/Contact.tsx`) pakai `mailto:` bawaan browser. Kalau mau
      submit langsung tanpa buka aplikasi email, sambungkan ke layanan seperti
      Formspree/Resend — ini sengaja belum dipasang otomatis.

## Gambar

Taruh aset di `src/assets/` (untuk yang di-import lewat kode, kena hash saat build) atau
`public/` (untuk path statis, mis. `/resume.pdf`, favicon). Tidak ada gambar stok/placeholder
AI di project ini — semua slot foto/gambar yang belum diisi akan tampil sebagai kotak
placeholder dengan keterangan jelas, bukan gambar palsu.
