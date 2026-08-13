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
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 24,
      stiffness: 110,
    },
  },
};

type Service = {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  glow: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: 'Landing Page Development',
    description: 'High-converting, ultra-fast landing pages built for modern products, startups, and campaigns.',
    tags: ['Responsive UI', 'High Conversion', 'Fast Load'],
    accent: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.25)',
    icon: Globe,
  },
  {
    title: 'Presale & ICO Launchpads',
    description: 'Trust-focused token launch portals with tokenomics, roadmap, and wallet-ready Web3 integration.',
    tags: ['Tokenomics UI', 'Wallet Connect', 'Whitelist Funnels'],
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.25)',
    icon: Coins,
  },
  {
    title: 'Web3 Game Portals',
    description: 'Interactive gaming portals and WebGL experiences with progression mechanics and community hooks.',
    tags: ['Game UI', 'WebGL Canvas', 'Quests & Rewards'],
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.25)',
    icon: Gamepad2,
  },
  {
    title: 'Telegram Bot Development',
    description: 'Custom bots for support, real-time alerts, user onboarding, and automation for Web2/Web3.',
    tags: ['Menu & Command Bots', 'Auto Moderation', 'API Workflows'],
    accent: '#e879f9',
    glow: 'rgba(232, 121, 249, 0.22)',
    icon: Bot,
  },
  {
    title: 'Data Scraping & Pipelines',
    description: 'Automated extractors and robust data pipelines for market analytics, reporting, and research.',
    tags: ['Custom Crawlers', 'Scheduled Jobs', 'Clean Datasets'],
    accent: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.25)',
    icon: ChartSpline,
  },
  {
    title: 'Full Stack Web Products',
    description: 'End-to-end web applications, dashboards, REST/GraphQL APIs, and admin control panels.',
    tags: ['React & Node.js', 'Auth & Database', 'Scalable Arch'],
    accent: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.22)',
    icon: Layers,
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      {/* Background Ambient Orbs */}
      <motion.div
        className="services-orb services-orb-one"
        animate={{ y: [-10, 12, -10], x: [0, 14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="services-orb services-orb-two"
        animate={{ y: [10, -12, 10], x: [0, -10, 0], scale: [1.04, 0.96, 1.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Minimal Header */}
      <motion.div
        className="contact-header services-header-minimal"
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <span className="section-tag minimal-tag">Capabilities</span>
        <h2 className="section-title">What I Build</h2>
        <p className="section-subtitle">
          Engineering high-conversion Web3 DApps, token launchpads, Telegram automation &amp; full stack web applications.
        </p>
      </motion.div>

      {/* Minimal Bento Grid */}
      <motion.div
        className="services-grid minimal-services-grid"
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
              className="service-card minimal-service-card"
              variants={cardReveal}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                '--service-accent': service.accent,
                '--service-glow': service.glow,
              } as CSSProperties}
            >
              {/* Header row: Index & Icon */}
              <div className="service-card-top">
                <span className="service-minimal-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="service-icon-wrap">
                  <Icon size={18} />
                </div>
              </div>

              {/* Title & Desc */}
              <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>

              {/* Tag Pills */}
              <div className="service-minimal-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-minimal-tag">
                    <span className="tag-dot" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle hover glow ring */}
              <div className="service-card-shine" />
            </motion.article>
          );
        })}
      </motion.div>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        className="services-cta minimal-services-cta"
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
      >
        <span>Start Your Project</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </motion.a>
    </section>
  );
}