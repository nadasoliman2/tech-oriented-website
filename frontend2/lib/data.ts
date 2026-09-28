// All content sourced from https://tech-oriented.digital

export const company = {
  name: "tech-oriented",
  tagline: "AI & Digital Transformation Tech House",
  descriptor: "Technology built around your business needs.",
  summary:
    "tech-oriented is an AI & Digital Transformation Tech House building customized AI, automation, CRM, software, web, mobile, and dashboard solutions around real business needs.",
  phone: "+20 10 55661614",
  phoneHref: "tel:+201055661614",
  email: "info@tech-oriented.digital",
  address: "696 El Houria St. Louran - Alexandria, Egypt",
  website: "tech-oriented.digital",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/tech.oriented.digital" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/tech-oriented-digital/" },
    { label: "Instagram", href: "https://www.instagram.com/tech.oriented.digital" },
  ],
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Technology", href: "/technology" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Industries", href: "/industries" },
];

export const home = {
  eyebrow: "AI & Digital Transformation",
  title: "AI & Digital Transformation Tech House",
  lead: "tech-oriented helps SMEs, startups, and growing businesses move from manual, fragmented operations to smarter, automated, and scalable digital systems.",
  body: "We combine AI agents, automation, CRM, custom software, web platforms, mobile applications, and dashboards to build practical technology solutions around the way your business actually works.",
  stats: [
    { value: "99.9", suffix: "%", label: "System Stability" },
    { value: "10", suffix: "x", label: "Processing Speed" },
    { value: "0", suffix: "", label: "Zero Latency" },
    { value: "AI", suffix: "", label: "Native Intelligence" },
  ],
  problem: {
    title: "Your business may not need more tools. It needs the right system.",
    body: "Many growing businesses struggle because customer messages, leads, follow-ups, operations, and reports are scattered across different channels and manual processes.",
    points: [
      "Slow customer response",
      "Manual repetitive work",
      "Scattered leads and customer data",
      "Weak sales follow-up",
      "No clear CRM or tracking system",
      "Limited visibility for management",
    ],
  },
  paradigms: {
    label: "Engineering Paradigms",
    title: "We build connected digital systems around real business workflows.",
    items: [
      { title: "AI Agents", body: "AI agents and intelligent assistants" },
      { title: "Automation", body: "Customer service and sales automation" },
      { title: "CRM Systems", body: "Custom CRM and business systems" },
      { title: "Web & Mobile", body: "Web and mobile applications" },
      { title: "SaaS & Marketplace", body: "SaaS and marketplace platforms" },
      { title: "Dashboards", body: "Business dashboards and reporting" },
    ],
  },
  featured: {
    label: "Featured Solution",
    title: "AI that turns conversations into leads.",
    body: [
      "Every Second AI is an AI marketing and customer communication tool that helps businesses respond faster, manage customer conversations, qualify leads, book appointments, and extract useful Voice of Customer insights.",
      "It works as a smart sales and customer support agent trained around each business and connected to the channels where customers already communicate.",
    ],
    features: [
      "Instant customer responses",
      "AI sales and support conversations",
      "Lead qualification",
      "Appointment booking",
      "CRM and dashboard integration",
      "Human handoff when needed",
      "Multi-language and dialect support",
      "VOC listening and performance insights",
    ],
  },
  cta: {
    title: "Ready to build smarter digital operations?",
    body: "Whether you need an AI sales agent, customer support automation, a custom CRM, a mobile app, a SaaS platform, or a complete business system, tech-oriented can help you turn fragmented operations into smarter digital workflows.",
  },
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  subtitle: string;
  summary: string;
  headline: string;
  body: string;
  capabilities: string[];
  bestFor: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    short: "AI Agents",
    subtitle: "AI Agents & Intelligent Business Assistants",
    summary:
      "AI agents, intelligent assistants, customer support AI, sales AI, lead qualification, appointment booking, and knowledge-based responses.",
    headline: "AI agents that can think, respond, and take action.",
    body: "tech-oriented builds AI agents that go beyond basic chatbot responses. Our AI solutions can understand customer messages, use business knowledge, respond in the right tone, qualify leads, suggest products, take appointments, assign tasks, and support customer service or sales teams.",
    capabilities: [
      "AI customer support agents",
      "AI sales assistants",
      "Lead qualification and lead nurturing",
      "Appointment reservation and booking",
      "Product suggestion based on customer needs",
      "FAQ handling and knowledge-based responses",
      "Multi-language and dialect support",
      "CRM and dashboard integration",
      "Human handoff when needed",
      "Analytics and reporting on AI performance",
    ],
    bestFor: [
      "Businesses receiving high volumes of customer messages",
      "Sales teams needing faster lead response",
      "Customer service teams needing consistent answers",
      "Businesses that need AI trained around their own data",
      "Companies looking to automate first-line customer interaction",
    ],
    cta: "Build Your AI Agent",
  },
  {
    slug: "every-second-ai",
    name: "Every Second AI",
    short: "Every Second AI",
    subtitle: "AI Marketing Tool That Converts Messages Into Leads",
    summary:
      "An AI marketing and customer communication tool that converts customer messages into qualified leads and useful business insights.",
    headline: "AI that turns customer conversations into leads.",
    body: "It helps businesses respond instantly, manage full conversations, qualify leads, book appointments, suggest products, and connect customer communication with CRM and dashboards.",
    capabilities: [
      "AI customer support conversations",
      "AI sales conversations",
      "Lead qualification",
      "Appointment booking",
      "Product recommendations",
      "CRM integration",
      "Dashboard and analytics",
      "Human handoff",
      "Multi-language and dialect support",
      "VOC listening and insights",
    ],
    bestFor: [
      "SMEs, startups, and e-commerce businesses",
      "Clinics and real estate companies",
      "Service businesses and education providers",
      "Logistics companies",
      "Any business that depends on direct customer conversations",
    ],
    cta: "Request a Demo",
  },
  {
    slug: "automation-solutions",
    name: "Automation Solutions",
    short: "Automation",
    subtitle: "Customer Service, WhatsApp & Workflow Automation",
    summary:
      "Customer service automation, WhatsApp automation, online sales workflows, internal task flows, and CRM-connected automation.",
    headline: "Reduce manual work and improve response consistency.",
    body: "tech-oriented helps companies automate repetitive processes that consume time, delay responses, and reduce team efficiency. Our automation solutions focus on customer service, online sales, WhatsApp communication, lead handling, internal workflows, and AI-supported response flows.",
    capabilities: [
      "WhatsApp automation",
      "Customer service automation",
      "Online sales communication flows",
      "Lead handling and follow-up workflows",
      "Task assignment and team notifications",
      "CRM-connected automation",
      "AI-supported response and qualification",
      "Internal workflow automation",
    ],
    bestFor: [
      "Companies with high message volume",
      "Teams spending too much time on manual follow-up",
      "Businesses using WhatsApp as a sales channel",
      "Companies wanting consistent customer communication",
    ],
    cta: "Automate Your Workflow",
  },
  {
    slug: "crm-business-systems",
    name: "CRM & Business Systems",
    short: "CRM Systems",
    subtitle: "Built Around Your Workflow",
    summary:
      "Custom CRM systems and business tools built around sales, customer service, operations, follow-up, reporting, and management visibility.",
    headline: "Custom CRM systems built around the way your business works.",
    body: "Generic CRM tools do not always match the way each business sells, follows up, serves customers, or manages operations. tech-oriented builds custom CRM and business systems from the ground up based on each company's workflow, customer journey, team structure, reporting needs, and operational process.",
    capabilities: [
      "Lead management",
      "Sales pipeline management",
      "Customer database",
      "Follow-up reminders",
      "Customer service tracking",
      "Team roles and permissions",
      "WhatsApp integration",
      "Email integration when required",
      "Reports and dashboards",
      "Management visibility",
    ],
    bestFor: [
      "Companies with complex sales processes",
      "Teams struggling with lead tracking",
      "Businesses needing custom reporting",
      "Companies outgrowing generic CRM tools",
    ],
    cta: "Build a Custom CRM",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    short: "Custom Software",
    subtitle: "Business-First Digital Systems",
    summary:
      "Tailored software systems designed around business logic, user roles, data flows, integrations, and scalable architecture.",
    headline: "Software designed around your business logic.",
    body: "tech-oriented builds custom software systems for companies that need solutions beyond ready-made tools. We design and develop systems based on user roles, workflows, data flows, business rules, integrations, security needs, and scalability requirements.",
    capabilities: [
      "Internal business systems",
      "Custom management portals",
      "Workflow systems",
      "Secure client portals",
      "SaaS platforms",
      "Marketplace systems",
      "Admin dashboards",
      "API-connected platforms",
      "Role-based systems",
      "Data-driven business tools",
    ],
    bestFor: [
      "Companies with unique operational workflows",
      "Businesses needing custom integrations",
      "Companies building SaaS products",
      "Organizations needing secure portals",
    ],
    cta: "Discuss Your Custom System",
  },
  {
    slug: "web-mobile-applications",
    name: "Web & Mobile Applications",
    short: "Web & Mobile",
    subtitle: "iOS, Android, SaaS & Platforms",
    summary:
      "Mobile apps, web platforms, SaaS products, internal portals, marketplaces, booking systems, tracking systems, and e-commerce platforms.",
    headline: "Digital platforms for real users and real operations.",
    body: "tech-oriented builds mobile applications and web platforms that support business operations, customer-facing services, marketplaces, internal portals, SaaS products, and digital products.",
    capabilities: [
      "iOS and Android applications",
      "Flutter mobile development",
      "Web platforms",
      "SaaS products",
      "Internal portals",
      "Marketplace platforms",
      "E-commerce platforms",
      "Booking systems",
      "Maps and tracking",
      "Payment gateway integration",
      "Admin dashboards and control panels",
    ],
    bestFor: [
      "Startups building consumer apps",
      "Businesses launching SaaS products",
      "Companies needing marketplace platforms",
      "Organizations needing internal portals",
    ],
    cta: "Build Your App or Platform",
  },
  {
    slug: "business-dashboards",
    name: "Business Dashboards",
    short: "Dashboards",
    subtitle: "Sales, Operations, CRM & AI Performance Dashboards",
    summary:
      "Dashboards and reports that help teams and management track KPIs, sales, operations, leads, customers, and performance.",
    headline: "Turn operational data into management visibility.",
    body: "A business cannot improve what it cannot see. tech-oriented builds dashboards that help managers and teams monitor performance, track customers, understand workflow progress, and make better decisions based on clear data.",
    capabilities: [
      "Sales dashboards",
      "Operations dashboards",
      "Customer service dashboards",
      "Lead tracking dashboards",
      "CRM performance dashboards",
      "AI conversation dashboards",
      "Admin control panels",
      "KPI and reporting dashboards",
    ],
    bestFor: [
      "Management teams needing performance visibility",
      "Sales teams tracking pipeline",
      "Operations teams monitoring workflows",
      "Companies wanting data-driven decisions",
    ],
    cta: "Create Your Dashboard",
  },
];

