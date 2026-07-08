'use client'

import { useState } from 'react'

 const feedbacks = [
  {
    id: 1,
    name: "ALEX G.",
    role: "GESTIONNAIRE DE PROPRIÉTÉ",
    text: "J'ai travaillé avec EMTP sur plusieurs projets commerciaux, et ils dépassent toujours les attentes. Leur équipe est efficace, professionnelle et compétente. Ils gèrent les défis avec aisance et livrent d'excellents résultats",
    image: "/images/client.jfif"  
  },
  {
    id: 2,
    name: "SARAH M.",
    role: "ARCHITECTE D'INTÉRIEUR",
    text: "Une expérience exceptionnelle du début à la fin. L'équipe a su transformer notre vision en réalité avec un professionnalisme remarquable et un respect total des délais.",
    image: "/images/client1.jfif"  
  }
]

export default function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1))
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* خلفية مزخرفة بخطوط خفيفة (اختياري لمحاكاة التصميم) */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#0B2545 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* حاوية التقييم */}
        <div className="bg-white shadow-2xl shadow-gray-200/50 p-8 md:p-14 rounded-sm flex flex-col md:flex-row items-center gap-10">
          
          {/* صورة العميل وأيقونة الاقتباس */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              {feedbacks[currentIndex].image ? (
                <img 
                  src={feedbacks[currentIndex].image} 
                  alt={feedbacks[currentIndex].name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">👤</div>
              )}
            </div>
            {/* أيقونة الاقتباس البرتقالية */}
            <div className="absolute -bottom-2 -right-2 bg-[#F5A623] w-10 h-10 rounded-full flex items-center justify-center text-white text-xl shadow-md border-2 border-white">
              ❞
            </div>
          </div>

          {/* النص والاسم */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 font-medium">
              {feedbacks[currentIndex].text}
            </p>
            <h4 className="text-[#0B2545] font-black text-lg uppercase tracking-wide">
              {feedbacks[currentIndex].name}, <span className="font-semibold">{feedbacks[currentIndex].role}</span>
            </h4>
          </div>

        </div>

        {/* المؤشرات (Dashes) في الأسفل */}
        <div className="flex justify-center md:justify-end items-center gap-2 mt-8 pr-4">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 bg-[#0B2545]' 
                  : 'w-6 bg-[#F5A623] hover:opacity-80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      { }
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#F5A623] text-4xl transition-colors hidden md:block"
      >
        ❮
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#F5A623] text-4xl transition-colors hidden md:block"
      >
        ❯
      </button>

    </section>
  )
}