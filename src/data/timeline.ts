import type { StatEntry, TimelineEntry } from './types'

// TODO(kamu): Ganti dengan riwayat pendidikan asli kamu, urut dari terbaru.
export const education: TimelineEntry[] = [
  {
    id: 'edu-1',
    title: 'TODO: Nama Kampus/Sekolah',
    subtitle: 'TODO: Jurusan/Fakultas',
    period: 'TODO: 2025 - Sekarang',
    logoUrl: null,
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
