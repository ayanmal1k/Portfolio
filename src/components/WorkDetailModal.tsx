import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectData {
  name: string;
  description: string;
  tech: string[];
  image: string;
  images: string[];
}

interface WorkDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function WorkDetailModal({ project, onClose }: WorkDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">{project.name}</h2>
              <p className="modal-desc">{project.description}</p>
              <div className="modal-tech-stack">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>

            {/* Image Viewer */}
            <div className="image-viewer vertical">
              <div className="vertical-container">
                  {project.images.map((imgSrc, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      className="vertical-image-wrapper"
                    >
                      <img src={imgSrc} alt={`${project.name} view ${idx + 1}`} className="modal-image" />
                    </motion.div>
                  ))}
                  {project.images.length === 0 && (
                     <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: '-50px' }}
                     className="vertical-image-wrapper"
                   >
                     <img src={project.image} alt={project.name} className="modal-image" />
                   </motion.div>
                  )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
