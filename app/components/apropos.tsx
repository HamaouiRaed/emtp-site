'use client'

import { useState } from 'react'
import Image from "next/image";

const aproposData = [
  {
    id: 'construction',
    num: '01',
    icon: '/icons/construct-bat.png',  
    tabTitle: "CONSTRUCTION D'UN BÂTIMENT",
    mainTitle: 'PLANIFIER ET STRUCTURER',
    desc: 'Préparer et organiser le chantier en accord avec les bonnes pratiques, de la connaissance des signes et le respect des normes de sécurité.',
    bgImage: '/images/batiment.jpg',
  },
  {
    id: 'architecture',
    icon: '/icons/architecture.png', 
    num: '02',
    tabTitle: 'ARCHITECTURE ET DESIGN',
    mainTitle: 'CONCEPTION ET AMÉNAGEMENT',
    desc: 'Nous travaillons avec vous pour élaborer des immobiliers où il fait bon vivre, combinant esthétique moderne et fonctionnalité optimale.',
    bgImage: '/images/architecture.jpg',
  },
  {
    id: 'design',
    icon: '/icons/interior-design.png', 
    num: '03',
    tabTitle: 'DESIGN INTÉRIEUR',
    mainTitle: 'DÉCORATION INTÉRIEURE',
    desc: 'Nous vous accompagnons à aménager, organiser et décorer votre intérieur pour créer des ambiances qui vous ressemblent.',
    bgImage: '/images/imi.jpg',
  },
  {
    id: 'peinture',
    icon: '/icons/peinture.png', 
    num: '04',
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
    <main className="bg-white">
      <section className="py-20 font-sans text-[#0B2545] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none mb-16">
            {aproposData.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex-1 min-w-[220px] flex items-center justify-center gap-4 py-6 text-[11px] font-black tracking-wider uppercase border-b-4 transition-all ${
                  activeTab === service.id
                    ? 'border-[#F5A623] text-[#0B2545] bg-gray-50/80 shadow-sm'
                    : 'border-transparent text-gray-400 hover:text-[#0B2545]'
                }`}
              >
                {service.icon ? (
                  <Image
                    src={service.icon}
                    alt={`${service.tabTitle} icon`}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-xl">{service.icon}</span>
                )}
                <span className="text-left leading-tight">{service.tabTitle}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-[420px] rounded-sm overflow-hidden shadow-sm">
              <Image
                src={active.bgImage}
                alt={active.tabTitle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-tr-[120px] flex flex-col justify-end p-8 border-t border-r border-gray-50">
                <span className="text-7xl font-black text-gray-100 block leading-none mb-2 select-none">
                  {active.num}
                </span>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#0B2545]">
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
    </main>
  )
}
