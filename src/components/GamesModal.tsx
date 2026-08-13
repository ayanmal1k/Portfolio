import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!game) return;

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!game) return null;

  const modalNode = (
    <AnimatePresence>
      {game && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-game-title"
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
            <button className="modal-close-btn" onClick={onClose} aria-label="Close game modal">
              &times;
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-top">
                <span className="modal-badge-tag game-badge">Web3 Web Game</span>
                <span className="modal-image-counter">Interactive Video Gameplay</span>
              </div>
              <h2 className="modal-title" id="modal-game-title">{game.name}</h2>
              <p className="modal-desc">{game.description}</p>
              
              {game.playUrl && (
                <div className="game-action-bar">
                  <a
                    href={game.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-play-link primary-game-btn"
                  >
                    <span>Play Live Game Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Video Viewer */}
            <div className="image-viewer vertical">
              <div className="vertical-container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vertical-image-wrapper game-video-wrapper"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    className="modal-image game-video"
                    src={game.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="video-control-overlay">
                    <span className="video-play-status">
                      {isPlaying ? '⏸ Click to Pause' : '▶ Click to Play'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
}