export const servicesIntro = {
  label: "Our Services",
  title: "Technology services designed around your business needs.",
  body: "tech-oriented provides connected technology services that help companies automate operations, improve customer communication, build digital platforms, and gain better visibility over business performance.",
};

export type Product = {
  slug: string;
  name: string;
  status: string;
  category: string;
  headline: string;
  body: string;
  features: string[];
  bestFor: string;
  cta: string;
};

export const products: Product[] = [
  {
    slug: "every-second-ai",
    name: "Every Second AI",
    status: "Live",
    category: "AI Marketing & Communication",
    headline: "AI that turns customer conversations into leads.",
    body: "It helps businesses respond instantly, manage full conversations, qualify leads, book appointments, suggest products, and connect customer communication with CRM and dashboards.",
    features: [
      "AI customer support conversations",
      "AI sales conversations",
      "Lead qualification",
      "Appointment booking",
      "Product recommendations",
      "CRM integration",
      "Dashboard and analytics",
      "Human handoff",
      "Multi-language and dialect support",
      "VOC listening and insights",
    ],
    bestFor:
      "SMEs, startups, e-commerce businesses, clinics, real estate companies, service businesses, education providers, logistics companies, and any business that depends on direct customer conversations.",
    cta: "Request a Demo",
  },
  {
    slug: "calorie-7",
    name: "Calorie 7",
    status: "Live",
    category: "HealthTech & Lifestyle",
    headline: "An Arabic mobile app for structured nutrition and health tracking.",
    body: "It helps users organize diet follow-up instead of relying on paper plans or scattered WhatsApp messages.",
    features: [
      "Weekly diet plan tracking",
      "Breakfast, lunch, dinner, and snack organization",
      "Meal logging inside and outside the plan",
      "Water intake tracking",
      "Activity and exercise tracking",
      "Weight and progress tracking",
      "Automatic BMI calculation",
      "Doctor visit and measurement records",
      "Follow-up reminders",
      "Progress dashboard",
      "Weekly report sharing through WhatsApp",
    ],
    bestFor:
      "Individuals following diet plans, patients working with nutritionists, fitness enthusiasts, and health-conscious users looking for Arabic nutrition tracking.",
    cta: "Download App",
  },
  {
    slug: "coachizer",
    name: "Coachizer",
    status: "Available",
    category: "SportsTech Platform",
    headline: "A sports training management platform for coaches, players, and parents.",
    body: "It turns the daily chaos of WhatsApp, cash payments, manual tables, and scattered follow-up into a structured digital system.",
    features: [
      "Coach, player, and parent accounts",
      "Training group management",
      "Schedule organization",
      "Player search by sport, age, and location",
      "Attendance and absence tracking",
      "Payment requests and wallet features",
      "Parent-child management",
      "Player reports",
      "Coach financial section",
      "Subscription packages for coaches",
      "Referral and promo code system",
      "Sponsorship and partner spaces",
    ],
    bestFor:
      "Private sports coaches, sports academies, athletic trainers, parents managing children's sports activities.",
    cta: "Download App",
  },
  {
    slug: "nazel",
    name: "Nazel",
    status: "Live",
    category: "Consumer & Lifestyle Apps",
    headline: "A mobile app for ready-made and customizable checklists.",
    body: "It helps users reduce forgetting and distraction by providing organized lists they can use, edit, and personalize.",
    features: [
      "Ready-made checklists",
      "Custom checklist creation",
      "Editing ready-made lists",
      "Checklist categories",
      "In-app search",
      "Push notifications",
      "Arabic and English support",
      "Account registration and login",
    ],
    bestFor:
      "Individuals who want to stay organized, travelers, students, professionals, and anyone who needs structured preparation for daily tasks.",
    cta: "Download App",
  },
  {
    slug: "bayt-link",
    name: "Bayt Link",
    status: "Coming Soon",
    category: "PropTech / Building Management",
    headline: "A property community management solution.",
    body: "It helps communities organize communication, shared expenses, voting, and service requests in a more structured way.",
    features: [
      "Resident-management communication",
      "Shared expense collection",
      "Building-related payment organization",
      "Voting between residents",
      "Service requests",
      "Access to selected craftsmen or service providers",
      "Community management workflows",
    ],
    bestFor:
      "Residential compound managers, building owners, property management companies, and residents looking for better community organization.",
    cta: "Learn More",
  },
  {
    slug: "ready-mobile",
    name: "Ready Mobile",
    status: "Upcoming",
    category: "Marketplace Platforms",
    headline: "A specialized marketplace for mobile phones and accessories.",
    body: "The platform is designed to help vendors reach new customers while helping buyers discover products, compare options, and purchase more easily.",
    features: [
      "Vendor access to new customers",
      "Customer access to better product options",
      "Organized online buying journey",
      "Shipping company integration",
      "AI support through Every Second AI",
    ],
    bestFor:
      "Mobile phone and accessory vendors, electronics retailers, and buyers looking for organized product discovery.",
    cta: "Learn More",
  },
  {
    slug: "ready-marine",
    name: "Ready Marine",
    status: "Upcoming",
    category: "Marketplace Platforms",
    headline: "A specialized marketplace for marine products and yacht spare parts.",
    body: "It aims to connect vendors and customers in a niche market that needs a more organized online buying and selling experience.",
    features: [
      "Specialized product discovery",
      "Vendor access to a niche customer base",
      "Organized marine product marketplace",
      "Shipping company integration",
      "AI support through Every Second AI",
    ],
    bestFor:
      "Marine accessories vendors, yacht equipment suppliers, boat owners, and marine sports enthusiasts.",
    cta: "Learn More",
  },
  {
    slug: "ready-car",
    name: "Ready Car",
    status: "Upcoming",
    category: "Marketplace Platforms",
    headline: "A marketplace for car spare parts and automotive accessories.",
    body: "The platform is designed to improve how customers discover, compare, and purchase automotive products online while helping vendors reach a wider customer base.",
    features: [
      "Better product discovery for customers",
      "Wider reach for automotive vendors",
      "Organized online buying experience",
      "Shipping company integration",
      "AI support through Every Second AI",
    ],
    bestFor:
      "Car spare parts vendors, automotive accessories retailers, and car owners looking for parts and accessories.",
    cta: "Learn More",
  },
];

