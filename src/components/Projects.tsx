import { useState } from 'react';
import { motion } from 'framer-motion';
import projectData from '../projectData.json';
import WorkDetailModal, { type ProjectData } from './WorkDetailModal';

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const staggerGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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
      damping: 22,
      stiffness: 100,
    },
  },
};

/* ─── Project Data ─── */
const projects: ProjectData[] = projectData as ProjectData[];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section className="projects-section" id="projects">
      {/* Section Header */}
      <motion.div
        className="contact-header"
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <span className="section-tag">Projects</span>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-subtitle">
          A curated collection of projects showcasing full-stack development, Web3 integrations, and modern UI design.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="projects-grid"
        variants={staggerGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.name}
            className="project-card"
            variants={cardReveal}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
                loading="lazy"
              />
              <div className="project-image-overlay" />
            </div>

            {/* Info */}
            <div className="project-info">
              <div className="project-text">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
              </div>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Work Detail Modal Overlay */}
      <WorkDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
