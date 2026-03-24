import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  ChartSpline,
  Coins,
  Gamepad2,
  Globe,
  Layers,
  type LucideIcon,
} from 'lucide-react';

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const staggerCards = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 22,
      stiffness: 95,
    },
  },
};

type Service = {
  title: string;
  description: string;
  features: string[];
  accent: string;
  glow: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: 'Landing Page Development',
    description: 'High-converting, modern landing pages designed for products, startups, and campaigns.',
    features: ['Responsive design', 'Fast loading', 'Conversion-focused layout'],
    accent: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.24)',
    icon: Globe,
  },
  {
    title: 'Presale and ICO Token Websites',
    description: 'Trust-focused token launch sites with clear tokenomics, roadmap, and wallet-ready UX.',
    features: ['Tokenomics and roadmap sections', 'Wallet flow ready UI', 'Whitelist and CTA funnels'],
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.24)',
    icon: Coins,
  },
  {
    title: 'Web3 Game Websites and Features',
    description: 'Interactive Web3 gaming portals with engaging UI, progression logic, and community hooks.',
    features: ['Game portal interfaces', 'Quest and reward sections', 'Community integration'],
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.24)',
    icon: Gamepad2,
  },
  {
    title: 'Telegram Bot Development',
    description: 'Custom bots for support, alerts, onboarding, and automation in Web2 and Web3 projects.',
    features: ['Command and menu bots', 'Auto-replies and moderation', 'API integration support'],
    accent: '#e879f9',
    glow: 'rgba(232, 121, 249, 0.2)',
    icon: Bot,
  },
  {
    title: 'Data Scraping and Automation',
    description: 'Reliable scraping workflows and data pipelines for market research, analytics, and reporting.',
    features: ['Custom extractors', 'Scheduled automation', 'Clean export formats'],
    accent: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.24)',
    icon: ChartSpline,
  },
  {
    title: 'Full Stack Product Features',
    description: 'End-to-end feature development for dashboards, APIs, authentication, and admin tooling.',
    features: ['Frontend + backend delivery', 'Secure auth patterns', 'Scalable architecture'],
    accent: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.2)',
    icon: Layers,
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <motion.div
        className="services-orb services-orb-one"
        animate={{ y: [-12, 14, -12], x: [0, 16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="services-orb services-orb-two"
        animate={{ y: [10, -14, 10], x: [0, -12, 0], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="contact-header"
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <span className="section-tag">Services</span>
        <h2 className="section-title">What I Build</h2>
        <p className="section-subtitle">
          From token launch websites to automation and bots, I build digital products that are fast, scalable, and ready for real users.
        </p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={staggerCards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.article
              key={service.title}
              className="service-card"
              variants={cardReveal}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                '--service-accent': service.accent,
                '--service-glow': service.glow,
              } as CSSProperties}
            >
              <div className="service-card-top">
                <div className="service-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="service-icon-wrap">
                  <Icon size={18} />
                </div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="service-card-shine" />
            </motion.article>
          );
        })}
      </motion.div>

      <motion.a
        href="#contact"
        className="services-cta"
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
      >
        Start Your Project
      </motion.a>
    </section>
  );
}