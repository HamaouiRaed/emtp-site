'use client'

import { useState } from 'react'

const aproposData = [
  {
    id: 'construction',
    emoji: '🏗️',
    num: '01',
    iconPath: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
    tabTitle: "CONSTRUCTION D'UN BÂTIMENT",
    mainTitle: 'PLANIFIER ET STRUCTURER',
    desc: 'Préparer et organiser le chantier en accord avec les bonnes pratiques, de la connaissance des signes et le respect des normes de sécurité.',
    bgImage: 'images/batiment.jfif',
  },
  {
    id: 'architecture',
    emoji: '🏛️',
    num: '02',
    iconPath: 'M3 3h18v18H3V3zm3 3v12h12V6H6z',
    tabTitle: 'ARCHITECTURE ET DESIGN',
    mainTitle: 'CONCEPTION ET AMÉNAGEMENT',
    desc: 'Nous travaillons avec vous pour élaborer des immobiliers où il fait bon vivre, combinant esthétique moderne et fonctionnalité optimale.',
    bgImage: 'images/architecture.jfif',
  },
  {
    id: 'design',
    emoji: '🎨',
    num: '03',
    iconPath: 'M20 12v8H4v-8M2 4h20v4H2V4z',
    tabTitle: 'DESIGN INTÉRIEUR',
    mainTitle: 'DÉCORATION INTÉRIEURE',
    desc: 'Nous vous accompagnons à aménager, organiser et décorer votre intérieur pour créer des ambiances qui vous ressemblent.',
    bgImage: 'images/imi.jfif',
  },
  {
    id: 'peinture',
    emoji: '🖌️',
    num: '04',
    iconPath: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z',
    tabTitle: 'PEINTURE',
    mainTitle: 'DÉCORATION MURALE',
    desc: 'Nous mettons l’accent sur la qualité des matériaux, produits et peintures pour sublimer vos espaces.',
    bgImage: 'images/5.jpg',
  },
]

const aproposDataAccordion = [
  { id: 'const', title: 'CONSTRUCTION DE BÂTIMENTS', desc: 'Expertise technique pour gros œuvre et finitions.' },
  { id: 'renov', title: 'RÉNOVATION MAISON', desc: 'Évaluation et planification pour redonner vie à votre intérieur.' },
  { id: 'arch', title: 'ARCHITECTURE ET DESIGN', desc: 'Plans innovants adaptés à vos besoins.' },
]

const aproposDataTabs = [
  { id: 'arch', tabTitle: 'ARCHITECTURE', mainTitle: 'CONCEPTION', desc: 'Design moderne et fonctionnel.' },
  { id: 'design', tabTitle: 'DESIGN INTÉRIEUR', mainTitle: 'AMÉNAGEMENT', desc: 'Des espaces élégants et confortables.' },
  { id: 'peinture', tabTitle: 'PEINTURE', mainTitle: 'FINITIONS', desc: 'Des murs parfaitement sublimés.' },
]

export default function PagePrincipale() {
  const [activeTab, setActiveTab] = useState('architecture')
  const [activeAccordion, setActiveAccordion] = useState('renov')
  const [activeServiceTab, setActiveServiceTab] = useState('arch')

  const active = aproposData.find((service) => service.id === activeTab) || aproposData[0]
  const activeTabContent = aproposDataTabs.find((service) => service.id === activeServiceTab) || aproposDataTabs[0]

  return (
    <main className="bg-white">
      <section className="py-20 font-sans text-[#0B2545] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
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
                <svg className={`w-6 h-6 transition-colors ${activeTab === service.id ? 'text-[#F5A623]' : 'text-gray-300'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                </svg>
                <span className="text-left leading-tight">{service.tabTitle}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-[420px] rounded-sm overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${active.bgImage})` }} />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-tr-[120px] flex flex-col justify-end p-8 border-t border-r border-gray-50">
                <span className="text-7xl font-black text-gray-100 block leading-none mb-2 select-none">{active.num}</span>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#0B2545]">{active.tabTitle}</span>
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

      <section className="py-20 bg-white border-t border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#F5A623] font-black tracking-[0.2em] uppercase text-xs mb-4 block">À PROPOS</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#0B2545] leading-tight mb-8">BIENVENUE À EMTP</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg mb-10">
            
              Pensif de l'accompagnement ainsi que la satisfaction du client où l'accessibilité ne s'ignore pas sur la qualité dans tous types des batiments. Notre service de la construction des bätiments sur mesure vraiment erienté sur la conformité des besoins clients afin de comprendre vos aspirations et l'interaction souhaitée avec vos chantiers. L'entreprise Mahboubine de travaux publics EMTP possède toutes les compétences et l'expertise nécessaires pour fournir tous les aspects d'une première classe. EMTP est une entreprise qui a toutes les experiences du à des innombrables projets réalisés (maisons clé en main, appartements, cites, etc.) en intervenant dans toutes les phases via les services de construction, architecture & design, architecture interne et peinture. Notre construction et notre détermination sous toutes deux exclusivement centrées sur vous, ce qui nous permet d'offrir un service spécifique et sur mesure.
            </p>
          </div>

          <div className="h-[300px] bg-gray-50 flex items-center justify-center font-black text-gray-300 rounded-sm">
            images/batiment.jfif
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: '10', title: 'EXPERTS', sub: 'CHEVRONNÉS' },
            { number: '30', title: 'CLIENTS', sub: 'SATISFAITS' },
            { number: '45', title: 'PROJECTS', sub: 'COMPLÉTÉS' },
            { number: '10', title: 'PROJETS', sub: 'EN COURS' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 hover:border-[#F5A623] transition-colors group">
              <h3 className="text-3xl font-black text-[#0B2545] mb-2 group-hover:text-[#F5A623] transition-colors">{stat.number}</h3>
              <span className="text-[10px] font-black text-[#0B2545] tracking-widest uppercase">{stat.title}</span>
              <span className="text-[9px] text-gray-400 uppercase mt-1">{stat.sub}</span>
            </div>
          ))}
        </div>
      </section>

   
      
    </main>
  )
}