
import { BlogPost, DaeProgram, EuroPortalMapping } from './types';

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'WAPDA Assistant Lineman (ALM) Recruitment 2025',
    excerpt: 'Water and Power Development Authority (WAPDA) invites applications for Assistant Lineman (ALM) BPS-05. Candidates with Matric and DAE Electrical can apply.',
    date: 'Oct 26, 2025',
    category: 'Jobs',
    tags: ['WAPDA', 'Electrical', 'Government', 'Punjab'],
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Atomic Energy Public Sector Org PO Box 1234 Jobs',
    excerpt: 'Latest classified advertisement for Tech-I, Tech-II, and Tech-III positions in Atomic Energy. Fields: Mechanical, Electronics, HVAC, and Auto Diesel.',
    date: 'Oct 25, 2025',
    category: 'Jobs',
    tags: ['PAEC', 'Atomic Energy', 'Mechanical', 'Electronics'],
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'The Future of DAE in Pakistan: 2026 and Beyond',
    excerpt: 'With the rise of CPEC and industrial automation, the Diploma of Associate Engineering (DAE) is becoming more valuable than ever. Discover the top 5 technologies to watch.',
    date: 'Mar 11, 2026',
    category: 'Trends',
    tags: ['DAE', 'Pakistan', 'CPEC', 'Automation'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'How to Prepare for DAE Final Exams: Pro Tips',
    excerpt: 'Success in DAE exams requires a strategic approach. Learn how to master past papers, technical drawings, and practical viva sessions.',
    date: 'Oct 24, 2025',
    category: 'Education',
    tags: ['Exam Prep', 'Study Tips', 'PBTE'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  }
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'AI Academy', path: '/academy' },
  { label: 'DAE Guide', path: '/dae-pakistan' },
  { 
    label: 'Jobs', 
    path: '/jobs',
    subLinks: [
      { label: 'Jobs in Pakistan', path: '/jobs/pakistan' },
      { label: 'Jobs Abroad', path: '/jobs/abroad' },
      { label: 'Post a Job', path: '/jobs/post' }
    ]
  },
  { label: 'Higher Studies', path: '/higher-studies' },
  { label: 'AI Tools', path: '/ai-tools' },
  { label: 'Mentor', path: '/mentor' },
  { label: 'Blog', path: '/blog' },
];

