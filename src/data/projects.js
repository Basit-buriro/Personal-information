/* ══════════════════════════════════════════════════════════════
   PROJECTS + CERTIFICATES DATA — Abdul Basit
   Pure JavaScript only. No JSX. No React.
   ══════════════════════════════════════════════════════════════ */

export const projects = [
  {
    id: 'technify',
    title: 'Technify Software',
    tagline: 'Software Consulting Company Website',
    description:
      'A modern corporate website for Technify — a software consulting company delivering end-to-end solutions across web, mobile, cloud, AI, and cybersecurity.',
    longDescription:
      'Delivered frontend architecture and interactive UI components for a full-service software consultancy. Built responsive sections for services, featured projects, testimonials, and industry verticals with animated reveals.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    year: '2025',
    role: 'Frontend Developer',
    liveUrl: 'https://share.google/zGXWZVU5bwTi7COxY',
    githubUrl: '',
    featured: true,
    accent: '#ff3d00',
    highlights: [
      'Multi-section landing with animated reveals',
      'Responsive grid for 8+ service categories',
      'Case study slider with real client metrics',
      'Performance-optimized, mobile-first build',
    ],
  },
  {
    id: 'marham',
    title: 'Marham Clinic',
    tagline: 'Doctor & Dentist Directory Platform',
    description:
      'A healthcare directory featuring verified doctors and dentists across Hyderabad. Users can browse specialists, view profiles, and book appointments.',
    longDescription:
      'Contributed to the Hyderabad dentist directory — a high-traffic healthcare listing with search, filtering, and doctor profile pages. Focused on SEO, fast load times, and accessible card layouts.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    category: 'Healthcare',
    year: '2025',
    role: 'Full Stack Developer',
    liveUrl: 'https://www.marham.pk/doctors/hyderabad/dentist',
    githubUrl: '',
    featured: true,
    accent: '#ff8a1f',
    highlights: [
      'Directory of verified dentists in Hyderabad',
      'Advanced filtering by specialty & rating',
      'Responsive doctor profile cards',
      'Fast search with debounced queries',
    ],
  },
  {
    id: 'apnafood',
    title: 'Apna Food',
    tagline: 'Food Delivery & Restaurant Discovery',
    description:
      'A hyperlocal food delivery platform connecting users with local fast-food restaurants in Hyderabad. Browse menus, filter by cuisine, and order in real-time.',
    longDescription:
      'Worked as part of the team building the Hyderabad fast-food discovery experience — menu browsing, restaurant cards, filters, and cart flow. Focused on performance and mobile-first UX.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Food & Commerce',
    year: '2025',
    role: 'Team Developer',
    liveUrl: 'https://apnafood.pk/hyderabad/food/fast-food',
    githubUrl: '',
    featured: true,
    accent: '#ff3d00',
    highlights: [
      'Hyperlocal restaurant discovery',
      'Real-time menu & cart flow',
      'Filter by cuisine, price, rating',
      'Mobile-optimized ordering UX',
    ],
  },
];

export const certificates = [
  {
    id: 'python',
    title: 'Python Programming',
    issuer: 'Certification Program',
    date: '2024',
    description:
      'Python fundamentals — data structures, functions, OOP, file handling, and applied scripting for automation and AI projects.',
    file: '/Hero3.pdf',
    accent: '#ff3d00',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence Certification',
    issuer: 'BBSHRDB — Mehran University',
    date: '2024',
    description:
      'Foundational AI program covering machine learning concepts, model training, and applied AI workflows.',
    file: '/Hero4.pdf',
    accent: '#ff8a1f',
  },
];

export const categories = ['All', 'Web', 'Healthcare', 'Food & Commerce'];