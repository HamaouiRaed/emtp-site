'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      {/* 1. Top Bar responsive */}
      <div className="w-full bg-[#0B2545] text-white text-[10px] md:text-[11px] font-medium py-2 px-4 md:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4 md:gap-6">
          <a href="mailto:contact@emtp-btp.com" className="flex items-center gap-2 hover:text-[#F5A623]">
            <FaEnvelope /> <span className="hidden md:inline">contact@emtp-btp.com</span>
          </a>
          <a href="tel:+2250720287979" className="flex items-center gap-2 hover:text-[#F5A623]">
            <FaPhoneAlt /> <span className="hidden md:inline">+225 07 20 28 79 79</span>
          </a>
        </div>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F5A623]">
          <FaFacebookF />
        </a>
      </div>

      {/* 2. Navbar Principale */}
      <div className="w-full bg-white h-20 shadow-sm relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex justify-between items-center relative">

          {/* Menu Mobile Hamburger */}
          <button className="md:hidden text-[#0B2545] p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Liens Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-black tracking-widest text-[#0B2545] uppercase">
            <Link href="/#apropos" className="hover:text-[#F5A623]">À PROPOS</Link>
            <Link href="/#services" className="hover:text-[#F5A623]">SERVICES</Link>
            <Link href="/#projets" className="hover:text-[#F5A623]">PROJETS</Link>
            <Link href="/#contact" className="hover:text-[#F5A623]">CONTACT</Link>
          </nav>

          {/* Logo Central */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-17.5 md:h-22.5 w-32 md:w-48 bg-[#F5A623] flex items-center justify-center text-white shadow-md z-30" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
            <Link href="/" className="flex flex-col items-center justify-center">
              <Image
                src="/logos/EMTP-blanc.png"
                alt="EMTP Logo"
                width={120}
                height={60}
                priority
                className="h-auto w-auto max-h-12 md:max-h-16"
              />

            </Link>
          </div>

          {/* Bouton Devis */}
          <div className="flex items-center ml-auto">
            <Link href="/loading-devis" className="border border-gray-300 px-3 md:px-6 py-2 md:py-3 text-[9px] md:text-[11px] font-black tracking-widest text-[#0B2545] uppercase hover:bg-[#0B2545] hover:text-white transition-all">
              <span className="hidden md:inline">DEMANDE DE DEVIS</span>
              <span className="md:hidden">DEVIS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {isOpen && (
        <div className="md:hidden bg-white w-full border-b border-gray-100 p-6 flex flex-col gap-6 text-[#0B2545] font-black uppercase text-sm text-center shadow-xl">
          <Link href="/#apropos" onClick={() => setIsOpen(false)}>À PROPOS</Link>
          <Link href="/#services" onClick={() => setIsOpen(false)}>SERVICES</Link>
          <Link href="/#projets" onClick={() => setIsOpen(false)}>PROJETS</Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>CONTACT</Link>
        </div>
      )}
    </header>
  )
}
