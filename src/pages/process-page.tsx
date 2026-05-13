import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Process from "@/components/process"

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Process />
      <Footer />
    </div>
  )
}

export default ProcessPage
