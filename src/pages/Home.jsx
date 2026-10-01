import Hero from '../components/Hero';
import About from './About';
import Certificates from './Certificates';
import Contact from './Contact';
import Projects from './Projects';
import Skills from './Skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />

    </main>
  );
}