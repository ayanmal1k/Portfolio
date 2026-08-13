import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf');

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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setFullscreenImage(null);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && project.images.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % project.images.length);
      } else if (e.key === 'ArrowLeft' && project.images.length > 1) {
        setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, fullscreenImage]);

  if (!project) return null;

  const displayImages = project.images.length > 0 ? project.images : (project.image ? [project.image] : []);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            className="modal-content proof-modal-content"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-top">
                <span className="modal-badge-tag">Proof of Work</span>
                {displayImages.length > 0 && (
                  <span className="modal-image-counter">
                    {displayImages.length > 1
                      ? `Preview ${activeImageIndex + 1} of ${displayImages.length}`
                      : `${displayImages.length} View Available`}
                  </span>
                )}
              </div>
              <h2 className="modal-title" id="modal-project-title">{project.name}</h2>
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
                {displayImages.length > 0 ? (
                  displayImages.map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      className={`vertical-image-wrapper ${idx === activeImageIndex ? 'active-preview-frame' : ''}`}
                      onClick={() => !isPdf(src) && setFullscreenImage(src)}
                    >
                      {isPdf(src) ? (
                        <div className="pdf-preview-box">
                          <iframe
                            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
                            className="modal-pdf"
                            title={`${project.name} view ${idx + 1}`}
                          />
                          <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdf-download-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open Full PDF Deck ↗
                          </a>
                        </div>
                      ) : (
                        <div className="modal-image-hover-wrap">
                          <img
                            src={src}
                            alt={`${project.name} screenshot ${idx + 1}`}
                            className="modal-image"
                            loading="lazy"
                          />
                          <div className="image-expand-hint">
                            <span>Click to Expand</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="modal-image-placeholder">
                    <span>No preview media available</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Lightbox Modal */}
          {fullscreenImage && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenImage(null)}
            >
              <button className="lightbox-close-btn" onClick={() => setFullscreenImage(null)}>
                &times;
              </button>
              <img src={fullscreenImage} alt="Fullscreen preview" className="lightbox-image" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
