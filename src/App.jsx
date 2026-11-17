import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Terminal from './components/Terminal';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import CV from './pages/CV';

const EASE = [0.22, 1, 0.36, 1];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Short splash that fades away over the already-rendered site,
   so nothing pops or reflows when it ends. */
function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-cyber-bg flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-cyber-cyan font-mono text-sm">Loading…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Fade between pages. Exit is quick, entrance is a little softer. */
function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Cursor />
      <Terminal />
      <ScrollToTop />
      <Splash />
      {/* Added w-full and overflow-x-hidden to prevent horizontal scroll */}
      <div className="min-h-screen w-full overflow-x-hidden bg-cyber-bg text-slate-100">
        <Navbar />
        <main className="w-full overflow-x-hidden">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}