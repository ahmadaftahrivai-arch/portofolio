export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'instagram' | 'email'
  /** Shown as the card subtitle on Contact, e.g. '@username'. Optional. */
  handle?: string
}

export interface Profile {
  name: string
  /** Cycled by the typewriter effect under the Hero heading, e.g. ['IT Student', 'Web Dev']. */
  roles: string[]
  tagline: string
  bioHome: string
  bioAbout: string
  resumeUrl: string | null
  /** Path under src/assets, e.g. '/profile-photo.jpg'. Null renders a placeholder. */
  photoUrl: string | null
  /** Second image used for the About morph effect (illustration/alter-ego). Null renders a placeholder. */
  photoMorphUrl: string | null
  socials: SocialLink[]
}

export interface TimelineEntry {
  id: string
  title: string
  subtitle: string
  period: string
  logoUrl: string | null
}

export interface StatEntry {
  label: string
  value: number
  description: string
}

export interface Project {
  id: string
  title: string
  summary: string
  description: string
  imageUrl: string | null
  tech: string[]
  liveUrl: string | null
  repoUrl: string | null
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  imageUrl: string | null
}

export interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export interface TechStackItem {
  name: string
  category: 'language' | 'framework' | 'tool' | 'design'
  /** A simple-icons entry (single SVG path + brand hex color). */
  icon?: { path: string; hex: string }
}
