export interface ProjectFeature {
  title: string
  detail: string
}

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
  features: ProjectFeature[]
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
      {
        title: "Minimalist, visually-driven UI design",
        detail:
          "A pared-back, image-led interface that puts the fragrances themselves front and centre, free of the text-heavy clutter that dominates the category.",
      },
      {
        title: "Innovative fragrance rating system",
        detail:
          "A multi-attribute scoring system that rates each scent across distinct dimensions — longevity, sillage, projection and value — rather than a single star score.",
      },
      {
        title: "Responsive mobile-first experience",
        detail:
          "Designed for the phone first, so the experience stays fast and elegant whether browsing on mobile, tablet or desktop.",
      },
      {
        title: "Curated scent discovery journey",
        detail:
          "A guided path that helps enthusiasts move from browsing to finding scents worth their attention, instead of scrolling an undifferentiated list.",
      },
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
      {
        title: "Custom brand identity and visual language",
        detail:
          "A bespoke look and feel — colour, type and imagery — built specifically for her practice so it stands apart in a crowded wellness market.",
      },
      {
        title: "Service showcase with booking integration",
        detail:
          "Clear presentation of her coaching services paired with a direct booking flow, turning interested visitors into scheduled clients.",
      },
      {
        title: "Testimonials and social proof sections",
        detail:
          "Client stories and credibility markers placed throughout the site to build trust before a prospect ever reaches out.",
      },
      {
        title: "SEO-optimized content structure",
        detail:
          "Content organised and tagged so search engines can surface her practice when people search for hormone and vitality coaching.",
      },
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
      {
        title: "Multi-service portfolio presentation",
        detail:
          "A structured showcase of the firm's full range of engineering services, so clients grasp the breadth of what they can deliver.",
      },
      {
        title: "Project gallery with categorized filtering",
        detail:
          "A browsable gallery of completed work that visitors can filter by category to quickly find relevant projects.",
      },
      {
        title: "Regional operations overview",
        detail:
          "A clear picture of where the firm operates across East Africa, reinforcing their regional reach and expertise.",
      },
      {
        title: "Professional team and capability highlights",
        detail:
          "Profiles of the team and their core capabilities that establish the firm's credibility and depth of expertise.",
      },
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
      {
        title: "Full e-commerce with cart and checkout",
        detail:
          "A complete online store with cart, secure checkout and order handling, giving her a real sales channel for the first time.",
      },
      {
        title: "Custom jewelry order capabilities",
        detail:
          "Tools for customers to request bespoke pieces online, mirroring her made-to-order craft.",
      },
      {
        title: "Integrated CMS for content management",
        detail:
          "A content management system that lets her add and edit collections and pages herself, with no developer needed.",
      },
      {
        title: "Curated collection browsing experience",
        detail:
          "A thoughtfully arranged way to explore her collections that reflects the premium, considered nature of the work.",
      },
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
      {
        title: "Farm-to-table Norwegian salmon sourcing",
        detail:
          "A transparent sourcing story connecting buyers directly to verified Norwegian Atlantic salmon, building trust in provenance and quality.",
      },
      {
        title: "Real-time shipment tracking experience",
        detail:
          "Live tracking that lets buyers follow their order from dispatch to delivery — essential reassurance for perishable, sushi-grade fish.",
      },
      {
        title: "Verified bank transfer checkout flow",
        detail:
          "A checkout built around verified bank-transfer payment, suited to the local market and large wholesale orders.",
      },
      {
        title: "Flexible cut and sizing selection",
        detail:
          "Options to choose the cut and portion size at order time, matching what restaurants, hotels and individual buyers each need.",
      },
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
      {
        title: "Dynamic content management system",
        detail:
          "A flexible CMS that lets the team publish and update content independently as their market insights evolve.",
      },
      {
        title: "Market insights and research sections",
        detail:
          "Dedicated areas for publishing the firm's research and market intelligence, positioning them as a trusted authority on African market entry.",
      },
      {
        title: "Advisory service showcases",
        detail:
          "Clear presentation of their advisory offerings so international clients understand exactly how the firm can help them enter the market.",
      },
      {
        title: "Admin panel for content updates",
        detail:
          "A back-office panel giving the team full control to manage the site's content without technical support.",
      },
    ],
    tags: ["Advisory", "CMS", "Web Design"],
    year: 2023,
  },
  {
    id: "brac-stone-house",
    name: "Brac Stone House",
    image: "/brac.png",
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
      {
        title: "Immersive sound and visual storytelling",
        detail:
          "Cinematic visuals paired with sound design that let prospective buyers feel the property and its setting, not just read about it.",
      },
      {
        title: "Renovation vision and possibility showcase",
        detail:
          "A presentation of what the historic stone house could become, making the investment potential tangible to the right buyer.",
      },
      {
        title: "Mediterranean lifestyle and location narrative",
        detail:
          "Storytelling around the island setting and Mediterranean lifestyle that sells the experience surrounding the property.",
      },
      {
        title: "Cinematic property experience to drive sales",
        detail:
          "A single-property site crafted as a marketing tool, designed to move a discerning buyer toward a sale.",
      },
    ],
    tags: ["Real Estate", "Immersive", "Property"],
    year: 2025,
  },
  {
    id: "butcher-and-the-rye",
    name: "Butcher and the Rye",
    image: "/butcher.png",
    shortDescription:
      "A Pittsburgh restaurant with serious character, so we built a website that matches it — rustic, moody, and built to fill tables.",
    description:
      "A full-featured website for Butcher and the Rye, a celebrated Pittsburgh restaurant, built to reflect the venue's rustic, moody brand identity and drive reservations.",
    problem:
      "Butcher and the Rye needed a digital presence as distinctive as the restaurant itself — one that captured its atmosphere, ranked in search, and made it effortless for guests to book a table.",
    solution:
      "We designed a website with a rustic, moody visual language that fits the restaurant's brand, integrated a reservations system for seamless bookings, and built in a CMS so the team can manage content independently.",
    businessValue:
      "The site converts discovery into reservations, extends the restaurant's identity online, and gives the team full control over menus and content without developer support.",
    link: "https://butcherandtherye.com",
    features: [
      {
        title: "Rustic, moody design reflecting the restaurant's brand",
        detail:
          "A visual language that mirrors the restaurant's rustic, atmospheric character so the site feels like an extension of the venue.",
      },
      {
        title: "Integrated reservations system",
        detail:
          "A built-in booking system that makes it effortless for guests to reserve a table directly from the site.",
      },
      {
        title: "Backend CMS for menus and content management",
        detail:
          "A content management system so the team can update menus and content themselves, without developer support.",
      },
      {
        title: "SEO-optimized structure for local search visibility",
        detail:
          "A structure tuned for local search, helping the restaurant surface when nearby diners look for somewhere to eat.",
      },
      {
        title: "Fully mobile-friendly across all devices",
        detail:
          "A layout that works smoothly on phones and tablets, where most diners discover and book restaurants.",
      },
    ],
    tags: ["Restaurant", "CMS", "Web Design"],
    year: 2025,
  },
  {
    id: "hargarten",
    name: "Hargarten",
    image: "/images/portfolio-hargarten.png",
    shortDescription:
      "A luxury real estate firm that needed a premium digital presence to attract high-level clients, so we built a brand, a website, and a full CMS from the ground up.",
    description:
      "A premium digital platform for a luxury real estate firm, built to communicate high status, establish credibility, and attract discerning clients through a refined brand and seamless backend.",
    problem:
      "Hargarten needed to project a premium, high-status image to attract luxury clients, but had no digital presence, no established brand, and no way to manage listings or client inquiries without developer support.",
    solution:
      "We created a full brand identity, designed a luxury-feel website that communicates professionalism and exclusivity, and built a complete CMS that allows the admin to independently manage property listings, new content, and client inquiries.",
    businessValue:
      "The platform gave Hargarten the credibility and visual authority to compete for high-level clients, with a fully managed backend that lets the team update listings and handle inquiries without any technical support.",
    link: "https://hargarten.vercel.app/",
    features: [
      {
        title: "Custom luxury brand identity and logo design",
        detail:
          "A bespoke brand and logo built from scratch to project the premium, high-status image the firm needed to attract luxury clients.",
      },
      {
        title: "Premium visual design communicating high status",
        detail:
          "A refined, exclusive design language that signals professionalism and prestige to discerning clientele.",
      },
      {
        title: "Full CMS for managing property listings and content",
        detail:
          "A complete content management system that lets the team add and update property listings and content independently.",
      },
      {
        title: "Inquiry management system for client leads",
        detail:
          "A system for capturing and organising client inquiries, so leads are tracked and nothing slips through the cracks.",
      },
    ],
    tags: ["Real Estate", "Luxury", "Branding"],
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
      {
        title: "Fully editable CMS for content management",
        detail:
          "A content management system giving the team full control to edit and publish content without developer involvement.",
      },
      {
        title: "Inquiry forms for prospective clients",
        detail:
          "Inquiry forms that turn interest from prospective investors and partners into actionable leads.",
      },
      {
        title: "News and events publishing system",
        detail:
          "Tools to publish news and events, keeping investors and partners current on the developer's progress.",
      },
      {
        title: "Elegant, precision-crafted visual design",
        detail:
          "A meticulously crafted, elegant design that reflects the developer's institutional-grade, luxury positioning.",
      },
    ],
    tags: ["Real Estate", "CMS", "Branding"],
    year: 2023,
  },
]
