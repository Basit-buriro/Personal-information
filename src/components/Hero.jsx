import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroImg from '../assets/Hero.png';
import { personal, roles, stats, socials as cvSocials } from '../data/cv';

/* ════════════════════════════════════════════════════════════════════════
   HERO — simple + smooth. Solid ember colors, one entrance sequence,
   one quiet ambient motion (the portrait ring).
   ════════════════════════════════════════════════════════════════════════ */

const C = {
  bg: '#120400',
  orange: '#ff8a1f',
  red: '#ff3d00',
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.62)',
  line: 'rgba(255,138,31,0.35)',
};

const EASE = [0.22, 1, 0.36, 1];

/* ─── ICONS ─── */
const Icon = ({ d, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  arrowRight: 'M4 12h16m0 0-6-6m6 6-6 6',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M4 20h16',
  github:
    'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  whatsapp: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z',
  mail: 'M3 6h18v12H3z M3 6l9 7 9-7',
};

/* ─── HOOKS ─── */
function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pause = 1500) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let t;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useCountUp(target, duration = 1400, delay = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);
  return n;
}

/* ─── PORTRAIT — photo, one slow ring, soft glow ─── */
function Portrait({ reduce }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        aspectRatio: '1 / 1',
        margin: '0 auto',
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-18px',
          borderRadius: '50%',
          border: `1px dashed ${C.line}`,
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${C.line}`,
          boxShadow: '0 0 80px rgba(255,61,0,0.25)',
        }}
      >
        <img
          src={HeroImg}
          alt={personal.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

/* ─── STAT ─── */
function Stat({ label, value, delay }) {
  const n = useCountUp(value, 1400, delay);
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 700,
          lineHeight: 1,
          color: C.orange,
        }}
      >
        {n}+
      </div>
      <div
        style={{
          marginTop: '8px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Hero() {
  const typed = useTypewriter(roles);
  const reduce = useReducedMotion();

  // One orchestrated entrance: children fade + rise in sequence.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '999px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    textDecoration: 'none',
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: C.bg,
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hero-grid"
        style={{
          maxWidth: '1200px',
          width: '100%', /* 👈 FIX: Ensures grid doesn't stretch beyond screen */
          margin: '0 auto',
          padding: '128px 32px 48px',
          display: 'grid',
          gap: '64px',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        {/* LEFT */}
        <div className="w-full min-w-0">
          <motion.p
            variants={item}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: C.orange,
              margin: '0 0 12px',
            }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: C.text,
              margin: '0 0 16px',
            }}
          >
            Abdul Basit
          </motion.h1>

          <motion.div
            variants={item}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '18px',
              color: C.orange,
              minHeight: '30px',
              marginBottom: '20px',
            }}
          >
            {typed}
            <motion.span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.1em',
                background: C.orange,
                marginLeft: '4px',
                verticalAlign: 'middle',
              }}
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            variants={item}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              lineHeight: 1.6,
              color: C.muted,
              maxWidth: '480px',
              margin: '0 0 32px',
            }}
          >
            Full stack developer building intelligent, scalable web systems with
            the MERN stack and an AI-first mindset.
          </motion.p>

          <motion.div
            variants={item}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '32px',
            }}
          >
            <motion.a
              href="/projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{
                ...btnBase,
                padding: '14px 24px',
                background: C.red,
                color: '#fff',
              }}
            >
              View projects
              <Icon d={ICONS.arrowRight} size={16} />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Abdul-Basit-CV.pdf"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{
                ...btnBase,
                padding: '13px 24px',
                border: `1px solid ${C.line}`,
                color: C.orange,
              }}
            >
              <Icon d={ICONS.download} size={16} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            variants={item}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            {cvSocials.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="hero-social"
              >
                <Icon d={ICONS[icon] || ICONS.mail} size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div variants={item} className="w-full min-w-0 flex justify-center">
          <Portrait reduce={reduce} />
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px 56px',
        }}
      >
        <div
          style={{
            height: '1px',
            background: C.line,
            opacity: 0.5,
            marginBottom: '36px',
          }}
        />
        <div
          className="hero-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} delay={700 + i * 120} />
          ))}
        </div>
      </div>

      <style>{`
        .hero-social {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color .25s ease, border-color .25s ease, transform .25s ease;
        }
        .hero-social:hover,
        .hero-social:focus-visible {
          color: ${C.orange};
          border-color: ${C.line};
          transform: translateY(-2px);
        }

        /* DEFAULT DESKTOP GRID */
        .hero-grid {
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
        }

        /* TABLET & MOBILE */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 24px 32px !important;
            gap: 48px !important;
            text-align: center;
          }
          
          /* Center left column content on mobile */
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid > div:first-child p {
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}