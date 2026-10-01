import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { skills } from '../data/cv';
import Hero2 from '../assets/Hero2.png';

/* ════════════════════════════════════════════════════════════════════════
   SKILLS — ember palette · particle-shatter photo · 3D orbit · responsive
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

const ICON_PATHS = {
  code: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  server: ['M3 4h18v7H3z', 'M3 13h18v7H3z', 'M7 7.5h.01', 'M7 16.5h.01'],
  wrench: 'M14.7 6.3a4 4 0 1 0 5 5L21 21l-3-3-2 2-9.6-9.6a4 4 0 0 1-5-5L5 3l3 3 2-2z',
  sparkles: 'M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.4 2.4m6.6 6.6 2.4 2.4m0-11.4-2.4 2.4m-6.6 6.6-2.4 2.4',
  arrowRight: 'M4 12h16m0 0-6-6m6 6-6 6',
  arrowUp: 'M12 19V5m0 0-6 6m6-6 6 6',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M4 20h16',
  mail: ['M3 6h18v12H3z', 'M3 6l9 7 9-7'],
};

const CATEGORY_ICONS = {
  Frontend: 'code',
  Backend: 'server',
  Tools: 'wrench',
  'AI / Learning': 'sparkles',
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
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

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
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/* ════════════════════════════════════════════════════════════
   BACKGROUND — ember aurora
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
      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          left: '33%',
          width: '50rem',
          height: '50rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,80,0,0.14), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -90, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HUD grid
   ════════════════════════════════════════════════════════════ */
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
          style={{
            position: 'absolute',
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
   Rising embers
   ════════════════════════════════════════════════════════════ */
function Embers({ count = 22 }) {
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
   PARTICLE PHOTO
   ════════════════════════════════════════════════════════════ */
function ParticlePhoto({ src, size = 220 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [shatter, setShatter] = useState(0);

  const GRID = 9;
  const particles = useMemo(
    () =>
      Array.from({ length: GRID * GRID }, (_, i) => {
        const row = Math.floor(i / GRID);
        const col = i % GRID;
        const cx = (col + 0.5) / GRID;
        const cy = (row + 0.5) / GRID;
        const dx = (cx - 0.5) * 2;
        const dy = (cy - 0.5) * 2;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 40 + distance * 100;
        return {
          i,
          left: `${cx * 100}%`,
          top: `${cy * 100}%`,
          size: `${100 / GRID}%`,
          tx: Math.cos(angle) * speed,
          ty: Math.sin(angle) * speed,
          rot: (seeded(i) - 0.5) * 90,
          delay: seeded(i + 300) * 0.12,
        };
      }),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const centerY = r.top + r.height / 2;
      const p = clamp((window.innerHeight * 0.65 - centerY) / 400, 0, 1);
      setShatter(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (reduced) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,138,31,0.5)',
          boxShadow: '0 0 60px rgba(255,61,0,0.4)',
          margin: '0 auto',
        }}
      >
        <img
          src={src}
          alt="Abdul Basit"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: size,
        height: size,
        margin: '0 auto',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -6 - i * 4,
            borderRadius: '50%',
            border: '1px solid rgba(255,138,31,0.3)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -10,
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

      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -22,
          borderRadius: '50%',
          border: '1px dashed rgba(255,138,31,0.4)',
          pointerEvents: 'none',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,138,31,0.45)',
          boxShadow: `0 0 ${40 + shatter * 40}px rgba(255,61,0,${
            0.35 + shatter * 0.25
          }), inset 0 0 40px rgba(255,138,31,0.2)`,
          transition: 'box-shadow 0.15s linear',
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.i}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              overflow: 'hidden',
              willChange: 'transform',
            }}
            animate={{
              x: shatter * p.tx,
              y: shatter * p.ty,
              rotate: shatter * p.rot,
              opacity: 1 - shatter * 0.55,
              scale: 1 - shatter * 0.15,
            }}
            transition={{
              duration: 0.15,
              delay: shatter > 0 && shatter < 1 ? p.delay : 0,
              ease: 'linear',
            }}
          >
            <div
              style={{
                width: size,
                height: size,
                backgroundImage: `url(${src})`,
                backgroundSize: `${size}px ${size}px`,
                backgroundPosition: `-${(parseFloat(p.left) / 100) * size}px -${
                  (parseFloat(p.top) / 100) * size
                }px`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </motion.div>
        ))}

        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(to right, transparent, rgba(255,138,31,0.7), transparent)',
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
   ORBIT SHOWCASE
   ════════════════════════════════════════════════════════════ */