export type CaseStudy = {
  slug: string;
  name: string;
  sector: string;
  stack: string[];
  challenge: string;
  solution: string;
  delivered: string[];
  impact: string[];
};

export const caseStudiesIntro = {
  label: "Our Work",
  title: "Selected Success Stories",
  body: "Our work covers AI communication, EdTech platforms, secure financial portals, and complex marketplace systems. Each case reflects how tech-oriented converts operational problems into working digital systems.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "every-second-ai",
    name: "Every Second AI",
    sector: "AI & SaaS",
    stack: ["Python Flask", "LLMs", "RAG", "Laravel", "Meta Graph API"],
    challenge:
      "Businesses were losing potential leads due to delayed manual responses on Meta platforms such as Facebook and Instagram. They also lacked a centralized automated system to collect, respond to, and qualify incoming leads.",
    solution:
      "tech-oriented developed an AI Moderator system with integration with Meta Graph APIs. The system was built to collect incoming messages, respond instantly using AI, classify conversations, and qualify leads automatically.",
    delivered: [
      "Full-featured SaaS platform for AI management",
      "AI moderator for customer communication",
      "Lead collection and qualification flow",
      "Meta Graph API integration",
      "Dashboard and management tools",
    ],
    impact: [
      "Response time reduced to under 20 seconds",
      "Customer service workload reduced significantly",
      "Better lead handling and faster customer communication",
      "Stronger conversion potential through instant engagement",
    ],
  },
  {
    slug: "qatari-educational-platform",
    name: "Qatari Educational Platform",
    sector: "E-Learning & EdTech",
    stack: ["Laravel", "DRM Video Protection", "WebRTC / Zoom API"],
    challenge:
      "The platform needed to deliver smooth 1:1 mentoring sessions while protecting educational videos and materials from piracy, unauthorized downloads, and screen recording.",
    solution:
      "tech-oriented developed a full-featured Learning Management System with scheduling, live-streaming capabilities, mentoring session management, and Digital Rights Management technology to protect educational content.",
    delivered: [
      "Interactive web platform",
      "Admin and mentor dashboard",
      "1:1 mentoring session scheduling",
      "Live streaming integration",
      "DRM-protected web application",
    ],
    impact: [
      "Stronger protection for educational intellectual property",
      "Automated session scheduling",
      "Improved usability for individual mentoring sessions",
      "Increased confidence in protected digital learning delivery",
    ],
  },
  {
    slug: "taxera",
    name: "Taxera",
    sector: "FinTech / Accounting",
    stack: ["Flutter", "Laravel", "Advanced Database Encryption"],
    challenge:
      "The client relied on manual methods for tax tracking, which created risks around sensitive financial data leakage, data loss, and inefficient communication between accountants and clients.",
    solution:
      "tech-oriented built Taxera, a closed and secure portal and app for tracking tax files and managing accountant-client workflows with strict role-based access control.",
    delivered: [
      "Web application portal",
      "Accountant management system",
      "Role-based access structure",
      "Secure tax file tracking",
      "Client-accountant communication workflow",
    ],
    impact: [
      "Reduced manual and paper-based work",
      "Improved confidentiality and access control",
      "More structured accountant-client communication",
      "Secure environment for managing sensitive tax information",
    ],
  },
  {
    slug: "qatari-automotive-parts-platform",
    name: "Qatari Automotive Parts Platform",
    sector: "Automotive E-commerce",
    stack: ["Native App Structure", "Laravel", "MySQL"],
    challenge:
      "The client needed a high-performance multi-vendor platform capable of managing multiple vendors, sub-orders, and customer purchases without the slow performance issues found in previous applications.",
    solution:
      "tech-oriented built a multi-vendor automotive e-commerce platform using a performance-focused app structure and an advanced order management system that supports vendor-based order splitting.",
    delivered: [
      "User mobile application",
      "Vendor mobile application",
      "Centralized admin dashboard",
      "Multi-vendor order management",
      "Vendor onboarding workflow",
    ],
    impact: [
      "Faster user experience",
      "Improved customer trust in the platform",
      "More organized vendor management",
      "Streamlined onboarding for new vendors",
      "Better handling of complex e-commerce logic",
    ],
  },
];

