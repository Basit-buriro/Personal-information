import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/cv';
import HeroImg from '../assets/Hero.png'; // <-- Changed to Hero.png

/* ════════════════════════════════════════════════════════════════════════
   SKILLS — Simple, Smooth, and Fast.
   ════════════════════════════════════════════════════════════════════════ */

const CATEGORY_ICONS = {
  Frontend: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16', // Code
  Backend: 'M3 4h18v7H3z M3 13h18v7H3z M7 7.5h.01 M7 16.5h.01', // Server
  Tools: 'M14.7 6.3a4 4 0 1 0 5 5L21 21l-3-3-2 2-9.6-9.6a4 4 0 0 1-5-5L5 3l3 3 2-2z', // Wrench
  'AI / Learning': 'M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.4 2.4m6.6 6.6 2.4 2.4m0-11.4-2.4 2.4m-6.6 6.6-2.4 2.4', // Sparkle
};

// Simplified SVG Icon
const Icon = ({ d, size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

// Smooth, simple background
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#ff3d00]/10 blur-[100px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#ff8a1f]/10 blur-[100px]" />
    </div>
  );
}

// Simple Orbit - No 3D Tilt, just clean rotation
function Orbit({ skills, photo }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const scale = isMobile ? 0.7 : 1;
  const size = isMobile ? 300 : 500;
  
  const flat = Object.values(skills).flat();
  const ring1 = flat.slice(0, 5);
  const ring2 = flat.slice(5, 11);
  const ring3 = flat.slice(11);

  const rings = [
    { items: ring1, radius: 130 * scale, duration: 25, color: 'border-[#ff8a1f]/30' },
    { items: ring2, radius: 190 * scale, duration: 35, color: 'border-[#ff3d00]/20' },
    { items: ring3, radius: 250 * scale, duration: 45, color: 'border-[#ff8a1f]/10' },
  ];

  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: size, height: size }}>
      
      {/* Center Photo */}
      <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#ff8a1f]/40 shadow-[0_0_40px_rgba(255,138,31,0.2)]">
        <img src={photo} alt="Abdul Basit" className="w-full h-full object-cover object-top" />
      </div>

      {/* Rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border border-dashed ${ring.color}`}
          style={{ width: ring.radius * 2, height: ring.radius * 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
        >
          {ring.items.map((skill, j) => {
            const angle = (j / ring.items.length) * Math.PI * 2;
            const x = Math.cos(angle) * ring.radius;
            const y = Math.sin(angle) * ring.radius;
            
            return (
              <div
                key={skill.name}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <motion.div
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#1c0802] border border-[#ff8a1f]/30 text-xs md:text-sm text-white/90 whitespace-nowrap shadow-lg"
                  animate={{ rotate: -360 }}
                  transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                >
                  {skill.name}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

// Simple Skill Card
function SkillCard({ category, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#1c0802]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-[#ff3d00]/10 border border-[#ff8a1f]/20 text-[#ff8a1f]">
          <Icon d={CATEGORY_ICONS[category]} size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">{category}</h3>
          <p className="text-xs text-white/50">{items.length} skills</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/80">{s.name}</span>
              <span className="text-[#ff8a1f] font-mono text-xs">{s.level}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef(null);

  // Simple scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(p, 1)})`;
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allSkills = Object.values(skills).flat();
  const marqueeItems = allSkills.map((s) => s.name);
  const mailHref = 'https://mail.google.com/mail/?view=cm&fs=1&to=burirobasit691@gmail.com&su=Project%20Inquiry';

  return (
    <section className="relative min-h-screen bg-[#120400] text-white pb-20 overflow-hidden">
      
      {/* Progress Bar */}
      <div ref={barRef} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] origin-left z-50 scale-x-0" />
      
      <Background />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        
        {/* Header */}
        <header className="pt-32 pb-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Tools I Build With
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            A modern stack for building fast, accessible, and scalable web experiences.
          </p>
        </header>

        {/* Orbit */}
        <div className="py-10 md:py-20">
          <Orbit skills={skills} photo={HeroImg} />
        </div>

        {/* Skills Grid */}
        <div className="py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Where I'm Strongest</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([cat, list]) => (
              <SkillCard key={cat} category={cat} items={list} />
            ))}
          </div>
        </div>

        {/* Marquee (Simplified) */}
        <div className="py-10 overflow-hidden">
          <div className="flex gap-4 animate-[marquee_30s_linear_infinite]">
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} className="px-6 py-2 rounded-full bg-[#1c0802]/50 border border-white/10 text-sm text-white/70 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16">
          <div className="bg-[#1c0802]/60 border border-[#ff8a1f]/20 rounded-3xl p-8 md:p-14 text-center backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need these skills on your team?</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Open to internships, freelance work, and full-time roles in web development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={mailHref} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#ff3d00] hover:bg-[#ff8a1f] transition-colors font-semibold">
                Get in Touch
              </a>
              <a href="/resume.pdf" download="Abdul-Basit-CV.pdf" className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                Download CV
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Simple back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#1c0802] border border-[#ff8a1f]/30 hover:border-[#ff8a1f] transition-colors"
        >
          <Icon d="M12 19V5m0 0-6 6m6-6 6 6" size={20} />
        </button>
      )}
    </section>
  );
}