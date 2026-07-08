'use client'
import { useState, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);

    // الـ IDs الخاصة بك بعد الربط
    const serviceId = 'service_fgs9f8b';
    const templateId = 'template_zlv71dv';
    const publicKey = 'gFjxwAAV-JbH2O6vq'; // <--- ضع الـ Key هنا

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        alert('Message envoyé avec succès !');
        setLoading(false);
        form.current?.reset();
      }, (error) => {
        alert('Erreur lors de l\'envoi : ' + error.text);
        setLoading(false);
      });
  }

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* الجزء العلوي: المعلومات والخريطة */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] uppercase mb-12">
              PRENEZ CONTACT NOUS
            </h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-[#F5A623] font-bold text-[10px] uppercase tracking-widest mb-2">Email Address</h4>
                <p className="text-[#0B2545] text-sm">contact@emtp-construction.com</p>
              </div>
              <div>
                <h4 className="text-[#F5A623] font-bold text-[10px] uppercase tracking-widest mb-2">Numéro de téléphone</h4>
                <p className="text-[#0B2545] text-sm">+216 56 556 844</p>
              </div>
              <div>
                <h4 className="text-[#F5A623] font-bold text-[10px] uppercase tracking-widest mb-2">Adresse du bureau</h4>
                <p className="text-[#0B2545] text-sm">19, rue Habib Bourguiba Djerba Tunisie</p>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full border border-gray-200 shadow-sm overflow-hidden rounded-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.411603512217!2d10.887635675404557!3d33.818318173268886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1255555555555555%3A0x1255555555555555!2sEMTP%20Entreprise%20Mahboubine%20de%20travaux%20publics!5e0!3m2!1sfr!2stn!4v1717850000000!5m2!1sfr!2stn" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>

        {/* الجزء السفلي: النموذج */}
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
            
            <button type="submit" disabled={loading} className="bg-[#0B2545] text-white py-4 px-10 w-fit font-black text-xs uppercase hover:bg-[#F5A623] transition-colors shadow-lg">
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