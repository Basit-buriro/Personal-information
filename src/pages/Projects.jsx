import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories } from '../data/projects';

/* ════════════════════════════════════════════════════════════════════════
   PROJECTS — ember palette · filterable grid · animated cards
   ════════════════════════════════════════════════════════════════════════ */

/* ─── ICONS ─── */
const Icon = ({ d, size = 18, color = 'currentColor', stroke = 1.6, fill = 'none' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  externalLink: [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14 21 3',
  ],
  github:
    'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  arrowUp: 'M12 19V5m0 0-6 6m6-6 6 6',
  external: [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14 21 3',
  ],
};

/* ─── HOOKS ─── */
function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}
const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');

function useScrollProgress({ barRef, ringRef, onTopVisible }) {
  useEffect(() => {
    let raf = 0;
    let shown = false;
    const RING_LEN = 113.1;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));

      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LEN * (1 - p));

      const visible = window.scrollY > 600;
      if (visible !== shown) {
        shown = visible;
        onTopVisible(visible);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [barRef, ringRef, onTopVisible]);
}

const seeded = (i) => {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ════════════════════════════════════════════════════════════
   BACKGROUND
   ════════════════════════════════════════════════════════════ */
function EmberAurora() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-25%',
          width: '70rem',
          height: '70rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,0,0.22), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-50%',
          right: '-25%',
          width: '70rem',
          height: '70rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,138,31,0.22), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -100, 0], y: [0, -60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function HudGrid() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            'linear-gradient(#ff8a1f 1px, transparent 1px), linear-gradient(90deg, #ff8a1f 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ff8a1f, transparent)',
          boxShadow: '0 0 20px rgba(255,138,31,0.6)',
        }}
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

