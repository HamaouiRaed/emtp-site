import Navbar from './components/Navbar'
import Hero from './components/HeroSection'
import Services from './components/Services'
import Apropos from './components/apropos'
import Projets from './components/Projets'
import Feedback from './components/Feedback'
import Contact from './components/contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      {/* الـ À Propos يولي قبل الـ Services */}
      <section id="apropos">
        <Apropos />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="projets">
        <Projets />
      </section>

      <section id="feedback" className="py-20">
        <Feedback />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}