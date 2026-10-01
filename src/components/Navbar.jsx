import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import HeroImg from '../assets/Hero.png';

/* ════════════════════════════════════════════════════════════════════════
   NAVBAR — dark-only, fully mobile responsive, glass pill
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

const KEYFRAMES = `
@keyframes nav-drop{from{opacity:0;transform:translateY(-28px)}to{opacity:1;transform:none}}
@keyframes nav-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes nav-spin{to{transform:rotate(360deg)}}
@keyframes nav-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}
@media (prefers-reduced-motion:reduce){
  [data-nav],[data-nav] *{animation:none!important;transition-duration:.001ms!important;transition-delay:0ms!important}
}
`;

const RING_GRADIENT =
  'bg-[conic-gradient(from_0deg,#00E5FF,#8B5CF6,#FF2EC4,#00E5FF)]';

const ICON_BTN =
  'relative grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-cyber-cyan/40 hover:bg-white/10';

const CTA =
  'group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-violet px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cyber-bg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon-cyan';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const activeIndexFor = (pathname) =>
  NAV_LINKS.findIndex((l) =>
    l.path === '/' ? pathname === '/' : pathname.startsWith(l.path)
  );

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false });
  const [pillReady, setPillReady] = useState(false);
  const [measureKey, setMeasureKey] = useState(0);

  const { pathname } = useLocation();
  const activeIndex = activeIndexFor(pathname);

  const listRef = useRef(null);
  const linkRefs = useRef([]);
  const progressRef = useRef(null);
  const burgerRef = useRef(null);
  const firstMobileLink = useRef(null);

  /* Force dark mode — always */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    try {
      localStorage.setItem('ab-theme', 'dark');
    } catch {
      /* ignore */
    }
  }, []);

  /* Close sheet on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Scroll: condense + smart hide + progress */
  useEffect(() => {
    let raf = 0;
    let last = window.scrollY;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 20);

      const delta = y - last;
      if (Math.abs(delta) > 6) {
        if (delta > 0 && y > 200) setHidden(true);
        else if (delta < 0) setHidden(false);
        last = y;
      }
      if (y <= 80) setHidden(false);

      if (progressRef.current) {
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        progressRef.current.style.transform = `scaleX(${clamp(y / max, 0, 1).toFixed(4)})`;
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
  }, []);

  /* Sliding indicator re-measure */
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setMeasureKey((k) => k + 1));
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const target = hover ?? activeIndex;
    const el = target >= 0 ? linkRefs.current[target] : null;
    if (!el) {
      setPill((p) => (p.show ? { ...p, show: false } : p));
      return;
    }
    setPill({ x: el.offsetLeft, w: el.offsetWidth, show: true });
  }, [hover, activeIndex, measureKey]);

  useEffect(() => {
    if (!pill.show || pillReady) return undefined;
    const id = requestAnimationFrame(() => setPillReady(true));
    return () => cancelAnimationFrame(id);
  }, [pill.show, pillReady]);

  /* Mobile sheet: scroll lock + Esc + focus */
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const raf = requestAnimationFrame(() => firstMobileLink.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, [mobileOpen]);

  return (
    <div data-nav>
      <style>{KEYFRAMES}</style>

      {/* Fixed full-width bar so it stays pinned on Android browsers */}
      <header
        onFocusCapture={() => setHidden(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '8px 10px 0' : '12px 10px 0',
          transition:
            'padding 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          transform:
            hidden && !mobileOpen ? 'translateY(-140%)' : 'translateY(0)',
          willChange: 'transform',
          pointerEvents: mobileOpen ? 'none' : 'auto',
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            width: '100%',
            maxWidth: '1152px',
            height: scrolled ? '54px' : '60px',
            padding: '0 10px',
            borderRadius: '16px',
            background: scrolled
              ? 'rgba(5,6,10,0.85)'
              : 'rgba(5,6,10,0.35)',
            border: scrolled
              ? '1px solid rgba(0,229,255,0.2)'
              : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            boxShadow: scrolled
              ? '0 4px 30px rgba(0,229,255,0.08)'
              : 'none',
            transition:
              'height 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s, border 0.4s, box-shadow 0.4s, backdrop-filter 0.4s',
          }}
        >
          {/* Top neon edge */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '24px',
              right: '24px',
              top: 0,
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(0,229,255,0.7), transparent)',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 0.5s',
              pointerEvents: 'none',
            }}
          />

          {/* ── Logo ── */}
          <NavLink
            to="/"
            aria-label="Abdul Basit — home"
            className="group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: 0,
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <span style={{ position: 'relative', display: 'block', flexShrink: 0 }}>
              <span
                aria-hidden="true"
                className={RING_GRADIENT}
                style={{
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: '50%',
                  animation: 'nav-spin 8s linear infinite',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-1px',
                  borderRadius: '50%',
                  background: '#05060A',
                }}
              />
              <img
                src={HeroImg}
                alt=""
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  transition: 'transform 0.3s',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  border: '2px solid #05060A',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#4ade80',
                    animation: 'nav-ping 2s ease-out infinite',
                  }}
                />
              </span>
            </span>

            {/* AB monogram — mobile & tablet */}
            <span
              aria-hidden="true"
              className="md:hidden"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                background:
                  'linear-gradient(to right, #00E5FF, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AB
            </span>

            {/* Name + role — desktop */}
            <span
              className="hidden md:flex"
              style={{ flexDirection: 'column', lineHeight: 1.15, minWidth: 0 }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                Abdul Basit
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9.5px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,229,255,0.8)',
                  whiteSpace: 'nowrap',
                }}
              >
                Full Stack Dev
              </span>
            </span>
          </NavLink>

          {/* ── Desktop links (lg+) ── */}
          <ul
            ref={listRef}
            onMouseLeave={() => setHover(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setHover(null);
            }}
            className="hidden lg:flex"
            style={{
              position: 'relative',
              alignItems: 'center',
              gap: '2px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                borderRadius: '10px',
                background: 'rgba(0,229,255,0.1)',
                boxShadow: 'inset 0 0 0 1px rgba(0,229,255,0.25)',
                width: pill.w,
                transform: `translateX(${pill.x}px)`,
                opacity: pill.show ? 1 : 0,
                transition: pillReady
                  ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1), width 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s'
                  : 'none',
                pointerEvents: 'none',
              }}
            />

            {NAV_LINKS.map((link, i) => (
              <li
                key={link.path}
                style={{
                  animation: `nav-rise 0.7s cubic-bezier(0.16,1,0.3,1) backwards`,
                  animationDelay: `${300 + i * 60}ms`,
                  listStyle: 'none',
                }}
              >
                <NavLink
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  to={link.path}
                  end={link.path === '/'}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className="relative z-10"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '13px',
                    letterSpacing: '0.01em',
                    textDecoration: 'none',
                    color: isActive ? '#00E5FF' : 'rgba(226,232,240,0.85)',
                    transition: 'color 0.3s',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '50%',
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          background: '#00E5FF',
                          boxShadow: '0 0 8px 2px rgba(0,229,255,0.8)',
                          transform: 'translateX(-50%)',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.3s',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right actions (no theme toggle) ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {/* Hire Me — visible from sm+ */}
            <a
              href={MAILTO}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex ${CTA}`}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '-100%',
                  width: '100%',
                  transform: 'skewX(-18deg)',
                  background:
                    'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                  transition: 'transform 0.9s ease-out',
                  pointerEvents: 'none',
                }}
                className="group-hover:!translate-x-[220%]"
              />
              <FiMail style={{ position: 'relative', width: '14px', height: '14px' }} />
              <span
                className="hidden md:inline"
                style={{ position: 'relative' }}
              >
                Hire Me
              </span>
            </a>

            {/* Burger (mobile & tablet) */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`${ICON_BTN} text-cyber-cyan lg:hidden`}
            >
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '20px',
                  height: '14px',
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '1.5px',
                    borderRadius: '999px',
                    background: 'currentColor',
                    transition: 'all 0.3s',
                    transform: mobileOpen
                      ? 'translateY(6px) rotate(45deg)'
                      : 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '6px',
                    width: '100%',
                    height: '1.5px',
                    borderRadius: '999px',
                    background: 'currentColor',
                    transition: 'all 0.3s',
                    transform: mobileOpen ? 'scaleX(0)' : 'none',
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '12px',
                    width: '100%',
                    height: '1.5px',
                    borderRadius: '999px',
                    background: 'currentColor',
                    transition: 'all 0.3s',
                    transform: mobileOpen
                      ? 'translateY(-6px) rotate(-45deg)'
                      : 'none',
                  }}
                />
              </span>
            </button>
          </div>

          {/* Scroll progress */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '16px',
              right: '16px',
              bottom: 0,
              height: '1px',
              overflow: 'hidden',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 0.5s',
              pointerEvents: 'none',
            }}
          >
            <span
              ref={progressRef}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to right, #00E5FF, #8B5CF6, #FF2EC4)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
              }}
            />
          </span>
        </nav>
      </header>

      {/* ── Mobile sheet ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="lg:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
        }}
      >
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,6,10,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60% 45% at 50% 0%, rgba(0,229,255,0.12), transparent 70%), radial-gradient(50% 40% at 90% 100%, rgba(139,92,246,0.14), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            overflowY: 'auto',
            padding: '96px 20px 60px',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              position: 'relative',
              marginBottom: '24px',
              flexShrink: 0,
              transform: mobileOpen ? 'scale(1)' : 'scale(0.75)',
              opacity: mobileOpen ? 1 : 0,
              transition:
                'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: mobileOpen ? '80ms' : '0ms',
            }}
          >
            <span
              aria-hidden="true"
              className={RING_GRADIENT}
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                animation: 'nav-spin 8s linear infinite',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '50%',
                background: '#05060A',
              }}
            />
            <img
              src={HeroImg}
              alt="Abdul Basit"
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '100%',
              maxWidth: '360px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.path}
                style={{
                  transform: mobileOpen
                    ? 'translateY(0)'
                    : 'translateY(16px)',
                  opacity: mobileOpen ? 1 : 0,
                  transition:
                    'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: mobileOpen
                    ? `${140 + i * 55}ms`
                    : '0ms',
                  marginBottom: '6px',
                }}
              >
                <NavLink
                  ref={i === 0 ? firstMobileLink : undefined}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: isActive
                      ? '1px solid rgba(0,229,255,0.4)'
                      : '1px solid transparent',
                    background: isActive
                      ? 'linear-gradient(to right, rgba(0,229,255,0.15), rgba(255,46,196,0.15))'
                      : 'transparent',
                    color: isActive ? '#fff' : 'rgba(203,213,225,0.85)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            marginRight: '10px',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            color: 'rgba(0,229,255,0.7)',
                          }}
                        >
                          0{i + 1}.
                        </span>
                        {link.name}
                      </span>
                      <FiArrowUpRight
                        style={{
                          width: '18px',
                          height: '18px',
                          color: '#00E5FF',
                          opacity: isActive ? 1 : 0.5,
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            <li
              style={{
                marginTop: '12px',
                transform: mobileOpen
                  ? 'translateY(0)'
                  : 'translateY(16px)',
                opacity: mobileOpen ? 1 : 0,
                transition:
                  'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: mobileOpen
                  ? `${140 + NAV_LINKS.length * 55}ms`
                  : '0ms',
              }}
            >
              <a
                href={MAILTO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className={`${CTA} !w-full !justify-center !rounded-xl !py-3.5 !text-xs`}
              >
                <FiMail style={{ width: '16px', height: '16px' }} />
                Hire Me
              </a>
            </li>
          </ul>

          <p
            style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'rgba(148,163,184,0.7)',
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                width: '10px',
                height: '10px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#4ade80',
                  animation: 'nav-ping 2s ease-out infinite',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80',
                }}
              />
            </span>
            SYSTEM ONLINE
          </p>
        </div>
      </div>
    </div>
  );
}