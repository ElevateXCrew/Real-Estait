import type {
  Property,
  Service,
  Project,
  ProcessStep,
  Testimonial,
  Stat,
  WhyChooseItem,
  ContactInfo,
} from "./types";

/* ---------- Image pools (from image-search, OSS-hosted) ---------- */
const IMG = {
  houses: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0d28ecfe31b5.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f92c5fcb8f5b.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/79c316d45390.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bf43039ea695.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/70ad1aa53314.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6f78cb29c18f.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/99538b11ec78.jpeg",
  ],
  interiors: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f939f0869943.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f52b0c97f509.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3bd117d94094.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cf9c00c4e3bb.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c92dce9d568f.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/95a6cb81ee79.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ecb9fa75cfd9.jpeg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2929deff4e80.jpg",
  ],
  kitchens: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e788702e2132.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/26a727cf816c.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/29d5bf405ec1.webp",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d2b275f7707.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b97a7b1b0746.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ef012e28115d.jpg",
  ],
  commercial: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7fd62bfb9cb4.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/311306f4f320.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b7f0e53b6711.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1c36221dd9ee.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f9600ce296fb.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d0d7cddaae61.jpg",
  ],
  construction: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c25196e654f.jpeg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/58ef024e4dc1.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/358e731a5ab3.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7d77ffceb3b0.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c56849edb503.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cb5e21f1c216.jpg",
  ],
  bedrooms: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/365ed460ff84.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbd37e8f9bec.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/68cf7178f41d.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2e515e7584dd.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/77a939476d8f.png",
  ],
  villas: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cf6452bd70c6.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fc863500a6f1.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/236c121eb91d.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3e19d90ac654.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b7948cec484.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa0ed3d355b3.jpeg",
  ],
  apartments: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f5851648e8d1.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b8867f0968a8.jpeg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f1a5b9dbc67.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3a016d3549ca.jpeg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/daf3235ae619.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9c4ab2e47507.jpg",
  ],
  plans: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/200c619645e5.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/997472944bc9.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5de2dbd05d4f.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8310deeeddf8.jpg",
  ],
  bathrooms: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bd2d8f556af0.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b64737d80184.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f0e959e55191.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f60bc0db664.jpg",
  ],
};

export const HERO_IMAGE = IMG.villas[2];
export const ABOUT_IMAGE = IMG.houses[5];
export const CTA_IMAGE = IMG.construction[3];

/* ---------- Company contact info ---------- */
export const CONTACT_INFO: ContactInfo = {
  company: "Meridian Group",
  tagline:
    "Real estate, construction, architecture, and property development — under one trusted roof.",
  phone: "+1 (415) 555-0142",
  email: "hello@meridiangroup.com",
  address: "210 Harbor View Avenue, Suite 1100, San Francisco, CA 94107",
  hours: "Monday – Saturday: 9:00 AM – 7:00 PM",
  social: [
    { label: "LinkedIn", href: "#", icon: "Linkedin" },
    { label: "Instagram", href: "#", icon: "Instagram" },
    { label: "Facebook", href: "#", icon: "Facebook" },
    { label: "Twitter", href: "#", icon: "Twitter" },
  ],
};

/* ---------- Stats ---------- */
export const STATS: Stat[] = [
  { label: "Properties Listed", value: 1280, suffix: "+", icon: "Building2" },
  { label: "Completed Projects", value: 342, suffix: "+", icon: "HardHat" },
  { label: "Construction Experience", value: 18, suffix: " yrs", icon: "Ruler" },
  { label: "Satisfied Clients", value: 2150, suffix: "+", icon: "Users" },
  { label: "Cities Served", value: 24, suffix: "", icon: "MapPin" },
];

/* ---------- Process steps ---------- */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation & Requirements",
    description:
      "We begin by understanding your property goals, construction vision, budget, and timeline through a detailed consultation.",
    icon: "MessagesSquare",
  },
  {
    number: "02",
    title: "Planning & Site Assessment",
    description:
      "Our team evaluates the site, reviews feasibility, zoning, and constraints, and builds a realistic project plan.",
    icon: "ClipboardList",
  },
  {
    number: "03",
    title: "Design & Proposal",
    description:
      "Architects and engineers craft detailed designs and a transparent proposal covering scope, materials, and costs.",
    icon: "PencilRuler",
  },
  {
    number: "04",
    title: "Execution & Project Management",
    description:
      "Construction or transaction execution begins with dedicated project management, quality control, and progress updates.",
    icon: "Hammer",
  },
  {
    number: "05",
    title: "Quality Inspection",
    description:
      "Every milestone passes rigorous inspection against structural, safety, and finish standards before sign-off.",
    icon: "ShieldCheck",
  },
  {
    number: "06",
    title: "Final Handover & Support",
    description:
      "We deliver keys or completed assets with documentation, warranties, and post-handover support.",
    icon: "Handshake",
  },
];

/* ---------- Why choose us ---------- */
export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    title: "Experienced Professionals",
    description:
      "A multidisciplinary team of agents, architects, engineers, and project managers with proven track records.",
    icon: "Users",
  },
  {
    title: "Quality Construction",
    description:
      "Premium materials, certified contractors, and uncompromising structural standards on every build.",
    icon: "HardHat",
  },
  {
    title: "Transparent Communication",
    description:
      "Clear timelines, documented costs, and regular progress reports throughout the entire engagement.",
    icon: "MessageSquareText",
  },
  {
    title: "Verified Property Information",
    description:
      "Every listing is field-checked with accurate specs, legal status, and current condition before publishing.",
    icon: "BadgeCheck",
  },
  {
    title: "On-Time Project Delivery",
    description:
      "Disciplined scheduling and proactive risk management keep projects on track for handover.",
    icon: "Clock",
  },
  {
    title: "Dedicated Client Support",
    description:
      "A single point of contact who knows your project from day one through long after handover.",
    icon: "Headset",
  },
  {
    title: "Tailored Property Solutions",
    description:
      "Investment guidance, custom builds, and renovation plans shaped around your specific goals.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Attention to Detail",
    description:
      "From finishes to documentation, we sweat the small things so the final result feels complete.",
    icon: "Sparkles",
  },
];

/* ---------- Testimonials (clearly labeled placeholders) ---------- */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sample Client A",
    role: "Homeowner",
    project: "Maple Ridge Villa",
    quote:
      "Placeholder testimonial — replace with verified client feedback. The team handled design, construction, and handover with professionalism and clear communication throughout.",
    initials: "SA",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Sample Client B",
    role: "Investor",
    project: "Harbor View Apartments",
    quote:
      "Placeholder testimonial — replace with verified client feedback. Their investment guidance and project management made a complicated multi-unit development feel straightforward.",
    initials: "SB",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Sample Client C",
    role: "Business Owner",
    project: "Downtown Office Fit-Out",
    quote:
      "Placeholder testimonial — replace with verified client feedback. The commercial fit-out was delivered on schedule with excellent attention to detail and minimal disruption.",
    initials: "SC",
    rating: 5,
    placeholder: true,
  },
];

