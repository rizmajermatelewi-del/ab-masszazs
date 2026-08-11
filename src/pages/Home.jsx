import Header from '../sections/Header.jsx'
import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Services from '../sections/Services.jsx'
import Experience from '../sections/Experience.jsx'
import Editorial from '../sections/Editorial.jsx'
import Usp from '../sections/Usp.jsx'
import Gallery from '../sections/Gallery.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import GiftCard from '../sections/GiftCard.jsx'
import Faq from '../sections/Faq.jsx'
import Visit from '../sections/Visit.jsx'
import Footer from '../sections/Footer.jsx'
import BookingBar from '../sections/BookingBar.jsx'

/* Page order. src/data/navigation.js lists the same sections in the same order
   to build the menu -- if one moves here, move it there too, or the menu reads
   in a different order than the page it describes.

   Every section between Hero and Footer removes itself while its content is
   missing, so today this renders a hero, a contact block and a footer. That is
   the intended behaviour: a short honest page rather than a long padded one,
   and scripts/check-content.mjs refuses to build for launch until the facts
   are in. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Editorial />
        <Usp />
        <Gallery />
        <Testimonials />
        <GiftCard />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <BookingBar />
    </>
  )
}
