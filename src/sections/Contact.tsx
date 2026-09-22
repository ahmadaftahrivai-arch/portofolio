import { useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/Reveal'
import { GuestbookComments } from '../components/GuestbookComments'
import { SocialCard } from '../components/SocialCard'
import { profile } from '../data/profile'

const CONTACT_EMAIL = profile.socials.find((s) => s.icon === 'email')?.url

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const to = CONTACT_EMAIL ?? 'TODO@example.com'
    const subject = encodeURIComponent(`Pesan dari ${name || 'website portfolio'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-semibold text-ink-100">Contact</h2>
        <p className="mt-3 text-center text-sm text-ink-500">
          Ada yang mau didiskusikan? Langsung kirim pesan aja ya..!
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal>
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
            <Button type="submit" className="self-start">
              Kirim Pesan
            </Button>
            {!CONTACT_EMAIL || CONTACT_EMAIL.includes('TODO') ? (
              <p className="text-xs text-ink-500">
                Catatan: tombol ini membuka aplikasi email lewat link{' '}
                <code className="text-ink-300">mailto:</code>. Isi email asli kamu di{' '}
                <code className="text-ink-300">data/profile.ts</code> (tambahkan entri social
                dengan <code className="text-ink-300">icon: 'email'</code>). Kalau mau form ini
                benar-benar mengirim tanpa membuka email client, sambungkan ke layanan seperti
                Formspree atau Resend — bagian itu sengaja belum dipasang otomatis.
              </p>
            ) : null}
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

        <Reveal delayMs={100}>
          <GuestbookComments />
        </Reveal>
      </div>
    </section>
  )
}
