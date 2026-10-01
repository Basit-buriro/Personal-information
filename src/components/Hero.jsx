import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeroImg from '../assets/Hero.png';
import { personal, roles, stats, socials as cvSocials } from '../data/cv';

/* ════════════════════════════════════════════════════════════════════════
   HERO — ember palette, inline styles
   ════════════════════════════════════════════════════════════════════════ */

/* ─── ICONS ─── */
const Icon = ({ d, size = 18, color = 'currentColor', stroke = 1.7, fill = 'none' }) => (
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

const ICON_PATHS = {
  arrowRight: 'M4 12h16m0 0-6-6m6 6-6 6',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M4 20h16',
  github: 'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  whatsapp: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z',
  mail: 'M3 6h18v12H3z M3 6l9 7 9-7',
};

const ICON_MAP = {
  github: 'github',
  linkedin: 'linkedin',
  whatsapp: 'whatsapp',
  mail: 'mail',
};

/* ─── HOOKS ─── */
function useTypewriter(words, typeSpeed = 85, deleteSpeed = 40, pause = 1500) {
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
      t = setTimeout(() => {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useCountUp(target, duration = 1800, start = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return n;
}

/* ════════════════════════════════════════════════════════════
   BACKGROUND — ember aurora blobs
   ════════════════════════════════════════════════════════════ */
function EmberAurora() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-25%',
          width: '70rem',
          height: '70rem',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,61,0,0.22), transparent 60%)',
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
          background:
            'radial-gradient(circle, rgba(255,138,31,0.22), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -100, 0], y: [0, -60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          left: '33%',
          width: '50rem',
          height: '50rem',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,80,0,0.14), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -90, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HUD overlay — grid + scanline + glyphs (corners removed)
   ════════════════════════════════════════════════════════════ */
function HudOverlay() {
  return (
    <>
      {/* Perspective grid */}
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
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Scanline */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(to right, transparent, #ff8a1f, transparent)',
          boxShadow: '0 0 20px rgba(255,138,31,0.6)',
        }}
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating glyphs */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        {['01', '10', '11', 'AI', 'ML', '{}', '</>', '::', 'fn()', 'n=1'].map(
          (t, i) => (
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
              animate={{ y: [-20, 20, -20], opacity: [0.08, 0.4, 0.08] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t}
            </motion.span>
          )
        )}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   PORTRAIT — rings + 3D tilt + slice split on scroll
   ════════════════════════════════════════════════════════════ */
function PortraitOrb() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const rX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const rY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  const ref = useRef(null);
  const [split, setSplit] = useState(0);

  const onMove = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my]
  );
  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vis = Math.max(
        0,
        Math.min(1, 1 - (r.top + r.height * 0.3) / window.innerHeight)
      );
      setSplit(vis);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ORBIT_TAGS = ['React', 'Node', 'MongoDB', 'Next.js', 'AI', 'Express'];

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        perspective: 1000,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,138,31,0.3)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, transparent, #ff3d00, transparent, #ff8a1f, transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-24px',
          borderRadius: '50%',
          border: '1px dashed rgba(255,138,31,0.4)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-40px',
          borderRadius: '50%',
          border: '1px solid rgba(255,61,0,0.2)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 90, 180, 270].map((a) => (
          <div
            key={a}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255,61,0,0.7)',
              boxShadow: '0 0 10px #ff3d00',
              transform: `translate(-50%, -50%) rotate(${a}deg) translateY(-190px)`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,138,31,0.4)',
          rotateX: rX,
          rotateY: rY,
          boxShadow:
            '0 0 60px rgba(255,61,0,0.35), inset 0 0 40px rgba(255,138,31,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {[0, 1, 2].map((i) => {
          const sliceHeight = 100 / 3;
          const topPct = i * sliceHeight;
          const drift = (i - 1) * 22;
          const rotate = (i - 1) * 3;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                top: `${topPct}%`,
                height: `${sliceHeight}%`,
                overflow: 'hidden',
                transform: `translate3d(calc(${split} * ${drift}px), 0, 0) rotate(calc(${split} * ${rotate}deg))`,
                transition: 'transform 0.15s linear',
              }}
            >
              <img
                src={HeroImg}
                alt={i === 0 ? personal.name : ''}
                aria-hidden={i !== 0}
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: '300%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  top: `-${i * 100}%`,
                }}
              />
              {i < 2 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(255,138,31,0.35)',
                  }}
                />
              )}
            </div>
          );
        })}

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            mixBlendMode: 'overlay',
            backgroundImage:
              'linear-gradient(#ff8a1f 1px, transparent 1px), linear-gradient(90deg, #ff8a1f 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '3px',
            background:
              'linear-gradient(to right, transparent, rgba(255,138,31,0.8), transparent)',
            pointerEvents: 'none',
          }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {ORBIT_TAGS.map((label, i) => {
        const angle = (i / ORBIT_TAGS.length) * 360;
        const radius = 195;
        return (
          <motion.div
            key={label}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ rotate: angle }}
            animate={{ rotate: angle + 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            <div
              style={{
                transform: `translate(${Math.cos((angle * Math.PI) / 180) * radius}px, ${
                  Math.sin((angle * Math.PI) / 180) * radius
                }px)`,
              }}
            >
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(18,4,0,0.8)',
                  border: '1px solid rgba(255,138,31,0.3)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#ff8a1f',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  whiteSpace: 'nowrap',
                }}
              >
                <motion.span
                  animate={{ rotate: -angle - 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'inline-block' }}
                >
                  {label}
                </motion.span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STAT COUNTER
   ════════════════════════════════════════════════════════════ */
function StatCounter({ label, value, delay }) {
  const [start, setStart] = useState(false);
  const n = useCountUp(value, 1800, start);

  useEffect(() => {
    const t = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 700,
          lineHeight: 1,
          background:
            'linear-gradient(96deg, #ff3d00 0%, #ffd2a0 50%, #ff8a1f 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {n}+
      </span>
      <span
        style={{
          marginTop: '6px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN HERO
   ════════════════════════════════════════════════════════════ */
export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background:
          'radial-gradient(60% 50% at 70% 40%, rgba(255,61,0,0.12), transparent 70%), radial-gradient(50% 45% at 20% 80%, rgba(255,138,31,0.10), transparent 70%), linear-gradient(165deg, #2a0b02 0%, #120400 70%)',
      }}
    >
      <EmberAurora />
      <HudOverlay />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '128px 32px 60px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '64px',
          alignItems: 'center',
          minHeight: '100vh',
        }}
        className="hero-grid"
      >
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(16,185,129,0.4)',
              background: 'rgba(16,185,129,0.08)',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '8px',
                height: '8px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'hero-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'block',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#10b981',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Available for work
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: '#ff8a1f',
              marginBottom: '12px',
              letterSpacing: '0.02em',
            }}
          >
            &gt; Hello world, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: 0,
              marginBottom: '16px',
            }}
          >
            Abdul{' '}
            <span
              style={{
                background:
                  'linear-gradient(96deg, #ff3d00 0%, #ffd2a0 50%, #ff8a1f 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Basit
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              minHeight: '40px',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '18px',
                color: '#ff8a1f',
              }}
            >
              &gt;
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '18px',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {typed}
              <motion.span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '20px',
                  background: '#ff8a1f',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '520px',
              marginBottom: '32px',
            }}
          >
            Full Stack Developer building intelligent, scalable web systems
            with <span style={{ color: '#ff8a1f' }}>MERN-stack precision</span> and{' '}
            <span style={{ color: '#ff3d00' }}>AI-driven thinking</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05, y: -2 }}
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
              View Projects
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
                <Icon d={ICON_PATHS.arrowRight} size={16} />
              </span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Abdul-Basit-CV.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,138,31,0.4)',
                color: '#ff8a1f',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <Icon d={ICON_PATHS.download} size={16} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            {cvSocials.map(({ name, url, icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,138,31,0.6)';
                  e.currentTarget.style.color = '#ff8a1f';
                  e.currentTarget.style.background = 'rgba(255,138,31,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                <Icon d={ICON_PATHS[ICON_MAP[icon] || 'mail']} size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PortraitOrb />
        </motion.div>
      </div>

      {/* Bottom stats */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 32px 60px',
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(255,138,31,0.4), transparent)',
            marginBottom: '40px',
            transformOrigin: 'center',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="hero-stats"
        >
          {stats.map((s, i) => (
            <StatCounter key={s.label} {...s} delay={1000 + i * 150} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 24px 40px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}