function Embers({ count = 18 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + seeded(i + 1) * 3;
        const duration = 9 + seeded(i + 40) * 10;
        return (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              bottom: '-12px',
              width: `${size.toFixed(1)}px`,
              height: `${size.toFixed(1)}px`,
              borderRadius: '50%',
              background: '#ff8a1f',
              boxShadow: '0 0 10px 2px rgba(255,138,31,0.6)',
              left: `${(seeded(i + 7) * 100).toFixed(1)}%`,
            }}
            animate={{
              y: ['0vh', '-100vh'],
              x: [0, (seeded(i + 120) - 0.5) * 120],
              opacity: [0, 0.85, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: -seeded(i + 80) * duration,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROJECT CARD
   ════════════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={reduced ? {} : { y: -6 }}
      style={{
        position: 'relative',
        padding: 'clamp(20px, 3vw, 28px)',
        borderRadius: '20px',
        background: 'rgba(56,20,6,0.42)',
        border: `1px solid ${hovered ? project.accent + '80' : 'rgba(255,255,255,0.12)'}`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          : 'inset 0 1px 0 rgba(255,255,255,0.08)',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '360px',
      }}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(360px circle at ${spotlight.x}% ${spotlight.y}%, ${project.accent}22, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Category + Year */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          position: 'relative',
        }}
      >
        <span
          style={{
            padding: '5px 12px',
            borderRadius: '999px',
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}50`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: project.accent,
          }}
        >
          {project.category}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          marginBottom: '6px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          letterSpacing: '-0.02em',
          color: '#fff',
          position: 'relative',
        }}
      >
        {project.title}
      </h3>

      {/* Tagline */}
      <p
        style={{
          margin: 0,
          marginBottom: '16px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: project.accent,
          fontWeight: 500,
          position: 'relative',
        }}
      >
        {project.tagline}
      </p>

      {/* Description */}
      <p
        style={{
          margin: 0,
          marginBottom: '20px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13.5px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.6)',
          flex: 1,
          position: 'relative',
        }}
      >
        {project.description}
      </p>

      {/* Tech pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10.5px',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
        }}
      >
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '10px 18px',
            borderRadius: '999px',
            background: `linear-gradient(96deg, ${project.accent} 0%, #ff8a1f 100%)`,
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textDecoration: 'none',
            boxShadow: `0 8px 24px ${project.accent}40`,
          }}
        >
          <Icon d={ICONS.externalLink} size={14} color="#fff" />
          Live Demo
        </motion.a>

        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View code"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
            }}
          >
            <Icon d={ICONS.github} size={16} />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════
   BACK TO TOP
   ════════════════════════════════════════════════════════════ */
function BackToTop({ visible, ringRef }) {
  const reduced = useReducedMotion();
  const RING_LEN = 113.1;
  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 40,
        display: 'grid',
        placeItems: 'center',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'rgba(56,20,6,0.6)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.4s',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
        }}
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <circle
          ref={ringRef}
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#ff8a1f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_LEN}
          strokeDashoffset={RING_LEN}
        />
      </svg>
      <Icon d={ICONS.arrowUp} size={16} />
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function Projects() {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useScrollProgress({ barRef, ringRef, onTopVisible: setShowTop });

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'radial-gradient(60% 50% at 18% 12%, rgba(255,61,0,0.16), transparent 70%), radial-gradient(50% 45% at 90% 80%, rgba(255,138,31,0.10), transparent 70%), linear-gradient(165deg, #2a0b02 0%, #120400 70%)',
        color: '#fff',
        overflow: 'hidden',
        paddingBottom: '80px',
      }}
    >
      <div
        ref={barRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #ff3d00, #ff8a1f)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          zIndex: 60,
        }}
      />
      <EmberAurora />
      <HudGrid />
      <Embers />
      <BackToTop visible={showTop} ringRef={ringRef} />

      <div
        className="projects-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* ═════ HEADER ═════ */}
        <header
          style={{
            paddingTop: '110px',
            paddingBottom: '40px',
            maxWidth: '720px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#fff',
            }}
          >
            {['Things', "I've", 'Built'].map((w, i) => (
              <span
                key={w}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  marginRight: '0.28em',
                  verticalAlign: 'bottom',
                  paddingBottom: '0.12em',
                }}
              >
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '2px',
              width: '100%',
              maxWidth: '360px',
              marginTop: '18px',
              background: 'linear-gradient(90deg, #ff3d00, #ff8a1f, transparent)',
              transformOrigin: 'left',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              marginTop: '18px',
              marginBottom: 0,
              maxWidth: '520px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Real products, real users, real impact. A selection of platforms I've
            shipped across healthcare, commerce, and software consulting.
          </motion.p>
        </header>

        {/* ═════ FILTERS ═════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  background: isActive
                    ? 'linear-gradient(96deg, #ff3d00 0%, #ff8a1f 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: isActive
                    ? '1px solid transparent'
                    : '1px solid rgba(255,255,255,0.12)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: isActive ? '0 8px 24px rgba(255,61,0,0.35)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ═════ GRID ═════ */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '22px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ═════ CTA ═════ */}
        <section style={{ paddingTop: '80px', paddingBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative',
              padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)',
              borderRadius: '24px',
              background:
                'linear-gradient(165deg, rgba(56,20,6,0.7) 0%, rgba(18,4,0,0.9) 100%)',
              border: '1px solid rgba(255,138,31,0.3)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-80px',
                left: '-80px',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,61,0,0.35), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '-80px',
                right: '-80px',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,138,31,0.28), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div style={{ position: 'relative' }}>
              <h2
                style={{
                  margin: 0,
                  marginBottom: '16px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  letterSpacing: '-0.025em',
                  color: '#fff',
                }}
              >
                Have a project in mind?
              </h2>
              <p
                style={{
                  margin: '0 auto 28px',
                  maxWidth: '46ch',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.68)',
                }}
              >
                I'm open to internships, freelance work, and full-time roles.
                Let's build something together.
              </p>
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=2k24-it-3@usindh.edu.pk&su=Project%20Inquiry&body=Hi%20Abdul%20Basit%2C%0A%0AI%20saw%20your%20projects%20and%20would%20like%20to%20discuss%20a%20new%20project.%0A%0AThanks!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 8px 8px 24px',
                  borderRadius: '999px',
                  background: 'linear-gradient(96deg, #ff3d00 0%, #ff8a1f 100%)',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  textDecoration: 'none',
                  boxShadow: '0 14px 40px rgba(255,61,0,0.38)',
                }}
              >
                Start a Conversation
                <span
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '999px',
                    background: '#fff',
                    color: '#1a0600',
                  }}
                >
                  <Icon d={ICONS.external} size={16} color="#1a0600" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .projects-wrap { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
}