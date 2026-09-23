import {
  siCss,
  siGithub,
  siHtml5,
  siJavascript,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from 'simple-icons'
import type { TechStackItem } from './types'

// Semua di bawah ini memang dipakai untuk membangun website portfolio ini.
// Tambah/hapus sesuai skill asli kamu. Logo: https://simpleicons.org (import `si<Nama>`).
export const techStack: TechStackItem[] = [
  { name: 'HTML', category: 'language', icon: siHtml5 },
  { name: 'CSS', category: 'language', icon: siCss },
  { name: 'JavaScript', category: 'language', icon: siJavascript },
  { name: 'TypeScript', category: 'language', icon: siTypescript },
  { name: 'React', category: 'framework', icon: siReact },
  { name: 'Tailwind CSS', category: 'framework', icon: siTailwindcss },
  { name: 'Vite', category: 'tool', icon: siVite },
  { name: 'Supabase', category: 'tool', icon: siSupabase },
  { name: 'Vercel', category: 'tool', icon: siVercel },
  { name: 'GitHub', category: 'tool', icon: siGithub },
]
