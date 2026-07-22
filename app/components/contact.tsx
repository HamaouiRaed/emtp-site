'use client'

import { useState, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return

    setLoading(true)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        alert('Message envoyé avec succès !')
        setLoading(false)
        form.current?.reset()
      })
      .catch((error) => {
        alert("Erreur lors de l'envoi : " + error.text)
        setLoading(false)
      })
  }

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">

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
                  <a href="mailto:contact@emtp-construction.com" className="text-[#0B2545] text-sm">
                    contact@emtp-construction.com
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
          <div className="h-450px w-full border border-gray-200 shadow-sm overflow-hidden rounded-sm">
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
              <label className="block text-[10px] font-bold text-[#0B2545] uppercase mb-2">Commentaire ou message *</label>
              <textarea
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
          </form>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-[#0B2545] uppercase mb-2">{label}</label>
      <input
        type="text"
        name={name}
        required
        className="w-full border border-gray-200 p-3 focus:border-[#F5A623] outline-none transition-all"
      />
    </div>
  )
}
