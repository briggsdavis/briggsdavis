import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import OurPromise from "@/components/our-promise"
import Portfolio from "@/components/portfolio"
import About from "@/components/about"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <OurPromise />
      <Portfolio />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}

export default Index
