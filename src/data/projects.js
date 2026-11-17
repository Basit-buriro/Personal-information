/* ══════════════════════════════════════════════════════════════
   PROJECTS + CERTIFICATES DATA — Abdul Basit
   ══════════════════════════════════════════════════════════════ */

// Import all your certificate images from the assets folder
import certPython from '../assets/pythoncourse.png';
import certAI from '../assets/googleai.png';
import certAppBuilding from '../assets/aiappbuilding.png';
import certContent from '../assets/aicontentcreation.png';
import certData from '../assets/aidataanalysis.png';
import certClaude from '../assets/claudecoworkskills.png';
import certHero5 from '../assets/Hero5.png';

// Import the header image for the Certificates page
import seeBelow from '../assets/seebelow.png';

export const projects = [
  // ─── YOUR ORIGINAL PROJECTS ───
  {
    id: 'technify',
    title: 'Technify Software',
    tagline: 'Software Consulting Company Website',
    description:
      'A modern corporate website for Technify — a software consulting company delivering end-to-end solutions across web, mobile, cloud, AI, and cybersecurity.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    year: '2025',
    liveUrl: 'https://share.google/zGXWZVU5bwTi7COxY',
    githubUrl: '',
    accent: '#ff3d00', // Red
  },
  {
    id: 'marham',
    title: 'Marham Clinic',
    tagline: 'Doctor & Dentist Directory Platform',
    description:
      'A healthcare directory featuring verified doctors and dentists across Hyderabad. Users can browse specialists, view profiles, and book appointments.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    category: 'Healthcare',
    year: '2025',
    liveUrl: 'https://www.marham.pk/doctors/hyderabad/dentist',
    githubUrl: '',
    accent: '#ff8a1f', // Orange
  },
  {
    id: 'apnafood',
    title: 'Apna Food',
    tagline: 'Food Delivery & Restaurant Discovery',
    description:
      'A hyperlocal food delivery platform connecting users with local fast-food restaurants in Hyderabad. Browse menus, filter by cuisine, and order in real-time.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Food & Commerce',
    year: '2025',
    liveUrl: 'https://apnafood.pk/hyderabad/food/fast-food',
    githubUrl: '',
    accent: '#f59e0b', // Amber
  },

  // ─── YOUR NEW AI & BOT PROJECTS ───
  {
    id: 'ai-chatbot-sandbox',
    title: 'AI Website Chatbot Sandbox',
    tagline: 'FAQ + Lead Capture',
    description:
      'A clean interactive sandbox demonstrating a service-business AI assistant with suggested prompts and lead capture flows.',
    tech: ['Next.js', 'AI API', 'Tailwind CSS', 'Vercel'],
    category: 'AI & Bots',
    liveUrl: 'https://ai-chatbot-sandbox-indol.vercel.app/',
    githubUrl: '',
    accent: '#22c55e', // Green
    year: '2024',
  },
  {
    id: 'chatbotlite-demos',
    title: 'ChatbotLite Multi-Vertical AI Demos',
    tagline: '6 Live Interactive Demos',
    description:
      'Six live interactive AI chatbot demos across e-commerce, healthcare, and hospitality running on a lightweight markdown knowledge base.',
    tech: ['React', 'Markdown', 'AI', 'Vercel'],
    category: 'AI & Bots',
    liveUrl: 'https://chatbotlite-demos.vercel.app/',
    githubUrl: '',
    accent: '#3b82f6', // Blue
    year: '2024',
  },
  {
    id: 'ai-resume-streamlit',
    title: 'AI Resume Analyzer & Builder',
    tagline: 'ATS Scoring & Feedback',
    description:
      'A Python + Streamlit web app that parses uploaded resumes, scores ATS compatibility, and suggests improvements.',
    tech: ['Python', 'Streamlit', 'Pandas', 'NLP'],
    category: 'AI & Bots',
    liveUrl: 'https://airesumeanalyserproject.streamlit.app/',
    githubUrl: '',
    accent: '#a855f7', // Purple
    year: '2024',
  },
  {
    id: 'ai-resume-job-recommender',
    title: 'AI Resume Analyzer & Job Recommender',
    tagline: 'PDF Parsing & Job Matching',
    description:
      'Includes user authentication, skill extraction from PDFs, and role-based job matching built in Python.',
    tech: ['Python', 'Streamlit', 'Auth', 'NLP'],
    category: 'AI & Bots',
    liveUrl: 'https://ai-resume-analyzer-alisha.streamlit.app/',
    githubUrl: '',
    accent: '#f59e0b', // Amber
    year: '2024',
  },

  // ─── YOUR NEW FULL-STACK PROJECTS ───
  {
    id: 'mern-ecommerce',
    title: 'MERN E-Commerce Case Study',
    tagline: 'OTP Verification & QR Tracking',
    description:
      'A detailed architectural breakdown of a MERN e-commerce app featuring Nodemailer OTP verification, QR-code order tracking, and debounced search.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Nodemailer'],
    category: 'Full-Stack',
    liveUrl: 'https://darshan-navadiya.netlify.app/projects/e-commerce-website',
    githubUrl: '',
    accent: '#06b6d4', // Cyan
    year: '2024',
  },
  {
    id: 'rag-portfolio',
    title: 'Full-Stack AI & RAG Engineer Portfolio',
    tagline: 'FastAPI & ChromaDB',
    description:
      'Example of how to present Python, FastAPI, ChromaDB RAG, and React projects with clear technical metrics.',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'React'],
    category: 'Full-Stack',
    liveUrl: 'https://portfolio-website-q9og.onrender.com/',
    githubUrl: '',
    accent: '#6366f1', // Indigo
    year: '2024',
  },
  {
    id: 'fullstack-ai-showcase',
    title: 'Full-Stack & AI Developer Showcase',
    tagline: 'Flask/Django & React',
    description:
      'Example layout pairing Python/Flask/Django backends with React frontends and live demo links.',
    tech: ['Python', 'Flask', 'Django', 'React'],
    category: 'Full-Stack',
    liveUrl: 'https://my-portfolio-thasinnathir-63.vercel.app/',
    githubUrl: '',
    accent: '#ec4899', // Pink
    year: '2024',
  },
  {
    id: 'mern-nextjs-showcase',
    title: 'MERN & Next.js Full-Stack Showcase',
    tagline: 'UI Replicas & Full Apps',
    description:
      'Clean project cards separating frontend UI replicas from full-stack Node/Express/MongoDB applications.',
    tech: ['Next.js', 'MERN', 'Tailwind CSS'],
    category: 'Full-Stack',
    liveUrl: 'https://awais-ahmad.vercel.app/',
    githubUrl: '',
    accent: '#ef4444', // Red
    year: '2024',
  },
];

