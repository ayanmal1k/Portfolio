import Aurora from './components/AuroraBackground';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { useState, useEffect } from 'react';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container">
      {/* Global Interactive Cursor */}
      <CustomCursor />

      {/* ─── Hero Section ─── */}
      <div className="hero-wrapper">
        {/* Aurora Background */}
        <div className="aurora-container" aria-hidden="true">
          <Aurora
            colorStops={['#3730a3', '#7c3aed', '#db2777']}
            blend={0.6}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Gradient depth overlay */}
        <div className="hero-overlay" />

        {/* Header */}
        <header className="hero-header">
          <div className="logo">AM</div>
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
          <div className="status">
            <span className="status-dot" />
            <span>Available</span>
          </div>
        </header>

        {/* Hero Content */}
        <Hero />

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* ─── Services Section ─── */}
      <Services />

      {/* ─── Projects Section ─── */}
      <Projects />

      {/* ─── Contact Section ─── */}
      <Contact />

      {/* ─── Footer ─── */}
      <Footer />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Scroll back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
