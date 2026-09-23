import type { Profile } from './types'
import profilePhoto from '../assets/profile.png'
import profileSpiderman from '../assets/profile-spiderman.webp'

// TODO(kamu): Ganti semua nilai di bawah ini dengan data asli kamu.
export const profile: Profile = {
  name: 'Ahmad Aftah Rivai',
  roles: ['IT Student', 'Web Dev'],
  // Baris pertama headline Hero — jaga tetap pendek (2-4 kata), mis. "Turning Ideas".
  // Baris kedua ("Into Reality") ada di kode Home.tsx, ganti langsung di sana kalau perlu.
  tagline: 'Turning Ideas',
  bioHome:
    'Mahasiswa IT yang fokus di web development. Aku suka mengubah ide jadi produk digital yang bukan cuma jalan, tapi juga enak dipakai.',
  bioAbout:
    'Sebagai mahasiswa IT, aku fokus membangun aplikasi web yang fungsional sekaligus nyaman digunakan. Berawal dari rasa penasaran coba-coba ngoding, sekarang aku terus belajar teknologi baru untuk menghadirkan pengalaman digital yang lebih baik.',
  resumeUrl: null, // TODO: taruh file CV di public/resume.pdf lalu isi '/resume.pdf'
  photoUrl: profilePhoto,
  photoMorphUrl: profileSpiderman,
  socials: [
    // TODO: isi URL LinkedIn asli kamu (atau hapus barisnya kalau tidak dipakai)
    { label: 'GitHub', url: 'https://github.com/ahmadaftahrivai-arch', icon: 'github', handle: '@ahmadaftahrivai-arch' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/TODO', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://www.instagram.com/ahmdafth/', icon: 'instagram', handle: '@ahmdafth' },
    { label: 'Email', url: 'mailto:ahmadaftahrivai@gmail.com', icon: 'email', handle: 'ahmadaftahrivai@gmail.com' },
  ],
}
