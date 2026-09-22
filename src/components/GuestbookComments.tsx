import { useEffect, useState, type FormEvent } from 'react'
import { Button } from './ui/Button'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { formatRelativeTime } from '../lib/formatRelativeTime'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  created_at: string
}

const NAME_MAX = 60
const MESSAGE_MAX = 500

export function GuestbookComments() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return

    let cancelled = false

    supabase
      .from('comments')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setLoadError(error.message)
        } else {
          setEntries(data ?? [])
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setSubmitting(true)
    setSubmitError(null)

    const { data, error } = await supabase
      .from('comments')
      .insert({ name: name.trim(), message: message.trim() })
      .select('id, name, message, created_at')
      .single()

    setSubmitting(false)

    if (error) {
      setSubmitError(error.message)
      return
    }

    if (data) {
      setEntries((prev) => [data, ...prev])
    }
    setName('')
    setMessage('')
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center">
        <p className="text-sm font-semibold text-ink-100">Komentar belum terhubung</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-500">
          Fitur ini butuh database Supabase. Buat project gratis di{' '}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="text-accent-400 underline underline-offset-2"
          >
            supabase.com
          </a>
          , jalankan SQL dari <code className="text-ink-300">README.md</code> untuk bikin tabel{' '}
          <code className="text-ink-300">comments</code>, lalu isi{' '}
          <code className="text-ink-300">VITE_SUPABASE_URL</code> dan{' '}
          <code className="text-ink-300">VITE_SUPABASE_ANON_KEY</code> di{' '}
          <code className="text-ink-300">.env.local</code> (dan di Environment Variables Vercel
          untuk production).
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-ink-100">Komentar {entries.length > 0 && `(${entries.length})`}</h3>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          required
          maxLength={NAME_MAX}
          placeholder="Masukkan nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
        />
        <textarea
          required
          rows={4}
          maxLength={MESSAGE_MAX}
          placeholder="Tulis komentar kamu di sini..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
        />
        <Button type="submit" disabled={submitting} className="self-start disabled:opacity-60">
          {submitting ? 'Mengirim...' : 'Kirim Komentar'}
        </Button>
        {submitError && <p className="text-xs text-red-400">{submitError}</p>}
      </form>

      <div className="mt-6 flex flex-col gap-3">
        {loading && <p className="text-xs text-ink-500">Memuat komentar...</p>}
        {loadError && <p className="text-xs text-red-400">Gagal memuat komentar: {loadError}</p>}
        {!loading && !loadError && entries.length === 0 && (
          <p className="text-xs text-ink-500">Belum ada komentar. Jadi yang pertama!</p>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-xs font-semibold text-accent-400">
                {entry.name.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-100">{entry.name}</p>
                <p className="text-sm text-ink-300">{entry.message}</p>
              </div>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-ink-500">
              {formatRelativeTime(entry.created_at)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
