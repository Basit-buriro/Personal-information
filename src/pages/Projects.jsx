import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories } from '../data/projects';
import Hero2 from '../assets/Hero2.png'; // 👈 Uses Hero2.png

/* ════════════════════════════════════════════════════════════════════════
   PROJECTS — Simple, smooth, and responsive.
   ════════════════════════════════════════════════════════════════════════ */

const Icon = ({ d, size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
  github: 'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
};

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col h-full p-6 rounded-2xl bg-[#1c0802]/50 border backdrop-blur-md transition-all duration-300 ${
        hovered ? 'border-white/30 shadow-xl' : 'border-white/10'
      }`}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, opacity: hovered ? 1 : 0.3 }}
      />

      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase" style={{ backgroundColor: `${project.accent}15`, border: `1px solid ${project.accent}40`, color: project.accent }}>
          {project.category}
        </span>
        <span className="text-xs font-mono text-white/40">{project.year}</span>
      </div>

      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
      <p className="text-sm font-medium mb-4" style={{ color: project.accent }}>{project.tagline}</p>
      
      <p className="text-sm text-white/60 leading-relaxed flex-1 mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <a 
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
          style={{ background: `linear-gradient(90deg, ${project.accent}, #ff8a1f)` }}
        >
          <Icon d={ICONS.external} size={16} />
          Live Demo
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(p, 1)})`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative min-h-screen bg-[#120400] text-white pb-20 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#ff3d00]/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#ff8a1f]/10 blur-[100px]" />
      </div>

      <div ref={barRef} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] origin-left z-50 scale-x-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        
        <header className="pt-32 pb-16 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Things I've Built
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              Real products, real users, real impact. A selection of platforms I've shipped across AI, healthcare, commerce, and software consulting.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#ff8a1f]/40 shadow-[0_0_30px_rgba(255,138,31,0.2)] shrink-0"
          >
            <img src={Hero2} alt="Abdul Basit" className="w-full h-full object-cover object-top" />
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] text-white shadow-lg' 
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 text-center bg-[#1c0802]/60 border border-[#ff8a1f]/20 rounded-3xl p-8 md:p-14 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Have a project in mind?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            I'm open to internships, freelance work, and full-time roles. Let's build something together.
          </p>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=2k24-it-3@usindh.edu.pk&su=Project%20Inquiry" 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] text-white font-semibold hover:scale-105 transition-transform"
          >
            Start a Conversation
          </a>
        </div>

      </div>
    </section>
  );
}