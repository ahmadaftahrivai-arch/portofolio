import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: string[]
  typingSpeedMs?: number
  deletingSpeedMs?: number
  pauseMs?: number
  className?: string
}

/**
 * Types out each word, pauses, deletes it, then moves to the next — cycling
 * forever. Skips straight to the first word under prefers-reduced-motion.
 */
export function Typewriter({
  words,
  typingSpeedMs = 90,
  deletingSpeedMs = 45,
  pauseMs = 1400,
  className = '',
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }

    const current = words[wordIndex % words.length]
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      timeout = window.setTimeout(
        () => setText(next),
        deleting ? deletingSpeedMs : typingSpeedMs,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs])

  return (
    <span className={className}>
      {text}
      <span
        className="animate-blink -mb-0.5 ml-0.5 inline-block h-[1em] w-[2px] align-middle bg-current"
        aria-hidden="true"
      />
    </span>
  )
}