export const DAE_PROGRAMS: DaeProgram[] = [
  { name: "CIVIL TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Infrastructure", qualification: "Matric Science", details: "Construction, Surveying, Highway Engineering, and Water Supply." },
  { name: "ARCHITECTURE TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Design", qualification: "Matric Science", details: "Architectural Drafting, Building Materials, and CAD Design." },
  { name: "LAND & MINE SURVEYING", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Surveying", qualification: "Matric Science", details: "Mine safety, geological mapping, and precision land measurement." },
  { name: "ELECTRICAL TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Power", qualification: "Matric Science", details: "Electrical Machines, Power Plants, Transmission, and Wiring." },
  { name: "ELECTRONICS TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Circuits", qualification: "Matric Science", details: "Digital Logic, Industrial Electronics, and Embedded Systems." },
  { name: "COMPUTER INFO TECH (CIT)", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "IT", qualification: "Matric Science", details: "Programming, Networking, OS, and Database Management." },
  { name: "TELECOMMUNICATION", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Telecom", qualification: "Matric Science", details: "Fiber Optics, Wireless Comm, and Network Switching." },
  { name: "MECHANICAL TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Production", qualification: "Matric Science", details: "Workshop Practice, Thermodynamics, Machine Design, and CNC." },
  { name: "MECHATRONICS TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Robotics", qualification: "Matric Science", details: "Hybrid of Mech, Elec, and Computing for advanced automation." },
  { name: "HVAC TECHNOLOGY", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Cooling", qualification: "Matric Science", details: "Refrigeration, Air Conditioning, and Ventilation for industry." },
  { name: "AUTO & DIESEL", institution: "PBTE / TEVTA", province: "Pakistan", duration: "3 Years", specialization: "Automotive", qualification: "Matric Science", details: "IC Engines, Fuel Systems, and Vehicle Electronics." },
  { name: "CAST METAL & FOUNDRY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Metallurgy", qualification: "Matric Science", details: "Metal molding, casting, and metallurgical testing." },
  { name: "SUGAR TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Process", qualification: "Matric Science", details: "Sugar manufacturing process, chemistry, and mill engineering." },
  { name: "CHEMICAL TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Processing", qualification: "Matric Science", details: "Chemical plant operations, safety, and process design." },
  { name: "PETROLEUM TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Energy", qualification: "Matric Science", details: "Drilling, Reservoir engineering, and Gas production." },
  { name: "GLASS & CERAMICS", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Materials", qualification: "Matric Science", details: "Kiln management, glaze chemistry, and ceramic production." },
  { name: "LEATHER TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Manufacturing", qualification: "Matric Science", details: "Tanning processes, leather chemistry, and footwear design." },
  { name: "FASHION DESIGN", institution: "PBTE / PSFD", province: "Pakistan", duration: "3 Years", specialization: "Creative", qualification: "Matric Arts/Science", details: "Garment construction, textile art, and fashion marketing." },
  { name: "TEXTILE SPINNING", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Textile", qualification: "Matric Science", details: "Yarn manufacturing and textile quality control." },
  { name: "TEXTILE WEAVING", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Textile", qualification: "Matric Science", details: "Fabric design, loom mechanisms, and weaving plant ops." },
  { name: "FOOD TECHNOLOGY", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Food Science", qualification: "Matric Science", details: "Food preservation, processing, and quality assurance." },
  { name: "PRINTING & GRAPHIC ARTS", institution: "PBTE", province: "Pakistan", duration: "3 Years", specialization: "Media", qualification: "Matric Science", details: "Graphic design, offset printing, and digital prepress." }
];

export const TECHNICAL_BOARDS = [
  { id: 'pbte', name: 'PBTE', fullname: 'Punjab Board of Technical Education', location: 'Lahore', focus: 'DAE & Vocational Certifications' },
  { id: 'navttc', name: 'NAVTTC', fullname: 'National Vocational & Technical Training Commission', location: 'Islamabad', focus: 'National Skills Strategy & Hi-Tech Courses' },
  { id: 'psdf', name: 'PSDF', fullname: 'Punjab Skills Development Fund', location: 'Punjab', focus: 'Free Training & Industry Linkages' },
  { id: 'p-tevta', name: 'P-TEVTA', fullname: 'Punjab Technical Education & Vocational Training Authority', location: 'Punjab', focus: 'Technical Institutes & Colleges' },
  { id: 's-tevta', name: 'S-TEVTA', fullname: 'Sindh Technical Education & Vocational Training Authority', location: 'Sindh', focus: 'Skill Development in Sindh' },
  { id: 'kp-tevta', name: 'KP-TEVTA', fullname: 'Khyber Pakhtunkhwa Technical Education Authority', location: 'KP', focus: 'Technical Excellence in KP' }
];

export const ABROAD_PORTALS: EuroPortalMapping[] = [
  { country: "Germany", portal: "ausbildung.de", description: "Central German portal for apprenticeships", flag: "🇩🇪" },
  { country: "Canada", portal: "Job Bank (Apprenticeship)", description: "Official Canadian apprenticeship service", flag: "🇨🇦" },
  { country: "Belgium", portal: "VDAB / Le Forem", description: "Belgian vocational training portals", flag: "🇧🇪" },
  { country: "Saudi Arabia", portal: "Qiwa / TVTC", description: "KSA technical and vocational portals", flag: "🇸🇦" },
  { country: "UAE", portal: "MOHRE / ADVETI", description: "UAE technical employment gateway", flag: "🇦🇪" },
  { country: "Austria", portal: "AMS Lehrstellenbörse", description: "Public employment service platform", flag: "🇦🇹" },
  { country: "Switzerland", portal: "lehrstellensuche.ch", description: "National search for training positions", flag: "🇨🇭" },
  { country: "UK", portal: "Find an apprenticeship (gov.uk)", description: "Official UK apprenticeship service", flag: "🇬🇧" },
  { country: "Netherlands", portal: "stagemarkt.nl", description: "SBB portal for Dutch vocational training", flag: "🇳🇱" },
  { country: "France", portal: "1jeune1solution.gouv.fr", description: "Official French youth employment portal", flag: "🇫🇷" },
  { country: "Ireland", portal: "apprenticeship.ie", description: "National Apprenticeship Service Ireland", flag: "🇮🇪" },
  { country: "Sweden", portal: "Arbetsförmedlingen", description: "Swedish Public Employment Service", flag: "🇸🇪" },
  { country: "Norway", portal: "vilbli.no", description: "Norwegian portal for vocational education", flag: "🇳🇴" },
  { country: "Denmark", portal: "læreplads.dk", description: "Danish apprenticeship matching portal", flag: "🇩🇰" },
  { country: "Italy", portal: "ANPAL", description: "Italian National Agency for Active Labor Policies", flag: "🇮🇹" },
  { country: "Spain", portal: "todofp.es", description: "Official Spanish portal for vocational training", flag: "🇪🇸" },
];
