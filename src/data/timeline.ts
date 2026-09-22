import type { StatEntry, TimelineEntry } from './types'
import umcLogo from '../assets/umc-logo.webp'

// TODO(kamu): Ganti dengan riwayat pendidikan asli kamu, urut dari terbaru.
export const education: TimelineEntry[] = [
  {
    id: 'edu-1',
    title: 'Universitas Muhammadiyah Cirebon',
    subtitle: 'Fakultas Teknik - Teknik Informatika',
    period: 'TODO: tahun masuk - Sekarang', // TODO: isi tahun masuk kamu, mis. "2023 - Sekarang"
    logoUrl: umcLogo,
  },
]

// TODO(kamu): Ganti dengan organisasi/pengalaman kerja asli kamu.
export const experience: TimelineEntry[] = [
  {
    id: 'exp-1',
    title: 'TODO: Nama Organisasi/Perusahaan',
    subtitle: 'TODO: Peran kamu',
    period: 'TODO: 2025 - Sekarang',
    logoUrl: null,
  },
]

// Angka ini dihitung otomatis dari data/projects.ts, data/certificates.ts, data/awards.ts
// di src/sections/About.tsx — jangan diisi manual di sini.
export type { StatEntry }
