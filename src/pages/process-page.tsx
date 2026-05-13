import { useEffect } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
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
