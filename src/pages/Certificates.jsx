import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { certificates } from '../data/projects';

/* ════════════════════════════════════════════════════════════════════════
   CERTIFICATES — preview + download your PDFs from /public
   ════════════════════════════════════════════════════════════════════════ */

const Icon = ({ d, size = 18, color = 'currentColor', stroke = 1.6, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  download: 'M12 4v11m0 0-4-4m4 4 4-4M4 20h16',
  external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
  award: ['M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M8.5 14l-1.5 8 5-3 5 3-1.5-8'],
  arrowUp: 'M12 19V5m0 0-6 6m6-6 6 6',
};

function useScrollProgress({ barRef, onTopVisible }) {
  const [ignored, setRingRef] = useState(null);
  // reuse minimal version
  return null;
}

/* ════════════════════════════════════════════════════════════
   CERTIFICATE CARD
   ════════════════════════════════════════════════════════════ */
function CertificateCard({ cert, index }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: 'clamp(24px, 3vw, 32px)',
        borderRadius: '22px',
        background: 'rgba(56,20,6,0.42)',
        border: `1px solid ${cert.accent}50`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.3)`,
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <div style={{
          display: 'grid', placeItems: 'center', width: '52px', height: '52px',
          borderRadius: '14px', flexShrink: 0,
          background: `linear-gradient(135deg, ${cert.accent}33, ${cert.accent}11)`,
          border: `1px solid ${cert.accent}66`,
          color: cert.accent,
        }}>
          <Icon d={ICONS.award} size={24} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{
            margin: 0, marginBottom: '6px',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', letterSpacing: '-0.02em', color: '#fff',
          }}>
            {cert.title}
          </h3>
          <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '13px', color: cert.accent, fontWeight: 500 }}>
            {cert.issuer}
          </p>
          <p style={{ margin: '4px 0 0', fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>
            {cert.date}
          </p>
        </div>
      </div>

      <p style={{
        margin: '0 0 20px',
        fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6,
        color: 'rgba(255,255,255,0.65)',
      }}>
        {cert.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <motion.button
          onClick={() => setShowPreview((v) => !v)}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '10px 18px', borderRadius: '999px',
            background: `linear-gradient(96deg, ${cert.accent} 0%, #ff8a1f 100%)`,
            color: '#fff', fontSize: '13px', fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            border: 0, cursor: 'pointer',
            boxShadow: `0 8px 24px ${cert.accent}40`,
          }}
        >
          <Icon d={ICONS.external} size={14} color="#fff" />
          {showPreview ? 'Hide Preview' : 'View Certificate'}
        </motion.button>

        <motion.a
          href={cert.file}
          download
          whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '10px 18px', borderRadius: '999px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.16)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px', fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textDecoration: 'none',
          }}
        >
          <Icon d={ICONS.download} size={14} />
          Download PDF
        </motion.a>
      </div>

      {/* Embedded PDF preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: '20px',
            borderRadius: '14px',
            overflow: 'hidden',
            border: `1px solid ${cert.accent}40`,
            background: '#0a0300',
          }}
        >
          <iframe
            src={cert.file}
            title={cert.title}
            style={{ width: '100%', height: '520px', border: 0, display: 'block' }}
          />
        </motion.div>
      )}
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════
   BACK TO TOP
   ════════════════════════════════════════════════════════════ */
function BackToTop({ visible }) {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 40,
        display: 'grid', placeItems: 'center', width: '46px', height: '46px',
        borderRadius: '50%', background: 'rgba(56,20,6,0.6)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        color: '#fff', cursor: 'pointer', transition: 'all 0.4s',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Icon d={ICONS.arrowUp} size={16} />
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function Certificates() {
  const [showTop, setShowTop] = useState(false);

  // simple scroll listener
  useState(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

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
      <BackToTop visible={showTop} />

      <div
        className="certs-wrap"
        style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}
      >
        <header style={{ paddingTop: '110px', paddingBottom: '40px' }}>
          <h1 style={{
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.05,
            letterSpacing: '-0.035em', color: '#fff',
          }}>
            {['Certificates', '&', 'Credentials'].map((w, i) => (
              <span key={w} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', verticalAlign: 'bottom', paddingBottom: '0.12em' }}>
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
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '2px', width: '100%', maxWidth: '360px', marginTop: '18px',
              background: 'linear-gradient(90deg, #ff3d00, #ff8a1f, transparent)',
              transformOrigin: 'left',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              marginTop: '18px', marginBottom: 0, maxWidth: '520px',
              fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.65,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Verified certifications in full-stack development and artificial intelligence.
          </motion.p>
        </header>

        <div style={{ display: 'grid', gap: '24px' }}>
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .certs-wrap { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
}