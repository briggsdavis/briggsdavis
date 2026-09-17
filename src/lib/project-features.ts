export type ProjectFeature = { title: string; description: string }

const features: Record<string, ProjectFeature[]> = {
  "social-satisfaction": [
    {
      title: "Scroll-responsive 3D",
      description: "3D scenes respond to scroll, bringing motion into the agency’s portfolio.",
    },
    {
      title: "Custom transitions",
      description: "SVG animations and custom load sequences give each transition its own rhythm.",
    },
    {
      title: "Detailed case studies",
      description:
        "Project pages frame the thinking behind the work, with varied page structures for each case study.",
    },
    {
      title: "Content management",
      description:
        "A custom CMS lets the team publish projects, manage case studies, and update agency content without developer support.",
    },
  ],
  oderum: [
    {
      title: "Fragrance profiles",
      description:
        "Notes, longevity, sillage, projection, and value come together in one clear view.",
    },
    {
      title: "Personal recommendations",
      description: "AI-assisted suggestions help fragrance enthusiasts narrow the field.",
    },
    {
      title: "Multi-attribute ratings",
      description:
        "A rating system gives visitors more useful points of comparison than a single score.",
    },
    {
      title: "Mobile-first discovery",
      description:
        "An image-led experience guides people from browsing into focused recommendations.",
    },
  ],
  "hormone-vitality-coaching": [
    {
      title: "Consistent brand system",
      description:
        "A consistent online presence connects the practice’s work between Ethiopia and Belgium.",
    },
    {
      title: "Coaching programs",
      description:
        "Programs and testimonials are arranged around women seeking general and post-menopause support.",
    },
    {
      title: "Direct booking",
      description: "Each program connects to a clear next step through direct booking paths.",
    },
    {
      title: "Accessible discovery",
      description:
        "Search-friendly content and responsive layouts support both remote clients and people discovering in-person services.",
    },
  ],
  "ease-engineering": [
    {
      title: "Technical capabilities",
      description:
        "Services and technical capabilities present the firm’s experience with high-rise and complex residential projects.",
    },
    {
      title: "Regional operations",
      description: "The website organizes the firm’s operations across Ethiopia and Djibouti.",
    },
    {
      title: "Filterable portfolio",
      description:
        "Visitors can explore completed projects by category through a filterable gallery.",
    },
    {
      title: "Team profiles",
      description:
        "Team profiles and capability pages add context for prospective clients and partners.",
    },
  ],
  "brac-stone-house": [
    {
      title: "Immersive property story",
      description:
        "Video, sound, and photography present a century-old house on the Croatian island of Brač.",
    },
    {
      title: "Village and landscape",
      description:
        "Elevated views place the property within its protected village and surrounding landscape.",
    },
    {
      title: "Renovation concepts",
      description:
        "Renovation concepts show what the property could become alongside specifications and location details.",
    },
    {
      title: "Focused inquiries",
      description:
        "A focused contact path brings the property story together before a prospective buyer reaches out.",
    },
  ],
  "nordic-seafood": [
    {
      title: "Product selection",
      description:
        "Buyers explore Norwegian salmon and seafood, selecting cuts and portion sizes during checkout.",
    },
    {
      title: "Local payment flow",
      description: "Orders use a bank transfer flow suited to the Ethiopian market.",
    },
    {
      title: "Shipment tracking",
      description: "Shipment tracking follows each delivery from dispatch.",
    },
    {
      title: "Fulfillment tools",
      description: "Customer and order tools give staff one place to manage fulfillment.",
    },
  ],
  "africa-growth-axis": [
    {
      title: "Market entry services",
      description:
        "Services, geographic focus, and working approach introduce the firm to companies and investors exploring African markets.",
    },
    {
      title: "Insights and research",
      description:
        "Dedicated sections bring market insights and research into the firm’s digital presence.",
    },
    {
      title: "Service inquiries",
      description: "Inquiry paths stay close to each service, giving visitors a direct next step.",
    },
    {
      title: "Publishing tools",
      description:
        "A custom admin panel lets the team publish articles and update content without technical support.",
    },
  ],
  "butcher-and-the-rye": [
    {
      title: "Atmospheric design",
      description:
        "Photography and a lodge-inspired visual system carry the restaurant’s rustic, moody atmosphere into the web.",
    },
    {
      title: "Menus and whiskey",
      description: "Menus and the whiskey program sit alongside photography of the venue.",
    },
    {
      title: "Online reservations",
      description: "Guests can move from discovery to reservations without leaving the site.",
    },
    {
      title: "Staff publishing",
      description:
        "A CMS supports menu and editorial updates, while responsive pages and local search help guests discover the restaurant.",
    },
  ],
  refenti: [
    {
      title: "Project-led portfolio",
      description:
        "High-rise residential and mixed-use developments take the lead in the website’s presentation.",
    },
    {
      title: "Clear navigation",
      description:
        "Properties, company information, and current developments are easy to navigate.",
    },
    {
      title: "Content management",
      description: "A CMS gives the team control over project content, news, and events.",
    },
    {
      title: "Dedicated inquiries",
      description:
        "Separate paths direct buyers, investors, and development partners to the right conversation.",
    },
  ],
  hargarten: [
    {
      title: "Brand identity",
      description:
        "The new brand identity establishes a digital home for the real estate agency and its legal practice.",
    },
    {
      title: "Property and legal services",
      description:
        "Luxury properties sit alongside the firm’s services and specialist legal support.",
    },
    {
      title: "Listing management",
      description:
        "An integrated CMS lets the team publish and update listings without developer support.",
    },
    {
      title: "Lead management",
      description:
        "Buyer and seller inquiries feed into a workflow that connects property discovery and follow-up.",
    },
  ],
  "luma-spa": [
    {
      title: "Editorial visual system",
      description:
        "Cream backgrounds, muted rose accents, serif headlines, and overlapping photography panels give the studio a layered visual identity.",
    },
    {
      title: "Signature rituals",
      description: "The homepage introduces the studio’s approach and three signature rituals.",
    },
    {
      title: "Treatment menu",
      description: "Six services are presented with durations, prices, and expandable details.",
    },
    {
      title: "Treatment inquiries",
      description:
        "Treatment selection, visit information, and a short inquiry form prepare an email for guests to send.",
    },
  ],
  "pre-amp-coffee-studio": [
    {
      title: "Music-inspired identity",
      description:
        "Cream backgrounds, orange accents, grooved lettering, and record-store imagery reflect the coffee studio and listening bar.",
    },
    {
      title: "Coffee and ordering",
      description:
        "Product photography, prices, and direct ordering links bring the coffee menu online.",
    },
    {
      title: "Studio stories",
      description: "Dedicated pages introduce Kyoto cold brew and share the studio’s story.",
    },
    {
      title: "Community events",
      description: "List and calendar views surface pop-ups and community events.",
    },
  ],
  layrd: [
    {
      title: "Four immersive scenes",
      description:
        "Full-screen scenes move from a moss-covered concrete portal to a terraced hillside, a material study, and a sunlit courtyard.",
    },
    {
      title: "Material-led palette",
      description:
        "Forest green, weathered stone, and warm light give the site a quiet, grounded presence.",
    },
    {
      title: "Architectural typography",
      description:
        "Oversized typography anchors each scene, with spare navigation and shifting compositions guiding the sequence.",
    },
    {
      title: "Focused storytelling",
      description:
        "Brief prose connects structure, intention, and growth through simple statements and supporting thoughts.",
    },
  ],
}

export function getProjectFeatures(slug: string, content: string): ProjectFeature[] {
  if (features[slug]) return features[slug]
  const sentences = content.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((text) => text.trim()) ?? []
  return Array.from({ length: 4 }, (_item, index) => ({
    title: `Feature ${String(index + 1).padStart(2, "0")}`,
    description: sentences.filter((_sentence, sentence) => sentence % 4 === index).join(" "),
  }))
}
