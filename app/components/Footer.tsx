'use client'

import Link from 'next/link'
import { FaFacebookF, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0B2545] text-white font-sans pt-16 pb-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Colonne 1: A propos & Brand */}
        <div>
          <h3 className="text-[#F5A623] text-xl font-black tracking-wider mb-4">EMTP</h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
            Entreprise spécialisée dans les travaux publics, la construction, l'architecture et le design intérieur. Nous concrétisons vos projets avec expertise et rigueur.
          </p>
        </div>

        {/* Colonne 2: Liens Utiles */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Liens Utiles</h4>
          <ul className="space-y-2.5 text-sm text-gray-400 font-light">
            {/* Utilisation des ancres # pour naviguer vers les sections */}
            <li><Link href="/#a-propos" className="hover:text-[#F5A623] transition-colors">À Propos</Link></li>
            <li><Link href="/#services" className="hover:text-[#F5A623] transition-colors">Nos Services</Link></li>
            <li><Link href="/#projets" className="hover:text-[#F5A623] transition-colors">Nos Projets</Link></li>
            <li><Link href="/#contact" className="hover:text-[#F5A623] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3: Contact Infos */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#F5A623]" />
              <span>Cocody - Angre 8ème Tranche, Abidjan, Côte d’Ivoire</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#F5A623]" />
              <a href="tel:+2250720287979" className="hover:text-white transition-colors">+225 07 20 28 79 79</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#F5A623]" />
              <a href="mailto:contact@emtp-construction.com" className="hover:text-white transition-colors">contact@emtp-construction.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bar bas de page */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-xs text-gray-500 font-light">
        <p>&copy; {currentYear} EMTP. Tous droits réservés.</p>
      </div>
    </footer>
  )
}