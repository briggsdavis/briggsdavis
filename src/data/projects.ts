export interface Project {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string | null;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'oderum',
    name: 'Oderum',
    image: '/images/portfolio-oderum.png',
    description: 'A minimalist fragrance platform featuring intuitive visual design and innovative rating methodologies for discerning scent enthusiasts.',
    link: 'https://oderum.com',
    features: [
      'Minimalist, visually-driven UI design',
      'Innovative fragrance rating system',
      'Responsive mobile-first experience',
      'Curated scent discovery journey',
    ],
  },
  {
    id: 'hormone-vitality-coaching',
    name: 'Hormone Vitality Coaching',
    image: '/images/portfolio-2.jpg',
    description: 'A wellness platform for a health coach, showcasing specialized services and expertise while expressing her unique personality through thoughtful visual design.',
    link: 'https://hormonevitalitycoaching.com',
    features: [
      'Custom brand identity and visual language',
      'Service showcase with booking integration',
      'Testimonials and social proof sections',
      'SEO-optimized content structure',
    ],
  },
  {
    id: 'ease-engineering',
    name: 'EASE Engineering',
    image: '/images/portfolio-3.jpg',
    description: 'A professional showcase for a specialized engineering firm, highlighting services, capabilities, and portfolio across East African operations.',
    link: 'https://ease-int.com',
    features: [
      'Multi-service portfolio presentation',
      'Project gallery with categorized filtering',
      'Regional operations overview',
      'Professional team and capability highlights',
    ],
  },
  {
    id: 'anne-silver',
    name: 'Anne Silver',
    image: '/images/portfolio-annesilver.png',
    description: 'A bespoke jewelry e-commerce platform featuring custom craft capabilities, curated collections, and an integrated CMS for seamless content management.',
    link: 'https://annesilver.com',
    features: [
      'Full e-commerce with cart and checkout',
      'Custom jewelry order capabilities',
      'Integrated CMS for content management',
      'Curated collection browsing experience',
    ],
  },
  {
    id: 'nordic-seafood',
    name: 'Nordic Seafood',
    image: '/images/portfolio-5.jpg',
    description: 'Nordic Seafood is a direct-to-consumer platform that brings premium Norwegian Atlantic salmon to Ethiopia, serving restaurants, hotels, and individual buyers who want sushi-grade fish with verified sourcing. It solves the trust and logistics gap in importing high-quality seafood by guiding users from browsing cuts to bank transfer checkout to live shipment tracking. The site carries a clean, arctic-premium aesthetic with deep blues and elegant typography, built for a seafood importer positioning itself as the definitive source for Norwegian salmon in Addis Ababa.',
    link: null,
    features: [
      'Customer dashboard with order tracking',
      'Admin dashboard for inventory management',
      'Quality certification display',
      'Delivery scheduling and logistics',
    ],
  },
  {
    id: 'africa-growth-axis',
    name: 'Africa Growth Axis',
    image: '/images/portfolio-aga.png',
    description: 'A strategic advisory platform for international companies and investors entering African markets, featuring a comprehensive admin-managed content system.',
    link: 'https://aga-advisory.com/',
    features: [
      'Dynamic content management system',
      'Market insights and research sections',
      'Advisory service showcases',
      'Admin panel for content updates',
    ],
  },
  {
    id: 'refenti',
    name: 'Refenti',
    image: '/images/portfolio-refenti.jpg',
    description: 'An institutional website for a premier real estate development group in Addis Ababa, Ethiopia, designed with precision to communicate elegance and high quality.',
    link: null,
    features: [
      'Fully editable CMS for content management',
      'Inquiry forms for prospective clients',
      'News and events publishing system',
      'Elegant, precision-crafted visual design',
    ],
  },
];
