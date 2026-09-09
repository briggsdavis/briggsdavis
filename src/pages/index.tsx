import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import OurPromise from "@/components/our-promise"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <OurPromise />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  )
}

export default Index
