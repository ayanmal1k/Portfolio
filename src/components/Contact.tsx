import { motion } from 'framer-motion';

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
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { TbBrandFiverr } from 'react-icons/tb';

/* ─── SVG Icons from react-icons ─── */
const WhatsAppIcon = () => <FaWhatsapp size={26} />;
const TelegramIcon = () => <FaTelegramPlane size={26} />;
const FiverrIcon = () => <TbBrandFiverr size={28} />;

const contacts = [
  {
    name: 'WhatsApp',
    description: 'Quick chat & project discussions',
    icon: WhatsAppIcon,
    href: 'https://wa.me/923184894152?text=Hi',  
    color: '#25D366',
    bgGlow: 'rgba(37, 211, 102, 0.15)',
    borderColor: 'rgba(37, 211, 102, 0.2)',
  },
  {
    name: 'Telegram',
    description: 'Fast messaging & file sharing',
    icon: TelegramIcon,
    href: 'https://t.me/Web3DeveloperAyan',
    color: '#26A5E4',
    bgGlow: 'rgba(38, 165, 228, 0.15)',
    borderColor: 'rgba(38, 165, 228, 0.2)',
  },
  {
    name: 'Fiverr',
    description: 'Hire me for your next project',
    icon: FiverrIcon,
    href: 'https://www.fiverr.com/ayanmal1k',
    color: '#1DBF73',
    bgGlow: 'rgba(29, 191, 115, 0.15)',
    borderColor: 'rgba(29, 191, 115, 0.2)',
  },
];

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      {/* Section Header */}
      <motion.div
        className="contact-header"
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <span className="section-tag">Contact</span>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-subtitle">
          Got a project in mind? Reach out through any of these platforms and let's bring your ideas to life.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        className="contact-cards"
        variants={staggerCards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {contacts.map((contact) => (
          <motion.a
            key={contact.name}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            variants={cardUp}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            style={{
              '--card-color': contact.color,
              '--card-glow': contact.bgGlow,
              '--card-border': contact.borderColor,
            } as React.CSSProperties}
          >
            {/* Icon */}
            <div className="card-icon" style={{ color: contact.color }}>
              <contact.icon />
            </div>

            {/* Text */}
            <div className="card-text">
              <h3 className="card-name">{contact.name}</h3>
              <p className="card-desc">{contact.description}</p>
            </div>

            {/* Arrow */}
            <div className="card-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer line */}
      <motion.p
        className="contact-footer"
        variants={fadeUp(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        I typically respond within a few minutes ⚡
      </motion.p>
    </section>
  );
}
