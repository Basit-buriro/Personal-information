import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiDownload, FiAward, FiBriefcase, FiBookOpen, FiCode,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Hero5 from '../assets/Hero5.png';
import {
  personal, education, experience, skills, certificates,
  languages, projects, summary, socials,
} from '../data/cv';

/* ════════════════════════════════════════════════════════════════════════
   CV — ember palette · photo hero · animated background
   ════════════════════════════════════════════════════════════════════════ */

const ICON_MAP = {
  github:   FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
  mail:     FiMail,
};

const seeded = (i) => {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ════════════════════════════════════════════════════════════
   BACKGROUND — ember aurora
   ════════════════════════════════════════════════════════════ */
function EmberAurora() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-25%',
          width: '70rem',
          height: '70rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,0,0.22), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
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
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '50rem',
          height: '50rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,80,0,0.14), transparent 60%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -80, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BACKGROUND — HUD grid + scanline + brackets
   ════════════════════════════════════════════════════════════ */
function HudOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: 0.05,
          backgroundImage:
            'linear-gradient(#ff8a1f 1px, transparent 1px), linear-gradient(90deg, #ff8a1f 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ff8a1f, transparent)',
          boxShadow: '0 0 20px rgba(255,138,31,0.6)',
          pointerEvents: 'none',
        }}
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {[
        { top: 24, left: 24, borderTop: '2px solid', borderLeft: '2px solid' },
        { top: 24, right: 24, borderTop: '2px solid', borderRight: '2px solid' },
        { bottom: 24, left: 24, borderBottom: '2px solid', borderLeft: '2px solid' },
        { bottom: 24, right: 24, borderBottom: '2px solid', borderRight: '2px solid' },
      ].map((s, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '40px',
            height: '40px',
            borderColor: 'rgba(255,138,31,0.5)',
            pointerEvents: 'none',
            ...s,
          }}
        />
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   BACKGROUND — rising embers
   ════════════════════════════════════════════════════════════ */
function Embers({ count = 24 }) {
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
        const duration = 10 + seeded(i + 40) * 12;
        const drift = (seeded(i + 120) - 0.5) * 120;
        return (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              bottom: '-16px',
              width: `${size.toFixed(1)}px`,
              height: `${size.toFixed(1)}px`,
              borderRadius: '50%',
              background: '#ff8a1f',
              boxShadow: '0 0 10px 2px rgba(255,138,31,0.6)',
              left: `${(seeded(i + 7) * 100).toFixed(1)}%`,
            }}
            animate={{
              y: ['0vh', '-105vh'],
              x: [0, drift, 0],
              opacity: [0, 0.85, 0],
              scale: [1, 0.4],
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
   BACKGROUND — floating code glyphs
   ════════════════════════════════════════════════════════════ */
function FloatingGlyphs() {
  const glyphs = ['01', '10', '=>', '{}', '</>', '::', 'fn()', 'AI', 'ML', 'n=1'];
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
      {glyphs.map((t, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(255,138,31,0.2)',
            fontSize: '14px',
            userSelect: 'none',
            left: `${(i * 11 + 5) % 95}%`,
            top: `${(i * 19 + 8) % 90}%`,
          }}
          animate={{ y: [-24, 24, -24], opacity: [0.08, 0.35, 0.08] }}
          transition={{ duration: 6 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PHOTO — circular frame with rings + scanline
   ════════════════════════════════════════════════════════════ */
function PhotoOrb({ size = 140 }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -6 - i * 4,
            borderRadius: '50%',
            border: '1px solid rgba(255,138,31,0.35)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeInOut' }}
        />
      ))}

      {/* Rotating conic ring */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, transparent, #ff3d00, transparent, #ff8a1f, transparent)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 62%, black 63%, black 68%, transparent 69%)',
          maskImage:
            'radial-gradient(circle, transparent 62%, black 63%, black 68%, transparent 69%)',
          pointerEvents: 'none',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Dashed counter ring */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -14,
          borderRadius: '50%',
          border: '1px dashed rgba(255,138,31,0.4)',
          pointerEvents: 'none',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,138,31,0.5)',
          boxShadow:
            '0 0 40px rgba(255,61,0,0.4), inset 0 0 30px rgba(255,138,31,0.15)',
        }}
      >
        <img
          src={Hero5}
          alt={personal.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
        {/* HUD grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            mixBlendMode: 'overlay',
            backgroundImage:
              'linear-gradient(#ff8a1f 1px, transparent 1px), linear-gradient(90deg, #ff8a1f 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            pointerEvents: 'none',
          }}
        />
        {/* Scanline */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(to right, transparent, rgba(255,138,31,0.8), transparent)',
            pointerEvents: 'none',
          }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ════════════════════════════════════════════════════════════ */
function Section({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      style={{ marginBottom: '56px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid rgba(255,138,31,0.35)',
            background: 'rgba(255,61,0,0.1)',
            color: '#ff8a1f',
          }}
        >
          <Icon size={18} />
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', 'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            flex: 1,
            height: '1px',
            background:
              'linear-gradient(to right, rgba(255,138,31,0.4), transparent)',
          }}
        />
      </div>
      {children}
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function CV() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
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
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'radial-gradient(60% 50% at 18% 12%, rgba(255,61,0,0.14), transparent 70%), radial-gradient(50% 45% at 90% 80%, rgba(255,138,31,0.12), transparent 70%), linear-gradient(165deg, #2a0b02 0%, #120400 70%)',
        color: '#fff',
        paddingTop: '110px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Top progress bar */}
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

      {/* Background layers */}
      <EmberAurora />
      <HudOverlay />
      <Embers count={24} />
      <FloatingGlyphs />

      {/* Content */}
      <div
        className="cv-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* ═════ HEADER ═════ */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '48px',
            padding: 'clamp(24px, 4vw, 40px)',
            borderRadius: '24px',
            background: 'rgba(56,20,6,0.42)',
            border: '1px solid rgba(255,138,31,0.3)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.35)',
          }}
        >
          {/* Top row: photo + name */}
          <div
            className="cv-header-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <PhotoOrb size={140} />

            <div style={{ flex: 1, minWidth: '200px' }}>
              <p
                style={{
                  margin: 0,
                  marginBottom: '6px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#ff8a1f',
                }}
              >
                Curriculum Vitae
              </p>
              <h1
                style={{
                  margin: 0,
                  marginBottom: '6px',
                  fontFamily: "'Plus Jakarta Sans', 'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  lineHeight: 1.1,
                }}
              >
                {personal.name}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  background:
                    'linear-gradient(96deg, #ff3d00 0%, #ffd2a0 50%, #ff8a1f 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {personal.title}
              </p>
            </div>
          </div>

          {/* Contact grid */}
          <div
            className="cv-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <a
              href={`mailto:${personal.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8a1f')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <FiMail style={{ color: '#ff8a1f', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', wordBreak: 'break-all' }}>
                {personal.email}
              </span>
            </a>
            <a
              href={`tel:${personal.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8a1f')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <FiPhone style={{ color: '#ff8a1f', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px' }}>
                {personal.phone}
              </span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.75)' }}>
              <FiMapPin style={{ color: '#ff8a1f', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px' }}>
                {personal.location}
              </span>
            </div>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8a1f')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <FiLinkedin style={{ color: '#ff8a1f', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px' }}>
                LinkedIn
              </span>
            </a>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '999px',
                background: 'linear-gradient(96deg, #ff3d00 0%, #ff8a1f 100%)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textDecoration: 'none',
                boxShadow: '0 12px 32px rgba(255,61,0,0.35)',
              }}
            >
              <FiDownload size={16} />
              Download PDF
            </motion.a>
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map(({ name, url, icon }) => {
                const Icon = ICON_MAP[icon] || FiMail;
                return (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,138,31,0.6)';
                      e.currentTarget.style.color = '#ff8a1f';
                      e.currentTarget.style.background = 'rgba(255,138,31,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.header>

        {/* ═════ SUMMARY ═════ */}
        <Section title="Summary" icon={FiBookOpen}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            {summary}
          </p>
        </Section>

        {/* ═════ EXPERIENCE ═════ */}
        <Section title="Experience" icon={FiBriefcase} delay={0.1}>
          <div style={{ display: 'grid', gap: '24px' }}>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  position: 'relative',
                  paddingLeft: '24px',
                  borderLeft: '2px solid rgba(255,138,31,0.35)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-7px',
                    top: '6px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ff8a1f',
                    boxShadow: '0 0 14px rgba(255,138,31,0.9)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '17px',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#fff',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#ff8a1f',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    marginBottom: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    color: '#ffd2a0',
                  }}
                >
                  {exp.company} · {exp.location}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '6px' }}>
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.65)',
                      }}
                    >
                      <span style={{ color: '#ff8a1f', flexShrink: 0 }}>▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ═════ EDUCATION ═════ */}
        <Section title="Education" icon={FiBookOpen} delay={0.15}>
          <div style={{ display: 'grid', gap: '24px' }}>
            {education.map((ed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  position: 'relative',
                  paddingLeft: '24px',
                  borderLeft: '2px solid rgba(255,61,0,0.35)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-7px',
                    top: '6px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ff3d00',
                    boxShadow: '0 0 14px rgba(255,61,0,0.9)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '17px',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#fff',
                    }}
                  >
                    {ed.degree}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#ff3d00',
                    }}
                  >
                    {ed.period}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    marginBottom: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    color: '#ffd2a0',
                  }}
                >
                  {ed.school} · {ed.location}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {ed.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ═════ SKILLS ═════ */}
        <Section title="Skills" icon={FiCode} delay={0.2}>
          <div
            className="cv-skills-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '18px',
            }}
          >
            {Object.entries(skills).map(([category, list]) => (
              <div
                key={category}
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background: 'rgba(56,20,6,0.42)',
                  border: '1px solid rgba(255,138,31,0.2)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: '16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#ff8a1f',
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {list.map((s) => (
                    <div key={s.name}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13.5px',
                            color: 'rgba(255,255,255,0.85)',
                          }}
                        >
                          {s.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            color: '#ff8a1f',
                          }}
                        >
                          {s.level}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: '4px',
                          background: 'rgba(255,138,31,0.1)',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #ff3d00, #ff8a1f)',
                            borderRadius: '999px',
                            boxShadow: '0 0 12px rgba(255,138,31,0.5)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═════ PROJECTS ═════ */}
        <Section title="Projects" icon={FiCode} delay={0.25}>
          <div
            className="cv-projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'rgba(56,20,6,0.42)',
                  border: '1px solid rgba(255,138,31,0.2)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  transition: 'border-color 0.3s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#fff',
                    }}
                  >
                    {p.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: '#ff8a1f',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.period}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    marginBottom: '14px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,138,31,0.08)',
                        border: '1px solid rgba(255,138,31,0.3)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10.5px',
                        color: '#ff8a1f',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ═════ CERTIFICATES ═════ */}
        <Section title="Certificates" icon={FiAward} delay={0.3}>
          <div
            className="cv-certs-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px',
            }}
          >
            {certificates.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  background: 'rgba(56,20,6,0.42)',
                  border: '1px solid rgba(255,61,0,0.25)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <FiAward
                  style={{
                    color: '#ff3d00',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                  size={20}
                />
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fff',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {c.title}
                  </h4>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12.5px',
                      color: 'rgba(255,255,255,0.65)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {c.issuer}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10.5px',
                      color: '#ff8a1f',
                    }}
                  >
                    {c.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ═════ LANGUAGES ═════ */}
        <Section title="Languages" icon={FiBookOpen} delay={0.35}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map((l) => (
              <motion.div
                key={l.name}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  background: 'rgba(255,61,0,0.08)',
                  border: '1px solid rgba(255,61,0,0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {l.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#ff8a1f',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {l.level}
                </span>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 700px) {
          .cv-header-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .cv-header-row > div {
            text-align: center;
            align-items: center;
          }
          .cv-contact-grid {
            grid-template-columns: 1fr !important;
          }
          .cv-wrap {
            padding: 0 16px !important;
          }
        }
      `}</style>
    </section>
  );
}