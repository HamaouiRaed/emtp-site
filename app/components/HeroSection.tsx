'use client'

import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const slides = [
  {
    id: 1,
    title1: "EMTP est à",
    title2: "Proximité de vous",
    title3: "A Côte d'Ivoire",
    desc: "EMTP est une entreprise qui a toutes les expériences dû à des innombrables projets réalisés (maisons clé en main, appartements, cités, etc.) en intervenant dans toutes les phases via les services de : construction, architecture & design, architecture interne et peinture.",
    bg: "/images/architecture.jfif",
    btn1: "PLUS D'INFOS",
    btn2: "DEMANDE DE DEVIS"
  },
  {
    id: 2,
    title1: "Nous sommes",
    title2: "engagés",
    title3: "Pour votre projet Immo Sur Mesure",
    desc: "Notre construction et notre détermination sous toutes deux exclusivement centrées sur vous, ce qui nous permet d'offrir un service spécifique et sur mesure.",
    bg: "/images/chantier.jfif",
    btn1: "CONTACTEZ-NOUS",
    btn2: ""
  }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  return (
    <div className="relative w-full h-[85vh] overflow-hidden font-sans group">
      
      {/* 1. Image de fond globale */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/emtp.jfif')" }} 
      />
      
      {/* 2. Calque (Overlay) bleu pour conserver l'identité EMTP */}
      <div className="absolute inset-0 bg-[#0B2545] opacity-80 z-1" />

      {/* 3. Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-2 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background spécifique au slide */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />

          {/* Décoration cercles */}
          <div className="absolute left-10 top-1/4 flex flex-col gap-4 pointer-events-none">
            <div className="w-56 h-56 rounded-full bg-[#F5A623] opacity-80" />
            <div className="w-28 h-28 rounded-full bg-[#F5A623] opacity-80 ml-8" />
          </div>

          {/* Contenu textuel */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-8 flex flex-col justify-center items-start pl-20 md:pl-48 text-white">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 uppercase">
              {slide.title1} <br />
              <span className="font-light">{slide.title2}</span> <br />
              <span className="text-[#F5A623] font-black">{slide.title3}</span>
            </h1>

            <p className="text-xs md:text-sm text-gray-200/90 max-w-xl font-light leading-relaxed mb-8 border-l-2 border-[#F5A623] pl-4">
              {slide.desc}
            </p>

            <div className="flex gap-4">
              {slide.btn1 && (
                <button className="px-6 py-3 bg-[#b07d2a] text-white font-black text-xs tracking-widest uppercase hover:bg-[#0B2545] transition-all">
                  {slide.btn1}
                </button>
              )}
              {slide.btn2 && (
                <button className="px-6 py-3 bg-white/20 text-white font-black text-xs tracking-widest uppercase border border-white/20 hover:bg-white hover:text-[#0B2545] transition-all">
                  {slide.btn2}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 4. Boutons de navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-3 w-12 h-16 bg-white flex items-center justify-center text-gray-600 hover:text-[#0B2545] shadow-md transition-all"
      >
        <FaChevronLeft size={16} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-3 w-12 h-16 bg-white flex items-center justify-center text-gray-600 hover:text-[#0B2545] shadow-md transition-all"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  )
}