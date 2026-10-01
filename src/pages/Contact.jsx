import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../data/cv';

/* ════════════════════════════════════════════════════════════════════════
   CONTACT — Glacier-style cinematic layout + rich animated background
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
  mail: ['M3 6h18v12H3z', 'M3 6l9 7 9-7'],
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pin: ['M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z', 'M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  github:
    'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  whatsapp: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z',
  arrowRight: 'M4 12h16m0 0-6-6m6 6-6 6',
  copy: ['M9 9h11v11H9z', 'M5 15V4a1 1 0 0 1 1-1h11'],
  check: 'm5 12 5 5 9-10',
};

const seeded = (i) => {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ════════════════════════════════════════════════════════════
   LAYER 1 — FLYING BIRDS (high quality + depth)
   ════════════════════════════════════════════════════════════ */
function FlyingBirds({ count = 26 }) {
  const birds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Depth layer: 0 = far, 1 = mid, 2 = near
        const depth = i % 3;
        const depthScale = depth === 0 ? 0.45 : depth === 1 ? 0.85 : 1.4;
        const depthOpacity = depth === 0 ? 0.18 : depth === 1 ? 0.32 : 0.5;
        const depthBlur = depth === 0 ? 0.6 : depth === 1 ? 0.2 : 0;

        const scale = (0.7 + seeded(i + 1) * 0.5) * depthScale;
        const duration = 18 + seeded(i + 40) * 20 - depth * 2; // far birds slower
        const delay = -seeded(i + 80) * duration;
        const fromLeft = seeded(i + 120) > 0.5;

        // Distribution: more variety in height
        const top = 4 + seeded(i + 200) * 72;

        // Flap speed varies per bird
        const flapDuration = 0.65 + seeded(i + 300) * 0.6;

        // Bob amplitude in vertical direction
        const bobAmp = 8 + seeded(i + 500) * 14;

        // Bank angle when moving
        const bankAngle = fromLeft ? 3 : -3;

        return {
          i,
          depth,
          scale,
          duration,
          delay,
          fromLeft,
          top,
          flapDuration,
          opacity: depthOpacity,
          blur: depthBlur,
          bobAmp,
          bankAngle,
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {birds.map((b) => (
        <motion.div
          key={b.i}
          initial={{ x: b.fromLeft ? '-14vw' : '114vw' }}
          animate={{
            x: b.fromLeft ? '114vw' : '-14vw',
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: `${b.top}%`,
            willChange: 'transform',
          }}
        >
          {/* Inner wrapper for vertical bobbing + banking */}
          <motion.div
            animate={{
              y: [-b.bobAmp, b.bobAmp, -b.bobAmp],
              rotate: [0, b.bankAngle, 0, -b.bankAngle, 0],
            }}
            transition={{
              y: {
                duration: 4 + seeded(b.i + 600) * 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 3 + seeded(b.i + 700) * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            style={{ display: 'block' }}
          >
            <svg
              width={44 * b.scale}
              height={16 * b.scale}
              viewBox="0 0 44 16"
              fill="none"
              style={{
                transform: b.fromLeft ? 'none' : 'scaleX(-1)',
                filter: `drop-shadow(0 0 8px rgba(255,138,31,0.45)) blur(${b.blur}px)`,
                opacity: b.opacity,
              }}
            >
              {/* Body — subtle curved silhouette */}
              <ellipse
                cx="22"
                cy="8"
                rx="1.4"
                ry="0.9"
                fill="#ff8a1f"
                opacity="0.85"
              />
              {/* Left wing — animated flap */}
              <motion.path
                d="M22 8 Q14 3 5 7"
                stroke="#ff8a1f"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: [
                    'M22 8 Q14 3 5 7',
                    'M22 8 Q14 12 5 9',
                    'M22 8 Q14 3 5 7',
                  ],
                }}
                transition={{
                  duration: b.flapDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Right wing — animated flap */}
              <motion.path
                d="M22 8 Q30 3 39 7"
                stroke="#ff8a1f"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: [
                    'M22 8 Q30 3 39 7',
                    'M22 8 Q30 12 39 9',
                    'M22 8 Q30 3 39 7',
                  ],
                }}
                transition={{
                  duration: b.flapDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LAYER 2 — EMBER AURORA (moving blobs)
   ════════════════════════════════════════════════════════════ */
function EmberAurora() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-25%',
          width: '70rem',
          height: '70rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,0,0.25), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 140, 0], y: [0, 80, 0] }}
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
          background: 'radial-gradient(circle, rgba(255,138,31,0.25), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -120, 0], y: [0, -80, 0] }}
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
        animate={{ x: [0, 80, 0], y: [0, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LAYER 3 — PERSPECTIVE GRID + SCANLINE + CORNER BRACKETS
   ════════════════════════════════════════════════════════════ */
function HudOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.05,
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
          zIndex: 2,
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ff8a1f, transparent)',
          boxShadow: '0 0 20px rgba(255,138,31,0.6)',
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
            position: 'absolute',
            zIndex: 2,
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
   LAYER 4 — RISING EMBERS
   ════════════════════════════════════════════════════════════ */
function Embers({ count = 30 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + seeded(i + 1) * 3.5;
        const duration = 10 + seeded(i + 40) * 12;
        const left = seeded(i + 7) * 100;
        const drift = (seeded(i + 120) - 0.5) * 160;
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
              boxShadow: '0 0 12px 2px rgba(255,138,31,0.6)',
              left: `${left.toFixed(1)}%`,
            }}
            animate={{
              y: ['0vh', '-105vh'],
              x: [0, drift, 0],
              opacity: [0, 0.9, 0],
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
   LAYER 5 — FLOATING CODE GLYPHS
   ════════════════════════════════════════════════════════════ */
function FloatingGlyphs() {
  const glyphs = ['01', '10', '=>', '{}', '</>', '::', 'fn()', 'AI', 'ML', 'n=1', '()', '[]'];
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
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
            color: 'rgba(255,138,31,0.22)',
            fontSize: '14px',
            userSelect: 'none',
            left: `${(i * 11 + 5) % 95}%`,
            top: `${(i * 19 + 8) % 90}%`,
          }}
          animate={{ y: [-24, 24, -24], opacity: [0.08, 0.4, 0.08] }}
          transition={{
            duration: 6 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COPY EMAIL BUTTON
   ════════════════════════════════════════════════════════════ */
function CopyEmail({ email }) {
  const [state, setState] = useState('idle');
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let next = 'ok';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = 'fail';
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1800);
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-live="polite"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '9px 16px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        color: 'rgba(255,255,255,0.82)',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      <Icon
        d={state === 'ok' ? ICONS.check : ICONS.copy}
        size={14}
        color={state === 'ok' ? '#ff8a1f' : 'rgba(255,255,255,0.82)'}
      />
      {state === 'ok' ? 'Copied' : state === 'fail' ? 'Copy failed' : 'Copy email'}
    </motion.button>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTACT FORM
   ════════════════════════════════════════════════════════════ */
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent(`Message from ${values.name} — Portfolio`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );
    const href = `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}&su=${subject}&body=${body}`;

    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  const inputBase = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14.5px',
    outline: 'none',
    transition: 'all 0.25s',
    resize: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        display: 'grid',
        gap: '18px',
        padding: 'clamp(24px, 4vw, 36px)',
        borderRadius: '24px',
        background: 'rgba(56,20,6,0.42)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.35)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="contact-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label htmlFor="name" style={labelStyle}>
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={onChange}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused('')}
            placeholder="Jane Doe"
            style={{
              ...inputBase,
              borderColor: focused === 'name' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)',
              boxShadow: focused === 'name' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none',
            }}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={onChange}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
            placeholder="jane@example.com"
            style={{
              ...inputBase,
              borderColor: focused === 'email' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)',
              boxShadow: focused === 'email' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none',
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={onChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused('')}
          placeholder="Tell me about your project..."
          style={{
            ...inputBase,
            borderColor: focused === 'message' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)',
            boxShadow: focused === 'message' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none',
          }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: status === 'sending' ? 1 : 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 28px',
          borderRadius: '999px',
          background: 'linear-gradient(96deg, #ff3d00 0%, #ff8a1f 100%)',
          border: 0,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.06em',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          boxShadow: '0 14px 40px rgba(255,61,0,0.38)',
          opacity: status === 'sending' ? 0.7 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        {status === 'sent' ? (
          <>
            <Icon d={ICONS.check} size={16} color="#fff" />
            Message Ready — Check Gmail
          </>
        ) : status === 'sending' ? (
          'Opening mail client…'
        ) : (
          <>
            Send Message
            <Icon d={ICONS.arrowRight} size={16} color="#fff" />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function Contact() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'radial-gradient(60% 50% at 18% 12%, rgba(255,61,0,0.14), transparent 70%), radial-gradient(50% 45% at 90% 80%, rgba(255,138,31,0.12), transparent 70%), linear-gradient(165deg, #2a0b02 0%, #120400 70%)',
        color: '#fff',
        overflow: 'hidden',
        paddingBottom: '80px',
      }}
    >
      {/* 5 background layers */}
      <EmberAurora />
      <HudOverlay />
      <Embers count={30} />
      <FloatingGlyphs />
      <FlyingBirds count={26} />

      {/* ═════ HERO HEADER ═════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '62vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '110px 24px 20px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '26px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 L20 9 L12 22 L4 9 Z" stroke="#ff8a1f" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M4 9 H20 M12 2 V22 M8 9 L12 22 L16 9" stroke="#ff8a1f" strokeWidth="0.8" opacity="0.55" />
            </svg>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                paddingLeft: '0.32em',
              }}
            >
              Abdul Basit
            </span>
          </div>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(255,138,31,0.75)',
              fontFamily: "'Inter', sans-serif",
              paddingLeft: '0.42em',
            }}
          >
            Get in touch
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.24, ease: 'easeOut' }}
          style={{
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ display: 'block', fontWeight: 400, fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', lineHeight: 1, letterSpacing: '0.03em' }}>
            Let&apos;s Build
          </span>
          <span
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5.8vw, 4.2rem)',
              lineHeight: 1.02,
              letterSpacing: '0.02em',
              background: 'linear-gradient(96deg, #ff3d00 0%, #ffd2a0 50%, #ff8a1f 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Something Real
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{
            margin: '26px 0 0',
            maxWidth: '520px',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.82)',
            textShadow: '0 1px 20px rgba(0,0,0,0.45)',
          }}
        >
          Have a project in mind, or just want to say hi? My inbox is always
          open — let&apos;s talk.
        </motion.p>
      </div>

      {/* ═════ CONTACT GRID ═════ */}
      <div
        className="contact-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        <ContactForm />

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'grid', gap: '18px' }}
        >
          <div
            style={{
              padding: '28px',
              borderRadius: '24px',
              background: 'rgba(56,20,6,0.42)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '20px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                letterSpacing: '-0.01em',
                color: '#fff',
              }}
            >
              Contact Details
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px' }}>
              {[
                { icon: ICONS.mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: ICONS.phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
                { icon: ICONS.pin, label: 'Location', value: personal.location },
              ].map((row, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: 'rgba(255,138,31,0.1)',
                      border: '1px solid rgba(255,138,31,0.3)',
                      color: '#ff8a1f',
                      flexShrink: 0,
                    }}
                  >
                    <Icon d={row.icon} size={16} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '10px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        style={{
                          display: 'block',
                          marginTop: '2px',
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.85)',
                          fontFamily: "'Inter', sans-serif",
                          textDecoration: 'none',
                          wordBreak: 'break-word',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8a1f')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          display: 'block',
                          marginTop: '2px',
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.85)',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CopyEmail email={personal.email} />
            </div>
          </div>

          <div
            style={{
              padding: '28px',
              borderRadius: '24px',
              background: 'rgba(56,20,6,0.42)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '18px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                letterSpacing: '-0.01em',
                color: '#fff',
              }}
            >
              Find me online
            </h3>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: personal.github, icon: ICONS.github },
                { label: 'LinkedIn', href: personal.linkedin, icon: ICONS.linkedin },
                { label: 'WhatsApp', href: personal.whatsappLink || 'https://wa.me/923147135787', icon: ICONS.whatsapp },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '13px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
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
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <Icon d={s.icon} size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '20px 24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255,61,0,0.14), rgba(255,138,31,0.08))',
              border: '1px solid rgba(255,138,31,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: '12px',
                height: '12px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'contact-ping 2s ease-out infinite',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#10b981',
                }}
              />
            </span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Available for new work
              </p>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '12.5px',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Replying within 24 hours
              </p>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* ═════ FOOTER BAR ═════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          margin: '80px auto 0',
          padding: '24px 24px 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            © {new Date().getFullYear()} Abdul Basit
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Made with React + Tailwind
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 15V9M10 19V5M15 16V8M20 13v-2" stroke="#ff8a1f" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>Available</span>
        </div>
      </motion.div>

      <style>{`
        @keyframes contact-ping {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 900px) {
          .contact-wrap { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg[aria-hidden="true"] * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}