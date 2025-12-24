import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import OurPromise from '@/components/OurPromise';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <OurPromise />
      <Process />
      <Portfolio />
      <About />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
