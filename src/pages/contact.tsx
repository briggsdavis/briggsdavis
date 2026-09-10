import Footer from "@/components/footer"
import InquiryForm from "@/components/inquiry-form"

const ContactPage = () => {
  return (
    <div className="min-h-screen text-foreground">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Get in Touch</h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">Send us your brief.</p>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-24">
        <InquiryForm />
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
