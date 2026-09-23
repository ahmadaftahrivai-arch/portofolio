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

## Guestbook (komentar publik di Contact)

Section Contact punya kolom "Komentar" yang bisa diisi pengunjung (nama + pesan,
tersimpan permanen dan kelihatan oleh semua orang). Ini butuh database Supabase —
sampai kamu setup, kolom ini otomatis nampilin pesan "belum terhubung", bukan data
palsu.

Setup (gratis, ~5 menit):

1. Buat akun & project baru di [supabase.com](https://supabase.com).
2. Di dashboard project, buka **SQL Editor** → jalankan:

   ```sql
   create table if not exists comments (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     message text not null,
     created_at timestamptz not null default now()
   );

   alter table comments enable row level security;

   create policy "Public can read comments"
     on comments for select
     using (true);

   create policy "Public can insert comments"
     on comments for insert
     with check (true);
   ```

3. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
4. Buat file `.env.local` di root project (salin dari `.env.example`) dan isi:

   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

5. Untuk versi live (Vercel): buka **Project Settings → Environment Variables**,
   tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` yang sama, lalu redeploy.

Catatan: policy di atas mengizinkan siapa saja menulis komentar (guestbook publik,
sama seperti referensinya) — tidak ada login. Kalau nanti spam jadi masalah, opsi
paling gampang adalah menambah rate-limit atau captcha di depan form ini.

## Form "Kirim Pesan" (Contact)

Form dikirim lewat [Web3Forms](https://web3forms.com) dan pesannya masuk ke email kamu.

1. Buka https://web3forms.com, masukkan email kamu, lalu ambil **Access Key** yang dikirim ke email.
2. Di Vercel → Project → Settings → Environment Variables, tambahkan
   `VITE_WEB3FORMS_KEY` = access key tadi, lalu redeploy.
3. Untuk lokal, isi juga di `.env.local`.

Access key ini memang dirancang untuk dipakai di browser (bukan rahasia). Kalau belum
diisi, tombol "Kirim Pesan" jatuh balik ke `mailto:` (membuka aplikasi email pengunjung).

## Gambar

Taruh aset di `src/assets/` (untuk yang di-import lewat kode, kena hash saat build) atau
`public/` (untuk path statis, mis. `/resume.pdf`, favicon). Tidak ada gambar stok/placeholder
AI di project ini — semua slot foto/gambar yang belum diisi akan tampil sebagai kotak
placeholder dengan keterangan jelas, bukan gambar palsu.
