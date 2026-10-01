import { useEffect, useRef, useState } from 'react'
import HeroImg from '../assets/Hero1.png'
import { personal, summary, education, experience, certificates, socials } from '../data/cv'

/* ════════════════════════════════════════════════════════════════════════
   ABOUT — Tailwind only, no animation library.

   Motion in this file
   ────────────────────
   • Headline words rise out of a mask, then a typewriter cycles roles
   • Portrait tilts toward the cursor with orbit rings, floating tech chips
     and a status badge that sit at different parallax depths
   • A soft spotlight and ember particles follow / drift across the viewport
   • Scroll progress bar, scroll-driven timeline, drifting watermark
   • Blocks reveal from up / left / right / zoom with staggered delays
   • Cards get a cursor spotlight and a light tilt on hover
   • Counters count up, skill marquees scroll in opposite directions
   • Magnetic buttons, copy-email feedback, back-to-top progress ring
   • Section dots (scroll-spy) on wide screens

   Everything respects prefers-reduced-motion and coarse pointers.
   Keyframes live in the <style> block below so tailwind.config stays untouched.
   ════════════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────
   ICONS
   ──────────────────────────────────────────────────────────── */
const svg = (children) => {
  const Icon = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
  return Icon
}

const Mail = svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)
const Phone = svg(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />)
const Pin = svg(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>)
const Github = svg(<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />)
const Linkedin = svg(<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />)
const Whatsapp = svg(<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5Z" />)
const Download = svg(<path d="M12 4v11m0 0-4-4m4 4 4-4M4 20h16" />)
const Award = svg(<><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></>)
const Book = svg(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" /><path d="M6.5 17a2.5 2.5 0 0 0 0 5H20v-5" /></>)
const Code = svg(<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />)
const Server = svg(<><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>)
const Spark = svg(<path d="M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.4 2.4m6.6 6.6 2.4 2.4m0-11.4-2.4 2.4m-6.6 6.6-2.4 2.4" />)
const ArrowUp = svg(<path d="M12 19V5m0 0-6 6m6-6 6 6" />)
const Copy = svg(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>)
const Check = svg(<path d="m5 12 5 5 9-10" />)

const ICONS = { github: Github, linkedin: Linkedin, whatsapp: Whatsapp, mail: Mail }

/* ────────────────────────────────────────────────────────────
   CONTENT CONSTANTS
   ──────────────────────────────────────────────────────────── */
const ROLES = [
  'MERN stack developer',
  'full stack developer',
  'curious AI tinkerer',
  'UI/UX-minded builder',
]

const SKILLS_TOP = ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs']
const SKILLS_BOTTOM = ['MERN stack', 'Responsive UI', 'UI/UX design', 'AI projects', 'Python', 'JavaScript']

const CHIPS = [
  { label: 'React', pos: 'left-[-6%] top-[12%]', depth: 26, delay: 0 },
  { label: 'Node.js', pos: 'right-[-6%] top-[28%]', depth: 34, delay: -1.5 },
  { label: 'MongoDB', pos: 'left-[-5%] bottom-[24%]', depth: 30, delay: -3 },
  { label: 'Tailwind', pos: 'right-[-4%] bottom-[10%]', depth: 22, delay: -4.5 },
]

const FOCUS = [
  {
    icon: Code,
    title: 'Frontend Engineering',
    desc: 'Pixel-perfect, responsive UIs with React, Next.js, and Tailwind CSS.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Scalable REST APIs with Node.js, Express, and MongoDB.',
  },
  {
    icon: Spark,
    title: 'AI & Automation',
    desc: 'Python experiments that put AI to work, from voice assistants to smart attendance.',
  },
]

const NAV = [
  { id: 'about-intro', label: 'Intro' },
  { id: 'about-exp', label: 'Experience' },
  { id: 'about-edu', label: 'Education' },
  { id: 'about-cert', label: 'Credentials' },
  { id: 'about-focus', label: 'Focus' },
  { id: 'about-contact', label: 'Contact' },
]

/* ────────────────────────────────────────────────────────────
   SHARED CLASS STRINGS
   ──────────────────────────────────────────────────────────── */
const GLASS =
  'border border-white/[0.14] bg-[rgba(56,20,6,0.42)] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]'

const RISE = 'animate-[about-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]'

const FLAME_BTN =
  'inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] py-2 pl-6 pr-2 text-[15px] font-semibold text-white shadow-[0_14px_40px_rgba(255,61,0,0.38)] transition-shadow duration-300 hover:shadow-[0_20px_52px_rgba(255,61,0,0.55)]'

const FLAME_DOT = 'grid h-10 w-10 place-items-center rounded-full bg-white text-[#1a0600]'

const REVEAL_BASE =
  'transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[in=true]:translate-x-0 data-[in=true]:translate-y-0 data-[in=true]:scale-100 data-[in=true]:opacity-100'

const REVEAL_FROM = {
  up: 'opacity-0 translate-y-8',
  left: 'opacity-0 -translate-x-10',
  right: 'opacity-0 translate-x-10',
  zoom: 'opacity-0 scale-95',
}

/* ────────────────────────────────────────────────────────────
   KEYFRAMES (injected once, scoped by name)
   ──────────────────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes about-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes about-word{from{transform:translateY(110%) rotate(4deg)}to{transform:none}}
@keyframes about-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes about-spin{to{transform:rotate(360deg)}}
@keyframes about-spin-rev{to{transform:rotate(-360deg)}}
@keyframes about-marquee{to{transform:translateX(-50%)}}
@keyframes about-ember{0%{transform:translate3d(0,0,0) scale(1);opacity:0}10%{opacity:.85}100%{transform:translate3d(var(--drift),-100vh,0) scale(.3);opacity:0}}
@keyframes about-ping{0%{transform:scale(.8);opacity:.6}100%{transform:scale(2.2);opacity:0}}
@keyframes about-shine{to{background-position:200% 0}}
@keyframes about-caret{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes about-pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
@keyframes about-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes about-glow{0%,100%{opacity:.4}50%{opacity:.75}}
@media (prefers-reduced-motion:reduce){
  [data-about] *{animation:none!important;transition:none!important}
  [data-about] [data-reveal]{opacity:1!important;transform:none!important}
}
`

/* ────────────────────────────────────────────────────────────
   SMALL HELPERS
   ──────────────────────────────────────────────────────────── */
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const lerp = (a, b, t) => a + (b - a) * t

/* Deterministic pseudo-random 0..1 so ember layout is stable between renders. */
const seeded = (i) => {
  const x = Math.sin(i * 127.1) * 43758.5453
  return x - Math.floor(x)
}

const RING_LEN = 113.1 // circumference of the r=18 progress ring

/* ────────────────────────────────────────────────────────────
   HOOKS
   ──────────────────────────────────────────────────────────── */
function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
const useFinePointer = () => useMedia('(pointer: fine)')

/* Eases the portrait tilt (--px/--py, -1..1) and the viewport spotlight
   (--gx/--gy, px) toward the cursor. Writes CSS variables only — no re-renders. */
function usePointerFollow(stageRef, glowRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined
    const stage = stageRef.current
    const glow = glowRef.current

    let tx = 0, ty = 0, x = 0, y = 0
    let gtx = window.innerWidth / 2, gty = window.innerHeight / 3
    let gx = gtx, gy = gty
    let raf = 0

    const tick = () => {
      x = lerp(x, tx, 0.08)
      y = lerp(y, ty, 0.08)
      gx = lerp(gx, gtx, 0.12)
      gy = lerp(gy, gty, 0.12)

      if (stage) {
        stage.style.setProperty('--px', x.toFixed(3))
        stage.style.setProperty('--py', y.toFixed(3))
      }
      if (glow) {
        glow.style.setProperty('--gx', `${gx.toFixed(1)}px`)
        glow.style.setProperty('--gy', `${gy.toFixed(1)}px`)
      }

      const busy =
        Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001 ||
        Math.abs(gtx - gx) > 0.5 || Math.abs(gty - gy) > 0.5
      raf = busy ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const onMove = (e) => {
      if (stage) {
        const r = stage.getBoundingClientRect()
        // -1..1 from the portrait centre, measured against half the viewport,
        // so the portrait keeps following the cursor anywhere on the page.
        tx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1)
        ty = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1)
      }
      gtx = e.clientX
      gty = e.clientY
      kick()
    }
    const onLeave = () => { tx = 0; ty = 0; kick() }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled, stageRef, glowRef])
}

