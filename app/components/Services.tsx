'use client'

import { useState } from 'react'
import Image from 'next/image'

const servicesData = [
  {
    id: 'construction',
    title: "CONSTRUCTION DE BÂTIMENTS",
    desc: "Description détaillée pour la construction de bâtiments : Nous gérons toutes les phases du gros œuvre jusqu'aux finitions avec une expertise technique garantie."
  },
  {
    id: 'renovation',
    title: "RÉNOVATION MAISON",
    desc: "1. Évaluation et Planification : Faites inspecter votre maison par des professionnels pour identifier les zones qui nécessitent des réparations ou des améliorations. Définir vos besoins et priorités : Listez les travaux à réaliser, qu'il s'agisse de réparations structurelles, d'améliorations esthétiques, ou d'augmenter l'efficacité énergétique. Établir un budget : Calculez combien vous êtes prêt à dépenser pour chaque partie du projet."
  },
  {
    id: 'architecture',
    title: "ARCHITECTURE ET DESIGN",
    desc: "Nous concevons des plans architecturaux innovants et fonctionnels, adaptés à vos besoins spécifiques et aux normes en vigueur."
  },
  {
    id: 'design',
    title: "DESIGN INTÉRIEUR",
    desc: "Optimisation de vos espaces intérieurs pour allier esthétique, confort et ergonomie."
  },
  {
    id: 'peinture',
    title: "PEINTURE",
    desc: "Solutions de peinture intérieure et extérieure avec des matériaux durables et une finition impeccable."
  },
  {
    id: 'consultation',
    title: "CONSULTATIONS ET QUALITÉ",
    desc: "Accompagnement conseil et contrôle qualité tout au long de votre projet pour assurer la conformité et la satisfaction."
  }
]

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>('renovation') // الخدمة المفتوحة افتراضياً

  return (
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

    {/* Image */}
    <div className="relative w-full h-[250px] md:h-full bg-gray-200 rounded-sm overflow-hidden">
      <Image
        src="/images/chantier.jfif"
        alt="Construction"
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* Accordion */}
    <div className="flex flex-col">
      <h2 className="text-4xl font-black text-[#0B2545] mb-8">NOS SERVICES</h2>

      <div className="flex flex-col gap-2">
        {servicesData.map((service) => (
          <div key={service.id} className="border-b border-gray-100">
            <button
              onClick={() => setOpenId(openId === service.id ? null : service.id)}
              className={`w-full flex justify-between items-center py-4 px-4 font-bold uppercase transition-colors ${
                openId === service.id
                  ? 'bg-[#F5A623] text-white'
                  : 'bg-gray-50 text-[#0B2545] hover:bg-gray-100'
              }`}
            >
              {service.title}
              <span>{openId === service.id ? '-' : '+'}</span>
            </button>

            {openId === service.id && (
              <div className="p-6 bg-white border border-gray-100 text-gray-600 leading-relaxed text-sm animate-in fade-in slide-in-from-top-2">
                {service.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  )
}