/* ---------- Services ---------- */
export const SERVICES: Service[] = [
  // Real Estate Services
  {
    slug: "buying-properties",
    title: "Buying Properties",
    group: "Real Estate",
    icon: "Home",
    shortDescription:
      "Curated listings and expert guidance to find and acquire the right property.",
    overview:
      "Our buying service pairs you with seasoned agents who understand local markets, negotiate firmly on your behalf, and guide you through every legal and financial step of acquisition.",
    scope: [
      "Needs assessment and property shortlisting",
      "Accompanied viewings and market analysis",
      "Offer negotiation and due diligence",
      "Documentation and closing support",
    ],
    benefits: [
      "Access to verified, field-checked listings",
      "Skilled negotiation that protects your budget",
      "End-to-end paperwork handling",
      "Objective market data for confident decisions",
    ],
    workflow: [
      { title: "Discovery", description: "We map your budget, location, and lifestyle needs." },
      { title: "Shortlist", description: "You receive curated, verified property options." },
      { title: "Negotiate", description: "We secure the best terms on your behalf." },
      { title: "Close", description: "We manage documentation through to handover." },
    ],
    image: IMG.houses[0],
    faqs: [
      { question: "Do you charge buyers a fee?", answer: "Our buyer representation is typically covered by the seller's commission structure; we confirm specifics in the engagement letter." },
      { question: "How long does a purchase take?", answer: "Timelines vary by property and financing, but a typical transaction closes in 30–60 days after an accepted offer." },
    ],
  },
  {
    slug: "selling-properties",
    title: "Selling Properties",
    group: "Real Estate",
    icon: "Tag",
    shortDescription:
      "Maximize value with professional valuation, marketing, and qualified buyer access.",
    overview:
      "We help owners position, price, and market their property to attract qualified buyers quickly, handling inquiries, viewings, and negotiation from list to close.",
    scope: [
      "Comparative market valuation",
      "Professional photography and listing copy",
      "Buyer qualification and viewings",
      "Offer management and closing",
    ],
    benefits: [
      "Data-driven pricing strategy",
      "Wide marketing reach across channels",
      "Screened, qualified buyers only",
      "Skilled negotiation for best net proceeds",
    ],
    workflow: [
      { title: "Value", description: "We prepare a comparative market analysis." },
      { title: "Prepare", description: "Photography, staging guidance, and listing launch." },
      { title: "Market", description: "Targeted campaigns reach qualified buyers." },
      { title: "Close", description: "We negotiate and manage through closing." },
    ],
    image: IMG.houses[1],
    faqs: [
      { question: "How is my property valued?", answer: "We use recent comparable sales, current listings, and property condition to recommend a pricing strategy." },
      { question: "How long until sale?", answer: "Well-priced properties in active markets often receive offers within a few weeks, though timelines vary." },
    ],
  },
  {
    slug: "property-rental",
    title: "Property Rental",
    group: "Real Estate",
    icon: "KeyRound",
    shortDescription:
      "Find quality tenants or rental homes with full screening and support.",
    overview:
      "Whether you're renting out a property or searching for one, we connect the right tenants with the right homes, handle lease documentation, and support both parties throughout the tenancy.",
    scope: [
      "Tenant sourcing and screening",
      "Lease drafting and compliance",
      "Move-in inspection and inventory",
      "Ongoing tenancy support",
    ],
    benefits: [
      "Thorough tenant background checks",
      "Legally sound lease documentation",
      "Fair, consistent rent pricing",
      "Responsive support during tenancy",
    ],
    workflow: [
      { title: "List", description: "We market the property to qualified renters." },
      { title: "Screen", description: "Applicants are vetted for reliability." },
      { title: "Lease", description: "We prepare and execute compliant agreements." },
      { title: "Support", description: "We stay available throughout the tenancy." },
    ],
    image: IMG.apartments[0],
    faqs: [
      { question: "What does screening include?", answer: "Identity verification, employment and income checks, and previous landlord references where available." },
      { question: "Who handles maintenance?", answer: "For rental placement, the owner typically manages maintenance; our management service can take this on if engaged." },
    ],
  },
  {
    slug: "property-management",
    title: "Property Management",
    group: "Real Estate",
    icon: "Building2",
    shortDescription:
      "Hands-off ownership with maintenance, tenants, and finances handled for you.",
    overview:
      "Our full-service management covers tenant relations, rent collection, preventive maintenance, and financial reporting — so your investment performs without consuming your time.",
    scope: [
      "Rent collection and arrears management",
      "Preventive and reactive maintenance",
      "Vendor coordination and inspections",
      "Monthly financial reporting",
    ],
    benefits: [
      "Predictable cash flow with timely collection",
      "Proactive maintenance protects asset value",
      "Transparent monthly statements",
      "Single point of contact for tenants and owners",
    ],
    workflow: [
      { title: "Onboard", description: "We take over tenancy and vendor relationships." },
      { title: "Operate", description: "Routine collection, maintenance, and inspections." },
      { title: "Report", description: "You receive clear monthly statements." },
      { title: "Optimize", description: "We suggest improvements to protect yield." },
    ],
    image: IMG.commercial[0],
    faqs: [
      { question: "What is the management fee?", answer: "Fees are typically a percentage of collected rent; we provide a transparent schedule during onboarding." },
      { question: "Do you handle emergency repairs?", answer: "Yes, we coordinate urgent repairs through vetted contractors and follow an agreed authorization threshold." },
    ],
  },
  {
    slug: "real-estate-investment-consulting",
    title: "Investment Consulting",
    group: "Real Estate",
    icon: "TrendingUp",
    shortDescription:
      "Data-backed guidance on where, when, and what to buy for strong returns.",
    overview:
      "We help investors build portfolios with objective market analysis, yield modeling, and risk assessment across residential and commercial assets.",
    scope: [
      "Market and yield analysis",
      "Portfolio strategy and diversification",
      "Deal underwriting and risk review",
      "Acquisition and exit planning",
    ],
    benefits: [
      "Objective, data-driven recommendations",
      "Clear yield and risk modeling",
      "Diversification across asset classes",
      "Support from acquisition through exit",
    ],
    workflow: [
      { title: "Assess", description: "We review your goals, risk appetite, and capital." },
      { title: "Model", description: "We project yield, cash flow, and risk." },
      { title: "Select", description: "We shortlist assets that fit the strategy." },
      { title: "Execute", description: "We support acquisition and ongoing review." },
    ],
    image: IMG.houses[6],
    faqs: [
      { question: "Is this financial advice?", answer: "No. We provide real estate market analysis and deal underwriting, not regulated financial advice." },
      { question: "Can you help with exits?", answer: "Yes, we plan disposition timing and manage the sale process when you choose to exit." },
    ],
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    group: "Real Estate",
    icon: "Briefcase",
    shortDescription:
      "Office, retail, and industrial leasing and sales for growing businesses.",
    overview:
      "From office leasing to retail and industrial acquisitions, we help businesses find commercial space that supports operations, growth, and bottom-line efficiency.",
    scope: [
      "Needs analysis and space planning",
      "Lease vs. buy modeling",
      "Tenant representation and negotiation",
      "Lease review and renewal support",
    ],
    benefits: [
      "Space aligned to operational needs",
      "Strong lease terms negotiated on your behalf",
      "Clear lease-vs-buy financial modeling",
      "Renewal and expansion planning",
    ],
    workflow: [
      { title: "Define", description: "We capture space, location, and budget needs." },
      { title: "Search", description: "We shortlist matching commercial spaces." },
      { title: "Negotiate", description: "We secure favorable lease or purchase terms." },
      { title: "Manage", description: "We support renewals and expansions." },
    ],
    image: IMG.commercial[1],
    faqs: [
      { question: "Lease or buy?", answer: "We model both scenarios against your cash flow and growth plans to recommend the stronger option." },
      { question: "Do you represent tenants or landlords?", answer: "We can represent either; we disclose our representation clearly in every engagement." },
    ],
  },
  // Construction Services
  {
    slug: "residential-construction",
    title: "Residential Construction",
    group: "Construction",
    icon: "Home",
    shortDescription:
      "Custom homes and villas built to premium structural and finish standards.",
    overview:
      "From foundation to finishing, we build custom residences and villas with disciplined project management, certified contractors, and transparent pricing throughout.",
    scope: [
      "Site preparation and foundation works",
      "Structural and MEP installation",
      "Interior and exterior finishing",
      "Landscaping and handover",
    ],
    benefits: [
      "Premium materials and workmanship",
      "Disciplined schedule management",
      "Transparent, milestone-based pricing",
      "Quality inspections at every stage",
    ],
    workflow: [
      { title: "Design", description: "We finalize architecture and structural plans." },
      { title: "Build", description: "Foundation, structure, and MEP progress." },
      { title: "Finish", description: "Interior, exterior, and landscape completion." },
      { title: "Handover", description: "Inspection, documentation, and keys." },
    ],
    image: IMG.villas[0],
    faqs: [
      { question: "How long does a custom home take?", answer: "Typically 8–14 months depending on size, site, and design complexity; we provide a detailed schedule after design freeze." },
      { question: "How is pricing structured?", answer: "We use milestone-based pricing tied to verified progress, with a clear schedule of values." },
    ],
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    group: "Construction",
    icon: "Building",
    shortDescription:
      "Offices, retail, and mixed-use builds delivered on schedule and code.",
    overview:
      "We deliver commercial structures that meet business operational needs, building codes, and tight timelines — from offices and retail to mixed-use developments.",
    scope: [
      "Structural frame and envelope",
      "MEP and life-safety systems",
      "Interior fit-out and finishes",
      "Commissioning and occupancy",
    ],
    benefits: [
      "Code-compliant, safety-first execution",
      "Tight scheduling for fast occupancy",
      "Coordination across trades and vendors",
      "Commissioning to performance standards",
    ],
    workflow: [
      { title: "Plan", description: "Permits, logistics, and trade coordination." },
      { title: "Construct", description: "Structure, envelope, and systems installed." },
      { title: "Fit-Out", description: "Interior completion to specification." },
      { title: "Commission", description: "Systems tested and occupancy ready." },
    ],
    image: IMG.commercial[2],
    faqs: [
      { question: "Can you work within an active site?", answer: "Yes, we plan phased construction and safety measures for occupied or adjacent sites." },
      { question: "Do you handle permits?", answer: "We coordinate permit applications and inspections as part of our service scope." },
    ],
  },
  {
    slug: "architecture-planning",
    title: "Architecture & Planning",
    group: "Construction",
    icon: "PencilRuler",
    shortDescription:
      "Thoughtful architectural design grounded in function, light, and site.",
    overview:
      "Our architects design spaces that balance aesthetics, function, regulation, and budget — producing coordinated drawings ready for construction.",
    scope: [
      "Concept and schematic design",
      "Design development and 3D visualization",
      "Construction documentation",
      "Permit and authority coordination",
    ],
    benefits: [
      "Designs tailored to site and lifestyle",
      "Coordinated, buildable documentation",
      "Clear visualization before construction",
      "Regulatory and permit support",
    ],
    workflow: [
      { title: "Concept", description: "We explore layout, massing, and style." },
      { title: "Develop", description: "Design is refined into coordinated drawings." },
      { title: "Document", description: "Construction-ready documentation produced." },
      { title: "Approve", description: "We support permits and authority submissions." },
    ],
    image: IMG.plans[0],
    faqs: [
      { question: "Do you provide 3D visuals?", answer: "Yes, we produce 3D renderings so you can experience the design before construction begins." },
      { question: "Can you work with existing plans?", answer: "Yes, we can review, refine, and coordinate existing drawings into a buildable set." },
    ],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    group: "Construction",
    icon: "Sofa",
    shortDescription:
      "Cohesive interiors with considered materials, lighting, and layout.",
    overview:
      "We craft interiors that feel complete — coordinating layout, materials, lighting, and furnishings into a cohesive, livable result that reflects how you use the space.",
    scope: [
      "Space planning and layout",
      "Material and finish selection",
      "Lighting and fixture specification",
      "Furnishing and styling",
    ],
    benefits: [
      "Cohesive, functional interiors",
      "Material and finish expertise",
      "Lighting designed for mood and task",
      "Turnkey styling on request",
    ],
    workflow: [
      { title: "Brief", description: "We capture style, function, and budget." },
      { title: "Design", description: "Layout, materials, and lighting proposed." },
      { title: "Specify", description: "Fixtures and furnishings finalized." },
      { title: "Install", description: "Styling and finishing on site." },
    ],
    image: IMG.interiors[0],
    faqs: [
      { question: "Do you source furniture?", answer: "Yes, we can source, procure, and install furnishings as part of a turnkey interior package." },
      { question: "Can you work room by room?", answer: "Yes, phased interior projects are welcome, though a cohesive plan is recommended upfront." },
    ],
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    group: "Construction",
    icon: "Hammer",
    shortDescription:
      "Transform existing spaces with structural, functional, and aesthetic upgrades.",
    overview:
      "We modernize and reimagine existing properties — from single-room updates to full structural remodels — with minimal disruption and solid craftsmanship.",
    scope: [
      "Structural assessment and demo",
      "MEP upgrades and reconfiguration",
      "Finish and fixture renewal",
      "Final inspection and handover",
    ],
    benefits: [
      "Breathes new life into existing assets",
      "Modern systems and efficiency gains",
      "Minimal-disruption scheduling",
      "Improved function and resale value",
    ],
    workflow: [
      { title: "Assess", description: "We inspect structure and systems." },
      { title: "Plan", description: "Scope, schedule, and budget agreed." },
      { title: "Renovate", description: "Demo, build, and finish executed." },
      { title: "Handover", description: "Inspection and walk-through." },
    ],
    image: IMG.interiors[5],
    faqs: [
      { question: "Can we live in the home during renovation?", answer: "For partial renovations with proper containment, sometimes yes; full remodels usually require temporary relocation." },
      { question: "Do you handle permits for remodels?", answer: "Yes, we identify and obtain permits required for structural, electrical, and plumbing work." },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    group: "Construction",
    icon: "ClipboardList",
    shortDescription:
      "Independent oversight of schedule, budget, and quality for any build.",
    overview:
      "We provide disciplined project management — coordinating contractors, controlling budget and schedule, and enforcing quality across every milestone.",
    scope: [
      "Procurement and contractor management",
      "Schedule and budget control",
      "Quality and safety oversight",
      "Reporting and stakeholder communication",
    ],
    benefits: [
      "Single accountable owner for delivery",
      "Budget and schedule discipline",
      "Independent quality enforcement",
      "Clear reporting to all stakeholders",
    ],
    workflow: [
      { title: "Mobilize", description: "We align scope, team, and controls." },
      { title: "Control", description: "Schedule, budget, and quality managed." },
      { title: "Report", description: "Regular progress reports to stakeholders." },
      { title: "Deliver", description: "Final inspection and handover." },
    ],
    image: IMG.construction[0],
    faqs: [
      { question: "Can you manage our chosen contractor?", answer: "Yes, we can oversee an owner-selected contractor or bring our own vetted teams." },
      { question: "How often do we get updates?", answer: "We provide weekly progress reports and milestone reviews, with on-demand access to live status." },
    ],
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    group: "Construction",
    icon: "Ruler",
    shortDescription:
      "Structural and site engineering built to last and built to code.",
    overview:
      "Our civil and structural engineers handle site grading, foundations, drainage, and structural design — ensuring every build is safe, compliant, and durable.",
    scope: [
      "Site grading and earthworks",
      "Foundation and structural design",
      "Drainage and utilities planning",
      "Structural inspection and certification",
    ],
    benefits: [
      "Code-compliant structural design",
      "Site-appropriate earthworks and drainage",
      "Durable, efficient foundations",
      "Independent structural certification",
    ],
    workflow: [
      { title: "Survey", description: "Site conditions and constraints assessed." },
      { title: "Design", description: "Structural and civil systems engineered." },
      { title: "Execute", description: "Works supervised to specification." },
      { title: "Certify", description: "Structural compliance certified." },
    ],
    image: IMG.construction[4],
    faqs: [
      { question: "Do you provide structural certification?", answer: "Yes, our engineers provide structural design and certification for permitted works." },
      { question: "Can you assess an existing structure?", answer: "Yes, we conduct structural condition assessments for renovations and purchases." },
    ],
  },
  {
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    group: "Construction",
    icon: "KeyRound",
    shortDescription:
      "Move-in-ready builds delivered end to end — design, build, and handover.",
    overview:
      "A single contract covers design, construction, finishes, and handover — you receive a completed, move-in-ready property with one accountable partner.",
    scope: [
      "Design and approvals",
      "Full construction and systems",
      "Interior finish and furnishings",
      "Testing, cleaning, and handover",
    ],
    benefits: [
      "One contract, one accountable partner",
      "Fixed scope and milestone pricing",
      "Move-in-ready delivery",
      "Minimal owner involvement required",
    ],
    workflow: [
      { title: "Agree", description: "Scope, design, and price fixed in contract." },
      { title: "Build", description: "Single team delivers the entire project." },
      { title: "Finish", description: "Interiors and furnishings completed." },
      { title: "Handover", description: "Tested, cleaned, and keys delivered." },
    ],
    image: IMG.villas[3],
    faqs: [
      { question: "What does turnkey include?", answer: "Design, construction, systems, interior finishes, and handover — furnishing can be included on request." },
      { question: "Is the price fixed?", answer: "We offer milestone-based pricing with a clear schedule of values; changes are handled through a documented change-order process." },
    ],
  },
];

/* ---------- Featured Properties ---------- */
export const PROPERTIES: Property[] = [
  {
    slug: "maple-ridge-villa",
    title: "Maple Ridge Villa",
    location: "Maple Ridge, San Francisco, CA",
    city: "San Francisco",
    status: "For Sale",
    category: "Residential",
    type: "Villa",
    price: 2850000,
    priceLabel: "$2,850,000",
    reference: "MRV-1042",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    parking: 2,
    yearBuilt: 2022,
    condition: "Excellent",
    furnished: "Semi-Furnished",
    cover: IMG.villas[0],
    gallery: [
      IMG.villas[0],
      IMG.interiors[0],
      IMG.kitchens[0],
      IMG.bedrooms[0],
      IMG.bathrooms[0],
      IMG.houses[0],
    ],
    overview:
      "A modern five-bedroom villa with open-plan living, a designer kitchen, and seamless indoor-outdoor flow to a private garden and pool terrace.",
    description: [
      "Set on a quiet residential lane in Maple Ridge, this architect-designed villa balances clean modern lines with warm, natural materials. Floor-to-ceiling glass frames the garden from the main living space, while a sculptural staircase leads to the sleeping wing above.",
      "The ground floor hosts a generous living room, a dining area that seats ten, and a chef's kitchen with integrated appliances and a butler's pantry. A covered terrace extends the living space outdoors, connecting to a landscaped garden and a heated pool.",
      "Upstairs, the principal suite occupies its own wing with a dressing room and a spa-like en-suite. Three further bedrooms share two well-appointed bathrooms, and a flexible study could serve as a sixth bedroom or home office.",
    ],
    interiorHighlights: [
      "Open-plan living with double-height glazing",
      "Chef's kitchen with butler's pantry",
      "Principal suite with walk-in dressing room",
      "Smart lighting and climate control throughout",
    ],
    exteriorHighlights: [
      "Landscaped garden with heated pool",
      "Covered outdoor lounge and dining terrace",
      "Two-car garage with EV charging",
      "Architectural facade in stone and timber",
    ],
    neighborhood:
      "Maple Ridge is a leafy residential enclave minutes from downtown, popular for its tree-lined streets, reputable schools, and easy access to parks and waterfront trails.",
    nearbyFacilities: [
      "Maple Ridge Park — 4 min walk",
      "Harborview Elementary — 8 min walk",
      "Riverside Shopping Plaza — 5 min drive",
      "Central Business District — 12 min drive",
    ],
    sellingPoints: [
      "Architect-designed with premium finishes",
      "Private garden and heated pool in the city",
      "Flexible layout suitable for family or hosting",
      "Strong rental and resale potential",
    ],
    highlights: [
      { label: "Bedrooms", value: "5", icon: "BedDouble" },
      { label: "Bathrooms", value: "4", icon: "Bath" },
      { label: "Area", value: "4,200 sqft", icon: "Maximize" },
      { label: "Type", value: "Villa", icon: "Home" },
      { label: "Parking", value: "2 spaces", icon: "Car" },
      { label: "Condition", value: "Excellent", icon: "BadgeCheck" },
      { label: "Year Built", value: "2022", icon: "Calendar" },
      { label: "Furnishing", value: "Semi-Furnished", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Built-in Wardrobes", icon: "DoorClosed" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Balcony / Terrace", icon: "Sun" },
      { name: "Garden", icon: "Trees" },
      { name: "Swimming Pool", icon: "Waves" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Smart Home", icon: "Cpu" },
      { name: "Parking", icon: "Car" },
      { name: "Nearby Transport", icon: "Bus" },
    ],
    floorPlan: IMG.plans[0],
    mapLat: 37.7749,
    mapLng: -122.4194,
    agent: {
      name: "Daniel Mercer",
      role: "Senior Property Advisor",
      phone: "+1 (415) 555-0188",
      email: "daniel@meridiangroup.com",
      initials: "DM",
    },
    advantages: [
      { title: "Location Benefits", description: "Leafy neighborhood minutes from downtown with parks, schools, and waterfront nearby.", icon: "MapPin" },
      { title: "Layout & Space", description: "Open-plan ground floor and a private principal wing offer flexible, flowing living.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Pool, garden, smart home, security, and EV-ready garage come as standard.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Architect-designed build with premium materials and documented inspections.", icon: "HardHat" },
      { title: "Investment Potential", description: "Strong demand in Maple Ridge supports rental yield and resale, based on current market trends.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Level entry, elevator-ready design, and nearby public transport keep the home accessible.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the total property price?", answer: "The asking price is $2,850,000. Final terms are confirmed during negotiation." },
      { question: "Is the property available for viewing?", answer: "Yes, viewings can be arranged by appointment through the listed agent." },
      { question: "What documents are required?", answer: "Standard identification and proof of funds or mortgage pre-approval are required before an offer is submitted." },
      { question: "Are there additional fees?", answer: "Closing costs, taxes, and any HOA or community fees apply; we provide a detailed cost breakdown during negotiation." },
      { question: "Can I schedule a visit?", answer: "Yes, use the Schedule a Visit form to request a preferred date and time." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button, or reach the listed agent directly by phone or email." },
    ],
    featured: true,
  },
  {
    slug: "harbor-view-apartment",
    title: "Harbor View Apartment",
    location: "Embarcadero, San Francisco, CA",
    city: "San Francisco",
    status: "For Rent",
    category: "Residential",
    type: "Apartment",
    price: 4800,
    priceLabel: "$4,800 / month",
    reference: "HVA-2087",
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    parking: 1,
    yearBuilt: 2020,
    condition: "Excellent",
    furnished: "Fully Furnished",
    cover: IMG.apartments[0],
    gallery: [
      IMG.apartments[0],
      IMG.interiors[1],
      IMG.kitchens[1],
      IMG.bedrooms[1],
      IMG.bathrooms[1],
      IMG.apartments[1],
    ],
    overview:
      "A bright three-bedroom corner apartment with panoramic harbor views, a modern kitchen, and a generous balcony just minutes from the waterfront.",
    description: [
      "Perched on a high floor of a contemporary residential tower, this corner apartment captures uninterrupted harbor views from its main living space and principal bedroom. Walls of glass and a neutral palette maximize natural light throughout the day.",
      "The open kitchen features handle-less cabinetry, integrated appliances, and a breakfast island that flows into the dining and living area. A wide balcony extends the living space outdoors — ideal for morning coffee or evening drinks with a view.",
      "The principal bedroom includes an en-suite and a walk-in wardrobe, while two further bedrooms share a family bathroom. A dedicated laundry room, storage, and a secure parking space complete the home.",
    ],
    interiorHighlights: [
      "Floor-to-ceiling harbor-view glazing",
      "Open-plan kitchen with island",
      "Principal bedroom with en-suite",
      "Dedicated laundry and storage",
    ],
    exteriorHighlights: [
      "Wide view-facing balcony",
      "Building gym and lounge",
      "Secure parking with EV point",
      "Concierge and package room",
    ],
    neighborhood:
      "Embarcadero places you on the waterfront, steps from the ferry terminal, promenade restaurants, and the central business district — a vibrant, walkable location.",
    nearbyFacilities: [
      "Ferry Terminal — 5 min walk",
      "Waterfront Promenade — 3 min walk",
      "Financial District — 10 min walk",
      "Embarcadero Plaza — 6 min walk",
    ],
    sellingPoints: [
      "Panoramic harbor views from the main living space",
      "Full concierge building with gym and lounge",
      "Walkable to offices, dining, and transport",
      "Fully furnished and move-in ready",
    ],
    highlights: [
      { label: "Bedrooms", value: "3", icon: "BedDouble" },
      { label: "Bathrooms", value: "2", icon: "Bath" },
      { label: "Area", value: "1,850 sqft", icon: "Maximize" },
      { label: "Type", value: "Apartment", icon: "Building2" },
      { label: "Parking", value: "1 space", icon: "Car" },
      { label: "Condition", value: "Excellent", icon: "BadgeCheck" },
      { label: "Year Built", value: "2020", icon: "Calendar" },
      { label: "Furnishing", value: "Fully Furnished", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Balcony / Terrace", icon: "Sun" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Elevator", icon: "ArrowUpDown" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Parking", icon: "Car" },
      { name: "Nearby Transport", icon: "Bus" },
      { name: "Smart Home", icon: "Cpu" },
    ],
    floorPlan: IMG.plans[1],
    mapLat: 37.7955,
    mapLng: -122.3937,
    agent: {
      name: "Sofia Lindgren",
      role: "Residential Leasing Specialist",
      phone: "+1 (415) 555-0193",
      email: "sofia@meridiangroup.com",
      initials: "SL",
    },
    advantages: [
      { title: "Location Benefits", description: "Waterfront living steps from the ferry, promenade, and downtown offices.", icon: "MapPin" },
      { title: "Layout & Space", description: "Corner layout with views from two sides and a wide, usable balcony.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Concierge, gym, lounge, secure parking, and smart-home controls included.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Recent build with modern systems and well-managed common areas.", icon: "HardHat" },
      { title: "Investment Potential", description: "Strong rental demand in Embarcadero supports consistent yield for owners.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Step-free access, elevators, and immediate public transport links.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the monthly rent?", answer: "The asking rent is $4,800 per month on a standard 12-month lease." },
      { question: "Is the property available for viewing?", answer: "Yes, viewings can be arranged by appointment with the leasing specialist." },
      { question: "What documents are required?", answer: "Identification, proof of income, and previous landlord references where available are required to apply." },
      { question: "Are there additional fees?", answer: "A building service fee and security deposit apply; utilities are billed separately to the tenant." },
      { question: "Can I schedule a visit?", answer: "Yes, request a viewing through the Schedule a Visit form." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button or the listed phone and email." },
    ],
    featured: true,
  },
  {
    slug: "cedar-grove-family-house",
    title: "Cedar Grove Family House",
    location: "Cedar Grove, San Francisco, CA",
    city: "San Francisco",
    status: "For Sale",
    category: "Residential",
    type: "House",
    price: 1620000,
    priceLabel: "$1,620,000",
    reference: "CGH-3110",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    parking: 2,
    yearBuilt: 2019,
    condition: "Excellent",
    furnished: "Unfurnished",
    cover: IMG.houses[1],
    gallery: [
      IMG.houses[1],
      IMG.interiors[2],
      IMG.kitchens[2],
      IMG.bedrooms[2],
      IMG.bathrooms[2],
      IMG.houses[2],
    ],
    overview:
      "A spacious four-bedroom family home with a landscaped garden, open living areas, and a modern kitchen in a quiet, school-adjacent street.",
    description: [
      "Thoughtfully laid out for family life, this four-bedroom home separates living and sleeping wings around a central kitchen and dining hub. The ground floor flows naturally from front porch to rear garden through wide glazed doors.",
      "The kitchen is the heart of the home — a generous, island-centered space with a walk-in pantry, integrated appliances, and a casual dining nook. Adjacent living and family rooms give everyone room to spread out without losing connection.",
      "Upstairs, four well-proportioned bedrooms include a principal suite with en-suite and dressing area. A family bathroom, a guest WC on the ground floor, and abundant storage round out the practical layout.",
    ],
    interiorHighlights: [
      "Open kitchen, dining, and family room hub",
      "Walk-in pantry and integrated appliances",
      "Principal suite with en-suite and dressing area",
      "Abundant built-in storage",
    ],
    exteriorHighlights: [
      "Landscaped rear garden with patio",
      "Front porch and driveway for two cars",
      "Side access to the garden",
      "Low-maintenance, family-friendly outdoor space",
    ],
    neighborhood:
      "Cedar Grove is a quiet residential street adjacent to reputable schools and a large neighborhood park — popular with families seeking space and community.",
    nearbyFacilities: [
      "Cedar Grove Park — 3 min walk",
      "Cedar Grove Elementary — 5 min walk",
      "Neighborhood Shops — 6 min walk",
      "Community Sports Center — 8 min drive",
    ],
    sellingPoints: [
      "Family-oriented layout with separate living wings",
      "Large, usable rear garden and patio",
      "Adjacent to schools and a park",
      "Modern construction and efficient systems",
    ],
    highlights: [
      { label: "Bedrooms", value: "4", icon: "BedDouble" },
      { label: "Bathrooms", value: "3", icon: "Bath" },
      { label: "Area", value: "2,800 sqft", icon: "Maximize" },
      { label: "Type", value: "House", icon: "Home" },
      { label: "Parking", value: "2 spaces", icon: "Car" },
      { label: "Condition", value: "Excellent", icon: "BadgeCheck" },
      { label: "Year Built", value: "2019", icon: "Calendar" },
      { label: "Furnishing", value: "Unfurnished", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Built-in Wardrobes", icon: "DoorClosed" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Garden", icon: "Trees" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Parking", icon: "Car" },
      { name: "Nearby Transport", icon: "Bus" },
      { name: "Smart Home", icon: "Cpu" },
    ],
    floorPlan: IMG.plans[2],
    mapLat: 37.7599,
    mapLng: -122.4384,
    agent: {
      name: "Daniel Mercer",
      role: "Senior Property Advisor",
      phone: "+1 (415) 555-0188",
      email: "daniel@meridiangroup.com",
      initials: "DM",
    },
    advantages: [
      { title: "Location Benefits", description: "Quiet street adjacent to schools, a park, and neighborhood shops.", icon: "MapPin" },
      { title: "Layout & Space", description: "Separate living and sleeping wings suit busy family routines.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Garden, driveway parking, security, and smart-home systems included.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Modern construction with efficient systems and documented inspections.", icon: "HardHat" },
      { title: "Investment Potential", description: "Family homes in school-adjacent streets hold value well based on current trends.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Ground-floor WC and level entry support accessibility needs.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the total property price?", answer: "The asking price is $1,620,000. Final terms are confirmed during negotiation." },
      { question: "Is the property available for viewing?", answer: "Yes, viewings can be arranged by appointment with the listed agent." },
      { question: "What documents are required?", answer: "Standard identification and proof of funds or mortgage pre-approval are required before an offer." },
      { question: "Are there additional fees?", answer: "Closing costs, taxes, and any community fees apply; a detailed breakdown is provided during negotiation." },
      { question: "Can I schedule a visit?", answer: "Yes, use the Schedule a Visit form to request a preferred date and time." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button, or reach the listed agent by phone or email." },
    ],
    featured: true,
  },
  {
    slug: "skyline-penthouse",
    title: "Skyline Penthouse",
    location: "South Beach, San Francisco, CA",
    city: "San Francisco",
    status: "For Sale",
    category: "Residential",
    type: "Penthouse",
    price: 3950000,
    priceLabel: "$3,950,000",
    reference: "SKP-4190",
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    parking: 2,
    yearBuilt: 2021,
    condition: "Excellent",
    furnished: "Semi-Furnished",
    cover: IMG.houses[2],
    gallery: [
      IMG.houses[2],
      IMG.interiors[3],
      IMG.kitchens[3],
      IMG.bedrooms[3],
      IMG.bathrooms[3],
      IMG.houses[3],
    ],
    overview:
      "A duplex penthouse with a private rooftop terrace, skyline views from every floor, and a custom designer kitchen.",
    description: [
      "Occupying the top two floors of a landmark tower, this duplex penthouse pairs dramatic skyline views with the privacy of a rooftop terrace. A private elevator lobby opens into a wide, light-filled living space.",
      "The custom kitchen anchors the main floor with stone counters, a statement island, and integrated appliances. Living and dining areas flow onto a deep terrace — an extension of the interior during the city's mild evenings.",
      "Above, the principal suite enjoys a dressing room and a freestanding-bath en-suite framing the skyline. Two further bedrooms, a media room, and a private rooftop terrace with outdoor kitchen complete the upper level.",
    ],
    interiorHighlights: [
      "Custom designer kitchen with stone island",
      "Principal suite with freestanding-bath en-suite",
      "Media room convertible to a fourth bedroom",
      "Private elevator lobby access",
    ],
    exteriorHighlights: [
      "Deep main-floor terrace with skyline views",
      "Private rooftop terrace with outdoor kitchen",
      "Two secure parking spaces with EV charging",
      "Concierge and resident lounge",
    ],
    neighborhood:
      "South Beach is a high-demand district of contemporary towers, walkable to the waterfront, Michelin-listed dining, and the city's business core.",
    nearbyFacilities: [
      "Waterfront Esplanade — 4 min walk",
      "South Park dining — 5 min walk",
      "Financial District — 10 min walk",
      "Caltrain Station — 12 min walk",
    ],
    sellingPoints: [
      "Duplex penthouse with private rooftop terrace",
      "Skyline views from every level",
      "Concierge building in a walkable district",
      "Custom kitchen and principal en-suite",
    ],
    highlights: [
      { label: "Bedrooms", value: "3", icon: "BedDouble" },
      { label: "Bathrooms", value: "3", icon: "Bath" },
      { label: "Area", value: "2,400 sqft", icon: "Maximize" },
      { label: "Type", value: "Penthouse", icon: "Building2" },
      { label: "Parking", value: "2 spaces", icon: "Car" },
      { label: "Condition", value: "Excellent", icon: "BadgeCheck" },
      { label: "Year Built", value: "2021", icon: "Calendar" },
      { label: "Furnishing", value: "Semi-Furnished", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Balcony / Terrace", icon: "Sun" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Elevator", icon: "ArrowUpDown" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Smart Home", icon: "Cpu" },
      { name: "Parking", icon: "Car" },
      { name: "Nearby Transport", icon: "Bus" },
      { name: "Gym", icon: "Dumbbell" },
    ],
    floorPlan: IMG.plans[3],
    mapLat: 37.7822,
    mapLng: -122.3887,
    agent: {
      name: "Sofia Lindgren",
      role: "Residential Leasing Specialist",
      phone: "+1 (415) 555-0193",
      email: "sofia@meridiangroup.com",
      initials: "SL",
    },
    advantages: [
      { title: "Location Benefits", description: "South Beach places dining, the waterfront, and offices within a short walk.", icon: "MapPin" },
      { title: "Layout & Space", description: "Duplex layout separates living and sleeping across two connected levels.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Private rooftop terrace, concierge, gym, and smart-home systems included.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Landmark tower with premium systems and rigorous inspections.", icon: "HardHat" },
      { title: "Investment Potential", description: "Penthouse inventory is limited; demand in South Beach remains strong based on current trends.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Private elevator access and step-free principal living areas.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the total property price?", answer: "The asking price is $3,950,000. Final terms are confirmed during negotiation." },
      { question: "Is the property available for viewing?", answer: "Yes, private viewings can be arranged by appointment with the listed agent." },
      { question: "What documents are required?", answer: "Identification and proof of funds or mortgage pre-approval are required before an offer." },
      { question: "Are there additional fees?", answer: "Building HOA fees, closing costs, and taxes apply; a full breakdown is provided during negotiation." },
      { question: "Can I schedule a visit?", answer: "Yes, request a private viewing through the Schedule a Visit form." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button, or reach the listed agent by phone or email." },
    ],
    featured: true,
  },
  {
    slug: "willow-creek-townhouse",
    title: "Willow Creek Townhouse",
    location: "Willow Creek, San Francisco, CA",
    city: "San Francisco",
    status: "For Rent",
    category: "Residential",
    type: "Townhouse",
    price: 3900,
    priceLabel: "$3,900 / month",
    reference: "WCT-5023",
    bedrooms: 3,
    bathrooms: 2,
    area: 1950,
    parking: 1,
    yearBuilt: 2018,
    condition: "Good",
    furnished: "Partly Furnished",
    cover: IMG.houses[3],
    gallery: [
      IMG.houses[3],
      IMG.interiors[4],
      IMG.kitchens[4],
      IMG.bedrooms[4],
      IMG.houses[4],
      IMG.apartments[2],
    ],
    overview:
      "A modern three-story townhouse with a private entrance, garage, and a compact garden — ideal for a couple or small family.",
    description: [
      "This three-story townhouse combines the privacy of a standalone home with the convenience of a managed community. A private entrance opens to a ground-floor hallway with direct garage access and a guest WC.",
      "The middle floor is the heart of the home: an open living, dining, and kitchen area with a Juliet balcony and a small rear garden accessed from the dining space. Handle-less cabinetry and integrated appliances keep the look clean.",
      "The top floor hosts two double bedrooms, a single bedroom or home office, and a family bathroom. A landing with full-height storage adds everyday practicality.",
    ],
    interiorHighlights: [
      "Open living, dining, and kitchen hub",
      "Integrated appliances and handle-less cabinetry",
      "Three bedrooms over two upper floors",
      "Full-height landing storage",
    ],
    exteriorHighlights: [
      "Private front entrance and garage",
      "Compact rear garden off the dining area",
      "Managed community with shared landscaping",
      "Single secure parking space",
    ],
    neighborhood:
      "Willow Creek is a quiet, well-managed residential community a short drive from shopping centers, schools, and major commuting routes.",
    nearbyFacilities: [
      "Willow Creek Shopping Center — 5 min drive",
      "Community Pool & Sports Center — 7 min drive",
      "Elementary School — 10 min walk",
      "Highway Access — 4 min drive",
    ],
    sellingPoints: [
      "Townhouse privacy with managed-community ease",
      "Private garage and rear garden",
      "Three bedrooms plus a flexible office space",
      "Convenient to schools, shopping, and commuting",
    ],
    highlights: [
      { label: "Bedrooms", value: "3", icon: "BedDouble" },
      { label: "Bathrooms", value: "2", icon: "Bath" },
      { label: "Area", value: "1,950 sqft", icon: "Maximize" },
      { label: "Type", value: "Townhouse", icon: "Home" },
      { label: "Parking", value: "1 space", icon: "Car" },
      { label: "Condition", value: "Good", icon: "BadgeCheck" },
      { label: "Year Built", value: "2018", icon: "Calendar" },
      { label: "Furnishing", value: "Partly Furnished", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Built-in Wardrobes", icon: "DoorClosed" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Garden", icon: "Trees" },
      { name: "Parking", icon: "Car" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Nearby Transport", icon: "Bus" },
    ],
    mapLat: 37.7338,
    mapLng: -122.4197,
    agent: {
      name: "Sofia Lindgren",
      role: "Residential Leasing Specialist",
      phone: "+1 (415) 555-0193",
      email: "sofia@meridiangroup.com",
      initials: "SL",
    },
    advantages: [
      { title: "Location Benefits", description: "Quiet community close to shopping, schools, and commuting routes.", icon: "MapPin" },
      { title: "Layout & Space", description: "Three-story layout separates living, sleeping, and parking cleanly.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Private garage, rear garden, and security system included.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Recent build with modern systems and managed shared areas.", icon: "HardHat" },
      { title: "Investment Potential", description: "Stable rental demand in family-oriented communities supports consistent yield.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Guest WC on entry floor; stair access to upper levels.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the monthly rent?", answer: "The asking rent is $3,900 per month on a standard 12-month lease." },
      { question: "Is the property available for viewing?", answer: "Yes, viewings can be arranged by appointment with the leasing specialist." },
      { question: "What documents are required?", answer: "Identification, proof of income, and previous landlord references where available are required to apply." },
      { question: "Are there additional fees?", answer: "A community service fee and security deposit apply; utilities are billed separately to the tenant." },
      { question: "Can I schedule a visit?", answer: "Yes, request a viewing through the Schedule a Visit form." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button or the listed phone and email." },
    ],
    featured: true,
  },
  {
    slug: "harbor-square-office",
    title: "Harbor Square Office Suite",
    location: "Financial District, San Francisco, CA",
    city: "San Francisco",
    status: "For Sale",
    category: "Commercial",
    type: "Office",
    price: 1450000,
    priceLabel: "$1,450,000",
    reference: "HSO-6201",
    bedrooms: 0,
    bathrooms: 2,
    area: 2200,
    parking: 4,
    yearBuilt: 2017,
    condition: "Excellent",
    furnished: "Fitted Out",
    cover: IMG.commercial[3],
    gallery: [
      IMG.commercial[3],
      IMG.interiors[5],
      IMG.commercial[4],
      IMG.interiors[6],
      IMG.commercial[5],
      IMG.interiors[7],
    ],
    overview:
      "A fitted-out 2,200 sqft office suite in a prime financial district tower — move-in ready for a growing team.",
    description: [
      "Located on a mid-floor of a landmark financial district tower, this fitted-out office suite is ready for an incoming team. The space combines open-plan workstations with two glass meeting rooms and a private office.",
      "A welcoming reception area leads into the open work floor, which benefits from abundant natural light on two sides. A server room, kitchenette, and two well-appointed washrooms round out the practical layout.",
      "The building offers 24/7 concierge and security, secure elevator access, a conference center, and a residents' gym — amenities that support both staff comfort and visiting clients.",
    ],
    interiorHighlights: [
      "Reception, open floor, and meeting rooms",
      "Two glass-front meeting rooms and a private office",
      "Server room and kitchenette",
      "Abundant natural light on two sides",
    ],
    exteriorHighlights: [
      "Landmark tower with concierge and security",
      "Secure elevator and access control",
      "Conference center and gym for tenants",
      "Four secure parking spaces",
    ],
    neighborhood:
      "The Financial District offers immediate access to banks, professional services, transit hubs, and a dense network of dining and hospitality options.",
    nearbyFacilities: [
      "Transit Hub — 4 min walk",
      "Banking & Professional Services — adjacent",
      "Hotels & Conference Venues — 5 min walk",
      "Dining & Hospitality — at doorstep",
    ],
    sellingPoints: [
      "Fitted-out and move-in ready for a team",
      "Prime financial district address",
      "Full concierge, security, and amenities",
      "Strong commercial demand and tenant pool",
    ],
    highlights: [
      { label: "Bedrooms", value: "N/A", icon: "Building2" },
      { label: "Bathrooms", value: "2", icon: "Bath" },
      { label: "Area", value: "2,200 sqft", icon: "Maximize" },
      { label: "Type", value: "Office", icon: "Briefcase" },
      { label: "Parking", value: "4 spaces", icon: "Car" },
      { label: "Condition", value: "Excellent", icon: "BadgeCheck" },
      { label: "Year Built", value: "2017", icon: "Calendar" },
      { label: "Furnishing", value: "Fitted Out", icon: "Sofa" },
    ],
    amenities: [
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Modern Kitchen", icon: "CookingPot" },
      { name: "Elevator", icon: "ArrowUpDown" },
      { name: "Security System", icon: "ShieldCheck" },
      { name: "Parking", icon: "Car" },
      { name: "Nearby Transport", icon: "Bus" },
      { name: "Smart Home", icon: "Cpu" },
    ],
    mapLat: 37.7936,
    mapLng: -122.3999,
    agent: {
      name: "Marcus Hale",
      role: "Commercial Property Advisor",
      phone: "+1 (415) 555-0177",
      email: "marcus@meridiangroup.com",
      initials: "MH",
    },
    advantages: [
      { title: "Location Benefits", description: "Financial district address with immediate access to services, transit, and dining.", icon: "MapPin" },
      { title: "Layout & Space", description: "Reception, open floor, and meeting rooms suit a growing professional team.", icon: "LayoutGrid" },
      { title: "Available Amenities", description: "Concierge, security, conference center, gym, and secure parking included.", icon: "Sparkles" },
      { title: "Construction Quality", description: "Landmark tower with maintained systems and managed common areas.", icon: "HardHat" },
      { title: "Investment Potential", description: "Office demand in the financial district supports stable commercial yield based on current trends.", icon: "TrendingUp" },
      { title: "Accessibility", description: "Step-free access, secure elevators, and accessible washrooms throughout.", icon: "Accessibility" },
    ],
    faqs: [
      { question: "What is the total property price?", answer: "The asking price is $1,450,000 for the fitted-out office suite." },
      { question: "Is the property available for viewing?", answer: "Yes, viewings can be arranged by appointment with the commercial advisor." },
      { question: "What documents are required?", answer: "Company identification, proof of funds, and any required board approvals are required before an offer." },
      { question: "Are there additional fees?", answer: "Building HOA and parking fees, closing costs, and taxes apply; a detailed breakdown is provided during negotiation." },
      { question: "Can I schedule a visit?", answer: "Yes, use the Schedule a Visit form to request a viewing." },
      { question: "How can I contact the agent?", answer: "Use the Contact Agent button, or reach the listed commercial advisor by phone or email." },
    ],
    featured: true,
  },
];

/* ---------- Construction Projects ---------- */
export const PROJECTS: Project[] = [
  {
    slug: "oakwood-residence",
    name: "Oakwood Modern Residence",
    category: "Residential",
    location: "Oakwood, San Francisco, CA",
    status: "Completed",
    year: "2023",
    cover: IMG.villas[1],
    gallery: [IMG.villas[1], IMG.interiors[0], IMG.kitchens[0], IMG.construction[0]],
    description:
      "A bespoke four-bedroom residence built for a young family, featuring an open living wing, a designer kitchen, and a seamless indoor-outdoor connection to the garden and pool.",
    scope: [
      "Architectural design and permits",
      "Foundation and structural frame",
      "MEP installation and smart-home wiring",
      "Interior finish and landscaping",
    ],
    materials: [
      "Exposed architectural concrete",
      "European oak flooring",
      "Stone kitchen countertops",
      "Triple-glazed aluminum windows",
    ],
    challenges:
      "A sloping site with restrictive setbacks demanded a split-level design and careful excavation to preserve mature trees on the plot.",
    solutions:
      "We engineered a stepped foundation that followed the natural contour, retained selected trees, and unlocked a lower-level garden without compromising ceiling heights.",
  },
  {
    slug: "meridian-tower",
    name: "Meridian Office Tower",
    category: "Commercial",
    location: "Financial District, San Francisco, CA",
    status: "In Progress",
    year: "2025",
    cover: IMG.commercial[0],
    gallery: [IMG.commercial[0], IMG.commercial[1], IMG.construction[1], IMG.interiors[5]],
    description:
      "A 14-story commercial tower with a glazed curtain wall, double-height lobby, and flexible floor plates designed for modern hybrid-work tenants.",
    scope: [
      "Demolition and shoring",
      "Structural frame and curtain wall",
      "MEP and life-safety systems",
      "Lobby fit-out and commissioning",
    ],
    materials: [
      "High-strength concrete core",
      "Unitized aluminum curtain wall",
      "Raised-access flooring",
      "LED lighting with daylight controls",
    ],
    challenges:
      "Tight urban site logistics and a requirement to keep an adjacent retail frontage operational throughout construction.",
    solutions:
      "We sequenced deliveries for off-hours, used a tower crane with a constrained swing radius, and erected a protected pedestrian gallery to maintain safe access.",
  },
  {
    slug: "bayside-loft-renovation",
    name: "Bayside Loft Renovation",
    category: "Renovation",
    location: "Dogpatch, San Francisco, CA",
    status: "Completed",
    year: "2022",
    cover: IMG.interiors[5],
    gallery: [IMG.interiors[5], IMG.interiors[6], IMG.kitchens[5], IMG.bedrooms[4]],
    description:
      "A full remodel of a 1990s industrial loft into a warm, light-filled live-work space, retaining the original brick and adding modern systems throughout.",
    scope: [
      "Structural reinforcement of existing floor",
      "Full MEP renewal",
      "Custom kitchen and bath installation",
      "Lighting and interior styling",
    ],
    materials: [
      "Reclaimed brick walls retained",
      "New white-oak flooring",
      "Custom millwork and stone counters",
      "Designer lighting specification",
    ],
    challenges:
      "Blending preserved industrial character with modern thermal and acoustic performance within a constrained budget.",
    solutions:
      "We retained the brick as a feature wall behind insulated studwork, used acoustic glazing for the new mezzanine, and phased the fit-out to manage cost.",
  },
  {
    slug: "riverside-apartments",
    name: "Riverside Apartment Development",
    category: "Residential",
    location: "Riverside, San Francisco, CA",
    status: "In Progress",
    year: "2025",
    cover: IMG.apartments[1],
    gallery: [IMG.apartments[1], IMG.apartments[2], IMG.apartments[3], IMG.construction[2]],
    description:
      "A 48-unit residential development with a mix of one- and two-bedroom apartments, communal landscaped courtyards, and ground-floor retail.",
    scope: [
      "Site clearance and foundations",
      "Structural frame across three blocks",
      "MEP, facades, and common areas",
      "Landscaping and handover",
    ],
    materials: [
      "Precast concrete balconies",
      "Brick and render facade system",
      "Aluminum windows with solar control",
      "Communal courtyard landscaping",
    ],
    challenges:
      "Phasing three residential blocks while keeping an operating ground-floor retail unit and a protected tree on the boundary.",
    solutions:
      "We sequenced block-by-block construction with temporary protection for the retail frontage and engineered a root-protection zone for the tree.",
  },
  {
    slug: "harbor-retail-fitout",
    name: "Harbor Retail Fit-Out",
    category: "Interior Design",
    location: "Embarcadero, San Francisco, CA",
    status: "Completed",
    year: "2023",
    cover: IMG.commercial[2],
    gallery: [IMG.commercial[2], IMG.interiors[7], IMG.commercial[4], IMG.interiors[1]],
    description:
      "A turnkey fit-out for a flagship retail store, balancing brand expression with the practical demands of high-footfall daily operation.",
    scope: [
      "Demolition and structural openings",
      "MEP and retail lighting design",
      "Custom joinery and display units",
      "Finishes, signage, and handover",
    ],
    materials: [
      "Branded lacquered joinery",
      "Stone and polished concrete floors",
      "Specialist retail lighting track",
      "Frameless glass storefront",
    ],
    challenges:
      "Delivering a high-spec fit-out within a short night-works window in an operating shopping center.",
    solutions:
      "We pre-fabricated joinery off-site, sequenced trade delivery to minimize on-site time, and used noise-controlled night shifts to meet the program.",
  },
  {
    slug: "summit-architecture",
    name: "Summit Architectural Design",
    category: "Architecture",
    location: "Twin Peaks, San Francisco, CA",
    status: "Planning",
    year: "2026",
    cover: IMG.plans[0],
    gallery: [IMG.plans[0], IMG.plans[1], IMG.plans[2], IMG.plans[3]],
    description:
      "A hillside architectural concept for a private residence, currently in the design development and permitting phase, emphasizing framed views and passive comfort.",
    scope: [
      "Site analysis and massing studies",
      "Schematic and design development",
      "3D visualization and material boards",
      "Permit documentation",
    ],
    materials: [
      "Board-formed concrete",
      "Cedar cladding",
      "Steel frame and glazing",
      "Native landscaping",
    ],
    challenges:
      "A steep hillside site with protected views and complex geotechnical conditions.",
    solutions:
      "We designed a cantilevered volume that minimizes earthworks, frames the protected view corridor, and uses a piled foundation to address the slope.",
  },
];

export const SERVICE_DRODOWNS = {
  properties: [
    { label: "All Properties", href: "#properties" },
    { label: "For Sale", href: "#properties" },
    { label: "For Rent", href: "#properties" },
    { label: "Residential", href: "#properties" },
    { label: "Commercial", href: "#properties" },
  ],
  services: [
    { label: "Real Estate Services", href: "#services" },
    { label: "Construction Services", href: "#services" },
    { label: "Property Management", href: "#services" },
    { label: "Investment Consulting", href: "#services" },
    { label: "Turnkey Construction", href: "#services" },
  ],
};
