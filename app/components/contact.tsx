'use client'

import { useEffect, useState, useRef, type FormEvent } from 'react'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

type Toast = { type: 'success' | 'error'; message: string }

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(() => setToast(null), 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return

    setLoading(true)
    setToast(null)

    const payload = Object.fromEntries(new FormData(form.current).entries())

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Erreur lors de l'envoi.")
      }

      setToast({ type: 'success', message: 'Votre message a bien été envoyé.' })
      form.current?.reset()
    } catch (error) {
      setToast({
        type: 'error',
        message: error instanceof Error ? error.message : "Erreur lors de l'envoi.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Contact Info + Map */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] uppercase mb-12">
              PRENEZ CONTACT AVEC NOUS
            </h2>
            <div className="space-y-8">
              {/* Email */}
              <ul>
                <li className="text-[#FFCC00] font-bold text-[10px] uppercase tracking-widest mb-2">Email Address</li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-[#F5A623]" />
                  <a href="mailto:contact@emtp-btp.com" className="text-[#0B2545] text-sm">
                    contact@emtp-btp.com
                  </a>
                </li>
              </ul>

              {/* Phone */}
              <ul>
                <li className="text-[#F5A623] font-bold text-[10px] uppercase tracking-widest mb-2">Numéro de téléphone</li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[#F5A623]" />
                  <a href="tel:+2250720287979" className="text-[#0B2545] text-sm">+225 07 20 28 79 79</a>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[#F5A623]" />
                  <a href="tel:+33758275635" className="text-[#0B2545] text-sm">+33 758 275 635</a>
                </li>
              </ul>

              {/* Address */}
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                <li>
                  <h4 className="text-[#F5A623] font-bold text-[10px] uppercase tracking-widest mb-2">Adresse du bureau</h4>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-[#F5A623]" />
                  <span className="text-[#0B2545] text-sm">Cocody - Angre 8ème Tranche, Abidjan, Côte d’Ivoire</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="h-113 w-full border border-gray-200 shadow-sm overflow-hidden rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.123157806408!2d-3.97459822418579!3d5.398200235214644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc19300643fb5e1%3A0xfc40783a98cc7331!2sCocody%20Angr%C3%A9%208%C3%A8me%20tranche!5e0!3m2!1sfr!2stn!4v1784752656915!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="EMTP Côte d'Ivoire - Cocody Angré 8ème Tranche"
            />
          </div>
        </div>

        {/* Form */}
        <div className="border-t border-gray-100 pt-16">
          <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Nom-Prénom *" name="name" />
              <InputField label="Votre mail *" name="email" />
            </div>
            <InputField label="Votre numéro de téléphone *" name="phone" />
            <InputField label="Objet *" name="subject" />

            <div>
              <label htmlFor="message" className="block text-[10px] font-bold text-[#0B2545] uppercase mb-2">Commentaire ou message *</label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full border border-gray-200 p-3 h-32 focus:border-[#F5A623] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0B2545] text-white py-4 px-10 w-fit font-black text-xs uppercase hover:bg-[#F5A623] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>

            {toast && (
              <div
                className={`max-w-2xl rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
                  toast.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      toast.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {toast.type === 'success' ? '✓' : '!'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {toast.type === 'success' ? 'Succès' : 'Erreur'}
                    </p>
                    <p className="mt-1 text-sm">{toast.message}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold text-[#0B2545] uppercase mb-2">{label}</label>
      <input
        id={name}
        type="text"
        name={name}
        required
        className="w-full border border-gray-200 p-3 focus:border-[#F5A623] outline-none transition-all"
      />
    </div>
  )
}
