export interface Project {
  id: string
  name: string
  image: string
  description: string
  shortDescription?: string
  problem?: string
  solution?: string
  businessValue?: string
  link: string | null
  features: string[]
  tags: string[]
  year: number
}

export const projects: Project[] = [
  {
    id: "oderum",
    name: "Oderum",
    image: "/images/portfolio-oderum.png",
    description:
      "A minimalist fragrance discovery platform with an innovative rating system, built for enthusiasts who take scent seriously.",
    problem:
      "Fragrance discovery online was dominated by text-heavy, visually uninspiring interfaces that failed to capture the sensory nature of the category.",
    solution:
      "We designed a minimalist, visually-driven platform with an innovative rating system that transforms how enthusiasts discover and evaluate fragrances.",
    link: "https://oderum.com",
    features: [
      "Minimalist, visually-driven UI design",
      "Innovative fragrance rating system",
      "Responsive mobile-first experience",
      "Curated scent discovery journey",
    ],
    tags: ["Fragrance", "E-Commerce", "UI Design"],
    year: 2024,
  },
  {
    id: "hormone-vitality-coaching",
    name: "Hormone Vitality Coaching",
    image: "/images/portfolio-2.jpg",
    shortDescription:
      "A specialist health coach with no digital presence, so we built a branded platform that showcases her expertise and drives client bookings.",
    description:
      "A branded digital platform for a specialist health coach, built to communicate her expertise and convert visitors into clients in a crowded wellness market.",
    problem:
      "A specialist health coach had no effective way to communicate her expertise or convert visitors into clients without a compelling online presence.",
    solution:
      "We built a branded platform that showcases her services, builds trust through social proof, and drives bookings through a clear, personality-forward experience.",
    businessValue:
      "The platform established her credibility online, expanded her visibility in a crowded market, and gave prospective clients a clear path to book her services.",
    link: "https://hormonevitalitycoaching.com",
    features: [
      "Custom brand identity and visual language",
      "Service showcase with booking integration",
      "Testimonials and social proof sections",
      "SEO-optimized content structure",
    ],
    tags: ["Health & Wellness", "Branding", "Web Design"],
    year: 2024,
  },
  {
    id: "ease-engineering",
    name: "EASE Engineering",
    image: "/images/portfolio-3.jpg",
    description:
      "A professional web platform for a specialized engineering firm operating across East Africa, built to accurately reflect the full scope of their capabilities.",
    problem:
      "A specialized engineering firm across East Africa was losing credibility with potential clients because their web presence failed to reflect the true scope and quality of their capabilities.",
    solution:
      "We built a professional platform that clearly communicates their services, project portfolio, and regional expertise.",
    businessValue:
      "The platform positioned EASE as a credible regional authority, educated potential clients on the full range of their capabilities, and created a foundation for generating new project leads.",
    link: "https://ease-int.com",
    features: [
      "Multi-service portfolio presentation",
      "Project gallery with categorized filtering",
      "Regional operations overview",
      "Professional team and capability highlights",
    ],
    tags: ["Engineering", "Portfolio", "Web Design"],
    year: 2023,
  },
  {
    id: "anne-silver",
    name: "Anne Silver",
    image: "/images/portfolio-annesilver.png",
    description:
      "A full e-commerce platform for a bespoke jewelry designer, with custom order capabilities and a CMS that gives her complete control over her collections.",
    problem:
      "A bespoke jewelry designer had no online presence, no sales channel, and no way to manage products without developer support.",
    solution:
      "We built a full e-commerce platform with custom order capabilities and an integrated CMS that gave her complete control over her collections and customer experience.",
    businessValue:
      "The store gave Anne Silver an online presence that authentically tells her story, justifies her premium pricing, and drives customers from digital channels directly to her products.",
    link: "https://annesilver.com",
    features: [
      "Full e-commerce with cart and checkout",
      "Custom jewelry order capabilities",
      "Integrated CMS for content management",
      "Curated collection browsing experience",
    ],
    tags: ["Jewelry", "E-Commerce", "CMS"],
    year: 2023,
  },
  {
    id: "nordic-seafood",
    name: "Nordic Seafood",
    image: "/images/portfolio-5.jpg",
    shortDescription:
      "A Norwegian salmon supplier targeting East African buyers, for whom we built a direct-to-consumer platform with real-time shipment tracking.",
    description:
      "A direct-to-consumer platform connecting East African buyers directly to Norwegian Atlantic salmon, with real-time shipment tracking and a streamlined checkout flow.",
    problem:
      "Ethiopian restaurants, hotels, and individual buyers had no reliable supplier for verified Norwegian salmon and no trusted way to source, order, and track sushi-grade fish.",
    solution:
      "We built a direct-to-consumer platform connecting buyers directly to Norwegian Atlantic salmon, complete with real-time shipment tracking and a streamlined checkout flow.",
    businessValue:
      "The platform built trust with a new buyer base, provided the full infrastructure to facilitate online sales, and equipped the business with a backend CRM and analytics to manage relationships and track growth.",
    link: "https://nordicseafoods.org",
    features: [
      "Farm-to-table Norwegian salmon sourcing",
      "Real-time shipment tracking experience",
      "Verified bank transfer checkout flow",
      "Flexible cut and sizing selection",
    ],
    tags: ["Food & Beverage", "E-Commerce", "Logistics"],
    year: 2024,
  },
  {
    id: "africa-growth-axis",
    name: "Africa Growth Axis",
    image: "/images/portfolio-aga.png",
    shortDescription:
      "An African market entry advisory firm with no web presence, so we built a strategic platform that positions them as a trusted authority.",
    description:
      "A strategic advisory platform for a firm specializing in African market entry, with a CMS that lets the team publish market insights and update content independently.",
    problem:
      "International companies and investors navigating African market entry had no credible digital touchpoint for AGA's advisory services; the firm had no web presence at all.",
    solution:
      "We built a strategic platform that positions AGA as a trusted authority, with a dynamic CMS giving the team full control to publish market insights and update content independently.",
    businessValue:
      "The platform established AGA's institutional credibility online, communicated their expertise to an international audience, and created a professional foundation for driving business development.",
    link: "https://aga-advisory.com/",
    features: [
      "Dynamic content management system",
      "Market insights and research sections",
      "Advisory service showcases",
      "Admin panel for content updates",
    ],
    tags: ["Advisory", "CMS", "Web Design"],
    year: 2023,
  },
  {
    id: "brac-stone-house",
    name: "Brac Stone House",
    image: "/images/brac",
    description:
      "An immersive single-property experience for a historic Mediterranean stone house on the island of Brac, crafted to attract a discerning buyer.",
    problem:
      "Selling a historic stone property requiring renovation demanded more than a standard listing; the right buyer needed to feel the investment potential and Mediterranean lifestyle before ever speaking to an agent.",
    solution:
      "We built a single-property immersive experience with cinematic visuals and sound design that makes the vision tangible for a discerning buyer.",
    businessValue:
      "The site functions as a targeted marketing tool that educates the right buyer on the property's potential and actively works to bring the sale to close.",
    link: "https://bracstonehouse.com",
    features: [
      "Immersive sound and visual storytelling",
      "Renovation vision and possibility showcase",
      "Mediterranean lifestyle and location narrative",
      "Cinematic property experience to drive sales",
    ],
    tags: ["Real Estate", "Immersive", "Property"],
    year: 2025,
  },
  {
    id: "refenti",
    name: "Refenti",
    image: "/images/portfolio-refenti.jpg",
    shortDescription:
      "A premier real estate developer in Addis Ababa, for whom we built their institutional-grade digital platform from the ground up.",
    description:
      "An institutional-grade platform for a premier real estate developer in Addis Ababa, built to establish premium positioning and convert high-end client interest into leads.",
    problem:
      "A premier real estate developer in Addis Ababa had no digital presence, making it impossible to establish the premium positioning needed to compete for high-end clients and development partners.",
    solution:
      "We built an institutional-grade platform with precision visual design, a CMS for news and events, and inquiry forms that convert interest into leads.",
    businessValue:
      "The platform communicates Refenti's luxury positioning, instills confidence in prospective investors and partners, and provides a direct channel for driving investment and development partnerships.",
    link: "https://refenti.com",
    features: [
      "Fully editable CMS for content management",
      "Inquiry forms for prospective clients",
      "News and events publishing system",
      "Elegant, precision-crafted visual design",
    ],
    tags: ["Real Estate", "CMS", "Branding"],
    year: 2023,
  },
]
