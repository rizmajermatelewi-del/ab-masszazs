import Header from '../sections/Header.jsx'
import Hero from '../sections/Hero.jsx'
import Services from '../sections/Services.jsx'
import About from '../sections/About.jsx'
import Visit from '../sections/Visit.jsx'
import Faq from '../sections/Faq.jsx'
import Footer from '../sections/Footer.jsx'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Visit />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
