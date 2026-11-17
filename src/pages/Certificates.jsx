import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/projects';
import seeBelow from '../assets/seebelow.png'; 

/* ════════════════════════════════════════════════════════════════════════
   CERTIFICATES — Attractive Cyber-Credential Showcase.
   ════════════════════════════════════════════════════════════════════════ */

const Icon = ({ d, size = 18, color = 'currentColor', stroke = 1.8, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
  award: ['M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M8.5 14l-1.5 8 5-3 5 3-1.5-8'],
  arrowUp: 'M12 19V5m0 0-6 6m6-6 6 6',
  close: 'M18 6L6 18M6 6l12 12',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M4 20h16'
};

export default function Certificates() {
  const [showTop, setShowTop] = useState(false);
  const [activeCert, setActiveCert] = useState(certificates[0]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [lightbox]);

  return (
    <section className="relative min-h-screen bg-[#120400] text-white overflow-hidden pb-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[#ff3d00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-[#ff8a1f]/10 rounded-full blur-[120px]" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-32">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff8a1f]/10 border border-[#ff8a1f]/20 text-[#ff8a1f] text-xs font-mono tracking-widest uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff8a1f] animate-pulse" />
              Verified Achievements
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f]">Credentials</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-white/60 text-lg max-w-xl mx-auto md:mx-0"
            >
              A showcase of my certified skills in Artificial Intelligence, Full-Stack Engineering, and modern web development.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.6, type: "spring" }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 p-2 relative"
          >
            <div className="absolute inset-0 rounded-full border border-[#ff8a1f]/30 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#ff3d00]/30 animate-[spin_15s_linear_infinite_reverse]" />
            <img src={seeBelow} alt="Certificates" className="w-full h-full object-cover rounded-full relative z-10" />
          </motion.div>
        </header>

        {/* Interactive Showcase Area */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          
          {/* LEFT: Interactive List */}
          <div className="flex flex-col gap-4">
            {certificates.map((cert, i) => {
              const isActive = activeCert.id === cert.id;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => setActiveCert(cert)}
                  onClick={() => setLightbox(cert)}
                  className={`group relative p-6 md:p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 border ${
                    isActive 
                      ? 'bg-[#1c0802]/80 border-[#ff8a1f]/50 shadow-[0_0_30px_rgba(255,138,31,0.15)] translate-x-2' 
                      : 'bg-[#1c0802]/30 border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Sweeping Light Beam */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                  
                  {/* Left Accent Bar */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: `linear-gradient(to bottom, transparent, ${cert.accent}, transparent)` }}
                  />

                  <div className="flex items-start gap-5 relative z-10">
                    <div 
                      className={`grid place-items-center w-14 h-14 rounded-xl shrink-0 transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 grayscale group-hover:grayscale-0'}`}
                      style={{ backgroundColor: `${cert.accent}15`, border: `1px solid ${cert.accent}40`, color: cert.accent }}
                    >
                      <Icon d={ICONS.award} size={28} />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80'}`}>
                          {cert.title}
                        </h3>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                          {cert.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-3" style={{ color: cert.accent }}>
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed max-w-xl">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Image Preview (Desktop) */}
          <div className="hidden lg:block sticky top-32 perspective-1000">
            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0300]"
            >
              <img 
                src={activeCert.image} 
                alt={activeCert.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <Icon d={ICONS.external} size={16} />
                  </div>
                  <span className="font-semibold tracking-wide text-white/90">Click to view full size</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX POPUP */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90"
            onClick={() => setLightbox(null)}
          >
            <button 
              className="absolute top-6 right-6 p-4 rounded-full bg-white/10 hover:bg-[#ff8a1f] hover:text-black transition-all z-10"
              onClick={() => setLightbox(null)}
            >
              <Icon d={ICONS.close} size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#1c0802] flex flex-col"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={lightbox.image} 
                alt={lightbox.title} 
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <div className="p-4 bg-[#1c0802] border-t border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{lightbox.title}</h3>
                  <p className="text-sm text-[#ff8a1f]">{lightbox.issuer}</p>
                </div>
                <a 
                  href={lightbox.image} 
                  download={`${lightbox.title.replace(/\s+/g, '-')}.png`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                  <Icon d={ICONS.download} size={16} />
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full bg-[#1c0802]/80 border border-white/20 backdrop-blur-md transition-all duration-300 hover:bg-[#ff8a1f] hover:text-black shadow-[0_0_20px_rgba(255,138,31,0.3)] ${
          showTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <Icon d={ICONS.arrowUp} size={24} />
      </button>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}