// ─── CERTIFICATES ───
export const certificates = [
  {
    id: 'python',
    title: 'Python Programming Course',
    issuer: 'Certification Program',
    date: '2024',
    description:
      'Python fundamentals — data structures, functions, OOP, file handling, and applied scripting for automation and AI projects.',
    image: certPython,
    accent: '#ff3d00',
  },
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: '2024',
    description:
      'Foundational AI program covering generative AI concepts, prompt engineering, and practical AI workflows.',
    image: certAI,
    accent: '#4285F4', // Google Blue
  },
  {
    id: 'ai-app-building',
    title: 'AI App Building',
    issuer: 'AI Certification',
    date: '2024',
    description:
      'Building full-stack applications powered by Large Language Models (LLMs) and AI integrations.',
    image: certAppBuilding,
    accent: '#22c55e',
  },
  {
    id: 'ai-content',
    title: 'AI Content Creation',
    issuer: 'AI Certification',
    date: '2024',
    description:
      'Leveraging generative AI for high-quality content generation, copywriting, and media creation.',
    image: certContent,
    accent: '#a855f7',
  },
  {
    id: 'ai-data',
    title: 'AI Data Analysis',
    issuer: 'AI Certification',
    date: '2024',
    description:
      'Using machine learning and AI tools to analyze datasets, extract insights, and visualize trends.',
    image: certData,
    accent: '#f59e0b',
  },
  {
    id: 'claude-cowork',
    title: 'Claude Co-Work Skills',
    issuer: 'Anthropic',
    date: '2024',
    description:
      "Advanced prompt engineering and workflow automation using Anthropic's Claude AI models.",
    image: certClaude,
    accent: '#d97706',
  },
  {
    id: 'hero5',
    title: 'Artificial Intelligence Certification',
    issuer: 'BBSHRDB — Mehran University',
    date: '2024',
    description:
      'Comprehensive AI program covering machine learning concepts, model training, and applied AI workflows.',
    image: certHero5,
    accent: '#ff8a1f',
  },
];

export const categories = [
  'All',
  'Web',
  'Healthcare',
  'Food & Commerce',
  'AI & Bots',
  'Full-Stack',
];