export const process = {
  label: "How We Work",
  title: "A structured process from business understanding to delivery.",
  body: "tech-oriented follows a clear delivery process that helps clients move from idea or business need to a tested, launched, and supported digital solution.",
  steps: [
    { title: "Exploration Meeting", body: "Understand the business, current workflow, pain points, and desired outcome." },
    { title: "Business Analysis", body: "Translate business needs into clear requirements, user flows, and system logic." },
    { title: "Technical & Financial Proposal", body: "Define scope, recommended solution, timeline, and commercial offer." },
    { title: "Contract Signing", body: "Confirm scope, responsibilities, milestones, and delivery terms." },
    { title: "Project Initiation", body: "Kick off execution, align teams, and prepare delivery phases." },
    { title: "UI/UX & Solution Design", body: "Create user experience, wireframes, and system structure before development." },
    { title: "Development & Integration", body: "Build the solution, connect APIs, and implement required features." },
    { title: "Testing & Optimization", body: "Run QA, fix issues, and optimize the product before launch." },
    { title: "Training & Delivery", body: "Train the client's team and support smooth adoption." },
    { title: "Support & Continuous Improvement", body: "Provide post-launch support and plan future enhancements through agreed phases." },
  ],
};

export const industries = {
  label: "Industries",
  title: "Technology solutions for businesses with real operational needs.",
  body: "tech-oriented serves SMEs, startups, and growing businesses across industries that need better systems, automation, customer communication, digital platforms, and management visibility.",
  items: [
    { key: "ecommerce", name: "E-commerce", body: "Marketplace platforms, order workflows, customer support AI, vendor dashboards" },
    { key: "real-estate", name: "Real Estate", body: "Lead management, sales follow-up, property inquiries, customer communication" },
    { key: "healthcare", name: "Healthcare", body: "Appointment flows, patient communication, follow-up systems, health apps" },
    { key: "education", name: "Education", body: "LMS platforms, mentoring sessions, content protection, student dashboards" },
    { key: "logistics", name: "Logistics & Shipping", body: "Customer updates, workflow tracking, vendor integrations, dashboards" },
    { key: "marketing-sales", name: "Marketing & Sales", body: "Lead qualification, AI response, CRM, campaign follow-up" },
    { key: "accounting-finance", name: "Accounting & Finance", body: "Secure portals, client management, file tracking, role-based access" },
    { key: "sports-lifestyle", name: "Sports & Lifestyle", body: "Mobile apps, subscription platforms, booking, payments, communities" },
    { key: "service-companies", name: "Service-Based Companies", body: "CRM, support automation, dashboards, team workflows" },
  ],
};

