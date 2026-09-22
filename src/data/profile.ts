import type { Profile } from './types'

// TODO(kamu): Ganti semua nilai di bawah ini dengan data asli kamu.
export const profile: Profile = {
  name: 'TODO: Nama Lengkap Kamu',
  role: 'TODO: Peran/status kamu, mis. "Mahasiswa Ilmu Komputer"',
  // Baris pertama headline Hero — jaga tetap pendek (2-4 kata), mis. "Turning Ideas".
  // Baris kedua ("Into Reality") ada di kode Home.tsx, ganti langsung di sana kalau perlu.
  tagline: 'TODO: Tagline Pendek',
  bioHome:
    'TODO: 2-3 kalimat pembuka di section Home. Ceritakan fokus kamu dan apa yang kamu bangun.',
  bioAbout:
    'TODO: 2-4 kalimat bio lebih detail untuk section About. Latar belakang, kampus/jurusan, minat.',
  resumeUrl: null, // TODO: taruh file CV di public/resume.pdf lalu isi '/resume.pdf'
  photoUrl: null, // TODO: taruh foto profil di src/assets/profile.jpg lalu import & isi di sini
  photoMorphUrl: null, // TODO: gambar kedua untuk efek morph (opsional), src/assets/profile-alt.jpg
  socials: [
    // TODO: isi URL & handle asli kamu, hapus baris yang tidak dipakai
    { label: 'GitHub', url: 'https://github.com/TODO', icon: 'github', handle: '@TODO' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/TODO', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://instagram.com/TODO', icon: 'instagram', handle: '@TODO' },
  ],
}
