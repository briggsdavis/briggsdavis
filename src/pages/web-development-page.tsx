import ServiceDetailPage from "@/components/service-detail-page"
import type { ServiceDetailConfig } from "@/data/service-types"

const webDevelopment: ServiceDetailConfig = {
  eyebrow: "Services / Web Development",
  title: "Websites that",
  titleAccent: "work for the business.",
  intro:
    "We combine expressive design with the functional systems that turn a website into a useful part of your operation.",
  promise: "A strong website can be your best-looking business tool.",
  capabilities: [
    "Custom visual and interaction design",
    "Marketing sites and digital platforms",
    "Web applications and customer portals",
    "Booking and reservation systems",
    "Content management and publishing",
    "Payments, email, and integrations",
    "Search, performance, and security",
    "Maintenance and continued support",
  ],
  systemsLabel: "Web capabilities",
  systemsLayout: "staircase",
  relatedService: {
    label: "Discover App Development",
    to: "/services/app-development",
  },
  systems: [
    "Marketing Sites",
    "Web Applications",
    "Booking & Reservations",
    "Content Management",
    "Customer Portals",
    "Payments & Subscriptions",
    "Email Systems",
    "API Integrations",
  ],
  processEyebrow: "How we work / Web",
  processTitle: "A collaborative path from brief to launch.",
  processIntro:
    "The scope changes from project to project. The principle does not: you see the work early, respond to something real, and remain involved as it becomes your own.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      label: "Understand the business",
      description:
        "We begin with the business behind the website: its customers, goals, content, operational needs, and the actions the product must support. This gives design and functionality the same foundation.",
      details: [
        "Goals, audiences, and success criteria",
        "Content, integrations, and functional requirements",
        "Competitive and visual context",
        "A scope shaped around the actual business",
      ],
      visualKey: "unique",
    },
    {
      number: "02",
      title: "Build Phase",
      label: "Prototype and refine",
      description:
        "The exact build phase varies with the project. Typically, we create a working prototype first and then move through two to five revision rounds, improving the design, content, features, and fit with every cycle.",
      details: [
        "A working prototype you can actually use",
        "Two to five revision rounds in a typical scope",
        "Each round begins with one consolidated set of client feedback",
        "Your input shapes the product rather than simply approving it",
      ],
      visualKey: "client-input",
    },
    {
      number: "03",
      title: "Final Review",
      label: "Test the complete system",
      description:
        "Once the product is complete, we review it as a connected whole. We test common devices and browsers, confirm key user journeys, and make sure the operational features behave as intended.",
      details: [
        "Responsive and cross-browser review",
        "Forms, payments, bookings, and integrations",
        "Content, analytics, search, and performance checks",
        "Final client review and sign-off",
      ],
      visualKey: "performance",
    },
    {
      number: "04",
      title: "Launch",
      label: "Deploy and support",
      description:
        "We prepare the production environment, connect the required services, and take the website live. Documentation, handover, and continued support are shaped around what your team needs next.",
      details: [
        "Production deployment and domain setup",
        "CMS and team handover where applicable",
        "Monitoring, maintenance, and future improvements",
        "Support through go-live",
      ],
      visualKey: "maintenance",
    },
  ],
  ctaTitle: "Build a website that earns its place in the business.",
  ctaBody:
    "Tell us what the website needs to communicate, automate, or make easier. We will help shape the right product around it.",
  ctaLabel: "Start a Web Project",
}

const WebDevelopmentPage = () => <ServiceDetailPage config={webDevelopment} />

export default WebDevelopmentPage