/* One rAF-throttled scroll handler drives: progress bar, back-to-top ring,
   timeline fill, and the horizontal drift of the background watermark. */
function useScrollMotion({ barRef, ringRef, timelineRef, fillRef, wmRef, onTopVisible }) {
  useEffect(() => {
    let raf = 0
    let shown = false

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      const p = clamp(window.scrollY / max, 0, 1)

      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LEN * (1 - p))
      if (wmRef.current) {
        wmRef.current.style.setProperty('--wm', `${(120 - window.scrollY * 0.3).toFixed(1)}px`)
      }

      const visible = window.scrollY > 600
      if (visible !== shown) {
        shown = visible
        onTopVisible(visible)
      }

      const tl = timelineRef.current
      if (tl && fillRef.current) {
        const r = tl.getBoundingClientRect()
        const tp = clamp((window.innerHeight * 0.6 - r.top) / r.height, 0, 1)
        fillRef.current.style.transform = `scaleY(${tp.toFixed(4)})`
      }
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [barRef, ringRef, timelineRef, fillRef, wmRef, onTopVisible])
}

/* ════════════════════════════════════════════════════════════
   BUILDING BLOCKS
   ════════════════════════════════════════════════════════════ */

/* Scroll reveal. Sets data-in="true" once; children can key off it with
   group-data-[in=true]/r: variants (used by the timeline dots and bullets). */
