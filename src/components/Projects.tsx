import { useState, useMemo } from 'react';
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

type Tab = 'all' | 'websites' | 'games';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);

  // Filtered websites
  const filteredWebsites = useMemo(() => {
    return projects.filter((project) => {
      return (
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      return (
        searchQuery === '' ||
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

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
        <span className="section-tag">Proof of Work</span>
        <h2 className="section-title">Selected Projects &amp; Deliverables</h2>
        <p className="section-subtitle">
          Explore real-world client builds, Web3 DApps, Telegram bots, token presales, and WebGL web games.
        </p>
      </motion.div>

      {/* Tabs Bar with Counts */}
      <motion.div
        className="projects-tabs-wrapper"
        variants={fadeUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="projects-tabs">
          <button
            className={`projects-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>All Proof of Work</span>
            <span className="tab-count-badge">{projects.length + games.length}</span>
          </button>
          <button
            className={`projects-tab ${activeTab === 'websites' ? 'active' : ''}`}
            onClick={() => setActiveTab('websites')}
          >
            <span>Websites &amp; DApps</span>
            <span className="tab-count-badge">{projects.length}</span>
          </button>
          <button
            className={`projects-tab ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <span>Web Games</span>
            <span className="tab-count-badge">{games.length}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="projects-search-bar">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="projects-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </motion.div>

      {/* Grid Content */}
      <div className="projects-content-wrap">
        {/* Websites Grid */}
        {(activeTab === 'all' || activeTab === 'websites') && (
          <div className="projects-category-group">
            {activeTab === 'all' && (
              <h3 className="category-group-heading">Websites &amp; Applications ({filteredWebsites.length})</h3>
            )}

            {filteredWebsites.length > 0 ? (
              <div className="projects-grid fade-in-grid">
                {filteredWebsites.map((project, idx) => (
                  <motion.div
                    key={project.name}
                    className="project-card proof-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Card Badge */}
                    <div className="card-top-badge">
                      {project.image && isPdf(project.image) ? (
                        <span className="card-badge pdf-badge">📄 PDF Deck Presentation</span>
                      ) : (
                        <span className="card-badge app-badge">⚡ Full App / DApp</span>
                      )}
                    </div>

                    <div className="project-image-wrapper">
                      {project.image && isPdf(project.image) ? (
                        <div className="pdf-card-thumbnail">
                          <div className="pdf-thumbnail-icon">📄</div>
                          <span className="pdf-thumbnail-title">{project.name} Deck</span>
                          <span className="pdf-thumbnail-hint">Click to Open Interactive PDF</span>
                          <div className="project-image-overlay" />
                        </div>
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
                            <span>Preview Coming Soon</span>
                          </div>
                          <div className="project-image-overlay" />
                        </>
                      )}
                      
                      <div className="project-card-hover-action">
                        <span>View Full Website &rarr;</span>
                      </div>
                    </div>

                    <div className="project-info">
                      <div className="project-text">
                        <h3 className="project-name">{project.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-results-box">
                <p>No website projects found matching "{searchQuery}".</p>
                <button onClick={() => setSearchQuery('')} className="reset-filter-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Web Games Grid */}
        {(activeTab === 'all' || activeTab === 'games') && (
          <div className="projects-category-group" style={{ marginTop: activeTab === 'all' ? '4rem' : '0' }}>
            {activeTab === 'all' && (
              <h3 className="category-group-heading">Web3 Web Games ({filteredGames.length})</h3>
            )}

            {filteredGames.length > 0 ? (
              <div className="projects-grid games-grid fade-in-grid">
                {filteredGames.map((game, idx) => (
                  <motion.div
                    key={game.name}
                    className="project-card game-proof-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="card-top-badge">
                      <span className="card-badge game-badge">🎮 Playable Web Game</span>
                    </div>

                    <div className="project-image-wrapper">
                      <img
                        src={game.thumbnail}
                        alt={game.name}
                        className="project-image"
                        loading="lazy"
                      />
                      <div className="project-image-overlay" />
                      <div className="project-card-hover-action">
                        <span>Watch Gameplay &rarr;</span>
                      </div>
                    </div>

                    <div className="project-info">
                      <div className="project-text">
                        <h3 className="project-name">{game.name}</h3>
                        <p className="project-desc">{game.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-results-box">
                <p>No web games found matching "{searchQuery}".</p>
                <button onClick={() => setSearchQuery('')} className="reset-filter-btn">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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
