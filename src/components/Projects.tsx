import { useState } from 'react';
import { motion } from 'framer-motion';
import projectData from '../projectData.json';
import WorkDetailModal, { type ProjectData } from './WorkDetailModal';
import GamesModal, { type GameData } from './GamesModal';

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

/* ─── PDF helper ─── */
const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf');

/* ─── Project Data ─── */
const projects: ProjectData[] = projectData as ProjectData[];

/* ─── Game Data ─── */
const games: GameData[] = [
  {
    name: 'Omu Craze Climber',
    description: 'Scale new heights in this thrilling climbing adventure. Navigate treacherous terrain, dodge obstacles, and reach the summit in this adrenaline-pumping platformer.',
    thumbnail: '/Games/Thumbnail/Omu Craze Climber.png',
    video: '/Games/Omu Craze Climber.mp4',
    playUrl: 'https://omucrazeclimber.netlify.app/',
  },
  {
    name: 'Manny Obstacle Run',
    description: 'Race through a relentless gauntlet of obstacles in this fast-paced endless runner. How far can you push your reflexes?',
    thumbnail: '/Games/Thumbnail/Manny Obstacle Run.png',
    video: '/Games/Manny Obstacle Run.mp4',
    playUrl: 'https://mannyobstaclerun.netlify.app/',
  },
  {
    name: 'Whack a TWM',
    description: 'A fun-filled whack-a-mole experience featuring TWM characters. Test your speed and reflexes in this addictive arcade classic with a unique twist.',
    thumbnail: '/Games/Thumbnail/Whack a TWM.png',
    video: '/Games/Whack a TWM.mp4',
    playUrl: 'https://www.thewhalemonkey.com/game',
  },
  {
    name: 'Alaw Monkey Hop',
    description: 'Join Alaw the monkey in this delightful platform hopper. Bounce across colorful platforms, collect rewards, and explore a vibrant world.',
    thumbnail: '/Games/Thumbnail/Alaw Monkey Hop.png',
    video: '/Games/Alaw Monkey Hop.mp4',
  },
];

type Tab = 'websites' | 'games';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('websites');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);

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

      {/* Tabs */}
      <motion.div
        className="projects-tabs"
        variants={fadeUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <button
          className={`projects-tab ${activeTab === 'websites' ? 'active' : ''}`}
          onClick={() => setActiveTab('websites')}
        >
          Websites
        </button>
        <button
          className={`projects-tab ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          Web Games
        </button>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'websites' && (
        <div className="projects-grid fade-in-grid">
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image-wrapper">
                {project.image && isPdf(project.image) ? (
                  <>
                    <object
                      data={`${project.image}#toolbar=0&navpanes=0&scrollbar=0&zoom=63`}
                      className="project-image project-pdf-preview"
                      type="application/pdf"
                      aria-label={project.name}
                    />
                    <div className="project-image-overlay" />
                    <div className="project-pdf-click-capture" />
                  </>
                ) : project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="project-image"
                      loading="lazy"
                    />
                    <div className="project-image-overlay" />
                  </>
                ) : (
                  <>
                    <div className="project-image project-image-placeholder">
                      <span>Image coming soon</span>
                    </div>
                    <div className="project-image-overlay" />
                  </>
                )}
              </div>

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
            </div>
          ))}
        </div>
      )}

      {activeTab === 'games' && (
        <div className="projects-grid games-grid fade-in-grid">
          {games.map((game) => (
            <div
              key={game.name}
              className="project-card"
              onClick={() => setSelectedGame(game)}
            >
              <div className="project-image-wrapper">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay" />
              </div>

              <div className="project-info">
                <div className="project-text">
                  <h3 className="project-name">{game.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <WorkDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      <GamesModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </section>
  );
}
