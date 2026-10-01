import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Spring-following outer ring
  const ringX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointers
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(canHover);
    if (!canHover) return;

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Hover state on interactive elements
    const isInteractive = (el) =>
      el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );

    const onOver = (e) => {
      if (isInteractive(e.target)) setHovering(true);
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Hide default cursor on the whole page */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner dot (instant follow) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.6 : hovering ? 1.4 : 1,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full bg-cyber-cyan"
          style={{ boxShadow: '0 0 12px rgba(0,229,255,0.9)' }}
        />
      </motion.div>

      {/* Outer trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.85 : hovering ? 1.8 : 1,
            opacity: visible ? (hovering ? 0.6 : 0.35) : 0,
            borderWidth: hovering ? '2px' : '1.5px',
          }}
          transition={{ duration: 0.2 }}
          className="w-9 h-9 rounded-full border border-cyber-cyan"
          style={{
            boxShadow: hovering
              ? '0 0 24px rgba(0,229,255,0.6)'
              : '0 0 12px rgba(0,229,255,0.3)',
          }}
        />
      </motion.div>

      {/* Hover glow overlay for buttons/links */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: hovering ? 2.4 : 0,
            opacity: hovering ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet"
          style={{ filter: 'blur(12px)' }}
        />
      </motion.div>
    </>
  );
}