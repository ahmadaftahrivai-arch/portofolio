import { useState } from 'react'
import { Placeholder } from './ui/Placeholder'

interface PhotoMorphProps {
  primaryUrl: string | null
  altUrl: string | null
  alt: string
}

/**
 * Crossfades between two images on hover/focus (e.g. an illustration and a
 * real photo). Falls back to an honest placeholder when an image is missing
 * instead of substituting stock art.
 */
export function PhotoMorph({ primaryUrl, altUrl, alt }: PhotoMorphProps) {
  const [hovered, setHovered] = useState(false)

  if (!primaryUrl && !altUrl) {
    return (
      <Placeholder
        className="aspect-[3/4] w-full max-w-sm"
        label="Foto profil belum diisi"
        hint="Taruh foto di src/assets/, import di data/profile.ts (photoUrl) dan opsional photoMorphUrl untuk efek hover."
      />
    )
  }

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative aspect-[3/4] w-full max-w-sm overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      aria-label={altUrl ? 'Hover untuk lihat versi lain' : alt}
    >
      {primaryUrl && (
        <img
          src={primaryUrl}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            hovered && altUrl ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      {altUrl && (
        <img
          src={altUrl}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {!primaryUrl && altUrl && (
        <Placeholder className="absolute inset-0" label="photoUrl belum diisi" />
      )}
    </button>
  )
}