function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-in', 'true')
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-in', 'true')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`group/r ${REVEAL_BASE} ${REVEAL_FROM[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Section heading: text slides up out of a mask, underline draws across. */
function BlockTitle({ id, kicker, children }) {
  return (
    <Reveal variant="up" className="mb-7">
      <div className="overflow-hidden">
        <h2
          id={id}
          className="translate-y-full font-display text-2xl font-semibold tracking-tight text-white transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[in=true]/r:translate-y-0 sm:text-3xl"
        >
          {children}
        </h2>
      </div>
      {kicker && <p className="mt-1.5 text-sm text-white/45">{kicker}</p>}
      <div className="mt-4 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#ff3d00]/70 via-[#ff8a1f]/30 to-transparent transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[in=true]/r:scale-x-100" />
    </Reveal>
  )
}

/* Button/chip that leans toward the cursor when it is close. */
function Magnetic({ strength = 0.3, className = '', children }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  const move = (e) => {
    if (!fine || reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate3d(${(dx * strength).toFixed(1)}px,${(dy * strength).toFixed(1)}px,0)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`-m-3 inline-block p-3 transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  )
}

/* Glass card with a cursor-following glow and a very light 3D tilt. */
function SpotlightCard({ as: Tag = 'div', tilt = true, className = '', children, ...rest }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const live = fine && !reduced

  const onMove = (e) => {
    const el = ref.current
    if (!el || !live) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--cx', `${x.toFixed(0)}px`)
    el.style.setProperty('--cy', `${y.toFixed(0)}px`)
    if (tilt) {
      el.style.setProperty('--ry', `${((x / r.width - 0.5) * 5).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-(y / r.height - 0.5) * 5).toFixed(2)}deg`)
    }
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative overflow-hidden rounded-2xl ${GLASS} transition-[transform,border-color] duration-300 ease-out hover:border-[#ff8a1f]/45 [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--cx,50%)_var(--cy,50%),rgba(255,138,31,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </Tag>
  )
}

/* Counts from 0 to `to` the first time it is mostly visible. */
function Counter({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return undefined
    }
    const el = ref.current
    if (!el) return undefined

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (now) => {
          const p = clamp((now - t0) / duration, 0, 1)
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration, reduced])

  return <span ref={ref}>{value}{suffix}</span>
}

/* Types a word, holds, deletes it, moves to the next. */
function Typewriter({ words }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return undefined
    const word = words[index % words.length]
    const delay = deleting ? 35 : text === word ? 1500 : 70

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((n) => n + 1)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduced])

  return (
    <span>
      {reduced ? words[0] : text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] bg-[#ff8a1f] animate-[about-caret_1s_steps(1)_infinite]"
      />
    </span>
  )
}

/* Splits a string into words that rise out of an overflow mask, staggered. */
function SplitTitle({ text, baseDelay = 0, wordClass = '' }) {
  return text.split(' ').map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom"
    >
      <span
        className={`inline-block animate-[about-word_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${wordClass}`}
        style={{ animationDelay: `${baseDelay + i * 90}ms` }}
      >
        {word}
      </span>
    </span>
  ))
}

/* Ember particles drifting up the viewport. Fixed, behind the content. */
function Embers({ count = 22 }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + seeded(i + 1) * 3
        const duration = 9 + seeded(i + 40) * 10
        return (
          <span
            key={i}
            className="absolute bottom-[-12px] rounded-full bg-[#ff8a1f] opacity-0 shadow-[0_0_10px_2px_rgba(255,138,31,0.6)] animate-[about-ember_12s_linear_infinite]"
            style={{
              left: `${(seeded(i + 7) * 100).toFixed(1)}%`,
              width: `${size.toFixed(1)}px`,
              height: `${size.toFixed(1)}px`,
              animationDuration: `${duration.toFixed(1)}s`,
              animationDelay: `-${(seeded(i + 80) * duration).toFixed(1)}s`,
              '--drift': `${((seeded(i + 120) - 0.5) * 120).toFixed(0)}px`,
            }}
          />
        )
      })}
    </div>
  )
}

/* Infinite marquee; pauses on hover. Edges fade out with a mask. */
function Marquee({ items, reverse = false, speed = 28 }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className="flex w-max animate-[about-marquee_28s_linear_infinite] hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            aria-hidden={i >= items.length}
            className={`mr-3 rounded-full px-5 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-[#ff8a1f]/60 hover:text-white ${GLASS}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Copies the email and confirms with a small pop. */
function CopyEmail({ email }) {
  const [state, setState] = useState('idle') // idle | ok | fail
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    let next = 'ok'
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      next = 'fail'
    }
    setState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white/80 transition-colors duration-300 hover:border-[#ff8a1f]/60 hover:text-white ${GLASS}`}
    >
      <span key={state} className="inline-flex items-center gap-2 animate-[about-pop_0.45s_ease-out_both]">
        {state === 'ok' ? <Check className="h-4 w-4 text-[#ff8a1f]" /> : <Copy className="h-4 w-4" />}
        {state === 'ok' ? 'Copied' : state === 'fail' ? 'Copy failed' : 'Copy email'}
      </span>
    </button>
  )
}

/* Dots on the right edge; the one for the section in view stretches. */
function SectionNav() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(NAV[0].id)

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="About sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ul className="grid gap-3.5">
        {NAV.map((n) => {
          const on = active === n.id
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                aria-current={on ? 'true' : undefined}
                className="group flex items-center justify-end gap-3 text-xs"
              >
                <span
                  className={`transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                    on ? 'translate-x-0 text-white opacity-100' : 'translate-x-2 text-white/60 opacity-0'
                  }`}
                >
                  {n.label}
                </span>
                <span
                  className={`h-2 rounded-full transition-all duration-500 ${
                    on
                      ? 'w-6 bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f]'
                      : 'w-2 bg-white/25 group-hover:bg-white/60'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Round button with a scroll-progress ring. Appears after the first screen. */
function BackToTop({ visible, ringRef }) {
  const reduced = useReducedMotion()
  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-white transition-all duration-500 hover:-translate-y-1 ${GLASS} ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
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
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}

/* Small mouse-shaped hint under the intro; the dot bobs down. */
function ScrollCue() {
  return (
    <div
      className={`mt-10 hidden items-center gap-3 text-xs text-white/45 lg:flex ${RISE}`}
      style={{ animationDelay: '1500ms' }}
    >
      <span className="grid h-9 w-6 place-items-start justify-center rounded-full border border-white/25 pt-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a1f] animate-[about-bob_1.6s_ease-in-out_infinite]" />
      </span>
      Scroll to see more
    </div>
  )
}

/* Portrait: conic ring, orbiting dashed ring, tilting frame, floating chips. */
function Portrait({ stageRef }) {
  return (
    <div
      ref={stageRef}
      className="relative mx-auto w-full max-w-[380px] animate-[about-pop_1s_cubic-bezier(0.16,1,0.3,1)_both] [--px:0] [--py:0] [perspective:900px]"
    >
      {/* pulsing warm glow behind everything, moves opposite to the tilt */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%_-8%_-8%_8%] rounded-[40px] bg-gradient-to-br from-[#ff3d00] to-[#ff8a1f] blur-[46px] animate-[about-glow_5s_ease-in-out_infinite] [transform:translate3d(calc(var(--px)_*_-26px),calc(var(--py)_*_-26px),0)]"
      />

      {/* orbit: dashed circle with a small ember travelling around it */}
      <div aria-hidden="true" className="absolute inset-0 animate-[about-spin-rev_26s_linear_infinite]">
        <div className="absolute left-1/2 top-1/2 h-[138%] w-[138%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ff8a1f]/30">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a1f] shadow-[0_0_14px_3px_rgba(255,138,31,0.8)]" />
        </div>
      </div>

      {/* conic ring: only the 10px that peeks out from under the frame is visible */}
      <div aria-hidden="true" className="absolute -inset-[10px] overflow-hidden rounded-[38px]">
        <div className="absolute -inset-[60%] animate-[about-spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,#ff3d00,transparent,#ff8a1f,transparent)]" />
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/[0.14] bg-[#120400] shadow-[0_30px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)] will-change-transform [transform-style:preserve-3d] [transform:rotateY(calc(var(--px)_*_11deg))_rotateX(calc(var(--py)_*_-9deg))]">
        <img
          src={HeroImg}
          alt={personal.name}
          className="h-full w-full object-cover object-top [transform:scale(1.08)_translate3d(calc(var(--px)_*_-10px),calc(var(--py)_*_-10px),0)]"
        />
        {/* highlight follows the cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_calc(50%+var(--px)*40%)_calc(50%+var(--py)*40%),rgba(255,190,120,0.22),transparent_70%)]"
        />
      </div>

      {/* floating chips — outer layer parallaxes, inner layer floats */}
      {CHIPS.map((chip) => (
        <div
          key={chip.label}
          aria-hidden="true"
          className={`absolute z-20 ${chip.pos} [transform:translate3d(calc(var(--px)_*_var(--depth)_*_1px),calc(var(--py)_*_var(--depth)_*_1px),0)]`}
          style={{ '--depth': chip.depth }}
        >
          <div
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 animate-[about-float_6s_ease-in-out_infinite] ${GLASS}`}
            style={{ animationDelay: `${chip.delay}s` }}
          >
            {chip.label}
          </div>
        </div>
      ))}

      {/* status badge */}
      <div
        className="absolute inset-x-0 -bottom-4 z-20 flex justify-center [transform:translate3d(calc(var(--px)_*_16px),calc(var(--py)_*_16px),0)]"
        aria-hidden="true"
      >
        <div className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs text-white/90 ${GLASS}`}>
          <span className="relative grid h-2.5 w-2.5 place-items-center">
            <span className="absolute inset-0 rounded-full bg-[#ff8a1f] animate-[about-ping_2s_ease-out_infinite]" />
            <span className="relative h-2 w-2 rounded-full bg-[#ff8a1f]" />
          </span>
          Open to opportunities
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN ABOUT PAGE
   ════════════════════════════════════════════════════════════ */
export default function About() {
  const stageRef = useRef(null)
  const glowRef = useRef(null)
  const barRef = useRef(null)
  const ringRef = useRef(null)
  const timelineRef = useRef(null)
  const fillRef = useRef(null)
  const wmRef = useRef(null)

  const [showTop, setShowTop] = useState(false)
  const reduced = useReducedMotion()
  const fine = useFinePointer()

  usePointerFollow(stageRef, glowRef, fine && !reduced)
  useScrollMotion({ barRef, ringRef, timelineRef, fillRef, wmRef, onTopVisible: setShowTop })

  const stats = [
    { label: 'Roles held', value: experience.length },
    { label: 'Places studied', value: education.length },
    { label: 'Certificates', value: certificates.length },
  ]

  return (
    <section
      data-about
      className="relative isolate min-h-screen bg-[radial-gradient(60%_50%_at_18%_12%,rgba(255,61,0,0.16),transparent_70%),radial-gradient(50%_45%_at_90%_80%,rgba(255,138,31,0.10),transparent_70%),linear-gradient(165deg,#2a0b02_0%,#120400_70%)] px-5 pb-24 pt-28 text-white sm:px-8 lg:px-11"
    >
      <style>{KEYFRAMES}</style>

      {/* ── fixed / ambient layers ── */}
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[#ff3d00] to-[#ff8a1f] [transform:scaleX(0)]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 [--gx:50vw] [--gy:30vh] bg-[radial-gradient(520px_circle_at_var(--gx)_var(--gy),rgba(255,138,31,0.12),transparent_70%)]"
      />
      <Embers />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          ref={wmRef}
          className="absolute left-0 top-[34%] select-none whitespace-nowrap font-display text-[clamp(8rem,22vw,20rem)] font-bold leading-none tracking-[-0.05em] text-white/[0.035] [--wm:120px] [transform:translate3d(var(--wm),0,0)]"
        >
          ABOUT ME
        </div>
      </div>
      <SectionNav />
      <BackToTop visible={showTop} ringRef={ringRef} />

      {/* ── content ── */}
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Portrait column: sticky on desktop while the right column scrolls */}
        <aside className="self-start pb-6 lg:sticky lg:top-28">
          <Portrait stageRef={stageRef} />
          <ScrollCue />
        </aside>

        <div className="min-w-0">
          {/* ═════ INTRO ═════ */}
          <header id="about-intro" className="scroll-mt-28">
            <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.035em] [text-shadow:0_6px_40px_rgba(0,0,0,0.45)]">
              <SplitTitle text="Hi, I'm" />
              <SplitTitle
                text={personal.name}
                baseDelay={220}
                wordClass="bg-gradient-to-r from-[#ff3d00] via-[#ffd2a0] to-[#ff8a1f] bg-[length:200%_100%] bg-clip-text text-transparent animate-[about-word_0.9s_cubic-bezier(0.16,1,0.3,1)_both,about-shine_5s_linear_infinite]"
              />
            </h1>

            <p
              className={`mt-5 min-h-[1.75rem] text-lg text-white/85 ${RISE}`}
              style={{ animationDelay: '600ms' }}
              aria-label={`I'm a ${ROLES[0]}`}
            >
              I&apos;m a <Typewriter words={ROLES} />
            </p>

            <p
              className={`mt-4 max-w-[54ch] text-[15px] leading-[1.65] text-white/70 ${RISE}`}
              style={{ animationDelay: '720ms' }}
            >
              {summary}
            </p>

            <ul className="mt-6 grid gap-2.5 text-sm text-white/70">
              {[
                { Icon: Pin, node: <span>{personal.location}</span> },
                {
                  Icon: Mail,
                  node: <a href={`mailto:${personal.email}`} className="hover:text-white">{personal.email}</a>,
                },
                {
                  Icon: Phone,
                  node: <a href={`tel:${personal.phone}`} className="hover:text-white">{personal.phone}</a>,
                },
              ].map(({ Icon, node }, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2.5 ${RISE}`}
                  style={{ animationDelay: `${840 + i * 90}ms` }}
                >
                  <Icon className="h-[18px] w-[18px] flex-none text-[#ff8a1f]" />
                  {node}
                </li>
              ))}
            </ul>

            <div
              className={`mt-7 flex flex-wrap items-center gap-5 ${RISE}`}
              style={{ animationDelay: '1120ms' }}
            >
              <Magnetic strength={0.28}>
                <a href="/resume.pdf" download="Abdul-Basit-CV.pdf" className={FLAME_BTN}>
                  Download CV
                  <span className={FLAME_DOT} aria-hidden="true">
                    <Download className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>

              <div className="flex gap-2">
                {socials.map(({ name, url, icon }) => {
                  const Icon = ICONS[icon] || Mail
                  return (
                    <Magnetic key={name} strength={0.4} className="!m-0 !p-1.5">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className={`grid h-[42px] w-[42px] place-items-center rounded-full text-white/70 transition-colors duration-300 hover:border-[#ff8a1f] hover:text-white ${GLASS}`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </Magnetic>
                  )
                })}
              </div>
            </div>

            {/* counters */}
            <ul className="mt-10 grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <li key={s.label} className={RISE} style={{ animationDelay: `${1300 + i * 110}ms` }}>
                  <SpotlightCard className="p-4">
                    <p className="font-display text-3xl font-medium leading-none tracking-tight sm:text-4xl">
                      <Counter to={s.value} />
                    </p>
                    <p className="mt-2 text-[12px] text-white/50">{s.label}</p>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </header>

          {/* ═════ EXPERIENCE (scroll-driven timeline) ═════ */}
          <section id="about-exp" className="mt-24 scroll-mt-28" aria-labelledby="about-exp-title">
            <BlockTitle id="about-exp-title" kicker="Roles, newest first">
              Where I&apos;ve worked
            </BlockTitle>

            <div ref={timelineRef} className="relative pl-8">
              <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
              <div
                ref={fillRef}
                aria-hidden="true"
                className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-[#ff3d00] to-[#ff8a1f] shadow-[0_0_12px_rgba(255,138,31,0.8)] will-change-transform [transform:scaleY(0)]"
              />

              <div className="grid gap-5">
                {experience.map((exp, i) => (
                  <Reveal key={i} variant="right" delay={i * 80} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 top-6 grid h-[15px] w-[15px] place-items-center rounded-full border border-white/30 bg-[#120400] transition-all duration-500 group-data-[in=true]/r:border-[#ff8a1f] group-data-[in=true]/r:bg-[#ff8a1f] group-data-[in=true]/r:shadow-[0_0_14px_rgba(255,138,31,0.9)]"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#ff8a1f] opacity-0 group-data-[in=true]/r:animate-[about-ping_2.4s_ease-out_infinite]" />
                    </span>

                    <SpotlightCard as="article" className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <div>
                          <h3 className="font-display text-[17px] font-semibold tracking-tight">{exp.role}</h3>
                          <p className="mt-0.5 text-[13.5px] text-[#ff8a1f]">
                            {exp.company}, {exp.location}
                          </p>
                        </div>
                        <span className="whitespace-nowrap rounded-full border border-white/[0.14] px-3 py-1 text-[12.5px] text-white/60 transition-colors duration-300 group-hover:border-[#ff8a1f]/50 group-hover:text-white">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="mt-4 grid gap-2 text-sm leading-[1.55] text-white/70">
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            style={{ transitionDelay: `${350 + j * 110}ms` }}
                            className="flex translate-x-3 gap-2.5 opacity-0 transition-all duration-700 ease-out group-data-[in=true]/r:translate-x-0 group-data-[in=true]/r:opacity-100"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#ff3d00]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═════ EDUCATION ═════ */}
          <section id="about-edu" className="mt-28 scroll-mt-28" aria-labelledby="about-edu-title">
            <BlockTitle id="about-edu-title" kicker="Where the foundations came from">
              Where I learned
            </BlockTitle>

            <div className="grid gap-4 sm:grid-cols-2">
              {education.map((ed, i) => (
                <Reveal key={i} variant={i % 2 ? 'right' : 'left'} delay={i * 90}>
                  <SpotlightCard as="article" className="h-full p-5">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-[#ff8a1f]/30 bg-[#ff3d00]/10 text-[#ff8a1f] transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
                      <Book className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-[17px] font-semibold tracking-tight">{ed.degree}</h3>
                    <p className="mt-1 text-[13.5px] text-[#ff8a1f]">{ed.school}</p>
                    <p className="mt-1 text-[12.5px] text-white/45">{ed.period}</p>
                    <p className="mt-3 text-sm leading-[1.6] text-white/70">{ed.description}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ═════ CERTIFICATES ═════ */}
          <section id="about-cert" className="mt-28 scroll-mt-28" aria-labelledby="about-cert-title">
            <BlockTitle id="about-cert-title" kicker="Courses and credentials">
              Credentials and training
            </BlockTitle>

            <ul className="grid gap-3.5 sm:grid-cols-2">
              {certificates.map((c, i) => (
                <Reveal as="li" key={i} variant="zoom" delay={(i % 2) * 90 + Math.floor(i / 2) * 60}>
                  <div
                    className={`group relative flex gap-3.5 overflow-hidden rounded-[14px] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8a1f]/45 ${GLASS}`}
                  >
                    {/* light sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-full w-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[200%]"
                    />
                    <Award className="h-[22px] w-[22px] flex-none text-[#ff8a1f] transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
                    <div className="relative">
                      <h3 className="text-sm font-medium">{c.title}</h3>
                      <p className="mt-0.5 text-[12.5px] text-white/70">{c.issuer}</p>
                      <span className="mt-1 block text-xs text-white/45">{c.date}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* ═════ FOCUS + MARQUEES ═════ */}
          <section id="about-focus" className="mt-28 scroll-mt-28" aria-labelledby="about-focus-title">
            <BlockTitle id="about-focus-title" kicker="What I reach for most">
              What I do best
            </BlockTitle>

            <div className="grid gap-4 sm:grid-cols-3">
              {FOCUS.map((item, i) => (
                <Reveal key={item.title} variant="up" delay={i * 110}>
                  <SpotlightCard className="h-full p-5">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-[#ff8a1f]/30 bg-gradient-to-br from-[#ff3d00]/25 to-[#ff8a1f]/10 text-[#ff8a1f] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-[17px] font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-[1.6] text-white/70">{item.desc}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            <Reveal variant="up" delay={150} className="mt-10 grid gap-3">
              <Marquee items={SKILLS_TOP} speed={30} />
              <Marquee items={SKILLS_BOTTOM} speed={34} reverse />
            </Reveal>
          </section>

          {/* ═════ CONTACT ═════ */}
          <section id="about-contact" className="mt-28 scroll-mt-28" aria-labelledby="about-contact-title">
            <Reveal variant="zoom" className="relative overflow-hidden rounded-[28px] p-px">
              {/* rotating conic border */}
              <div
                aria-hidden="true"
                className="absolute -inset-[100%] animate-[about-spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#ff3d00_90deg,transparent_180deg,#ff8a1f_270deg,transparent_360deg)]"
              />

              <div className="relative overflow-hidden rounded-[27px] bg-[#170500] px-6 py-12 text-center sm:px-12">
                <div
                  aria-hidden="true"
                  className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.35),transparent_70%)] blur-[40px] animate-[about-glow_5s_ease-in-out_infinite]"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,31,0.28),transparent_70%)] blur-[40px] animate-[about-glow_5s_ease-in-out_2.5s_infinite]"
                />

                <div className="relative">
                  <h2
                    id="about-contact-title"
                    className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    Open to opportunities
                  </h2>
                  <p className="mx-auto mt-4 max-w-[46ch] text-sm leading-[1.65] text-white/70">
                    Currently seeking internships, freelance work, and full-time roles in web development.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute inset-3 rounded-full border border-[#ff8a1f]/50 animate-[about-ping_2.4s_ease-out_infinite]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-3 rounded-full border border-[#ff8a1f]/50 animate-[about-ping_2.4s_ease-out_1.2s_infinite]"
                      />
                      <Magnetic strength={0.3}>
                        <a href={`mailto:${personal.email}`} className={`relative ${FLAME_BTN}`}>
                          Get in touch
                          <span className={FLAME_DOT} aria-hidden="true">
                            <Mail className="h-4 w-4" />
                          </span>
                        </a>
                      </Magnetic>
                    </div>
                    <CopyEmail email={personal.email} />
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </section>
  )
}