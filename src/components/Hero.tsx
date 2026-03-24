import { motion } from 'framer-motion';

/* ─── animation helpers ─── */
const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const letterPull = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 18,
      stiffness: 90,
    },
  },
};

const staggerContainer = (delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: delay,
    },
  },
});

const lineGrow = (delay: number) => ({
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const scaleIn = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] as const },
  },
});

/* ─── split text into animated letters ─── */
function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      variants={staggerContainer(delay)}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '100%' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterPull}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── hero section ─── */
export default function Hero() {
  return (
    <div className="hero-content">
      {/* Badge */}
      <motion.div
        className="hero-badge"
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
      >
        <span className="hero-badge-dot" />
        <span>Portfolio</span>
      </motion.div>

      {/* Name heading */}
      <h1 className="hero-name">
        <SplitText text="AYAN" className="first-name" delay={0.3} />
        <motion.span
          className="last-name"
          variants={scaleIn(0.7)}
          initial="hidden"
          animate="visible"
        >
          MALIK
        </motion.span>
      </h1>

      {/* Role */}
      <motion.p
        className="hero-role"
        variants={fadeUp(1.1)}
        initial="hidden"
        animate="visible"
      >
        <span className="role-highlight">Full Stack & Web3 Blockchain Developer</span>
        <span className="role-separator">—</span>
        <span>crafting aesthetic &amp; functional digital experiences.</span>
      </motion.p>

      {/* CTA */}
      <motion.div
        className="hero-cta"
        variants={fadeUp(1.4)}
        initial="hidden"
        animate="visible"
      >
        <a href="#projects" className="cta-primary">
          <span>View My Work</span>
          <span className="btn-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </a>
        <a href="#contact" className="cta-secondary">
          <span>Get In Touch</span>
        </a>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="hero-divider"
        variants={lineGrow(1.7)}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
}
