'use client'

import { useState } from 'react'
import Image from "next/image";

const aproposData = [
  {
    id: 'construction',
    icon: '/icons/construct-bat.png',
    tabTitle: "CONSTRUCTION D'UN BÂTIMENT",
    mainTitle: 'PLANIFIER ET STRUCTURER',
    desc: 'Préparer et organiser le chantier en accord avec les bonnes pratiques, de la connaissance des signes et le respect des normes de sécurité.',
    bgImage: '/images/batiment.jpg',
  },
  {
    id: 'architecture',
    icon: '/icons/architecture.png',
    tabTitle: 'ARCHITECTURE ET DESIGN',
    mainTitle: 'CONCEPTION ET AMÉNAGEMENT',
    desc: 'Nous travaillons avec vous pour élaborer des immobiliers où il fait bon vivre, combinant esthétique moderne et fonctionnalité optimale.',
    bgImage: '/images/architecture.jpg',
  },
  {
    id: 'design',
    icon: '/icons/interior-design.png',
    tabTitle: 'DESIGN INTÉRIEUR',
    mainTitle: 'DÉCORATION INTÉRIEURE',
    desc: 'Nous vous accompagnons à aménager, organiser et décorer votre intérieur pour créer des ambiances qui vous ressemblent.',
    bgImage: '/images/imi.jpg',
  },
  {
    id: 'peinture',
    icon: '/icons/peinture.png',
    tabTitle: 'PEINTURE',
    mainTitle: 'DÉCORATION MURALE',
    desc: 'Nous mettons l’accent sur la qualité des matériaux, produits et peintures pour sublimer vos espaces.',
    bgImage: '/images/5.jpg',
  }
]

export default function PagePrincipale() {
  const [activeTab, setActiveTab] = useState('construction')

  const active = aproposData.find((service) => service.id === activeTab) || aproposData[0]

  return (
    <section className="min-h-screen flex flex-col justify-center bg-white py-20 font-sans text-[#0B2545] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Tabs */}
          <div className="relative mb-16">
            <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none">
              {aproposData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex-1 min-w-65 flex items-center justify-start gap-5 pl-8 pr-4 py-10 text-base font-black tracking-wider uppercase text-[#0B2545] transition-all ${
                    activeTab === service.id ? 'bg-gray-50/80 shadow-sm' : 'hover:bg-gray-50/50'
                  }`}
                >
                  {service.icon ? (
                    <Image
                      src={service.icon}
                      alt={`${service.tabTitle} icon`}
                      width={84}
                      height={84}
                      className="object-contain shrink-0"
                    />
                  ) : (
                    <span className="text-xl">{service.icon}</span>
                  )}
                  <span
                    className="text-left leading-tight -translate-y-4 text-[#0B2545]"
                    style={{ WebkitTextStroke: '0.5px #0B2545' }}
                  >
                    {service.tabTitle}
                  </span>
                </button>
              ))}
            </div>
            <div
              className="absolute left-0 top-full h-1 bg-[#F5A623] transition-transform duration-300 ease-in-out"
              style={{
                width: `${100 / aproposData.length}%`,
                transform: `translateX(${aproposData.findIndex((service) => service.id === activeTab) * 100}%)`,
              }}
            />
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="relative w-full h-105 rounded-sm overflow-hidden shadow-sm">
  <Image
    src={active.bgImage}
    alt={active.tabTitle}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
    className="object-cover"
  />

              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-tr-[120px] flex flex-col justify-between p-8 border-t border-r border-gray-50">
                <Image
                  src={active.icon}
                  alt=""
                  width={88}
                  height={88}
                  className="object-contain"
                />
                <span
                  className="text-lg font-black tracking-widest uppercase text-[#0B2545] leading-snug"
                  style={{ WebkitTextStroke: '0.75px #0B2545' }}
                >
                  {active.tabTitle}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center pl-4 md:pl-8">
              <h3 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-[#0B2545] mb-6 leading-none">
                {active.mainTitle}
              </h3>
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-md mb-8">
                {active.desc}
              </p>
              <div>
                <button className="px-10 py-4 bg-[#b07d2a] hover:bg-[#0B2545] text-white font-black text-xs tracking-widest uppercase transition-colors rounded-sm">
                  DEMANDE DE DEVIS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
