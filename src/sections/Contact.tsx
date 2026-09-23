import { useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/Reveal'
import { GuestbookComments } from '../components/GuestbookComments'
import { SocialCard } from '../components/SocialCard'
import { profile } from '../data/profile'

const CONTACT_EMAIL = profile.socials
  .find((s) => s.icon === 'email')
  ?.url.replace(/^mailto:/, '')

// Public Web3Forms access key (safe to ship to the browser). Without it the
// form falls back to opening the visitor's email app via mailto:.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

type SendStatus = 'idle' | 'sending' | 'sent' | 'error' | 'mailto'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<SendStatus>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!WEB3FORMS_KEY) {
      const to = CONTACT_EMAIL ?? 'TODO@example.com'
      const subject = encodeURIComponent(`Pesan dari ${name || 'website portfolio'}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
      // Without a mail app this does nothing visible, so always say so.
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Pesan dari ${name} lewat website portfolio`,
          from_name: name,
          name,
          email,
          message,
        }),
      })
      const data: { success?: boolean } = await res.json()
      if (!res.ok || !data.success) throw new Error('send failed')
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-bold text-ink-100">Find Me</h2>
        <p className="mt-3 text-center text-sm text-ink-500">
          Ada yang mau didiskusikan? Langsung kirim pesan aja ya..!
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              required
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
            />
            <textarea
              required
              rows={5}
              placeholder="Pesan Anda"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
            />
            <Button type="submit" className="self-start disabled:opacity-60" disabled={status === 'sending'}>
              {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </Button>
            {status === 'sent' && (
              <p role="status" className="text-sm text-emerald-400">
                Pesan terkirim, makasih! Nanti aku balas lewat email.
              </p>
            )}
            {status === 'mailto' && (
              <p role="status" className="text-sm text-ink-300">
                Aplikasi email kamu harusnya kebuka. Kalau nggak ada yang muncul, kirim langsung ke{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-400 underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-sm text-red-400">
                Pesan gagal terkirim. Coba lagi, atau email langsung ke{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}
          </form>

          <div className="mt-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Find Me
            </p>
            <div className="flex flex-col gap-3">
              {profile.socials.map((social) => (
                <SocialCard key={social.label} social={social} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delayMs={100}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
        >
          <GuestbookComments />
        </Reveal>
      </div>
    </section>
  )
}
