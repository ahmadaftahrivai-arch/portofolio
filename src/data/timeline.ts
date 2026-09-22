import type { StatEntry, TimelineEntry } from './types'
import umcLogo from '../assets/umc-logo.webp'
import sman1SumberLogo from '../assets/sman1-sumber-logo.webp'

export const education: TimelineEntry[] = [
  {
    id: 'edu-1',
    title: 'Universitas Muhammadiyah Cirebon',
    subtitle: 'Fakultas Teknik - Teknik Informatika',
    period: '2023 - Sekarang',
    logoUrl: umcLogo,
  },
  {
    id: 'edu-2',
    title: 'SMA Negeri 1 Sumber',
    subtitle: 'IPS',
    period: '2020 - 2023',
    logoUrl: sman1SumberLogo,
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