function OrbitShowcase({ skills, photo }) {
  const reduced = useReducedMotion();
  const isMobile = useMedia('(max-width: 768px)');

  const flat = Object.values(skills).flat();
  const RING_1 = flat.slice(0, 5);
  const RING_2 = flat.slice(5, 11);
  const RING_3 = flat.slice(11);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const onMove = useCallback(
    (e) => {
      if (isMobile) return;
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my, isMobile]
  );
  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const [paused, setPaused] = useState(false);

  const scale = isMobile ? 0.62 : 1;
  const photoSize = isMobile ? 140 : 220;
  const base = isMobile ? 260 : 640;

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: `${base}px`,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        >
          <ParticlePhoto src={photo} size={photoSize} />
        </div>

        {[
          { items: RING_1, radius: 165 * scale, duration: 24, dash: 'rgba(255,138,31,0.4)' },
          { items: RING_2, radius: 225 * scale, duration: 32, dash: 'rgba(255,61,0,0.32)' },
          { items: RING_3, radius: 285 * scale, duration: 40, dash: 'rgba(255,138,31,0.25)' },
        ].map((ring, ri) => (
          <motion.div
            key={ri}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginLeft: -ring.radius,
              marginTop: -ring.radius,
              borderRadius: '50%',
              border: `1px dashed ${ring.dash}`,
            }}
            animate={reduced || paused ? {} : { rotate: 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          >
            {ring.items.map((skill, i) => {
              const angle = (i / ring.items.length) * Math.PI * 2;
              const x = Math.cos(angle) * ring.radius;
              const y = Math.sin(angle) * ring.radius;
              return (
                <div
                  key={skill.name}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  <motion.div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => setPaused(false)}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      padding: isMobile ? '5px 11px' : '7px 14px',
                      borderRadius: '999px',
                      background: 'rgba(56,20,6,0.85)',
                      border: '1px solid rgba(255,138,31,0.5)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? '10.5px' : '12px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.95)',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                      cursor: 'pointer',
                    }}
                  >
                    <motion.span
                      animate={reduced || paused ? {} : { rotate: -360 }}
                      transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   CATEGORY CARD
   ════════════════════════════════════════════════════════════ */
function CategoryCard({ category, items, delay = 0 }) {
  const ref = useRef(null);
  const iconKey = CATEGORY_ICONS[category] || 'sparkles';
  const [spotlight, setSpotlight] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--cx', `${e.clientX - r.left}px`);
        el.style.setProperty('--cy', `${e.clientY - r.top}px`);
      }}
      onMouseEnter={() => setSpotlight(true)}
      onMouseLeave={() => setSpotlight(false)}
      whileHover={{ y: -4 }}
      style={{
        position: 'relative',
        padding: '22px',
        borderRadius: '18px',
        background: 'rgba(56,20,6,0.42)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(280px circle at var(--cx, 50%) var(--cy, 50%), rgba(255,138,31,0.16), transparent 70%)',
          opacity: spotlight ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,138,31,0.6), transparent)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            border: '1px solid rgba(255,138,31,0.35)',
            background: 'linear-gradient(135deg, rgba(255,61,0,0.2), rgba(255,138,31,0.08))',
            color: '#ff8a1f',
          }}
        >
          <Icon d={ICON_PATHS[iconKey]} size={18} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            {category}
          </h3>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.1em',
            }}
          >
            {items.length} {items.length === 1 ? 'skill' : 'skills'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '14px', position: 'relative' }}>
        {items.map((s, i) => (
          <div key={s.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: 'rgba(255,255,255,0.85)' }}>
                {s.name}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#ff8a1f' }}>
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
                transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════
   MARQUEE
   ════════════════════════════════════════════════════════════ */
function Marquee({ items, reverse = false, speed = 30 }) {
  const loop = [...items, ...items];
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <motion.div
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            style={{
              marginRight: '12px',
              padding: '9px 20px',
              borderRadius: '999px',
              background: 'rgba(56,20,6,0.42)',
              border: '1px solid rgba(255,138,31,0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.85)',
              whiteSpace: 'nowrap',
            }}
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
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
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
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
      <Icon d={ICON_PATHS.arrowUp} size={16} />
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION HEADING
   ════════════════════════════════════════════════════════════ */
function SectionHeading({ title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      style={{
        marginBottom: '40px',
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '36px',
          height: '2px',
          background: 'linear-gradient(90deg, #ff3d00, #ff8a1f)',
          transformOrigin: 'left',
          marginBottom: '14px',
          borderRadius: '999px',
        }}
      />
      <h2
        style={{
          margin: 0,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          letterSpacing: '-0.025em',
          color: '#fff',
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: '12px',
            marginBottom: 0,
            maxWidth: '52ch',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════ */
export default function Skills() {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useScrollProgress({ barRef, ringRef, onTopVisible: setShowTop });

  const allSkills = Object.values(skills).flat();
  const marqueeTop = allSkills.slice(0, Math.ceil(allSkills.length / 2)).map((s) => s.name);
  const marqueeBottom = allSkills.slice(Math.ceil(allSkills.length / 2)).map((s) => s.name);

  const LEARNING = ['TypeScript', 'Next.js App Router', 'AI Agents', 'System Design'];

  const MAIL_HREF =
    'https://mail.google.com/mail/?view=cm&fs=1&to=burirobasit691@gmail.com&su=Project%20Inquiry%20from%20Portfolio&body=Hi%20Abdul%20Basit%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%0A%0AThanks!';

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
      <Embers count={18} />
      <BackToTop visible={showTop} ringRef={ringRef} />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 20px',
        }}
        className="skills-wrap"
      >
        {/* ═════ COMPACT HEADER ═════ */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '110px',
            paddingBottom: '20px',
            maxWidth: '640px',
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
            {['Tools', 'I', 'Build', 'With'].map((w, i) => (
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
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
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
              maxWidth: '480px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            A modern stack for building fast, accessible, and scalable web experiences.
          </motion.p>
        </header>

        {/* ═════ ORBIT ═════ */}
        <section
          style={{
            position: 'relative',
            paddingTop: '20px',
            paddingBottom: '80px',
          }}
        >
          <OrbitShowcase skills={skills} photo={Hero2} />
        </section>

        {/* ═════ CATEGORIES ═════ */}
        <section style={{ paddingTop: '40px', paddingBottom: '60px' }}>
          <SectionHeading
            title="Where I'm strongest"
            subtitle="Hands-on experience across frontend, backend, tooling, and AI experiments."
          />

          <div
            className="skills-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
            }}
          >
            {Object.entries(skills).map(([cat, list], i) => (
              <CategoryCard key={cat} category={cat} items={list} delay={i * 0.08} />
            ))}
          </div>
        </section>

        {/* ═════ MARQUEE ═════ */}
        <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gap: '12px' }}>
            <Marquee items={marqueeTop} speed={35} />
            <Marquee items={marqueeBottom} speed={40} reverse />
          </div>
        </section>

        {/* ═════ LEARNING ═════ */}
        <section style={{ paddingTop: '40px', paddingBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative',
              padding: '32px',
              borderRadius: '20px',
              background: 'rgba(56,20,6,0.42)',
              border: '1px solid rgba(255,138,31,0.3)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-100%',
                animation: 'skills-spin 12s linear infinite',
                opacity: 0.15,
                background:
                  'conic-gradient(from 0deg, transparent, #ff3d00, transparent, #ff8a1f, transparent)',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2
                style={{
                  margin: 0,
                  marginBottom: '20px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                  letterSpacing: '-0.02em',
                  color: '#fff',
                }}
              >
                Currently leveling up in
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {LEARNING.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      background: 'rgba(255,138,31,0.08)',
                      border: '1px solid rgba(255,138,31,0.4)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13.5px',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    <span style={{ position: 'relative', display: 'inline-block', width: '8px', height: '8px' }}>
                      <span
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: '#ff8a1f',
                          animation: 'skills-pulse 2s ease-in-out infinite',
                        }}
                      />
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═════ CTA ═════ */}
        <section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative',
              padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)',
              borderRadius: '24px',
              background: 'linear-gradient(165deg, rgba(56,20,6,0.7) 0%, rgba(18,4,0,0.9) 100%)',
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
                background: 'radial-gradient(circle, rgba(255,61,0,0.35), transparent 70%)',
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
                background: 'radial-gradient(circle, rgba(255,138,31,0.28), transparent 70%)',
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
                Need these skills on your team?
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
                Open to internships, freelance work, and full-time roles in web development.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '14px',
                }}
              >
                <motion.a
                  href={MAIL_HREF}
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
                  Get in Touch
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
                  }}
                >
                  <Icon d={ICON_PATHS.download} size={16} />
                  Download CV
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        @keyframes skills-spin { to { transform: rotate(360deg); } }
        @keyframes skills-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }

        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .skills-wrap { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
}