export const technology = {
  label: "Technology",
  title: "The right technology for the right business need.",
  body: "tech-oriented follows a project-first technology approach. We do not force every client into one fixed technical stack. Instead, we select the architecture, backend, frontend, database, integration, and deployment approach based on business logic, scalability needs, data structure, performance requirements, and timeline.",
  stack: [
    { group: "Backend", items: ["Laravel (PHP)", "Livewire", "Node.js", "Express"] },
    { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
    { group: "Admin Panels", items: ["Filament", "Laravel Sanctum", "Laravel Reverb"] },
    { group: "Mobile", items: ["Flutter", "React Native"] },
    { group: "Databases", items: ["MySQL", "MongoDB", "Redis", "ChromaDB"] },
    { group: "AI & APIs", items: ["Python", "RAG", "OpenAI APIs", "WhatsApp Business API", "Meta Graph API", "Custom APIs"] },
    { group: "Infrastructure", items: ["Docker", "Nginx", "VPS", "Cloud Hosting", "DevOps", "QA"] },
  ],
  matrix: [
    { need: "Rapid MVP or CRUD-heavy platform", direction: "Laravel + Livewire + MySQL" },
    { need: "High-performance interactive platform", direction: "Next.js + Node.js/Express + MongoDB" },
    { need: "Complex scalable system", direction: "Node.js/Express + MongoDB + Redis" },
    { need: "Real-time or lightweight service", direction: "Node.js + Laravel Reverb + Redis" },
    { need: "Mobile-first product", direction: "Flutter or React Native" },
    { need: "AI-powered communication", direction: "Python + RAG + OpenAI APIs + CRM integration" },
    { need: "Secure business portal", direction: "Laravel + Filament + Laravel Sanctum + role-based access" },
  ],
  capabilities: [
    "API integrations",
    "Payment gateway integration",
    "WhatsApp Business API integration",
    "Docker-based deployment",
    "VPS / Cloud hosting",
    "QA process",
    "Documentation",
    "Training",
    "Maintenance and support",
    "SLA-based support where agreed",
    "Security practices",
    "Roles and permissions",
    "Backup and scalability planning",
    "DevOps and deployment process",
    "Agile / sprint-based delivery",
  ],
};

export const about = {
  label: "About Us",
  title: "We build technology around the way your business actually works.",
  intro: [
    "tech-oriented is an AI & Digital Transformation Tech House helping companies design, build, and scale customized digital systems that support real operations.",
    "We combine business understanding, technical expertise, AI capability, and reliable follow-up to deliver practical solutions for growing businesses.",
  ],
  who: {
    title: "Who We Are",
    body: [
      "tech-oriented operates as a business-first technology partner for SMEs, startups, and growing companies that need practical digital transformation.",
      "Our team works across development, UI/UX, AI, QA, business analysis, project management, and marketing to connect technical execution with real business needs.",
      "We do not start from a fixed template. We start from the business problem, then design the right technical direction.",
    ],
  },
  house: {
    title: "AI & Digital Transformation Tech House",
    body: [
      "tech-oriented is positioned to help businesses that need more than a standard software vendor.",
      "We help companies move from scattered operations to connected digital systems by combining AI agents, automation, CRM, custom software, mobile apps, web platforms, and dashboards.",
    ],
  },
  different: [
    { title: "Business-first thinking", body: "We understand business processes before writing code." },
    { title: "Customized technology", body: "We build around each company's workflow instead of forcing generic systems." },
    { title: "AI and automation capability", body: "We help businesses reduce manual work and improve communication using practical AI and automation." },
    { title: "Reliable follow-up", body: "We support clients through analysis, delivery, testing, training, support, and improvement." },
    { title: "Technical depth", body: "We work across web, mobile, backend, AI, APIs, databases, cloud hosting, QA, and deployment." },
  ],
  regional: {
    title: "Regional Outlook",
    body: [
      "tech-oriented serves businesses from Egypt and works with regional opportunities across Gulf Cooperation Council markets.",
      "Our focus is to support businesses that need practical, customized, and scalable technology solutions designed around real operational needs.",
    ],
  },
};

export const contact = {
  label: "Get In Touch",
  title: "Let's build smarter digital operations.",
  body: "Whether you need an AI sales agent, customer support automation, a custom CRM, a mobile application, a SaaS platform, or a complete business system, tech-oriented can help you turn fragmented operations into smarter digital workflows.",
  interests: [
    "AI Solutions",
    "Every Second AI",
    "Automation Solutions",
    "CRM & Business Systems",
    "Custom Software Development",
    "Web & Mobile Applications",
    "Business Dashboards",
    "Product Partnership",
    "General Inquiry",
  ],
};

// Brand teal family (main colour #2DD4BF) for generative fallbacks and fills
export const tones = [
  "#2DD4BF", "#14B8A6", "#5EEAD4", "#0F766E", "#99F6E4", "#0D9488",
  "#115E59", "#2DD4BF", "#134E4A", "#5EEAD4", "#14B8A6", "#0F766E",
];
