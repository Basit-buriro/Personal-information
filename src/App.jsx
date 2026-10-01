import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!booted) {
    return (
      <div className="fixed inset-0 bg-cyber-bg flex items-center justify-center">
        <p className="text-cyber-cyan font-mono tracking-widest">
          ▍ BOOTING SYSTEM…
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Cursor />
      <Terminal />
      <ScrollToTop />
      <div className="min-h-screen bg-cyber-bg text-slate-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cv" element={<CV />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 pt-24">
                <h1 className="font-display text-6xl text-white">404</h1>
                <p className="font-mono text-sm text-cyber-cyan/70 tracking-widest">
                  SIGNAL LOST — PAGE NOT FOUND
                </p>
                <a href="/" className="mt-4 px-5 py-2 rounded-lg border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all font-mono text-xs tracking-widest">
                  ← RETURN TO BASE
                </a>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}