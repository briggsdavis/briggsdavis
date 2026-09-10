import CTA from "@/components/cta"
import FeaturedWork from "@/components/featured-work"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import OurPromise from "@/components/our-promise"
import Services from "@/components/services"

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <OurPromise />
      <FeaturedWork />
      <CTA />
      <Footer />
    </main>
  )
}

export default Home
