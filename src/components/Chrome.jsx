import { useState } from 'react';
import { Mail, Linkedin, Play } from './Icons.jsx';

/** The boat, reused as the nav mark and the favicon. */
export function BoatMark({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12.9 4.2 18 10.2a.5.5 0 0 1-.4.8h-4.7V4.5c0-.5.6-.7.9-.3Z" fill="currentColor" />
      <path
        d="M3.4 14h17.2l-2.2 4.7a2 2 0 0 1-1.8 1.1H7.4a2 2 0 0 1-1.8-1.1L3.4 14Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav({ portfolio, current, onNavigate }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <button type="button" className="nav-mark" onClick={() => onNavigate('home')}>
          <BoatMark />
          Milo Lin
        </button>

        <div className="nav-links">
          {portfolio.lanes.map((lane) => (
            <button
              type="button"
              key={lane.key}
              className={`nav-link${current === lane.key ? ' is-active' : ''}`}
              onClick={() => onNavigate(lane.key)}
            >
              {lane.label}
            </button>
          ))}

          <a
            className="nav-icon"
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a className="nav-icon" href={`mailto:${portfolio.profile.email}`} aria-label="Email Milo">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}

/**
 * Reel — a click-to-load facade. The YouTube iframe (and its ~700KB of
 * script) is only fetched if someone actually presses play.
 */
export function Reel({ videoId, label = 'Play demo reel' }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div className="reel">
        <div className="reel-play" style={{ cursor: 'default' }}>
          <span className="ring">
            <Play size={20} />
          </span>
          Reel coming soon
        </div>
      </div>
    );
  }

  return (
    <div className="reel">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={label}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button type="button" className="reel-play" onClick={() => setPlaying(true)}>
          <span className="ring">
            <Play size={20} />
          </span>
          {label}
        </button>
      )}
    </div>
  );
}

export function Footer({ portfolio, fishEnabled, onToggleFish }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Milo Lin — {portfolio.profile.location}</span>

        <div className="footer-links">
          <a className="link-pill" href={`mailto:${portfolio.profile.email}`}>
            <Mail size={12} /> Email
          </a>
          <a
            className="link-pill"
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Linkedin size={12} /> LinkedIn
          </a>
          <button
            type="button"
            className="fish-toggle"
            onClick={onToggleFish}
            aria-pressed={fishEnabled}
          >
            Fish cursor: {fishEnabled ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </footer>
  );
}
