import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../data/cv';
import callmeImg from '../assets/callme.png';

/* ════════════════════════════════════════════════════════════════════════
   CONTACT — Simple, clean layout with smooth background gradients.
   ════════════════════════════════════════════════════════════════════════ */

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
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pin: ['M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z', 'M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  github: 'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  whatsapp: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z',
  arrowRight: 'M4 12h16m0 0-6-6m6 6-6 6',
  copy: ['M9 9h11v11H9z', 'M5 15V4a1 1 0 0 1 1-1h11'],
  check: 'm5 12 5 5 9-10',
};

function CopyEmail({ email }) {
  const [state, setState] = useState('idle');
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let next = 'ok';
    try { await navigator.clipboard.writeText(email); } catch { next = 'fail'; }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1800);
  };

  return (
    <motion.button
      type="button" onClick={copy} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} aria-live="polite"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.82)', fontSize: '12px', fontWeight: 500, fontFamily: "'Inter', sans-serif", cursor: 'pointer', transition: 'all 0.3s' }}
    >
      <Icon d={state === 'ok' ? ICONS.check : ICONS.copy} size={14} color={state === 'ok' ? '#ff8a1f' : 'rgba(255,255,255,0.82)'} />
      {state === 'ok' ? 'Copied' : state === 'fail' ? 'Copy failed' : 'Copy email'}
    </motion.button>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState('');

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    const subject = encodeURIComponent(`Message from ${values.name} — Portfolio`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
    const href = `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}&su=${subject}&body=${body}`;

    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  const inputBase = {
    width: '100%', padding: '14px 18px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '14.5px', outline: 'none', transition: 'all 0.25s', resize: 'none',
  };

  const labelStyle = {
    display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
  };

  return (
    <motion.form
      onSubmit={onSubmit} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: 0.2 }}
      style={{ display: 'grid', gap: '18px', padding: 'clamp(24px, 4vw, 36px)', borderRadius: '24px', background: 'rgba(56,20,6,0.42)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.35)', position: 'relative', zIndex: 10 }}
    >
      <div className="contact-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Your Name</label>
          <input id="name" name="name" type="text" required value={values.name} onChange={onChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Jane Doe"
            style={{ ...inputBase, borderColor: focused === 'name' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)', boxShadow: focused === 'name' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none' }} />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Your Email</label>
          <input id="email" name="email" type="email" required value={values.email} onChange={onChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="jane@example.com"
            style={{ ...inputBase, borderColor: focused === 'email' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)', boxShadow: focused === 'email' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none' }} />
        </div>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Your Message</label>
        <textarea id="message" name="message" required rows={6} value={values.message} onChange={onChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="Tell me about your project..."
          style={{ ...inputBase, borderColor: focused === 'message' ? 'rgba(255,138,31,0.6)' : 'rgba(255,255,255,0.12)', boxShadow: focused === 'message' ? '0 0 0 3px rgba(255,138,31,0.12)' : 'none' }} />
      </div>

      <motion.button
        type="submit" disabled={status === 'sending'} whileHover={{ scale: status === 'sending' ? 1 : 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 28px', borderRadius: '999px', background: 'linear-gradient(96deg, #ff3d00 0%, #ff8a1f 100%)', border: 0, color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', cursor: status === 'sending' ? 'wait' : 'pointer', boxShadow: '0 14px 40px rgba(255,61,0,0.38)', opacity: status === 'sending' ? 0.7 : 1, transition: 'opacity 0.3s' }}
      >
        {status === 'sent' ? (
          <><Icon d={ICONS.check} size={16} color="#fff" /> Message Ready — Check Gmail</>
        ) : status === 'sending' ? (
          'Opening mail client…'
        ) : (
          <>Send Message <Icon d={ICONS.arrowRight} size={16} color="#fff" /></>
        )}
      </motion.button>
    </motion.form>
  );
}

export default function Contact() {
  return (
    <section
      style={{ position: 'relative', minHeight: '100vh', background: 'radial-gradient(60% 50% at 18% 12%, rgba(255,61,0,0.14), transparent 70%), radial-gradient(50% 45% at 90% 80%, rgba(255,138,31,0.12), transparent 70%), linear-gradient(165deg, #2a0b02 0%, #120400 70%)', color: '#fff', overflow: 'hidden', paddingBottom: '80px' }}
    >
      {/* Simple Background Glows */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        <motion.div
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,61,0,0.15), transparent 60%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,138,31,0.15), transparent 60%)', filter: 'blur(80px)' }}
          animate={{ x: [0, -80, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 40px' }}>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, textTransform: 'uppercase', color: '#fff' }}>
          <span style={{ display: 'block', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '0.02em' }}>Let&apos;s Build</span>
          <span style={{ display: 'block', fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 1.1, letterSpacing: '0.02em', background: 'linear-gradient(96deg, #ff3d00 0%, #ffd2a0 50%, #ff8a1f 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Something Real</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} style={{ margin: '24px 0 0', maxWidth: '480px', fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
          Have a project in mind, or just want to say hi? My inbox is always open — let&apos;s talk.
        </motion.p>
      </div>

      {/* Main Grid */}
      <div className="contact-wrap" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '28px', alignItems: 'start' }}>
        
        <ContactForm />

        <motion.aside initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: 0.3 }} style={{ display: 'grid', gap: '18px' }}>
          
          {/* Image */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,138,31,0.3)', background: '#1c0802', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <img src={callmeImg} alt="Let's connect" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '280px', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1c0802, transparent 40%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                Ready to chat
              </span>
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(56,20,6,0.42)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: 0, marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em', color: '#fff' }}>Contact Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px' }}>
              {[
                { icon: ICONS.mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: ICONS.phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
                { icon: ICONS.pin, label: 'Location', value: personal.location },
              ].map((row, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ display: 'grid', placeItems: 'center', width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,138,31,0.1)', border: '1px solid rgba(255,138,31,0.3)', color: '#ff8a1f', flexShrink: 0 }}>
                    <Icon d={row.icon} size={16} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif" }}>{row.label}</p>
                    {row.href ? (
                      <a href={row.href} style={{ display: 'block', marginTop: '2px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: "'Inter', sans-serif", textDecoration: 'none', wordBreak: 'break-word', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8a1f')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}>{row.value}</a>
                    ) : (
                      <span style={{ display: 'block', marginTop: '2px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: "'Inter', sans-serif" }}>{row.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CopyEmail email={personal.email} />
            </div>
          </div>

          {/* Socials */}
          <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(56,20,6,0.42)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: 0, marginBottom: '18px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em', color: '#fff' }}>Find me online</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: personal.github, icon: ICONS.github },
                { label: 'LinkedIn', href: personal.linkedin, icon: ICONS.linkedin },
                { label: 'WhatsApp', href: personal.whatsappLink || 'https://wa.me/923147135787', icon: ICONS.whatsapp },
              ].map((s, i) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }}
                  style={{ display: 'grid', placeItems: 'center', width: '46px', height: '46px', borderRadius: '13px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', transition: 'all 0.25s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,138,31,0.6)'; e.currentTarget.style.color = '#ff8a1f'; e.currentTarget.style.background = 'rgba(255,138,31,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                >
                  <Icon d={s.icon} size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '80px auto 0', padding: '24px 24px 0', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>© {new Date().getFullYear()} Abdul Basit</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Made with React + Tailwind</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 15V9M10 19V5M15 16V8M20 13v-2" stroke="#ff8a1f" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>Available</span>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .contact-wrap { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}