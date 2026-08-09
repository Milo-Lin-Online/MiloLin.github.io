import { Youtube, Linkedin, Mail, ChevronRight } from '../components/Icons.jsx';
import ExperienceAccordion from '../components/ExperienceAccordion.jsx';
import { TagRow } from '../components/primitives.jsx';
import { Reel } from '../components/Chrome.jsx';

/**
 * Section order follows the original site exactly:
 * DEMO REEL → ABOUT ME → PROFESSIONAL EXPERIENCE → PORTFOLIO → SKILLS → CONNECT
 */
export default function HomePage({ portfolio, onNavigate }) {
  const { profile } = portfolio;

  return (
    <main id="main" className="page">
      <div className="wrap">
        <header className="masthead">
          <figure className="masthead-portrait">
            <img
              src={profile.photo}
              srcSet={`${profile.photo} 780w, ${profile.photo2x} 1200w`}
              sizes="200px"
              alt={profile.photoAlt}
              width="780"
              height="1040"
              fetchPriority="high"
            />
            <figcaption>{profile.photoCaption}</figcaption>
          </figure>
          <h1>MILO LIN</h1>
          <p>{profile.tagline}</p>
        </header>

        <section className="section">
          <h2 className="section-label">Demo Reel</h2>
          <Reel videoId={profile.reelId} />
        </section>

        <section className="section">
          <h2 className="section-label">About Me</h2>
          <div className="panel about">
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="edu-line">
              <strong>{profile.education.school}</strong> — {profile.education.degree},{' '}
              {profile.education.minor}. {profile.education.detail}. {profile.education.period}.
            </p>
          </div>
        </section>

        <section className="section" id="experience">
          <h2 className="section-label">Professional Experience</h2>
          <ExperienceAccordion groups={portfolio.groups} onLaneSelect={onNavigate} />
        </section>

        <section className="section">
          <h2 className="section-label">Portfolio</h2>
          <div className="portfolio-grid">
            {portfolio.lanes.map((lane) => (
              <button
                type="button"
                key={lane.key}
                className="portfolio-btn"
                onClick={() => onNavigate(lane.key)}
              >
                <h3>{lane.label.toUpperCase()}</h3>
                <p>{lane.tagline}</p>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-label">Skills</h2>
          <div className="skill-grid">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div className="skill-block" key={group}>
                <h4>{group}</h4>
                <TagRow items={items} />
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ marginBottom: 0 }}>
          <h2 className="section-label">Connect</h2>
          <div className="connect-row">
            <a className="connect-btn" href={profile.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube">
              <Youtube size={16} />
            </a>
            <a className="connect-btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a className="connect-btn" href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
