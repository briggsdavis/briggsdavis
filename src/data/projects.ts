export interface ProjectFeature {
  title: string
  detail: string
}

export interface Project {
  id: string
  name: string
  image: string
  overview: string
  caseStudyImages: [string, string]
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
    id: "social-satisfaction",
    name: "Social Satisfaction",
    image: "/images/socialsatisfaction1.jpg",
    overview:
      "Social Satisfaction is a digital creative marketing agency based in Pittsburgh, Pennsylvania. The agency provides creative direction, branding, social media, motion graphics, and campaign work for brands and creative teams.",
    caseStudyImages: ["/images/socialsatisfaction2.jpg", "/images/socialsatisfaction3.jpg"],
    shortDescription:
      "A digital creative marketing agency whose old site failed to reflect the caliber of their work, so we built a visually dashing platform worthy of their expertise.",
    description:
      "A portfolio-led website with 3D scroll interactions, custom load sequences, distinctive project layouts, and a CMS for managing case studies and agency content.",
    problem:
      "A digital creative marketing agency had an old site that didn't reflect the caliber of their work or expertise. It failed to communicate their creativity to prospective clients or build the credible, professional presence needed to attract new business.",
    solution:
      "We built a visually dashing, high-quality platform packed with 3D scroll-triggered animations, SVG-based load-in sequences, and a series of unique layouts and page structures. A custom-designed CMS lets the team manage its portfolio and clearly communicate the problems and solutions behind each project.",
    businessValue:
      "The platform gives the agency a professional, credible digital presence that matches the quality of their work, showcases their portfolios in a way that resonates with clients, and actively drives new business.",
    link: "https://socialsatisfaction.agency/",
    features: [
      {
        title: "Custom-designed content management system",
        detail:
          "A bespoke CMS built specifically for the agency, giving the team full control to manage their portfolio, case studies, and content without developer support.",
      },
      {
        title: "3D scroll-triggered animations",
        detail:
          "Immersive 3D animations that respond to scroll, creating an eye-catching, interactive experience that reflects the agency's creative caliber.",
      },
      {
        title: "Scroll-triggered SVG animations and load-in sequences",
        detail:
          "A series of SVG-based animations and carefully choreographed load-in sequences that bring the site to life and keep visitors engaged.",
      },
      {
        title: "Unique layouts and page structures",
        detail:
          "A collection of distinctive, custom page structures that work together to communicate each project's problems and solutions as a high-quality communication platform.",
      },
    ],
    tags: ["Marketing Agency", "Creative", "CMS"],
    year: 2026,
  },
  {
    id: "oderum",
    name: "Oderum",
    image: "/images/oderum1.jpg",
    overview:
      "Oderum is a Briggs Davis concept for fragrance enthusiasts. It brings fragrance notes, sillage, projection, performance, and other comparison details into one visually focused experience, supported by AI recommendations.",
    caseStudyImages: ["/images/oderum2.jpg", "/images/oderum3.jpg"],
    description:
      "A minimalist fragrance discovery interface for exploring detailed scent profiles, comparing performance attributes, and receiving AI-assisted recommendations.",
    problem:
      "Fragrance discovery online was dominated by text-heavy, visually uninspiring interfaces that failed to capture the sensory nature of the category.",
    solution:
      "We designed a minimalist, visually-driven concept that lets users compare fragrances across longevity, sillage, projection, and value.",
    businessValue:
      "Created as a concept project, Oderum demonstrates how a focused interface and multi-attribute rating system can make fragrance comparison clearer and more useful.",
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
          "A multi-attribute scoring system that lets users compare each scent across longevity, sillage, projection, and value rather than relying on a single star score.",
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
    image: "/images/hormonevitalitycoaching1.jpg",
    overview:
      "Hormone Vitality Coaching is a hybrid health coaching practice operating between Ethiopia and Belgium. It supports women, particularly through post-menopause, with general health and hormonal wellness services delivered remotely and in person.",
    caseStudyImages: [
      "/images/hormonevitalitycoaching2.jpg",
      "/images/hormonevitalitycoaching3.jpg",
    ],
    shortDescription:
      "A specialist health coach with no digital presence, so we built a branded platform that showcases her expertise and drives client bookings.",
    description:
      "A service website that presents the practice, coaching programs, testimonials, and direct booking paths within a consistent branded experience.",
    problem:
      "A specialist health coach had no effective way to communicate her expertise or convert visitors into clients without a compelling online presence.",
    solution:
      "We built a branded platform that presents her services and testimonials, builds trust through social proof, and provides direct booking paths.",
    businessValue:
      "The platform established her credibility online, expanded her visibility in a crowded market, and gave prospective clients a clear path to book her services.",
    link: "https://hormonevitalitycoaching.com",
    features: [
      {
        title: "Custom brand identity and visual language",
        detail:
          "A bespoke look and feel across colour, type, and imagery, built specifically for her practice so it stands apart in a crowded wellness market.",
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
    image: "/images/ease1.jpg",
    overview:
      "EASE Engineering is an Addis Ababa-based structural engineering and construction firm operating in Ethiopia and Djibouti. It provides post-tensioning, engineering, execution, and construction for high-rise buildings, complex residential projects, and specialist subcontracting packages.",
    caseStudyImages: ["/images/ease2.jpg", "/images/ease3.jpg"],
    description:
      "A corporate website that organizes EASE's engineering services, project history, regional operations, and technical capabilities for prospective clients and partners.",
    problem:
      "The previous site did not present the firm's full service range, project history, or regional coverage across East Africa.",
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
    image: "/images/annesilver1.jpg",
    overview:
      "Anne Silver is an Addis Ababa-based jewelry business creating silver and gold pieces for women and men, including designs with gemstones. It primarily serves individual customers while also selling through selected retail channels and markets.",
    caseStudyImages: ["/images/annesilver2.jpg", "/images/annesilver3.jpg"],
    description:
      "A product showcase with collection pages, detailed jewelry information, and a CMS for managing the products and content displayed online.",
    problem:
      "A bespoke jewelry designer needed an online presence where prospective customers could explore her products and learn about her work.",
    solution:
      "We built a product-focused website with detailed collection pages and an integrated CMS that gives her control over the products and content on display.",
    businessValue:
      "The website gives Anne Silver a central place to present her products, explain her practice, and direct prospective customers to her work.",
    link: "https://annesilver.com",
    features: [
      {
        title: "Online jewelry catalogue",
        detail:
          "A structured online catalogue that gives prospective customers a clear way to browse her jewelry collections.",
      },
      {
        title: "Detailed product presentation",
        detail:
          "Dedicated product pages that present each piece through imagery and supporting information.",
      },
      {
        title: "Integrated CMS for content management",
        detail:
          "A content management system that lets her add and edit collections and pages herself, with no developer needed.",
      },
      {
        title: "Curated collection browsing experience",
        detail:
          "A clear browsing structure that helps visitors move through products and collections.",
      },
    ],
    tags: ["Jewelry", "Product Showcase", "CMS"],
    year: 2023,
  },
  {
    id: "nordic-seafood",
    name: "Nordic Seafood",
    image: "/images/nordicseafood1.jpg",
    overview:
      "Nordic Seafood operates between Norway and Ethiopia, working with two Norwegian salmon and seafood partners to import seafood directly into Ethiopia. Through its website, the company supplies individuals, restaurants, and hotels, with delivery integrated into the ordering process.",
    caseStudyImages: ["/images/nordicseafood2.jpg", "/images/nordicseafood3.jpg"],
    shortDescription:
      "A Norwegian salmon supplier targeting East African buyers, for whom we built a direct-to-consumer platform with real-time shipment tracking.",
    description:
      "A direct-to-consumer platform connecting East African buyers directly to Norwegian Atlantic salmon, with real-time shipment tracking and a streamlined checkout flow.",
    problem:
      "Ethiopian restaurants, hotels, and individual buyers had no reliable supplier for verified Norwegian salmon and no trusted way to source, order, and track sushi-grade fish.",
    solution:
      "We built a direct-to-consumer platform connecting buyers directly to Norwegian Atlantic salmon, complete with real-time shipment tracking and a streamlined checkout flow.",
    businessValue:
      "The platform gave buyers sourcing information, order tracking, and checkout, while giving staff customer and order management tools.",
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
          "Live tracking that lets buyers follow their order from dispatch to delivery, providing essential reassurance for perishable, sushi-grade fish.",
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
    image: "/images/aga1.jpg",
    overview:
      "Africa Growth Axis is an African market-entry advisory firm based in Addis Ababa, Ethiopia. It supports companies and investors with market entry, institutional engagement, strategic structuring, partnerships, and execution across African markets.",
    caseStudyImages: ["/images/aga2.jpg", "/images/aga3.jpg"],
    shortDescription:
      "An African market entry advisory firm with no web presence, so we built a platform that explains its services and supports new inquiries.",
    description:
      "An advisory website that explains the firm's services, geographic focus, and working approach, with a CMS for publishing insights and updating content independently.",
    problem:
      "International companies and investors navigating African market entry had no credible digital touchpoint for AGA's advisory services; the firm had no web presence at all.",
    solution:
      "We built a platform with a dynamic CMS that gives the team control over its advisory services, market insights, and inquiries.",
    businessValue:
      "The platform gave the firm a central place to explain advisory services, receive inquiries, and build business credibility.",
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
    image: "/images/bracstonehouse1.jpg",
    overview:
      "Brac Stone House is a property more than 100 years old on the island of Brac, Croatia. It sits inland within an ethno heritage village, combining a protected historic setting with elevated views and renovation potential.",
    caseStudyImages: ["/images/bracstonehouse2.jpg", "/images/bracstonehouse3.jpg"],
    description:
      "A single-property website combining video, sound, renovation concepts, specifications, and location information to present the house in context.",
    problem:
      "A standard property listing could not fully present the condition, renovation potential, setting, and history of the stone house.",
    solution:
      "We built a dedicated property website using video, sound, renovation concepts, and location information to present the house in context.",
    businessValue:
      "The site gives prospective buyers one place to understand the property, its renovation possibilities, and its location before contacting the seller.",
    link: "https://bracstonehouse.com",
    features: [
      {
        title: "Immersive sound and visual storytelling",
        detail:
          "Video and sound design present the property and its setting beyond what a standard listing can show.",
      },
      {
        title: "Renovation vision and possibility showcase",
        detail:
          "Renovation concepts help prospective buyers understand what the historic stone house could become.",
      },
      {
        title: "Mediterranean lifestyle and location narrative",
        detail: "Location information explains the island setting and the surrounding area.",
      },
      {
        title: "Dedicated single-property presentation",
        detail:
          "A focused website brings the property details, renovation concepts, media, and contact path together.",
      },
    ],
    tags: ["Real Estate", "Immersive", "Property"],
    year: 2025,
  },
  {
    id: "butcher-and-the-rye",
    name: "Butcher and the Rye",
    image: "/images/butcherandtherye1.jpg",
    overview:
      "Butcher and the Rye is a Pittsburgh restaurant within the Richard DeShantz Restaurant Group. It pairs high-quality seasonal cooking and a studied whiskey program with a warm, wood-lined atmosphere influenced by mountain lodges and log cabins.",
    caseStudyImages: ["/images/butcherandtherye2.jpg", "/images/buctherandtherye3.jpg"],
    shortDescription:
      "A Pittsburgh restaurant website that carries the venue's rustic, moody identity into its menus, reservations, and content.",
    description:
      "A restaurant website that carries the venue's visual identity into its menus, reservation flow, drinks program, editorial content, and staff-managed updates.",
    problem:
      "Butcher and the Rye needed a website that presented the restaurant's atmosphere, ranked in local search, and gave guests a direct path to reserve a table.",
    solution:
      "We carried the restaurant's rustic, moody visual language into the website, integrated reservations, and built a CMS for managing menus and content.",
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
        detail: "A booking system that gives guests a direct way to reserve a table from the site.",
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
    image: "/images/hargarten1.jpg",
    overview:
      "Hargarten is a Luxembourg real estate agency combining property services with specialist real estate legal support. It serves high-net-worth individuals seeking luxury residential property across Luxembourg.",
    caseStudyImages: ["/images/hargarten2.jpg", "/images/hargarten3.jpg"],
    shortDescription:
      "A real estate brand, property website, listing CMS, and inquiry workflow built from the ground up.",
    description:
      "A luxury property website with an integrated listing CMS, legal-service information, and an inquiry workflow for prospective buyers and sellers.",
    problem:
      "Hargarten had no established brand or website and needed a way to publish property listings and manage client inquiries without developer support.",
    solution:
      "We developed the brand identity, property website, listing CMS, and inquiry-management workflow from the ground up.",
    businessValue:
      "The platform gives Hargarten a consistent brand presence and lets the team publish listings and handle inquiries without technical support.",
    link: "https://hargarten-properties.lu/",
    features: [
      {
        title: "Custom brand identity and logo design",
        detail: "A brand and logo developed from the ground up for the real estate firm.",
      },
      {
        title: "Brand-aligned property website",
        detail:
          "A consistent visual system for presenting the firm, its properties, and its services.",
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
    overview:
      "Refenti is an Addis Ababa real estate operator and developer focused on high-rise residential and mixed-use projects. It serves high-net-worth buyers and development partners through premium locations, distinctive architecture, large structural spans, and post-tensioned construction.",
    caseStudyImages: [
      "/images/case-studies/refenti-sample.jpg",
      "/images/case-studies/refenti-sample.jpg",
    ],
    shortDescription:
      "A real estate development website for presenting projects, publishing updates, and receiving investor and buyer inquiries.",
    description:
      "A development-focused website that presents Refenti's properties, publishes news and events, and routes buyer, investor, and partner inquiries to the team.",
    problem:
      "A premier real estate developer in Addis Ababa had no digital presence, making it impossible to establish the premium positioning needed to compete for high-end clients and development partners.",
    solution:
      "We built a project-focused website with a CMS for news and events and inquiry forms for prospective buyers, investors, and partners.",
    businessValue:
      "The platform gives Refenti a central place to present developments, keep stakeholders informed, and receive buyer, investor, and partner inquiries.",
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
        title: "Project-focused visual design",
        detail:
          "A visual system designed to present the developer, its properties, and current projects clearly.",
      },
    ],
    tags: ["Real Estate", "CMS", "Branding"],
    year: 2023,
  },
]
