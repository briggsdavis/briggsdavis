import Footer from "@/components/footer"
import InquiryForm from "@/components/inquiry-form"

const ContactPage = () => {
  return (
    <div className="min-h-screen text-foreground">
      <section className="px-6 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.06em]">
            Tell us what you&apos;re thinking.
          </h1>
          <p className="mt-7 max-w-lg text-lg text-muted-foreground">
            A few details are enough to start the conversation.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-24">
        <InquiryForm />
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
