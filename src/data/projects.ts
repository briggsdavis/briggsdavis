export interface Project {
  id: string
  name: string
  image: string
  description: string
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
      "Fragrance discovery online was dominated by text-heavy, visually uninspiring interfaces that failed to capture the sensory nature of the category. We designed a minimalist, visually-driven platform with an innovative rating system that transforms how enthusiasts discover and evaluate fragrances.",
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
    description:
      "Without a compelling online presence, a specialist health coach had no effective way to communicate her expertise or convert visitors into clients in a crowded wellness market. We built a branded platform that showcases her services, builds trust through social proof, and drives bookings through a clear, personality-forward experience.",
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
      "A specialized engineering firm operating across East Africa was losing credibility with potential clients because their web presence failed to reflect the true scope and quality of their capabilities. We built a professional platform that clearly communicates their services, project portfolio, and regional expertise.",
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
      "A bespoke jewelry designer had no online presence, no sales channel, and no way to manage products without developer support. We built a full e-commerce platform with custom order capabilities and an integrated CMS that gave her complete control over her collections and customer experience.",
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
    description:
      "Ethiopian restaurants, hotels, and individual buyers had no reliable supplier for verified Norwegian salmon and no trusted way to source, order, and track sushi-grade fish. We built a direct-to-consumer platform connecting buyers directly to Norwegian Atlantic salmon, complete with real-time shipment tracking and a streamlined checkout flow.",
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
    description:
      "International companies and investors navigating African market entry had no credible digital touchpoint for AGA's advisory services — the firm had no web presence at all. We built a strategic platform that positions AGA as a trusted authority, with a dynamic CMS giving the team full control to publish market insights and update content independently.",
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
      "Selling a historic stone property requiring renovation demanded more than a listing — the right buyer needed to see the investment potential and feel the Mediterranean lifestyle before ever speaking to an agent. We built a single-property immersive experience with cinematic visuals and sound design that makes the vision tangible, crafted to attract a discerning buyer who sees it as both a sound investment and a forever project.",
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
    description:
      "A premier real estate developer in Addis Ababa had no digital presence, making it impossible to establish the premium positioning needed to compete for high-end clients and development partners. We built an institutional-grade platform with precision visual design, a CMS for news and events, and inquiry forms that convert interest into leads.",
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
