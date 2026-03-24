import { motion } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { TbBrandFiverr } from 'react-icons/tb';
import { MdOutlineEmail } from 'react-icons/md';

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/ayanmal1k/',
    color: '#0A66C2',
    glow: 'rgba(10, 102, 194, 0.35)',
  },
  {
    label: 'Email',
    icon: MdOutlineEmail,
    href: 'mailto:malikayan575@gmail.com',
    color: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.35)',
  },
  
  {
    label: 'Fiverr',
    icon: TbBrandFiverr,
    href: 'https://www.fiverr.com/ayanmal1k',
    color: '#1DBF73',
    glow: 'rgba(29, 191, 115, 0.35)',
  },
  {
    label: 'Telegram',
    icon: FaTelegramPlane,
    href: 'https://t.me/Web3DeveloperAyan',
    color: '#26A5E4',
    glow: 'rgba(38, 165, 228, 0.35)',
  },
  {
    label: 'WhatsApp',
    icon: FaWhatsapp,
    href: 'https://wa.me/923184894152?text=Hi',
    color: '#25D366',
    glow: 'rgba(37, 211, 102, 0.35)',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 18, stiffness: 120 },
  },
};

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Top rule */}
      <div className="footer-rule" />

      {/* Heading */}
      <motion.div
        className="footer-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="footer-eyebrow">Connect with me</p>
        <h2 className="footer-title">Let's stay in touch</h2>
      </motion.div>

      {/* Icons row */}
      <motion.div
        className="footer-icons"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {socialLinks.map(({ label, icon: Icon, href, color, glow }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="footer-icon-btn"
            variants={item}
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={
              {
                '--icon-color': color,
                '--icon-glow': glow,
              } as React.CSSProperties
            }
          >
            <Icon size={22} />
            <span className="footer-icon-label">{label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Bottom line */}
      <motion.p
        className="footer-copy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        © {new Date().getFullYear()} Ayan Malik · All rights reserved
      </motion.p>
    </footer>
  );
}
