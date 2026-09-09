import ServiceDetailPage from "@/components/service-detail-page"
import type { ServiceDetailConfig } from "@/data/service-types"

const appDevelopment: ServiceDetailConfig = {
  eyebrow: "Services / App Development",
  title: "Native apps.",
  titleAccent: "Complete products.",
  intro:
    "We design and build native mobile applications for iOS and Android, including the connected systems that make the product useful beyond the phone.",
  promise: "The app, its infrastructure, and its connected experiences belong together.",
  capabilities: [
    "Native iOS and Android products",
    "Cross-platform product experiences",
    "Product planning and architecture",
    "Authentication and account systems",
    "Payments, messaging, and notifications",
    "APIs, backend services, and integrations",
    "Companion web apps and admin tools",
    "Launch and continued development",
  ],
  systemsLabel: "Product capabilities",
  systemsLayout: "staircase",
  relatedService: {
    label: "Discover Web Development",
    to: "/services/web-development",
  },
  systems: [
    "Native iOS",
    "Native Android",
    "User Accounts",
    "Payments & Subscriptions",
    "Push Notifications",
    "Backend Services & APIs",
    "Admin Dashboards",
    "Companion Web Apps",
  ],
  processEyebrow: "How we work / Apps",
  processTitle: "Structure where it matters. Flexibility where it helps.",
  processIntro:
    "App products vary widely, so the build itself is shaped around the technology, risk, and review cadence of the individual project. Clear decisions and client visibility remain constant throughout.",
  companion: {
    eyebrow: "Native + Web",
    title: "One product may need more than one interface.",
    description:
      "A native app can also need a browser-based version, an administrative dashboard, or a public website. We can deliver the native and web sides as one coordinated build. Browser-based applications are covered in more detail under Web Development.",
    linkLabel: "Explore Web Development",
    linkTo: "/services/web-development",
  },
  steps: [
    {
      number: "01",
      title: "Discovery",
      label: "Define the product",
      description:
        "We clarify the problem, the users, the commercial model, the essential product journeys, and the role the native app plays within the wider business.",
      details: [
        "Product goals and target users",
        "Core journeys and priority features",
        "Business, market, and platform context",
        "Success criteria and delivery constraints",
      ],
      visualKey: "unique",
    },
    {
      number: "02",
      title: "Planning & Architecture",
      label: "Shape the system",
      description:
        "We translate the product direction into a practical technical plan covering the native experience, data, services, integrations, security, and any companion web interfaces.",
      details: [
        "Feature and release planning",
        "Technical architecture and data flows",
        "Native, backend, and web responsibilities",
        "Security and integration requirements",
      ],
      visualKey: "cybersecurity",
    },
    {
      number: "03",
      title: "Approval",
      label: "Align before building",
      description:
        "The proposed direction, scope, architecture, and delivery plan are reviewed together. Build begins once the important product decisions are understood and approved.",
      details: [
        "Review the proposed product direction",
        "Confirm scope and priorities",
        "Resolve open decisions and dependencies",
        "Agree on milestones and review points",
      ],
      visualKey: "client-input",
    },
    {
      number: "04",
      title: "Build Phase",
      label: "Create and review",
      description:
        "This phase changes the most from product to product. We build in meaningful increments and include client reviews at the points where feedback can most effectively shape the result.",
      details: [
        "Native interface and feature development",
        "Backend, integrations, and companion web work",
        "Client reviews tied to useful milestones",
        "A review cadence matched to the individual project",
      ],
      visualKey: "mobile",
    },
    {
      number: "05",
      title: "Final Review",
      label: "Validate the product",
      description:
        "We test the completed experience across its supported devices and connected systems, resolve final issues, and confirm the product is ready for release.",
      details: [
        "Supported-device and platform testing",
        "Complete user-journey review",
        "Performance, permissions, and integration checks",
        "Final client approval",
      ],
      visualKey: "performance",
    },
    {
      number: "06",
      title: "Launch",
      label: "Release and continue",
      description:
        "We prepare production services, support release to the relevant app stores, and coordinate any companion web deployment. Continued development can follow the product after launch.",
      details: [
        "Production and store-release preparation",
        "Companion web and backend deployment",
        "Operational handover and documentation",
        "Post-launch support and future releases",
      ],
      visualKey: "maintenance",
    },
  ],
  ctaTitle: "Turn the product idea into a working system.",
  ctaBody:
    "Bring us the idea, the requirements, or the problem. We will help define the right native product—and the web systems that should support it.",
  ctaLabel: "Start an App Project",
}

const AppDevelopmentPage = () => <ServiceDetailPage config={appDevelopment} />

export default AppDevelopmentPage
