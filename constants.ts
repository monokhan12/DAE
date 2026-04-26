
import { BlogPost, DaeProgram, EuroPortalMapping, JobListing } from './types';

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
    content: `
# The Future of DAE in Pakistan

The landscape of technical education in Pakistan is undergoing a massive transformation. As we move into 2026, the **Diploma of Associate Engineering (DAE)** is no longer just a "junior" qualification. It is the backbone of the country's industrial growth.

## Why 2026 is Different?
The completion of major CPEC projects and the localized manufacturing of electric vehicles (EVs) have created a surge in demand for specialized diploma holders. 

### Top 5 Technologies to Watch:
1. **Industrial IoT (IIoT):** Connecting factory machines to the cloud.
2. **Renewable Energy Integration:** Solar and Wind power grid management.
3. **Additive Manufacturing:** 3D printing in industrial tooling.
4. **Electric Vehicle Maintenance:** A shift from IC engines to battery systems.
5. **AI-Driven Predictive Maintenance:** Using data to fix machines before they break.

## Conclusion
For DAE students, the key to success in the coming years will be **continuous learning**. Those who combine their base diploma with specialized AI and digital skills will be the highest earners in the market.
    `,
    author: 'Engr. Ahmad Hassan',
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
  },
  {
    id: '5',
    title: 'B.Tech vs BS Engineering: Which path is better for DAE holders?',
    excerpt: 'One of the most debated topics among Diploma engineers. We break down the differences in curriculum, job prospects, and PEC registration.',
    date: 'Mar 15, 2026',
    category: 'Education',
    tags: ['B.Tech', 'BS Engineering', 'Higher Studies', 'PEC'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Top 5 Skills for DAE Mechanical Engineers in 2026',
    excerpt: 'Beyond basic workshop skills, today\'s industry demands expertise in CNC, SolidWorks, and Lean Manufacturing. Are you ready?',
    date: 'Mar 18, 2026',
    category: 'Trends',
    tags: ['Mechanical', 'Skills', 'SolidWorks', 'CNC'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    title: 'A Guide to Ausbildung in Germany for Pakistani DAE Students',
    excerpt: 'Germany offers free technical training with a monthly stipend. Learn the requirements, language levels, and how to apply from Pakistan.',
    content: `
# Technical Training in Germany: The Ausbildung Program

Did you know that as a DAE holder, you are eligible for the German **Ausbildung** (Apprenticeship) program? This is a unique opportunity where you learn and work at the same time.

## Key Benefits:
- **No Tuition Fees:** The training is free.
- **Monthly Stipend:** You get paid (approx. €800 - €1,200) while learning.
- **Job Guarantee:** Most companies hire their apprentices full-time after the 3-year program.

## Requirements for Pakistani Students:
1.  **DAE Completion:** Your diploma is usually equated to a German secondary school certificate.
2.  **German Language (CRITICAL):** You MUST reach at least **B1 or B2 level** of German. English is usually not enough for technical trades.
3.  **Visa:** Vocational training visa (requires an apprenticeship contract from a German employer).

### How to Start?
Start learning German today at the **Goethe-Institut** or online. Search for positions on portals like *ausbildung.de* or *Make it in Germany*.
    `,
    author: 'Sarah Javed (Career Consultant)',
    date: 'Mar 20, 2026',
    category: 'Abroad',
    tags: ['Germany', 'Ausbildung', 'Apprenticeship', 'Europe'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'AI in Industrial Automation: What Electrical Students Must Know',
    excerpt: 'PLCs are getting smarter. Discover how AI and Machine Learning are being integrated into power systems and industrial control units.',
    date: 'Mar 22, 2026',
    category: 'Trends',
    tags: ['Electrical', 'AI', 'Automation', 'PLC'],
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    title: 'Freelancing for DAE Students: Earning with Technical Skills',
    excerpt: 'From AutoCAD 2D/3D drafting to PLC programming, DAE students can earn significantly on Upwork and Fiverr. Here is a starter guide.',
    content: `
# Earning Dollars with Technical Skills: A Guide for DAE Students

If you think freelancing is only for computer science students, think again. As a Diploma Engineer, you possess unique technical skills that are highly sought after by clients globally.

## High-Demand Technical Skills:
1.  **AutoCAD Drafting:** Converting hand-sketches to digital 2D/3D models.
2.  **PLC Programming:** Writing logic for industrial automation (Siemens, Allen Bradley).
3.  **Mechanical Part Design:** Using SolidWorks or Fusion 360 for product prototyping.
4.  **Electrical Circuit Design:** Using Proteus or Altium for PCB layouts.
5.  **Technical Writing:** Creating manuals for machinery or writing engineering blogs.

## Where to Start?
- **Fiverr:** Create Gigs for specific tasks like "I will design a 2D floor plan in AutoCAD."
- **Upwork:** Apply for long-term projects like "Seeking a remote PLC programmer for a water treatment plant."

## Pro Tips:
- **Build a Portfolio:** Showcase your best lab projects or previous work.
- **Learn Soft Skills:** Communication is key when dealing with international clients.
- **Stay Consistent:** Results take time, but once you get your first 5-star review, the sky is the limit.
    `,
    author: 'Engr. Zohaib Arshad',
    date: 'Mar 24, 2026',
    category: 'Freelancing',
    tags: ['Freelancing', 'AutoCAD', 'PLC', 'Income'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
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
  { country: "Germany", portal: "ausbildung.de", description: "Central German portal for apprenticeships", flag: "🇩🇪", code: "de" },
  { country: "Canada", portal: "Job Bank (Apprenticeship)", description: "Official Canadian apprenticeship service", flag: "🇨🇦", code: "ca" },
  { country: "Belgium", portal: "VDAB / Le Forem", description: "Belgian vocational training portals", flag: "🇧🇪", code: "be" },
  { country: "Saudi Arabia", portal: "Qiwa / TVTC", description: "KSA technical and vocational portals", flag: "🇸🇦", code: "sa" },
  { country: "UAE", portal: "MOHRE / ADVETI", description: "UAE technical employment gateway", flag: "🇦🇪", code: "ae" },
  { country: "Austria", portal: "AMS Lehrstellenbörse", description: "Public employment service platform", flag: "🇦🇹", code: "at" },
  { country: "Switzerland", portal: "lehrstellensuche.ch", description: "National search for training positions", flag: "🇨🇭", code: "ch" },
  { country: "UK", portal: "Find an apprenticeship (gov.uk)", description: "Official UK apprenticeship service", flag: "🇬🇧", code: "gb" },
  { country: "Netherlands", portal: "stagemarkt.nl", description: "SBB portal for Dutch vocational training", flag: "🇳🇱", code: "nl" },
  { country: "France", portal: "1jeune1solution.gouv.fr", description: "Official French youth employment portal", flag: "🇫🇷", code: "fr" },
  { country: "Ireland", portal: "apprenticeship.ie", description: "National Apprenticeship Service Ireland", flag: "🇮🇪", code: "ie" },
  { country: "Sweden", portal: "Arbetsförmedlingen", description: "Swedish Public Employment Service", flag: "🇸🇪", code: "se" },
  { country: "Norway", portal: "vilbli.no", description: "Norwegian portal for vocational education", flag: "🇳🇴", code: "no" },
  { country: "Denmark", portal: "læreplads.dk", description: "Danish apprenticeship matching portal", flag: "🇩🇰", code: "dk" },
  { country: "Italy", portal: "ANPAL", description: "Italian National Agency for Active Labor Policies", flag: "🇮🇹", code: "it" },
  { country: "Spain", portal: "todofp.es", description: "Official Spanish portal for vocational training", flag: "🇪🇸", code: "es" },
];

export const MOCK_JOBS: JobListing[] = [
  {
    id: 'j1',
    title: 'Electrical Maintenance Engineer',
    company: 'Lucky Cement Limited',
    location: 'Karachi, Pakistan',
    description: 'Responsible for maintaining electrical systems, troubleshooting PLC controls, and ensuring minimum downtime in production lines.',
    postedDate: '2 days ago',
    type: 'Full-time',
    salary: 'PKR 80k - 120k',
    logo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'j2',
    title: 'Junior Mechanical Technician',
    company: 'Engro Fertilizers',
    location: 'Daharki, Sindh',
    description: 'Assist in the overhaul of rotating equipment, pumps, and compressors. Knowledge of technical drawings is required.',
    postedDate: '1 week ago',
    type: 'Full-time',
    salary: 'PKR 60k - 90k',
    logo: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'j3',
    title: 'Solar System Installer',
    company: 'Reon Energy',
    location: 'Lahore, Pakistan',
    description: 'Installation and commissioning of industrial-scale solar PV systems. DAE Electrical or Electronics preferred.',
    postedDate: '3 days ago',
    type: 'Contract',
    salary: 'PKR 50k - 70k',
    logo: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'j4',
    title: 'HVAC Supervisor',
    company: 'Al-Futtaim Engineering',
    location: 'Dubai, UAE',
    description: 'Oversee HVAC maintenance teams for large commercial complexes. Must have DAE HVAC and 5 years experience.',
    postedDate: '5 days ago',
    type: 'Full-time',
    salary: 'AED 5k - 8k',
    logo: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=100'
  }
];
