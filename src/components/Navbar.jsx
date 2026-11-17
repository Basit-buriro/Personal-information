import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import HeroImg from '../assets/Hero.png';

/* ════════════════════════════════════════════════════════════════════════
   NAVBAR — floating glass-free bar. Looks rich, costs almost nothing:
   solid colors, no blur, no looping animations. Only transform/opacity move.
   ════════════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
  { name: 'CV', path: '/cv' },
];

const MAILTO =
  'https://mail.google.com/mail/?view=cm&fs=1&to=2k24-it-3@usindh.edu.pk&su=Project%20Inquiry%20-%20Portfolio&body=Hi%20Abdul%20Basit%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%0A%0AThanks!';

const C = {
  bg: '#120400',
  bar: '#1c0802',
  orange: '#ff8a1f',
  red: '#ff3d00',
  line: 'rgba(255,138,31,0.28)',
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const STYLES = `
.nav-link {
  position: relative;
  padding: 8px 14px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.68);
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.nav-link:hover,
.nav-link:focus-visible {
  color: #fff;
  background: rgba(255,255,255,0.06);
  outline: none;
}
.nav-link.active {
  color: ${C.orange};
  background: rgba(255,138,31,0.12);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 5px 5px 18px;
  border-radius: 999px;
  background: ${C.red};
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(255,61,0,0.3);
  transition: transform .25s ${EASE}, box-shadow .25s ${EASE};
}
.nav-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(255,61,0,0.4); }
.nav-cta:active { transform: scale(0.97); }
.nav-cta-dot {
  display: grid; place-items: center;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: #fff; color: #1a0600;
  transition: transform .25s ${EASE};
}
.nav-cta:hover .nav-cta-dot { transform: translateX(2px); }

.nav-sheet-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid transparent;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  transition: background-color .2s ease, color .2s ease;
}
.nav-sheet-link svg { opacity: .35; transition: opacity .2s ease, transform .2s ease; }
.nav-sheet-link:hover svg { opacity: 1; transform: translate(2px,-2px); }
.nav-sheet-link.active {
  color: ${C.orange};
  background: rgba(255,138,31,0.1);
  border-color: ${C.line};
}
.nav-sheet-link.active svg { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  [data-nav] * { transition: none !important; }
}
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const burgerRef = useRef(null);
  const progressRef = useRef(null);

  /* Always dark */
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* One rAF-throttled scroll listener. */
  useEffect(() => {
    let raf = 0;
    let last = window.scrollY;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 20);

      const delta = y - last;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 200);
        last = y;
      }
      if (y <= 80) setHidden(false);

      if (progressRef.current) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        progressRef.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(3)})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Mobile menu: lock scroll + Esc to close */
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const sheetClass = ({ isActive }) => `nav-sheet-link${isActive ? ' active' : ''}`;

  return (
    <div data-nav style={{ width: '100%', maxWidth: '100vw' }}>
      <style>{STYLES}</style>

      {/* Floating bar */}
      <header
        onFocusCapture={() => setHidden(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 50,
          padding: '12px 12px 0',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          transform: hidden && !open ? 'translateY(-130%)' : 'translateY(0)',
          transition: `transform .4s ${EASE}`,
          willChange: 'transform',
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            pointerEvents: 'auto',
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            height: '60px',
            padding: '0 10px 0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderRadius: '18px',
            overflow: 'hidden',
            background: scrolled ? 'rgba(28,8,2,0.96)' : 'rgba(28,8,2,0.7)',
            border: `1px solid ${scrolled ? C.line : 'rgba(255,138,31,0.12)'}`,
            boxShadow: scrolled ? '0 12px 32px rgba(0,0,0,0.45)' : 'none',
            transition: 'background-color .3s ease, border-color .3s ease, box-shadow .3s ease',
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            aria-label="Abdul Basit — home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              minWidth: 0,
            }}
          >
            <span style={{ position: 'relative', flexShrink: 0, display: 'block' }}>
              <img
                src={HeroImg}
                alt=""
                width="38"
                height="38"
                style={{
                  display: 'block',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  border: `2px solid ${C.orange}`,
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '-1px',
                  bottom: '-1px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: `2px solid ${C.bar}`,
                }}
              />
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                Abdul Basit
              </span>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: C.orange,
                  whiteSpace: 'nowrap',
                }}
              >
                Full stack developer
              </span>
            </span>
          </NavLink>

          {/* Desktop links */}
          <ul
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: '2px', listStyle: 'none', margin: 0, padding: 0 }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} end={link.path === '/'} className={linkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <a
              href={MAILTO}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta hidden sm:inline-flex"
            >
              Hire me
              <span className="nav-cta-dot">
                <FiArrowRight size={14} />
              </span>
            </a>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="lg:hidden"
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                border: `1px solid ${C.line}`,
                background: 'rgba(255,138,31,0.08)',
                color: C.orange,
                cursor: 'pointer',
              }}
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* Scroll progress */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '2px',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity .3s ease',
            }}
          >
            <span
              ref={progressRef}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                background: C.orange,
                transformOrigin: 'left',
                transform: 'scaleX(0)',
              }}
            />
          </span>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 40,
          background: C.bg,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity .25s ease, visibility .25s ease',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', padding: '96px 20px 40px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.path}
                style={{
                  marginBottom: '6px',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(14px)',
                  transition: `opacity .45s ${EASE}, transform .45s ${EASE}`,
                  transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={sheetClass}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                  <FiArrowUpRight size={20} />
                </NavLink>
              </li>
            ))}
          </ul>

          <a
            href={MAILTO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="nav-cta"
            style={{
              width: '100%',
              justifyContent: 'space-between',
              marginTop: '20px',
              padding: '8px 8px 8px 22px',
              fontSize: '16px',
              opacity: open ? 1 : 0,
              transition: `opacity .45s ${EASE}, transform .25s ${EASE}`,
              transitionDelay: open ? `${80 + NAV_LINKS.length * 45}ms` : '0ms',
            }}
          >
            Hire me
            <span className="nav-cta-dot" style={{ width: '36px', height: '36px' }}>
              <FiArrowRight size={16} />
            </span>
          </a>

          <p
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}
            />
            Available for work
          </p>
        </div>
      </div>
    </div>
  );
}