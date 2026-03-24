import Aurora from './components/AuroraBackground';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page-container">
      {/* ─── Hero Section ─── */}
      <div className="hero-wrapper">
        {/* Aurora Background */}
        <div className="aurora-container">
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
          <nav>
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
    </div>
  );
}

export default App;
