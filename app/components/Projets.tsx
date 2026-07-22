'use client'

import { useState } from 'react'

 const projectsImages = [
  
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
   '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg',
   '/images/11.jpg',
  '/images/12.jpg',
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
  '/images/16.jpg',
  '/images/17.jpg',
  '/images/18.jpg',
   '/images/19.jpg',
  '/images/20.jpg',
  '/images/21.jpg',
  '/images/22.jpg',
  '/images/23.jpg'
] 

export default function Projets() {
  const [startIndex, setStartIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const totalImages = projectsImages.length
  const visibleImages = 3

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= totalImages - visibleImages ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? totalImages - visibleImages : prev - 1))
  }

  return (
    <section id="projets" className="py-24 bg-[#F7F9FA] overflow-hidden border-t border-gray-100 select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* صندوق التحكم */}
          <div className="bg-[#0B2545] text-white p-8 rounded-2xl flex flex-col justify-between lg:col-span-1 shadow-md">
            <div>
              <h3 className="text-xl font-bold leading-snug uppercase mb-4">NOS RÉALISATIONS</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Découvrez nos projets en images. Cliquez sur n'importe quelle photo pour l'agrandir.
              </p>
            </div>
            
            <div className="flex gap-2.5 mt-10">
              <button 
                onClick={prevSlide} 
                className="w-10 h-10 border border-white/10 hover:bg-[#F5A623] hover:text-[#0B2545] flex items-center justify-center rounded-lg transition-all active:scale-95"
              >
                ❮
              </button>
              <button 
                onClick={nextSlide} 
                className="w-10 h-10 border border-white/10 hover:bg-[#F5A623] hover:text-[#0B2545] flex items-center justify-center rounded-lg transition-all active:scale-95"
              >
                ❯
              </button>
            </div>
          </div>

          {/* عرض الصور */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projectsImages.slice(startIndex, startIndex + visibleImages).map((img, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedImage(img)}
                className="h-80 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer"
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img}')` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F5A623] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Project" 
              className="max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}