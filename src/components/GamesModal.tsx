import { motion, AnimatePresence } from 'framer-motion';

export interface GameData {
  name: string;
  description: string;
  thumbnail: string;
  video: string;
  playUrl?: string;
}

interface GamesModalProps {
  game: GameData | null;
  onClose: () => void;
}

export default function GamesModal({ game, onClose }: GamesModalProps) {
  if (!game) return null;

  return (
    <AnimatePresence>
      {game && (
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
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{game.name}</h2>
              <p className="modal-desc">{game.description}</p>
              {game.playUrl && (
                <a href={game.playUrl} target="_blank" rel="noopener noreferrer" className="game-play-link">
                  Play Game &rarr;
                </a>
              )}
            </div>

            <div className="image-viewer vertical">
              <div className="vertical-container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="vertical-image-wrapper"
                >
                  <video
                    className="modal-image game-video"
                    src={game.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
