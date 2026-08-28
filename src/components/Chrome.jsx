import { useEffect, useState } from 'react';
import { Mail, Linkedin, Menu, X } from './Icons.jsx';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu whenever the view changes, so a tap navigates and dismisses.
  useEffect(() => {
    setMenuOpen(false);
  }, [current]);

  // While the menu is open, stop the page behind it from scrolling.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const go = (key) => {
    setMenuOpen(false);
    onNavigate(key);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button type="button" className="nav-mark" onClick={() => go('home')}>
          <BoatMark />
          Milo Lin
        </button>

        {/* Desktop links */}
        <div className="nav-links">
          {portfolio.lanes.map((lane) => (
            <button
              type="button"
              key={lane.key}
              className={`nav-link${current === lane.key ? ' is-active' : ''}`}
              onClick={() => go(lane.key)}
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
            <Linkedin size={15} />
          </a>
          <a className="nav-icon" href={`mailto:${portfolio.profile.email}`} aria-label="Email Milo">
            <Mail size={15} />
          </a>
        </div>

        {/* Mobile menu button — CSS swaps which of the two is visible */}
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className={`nav-drawer${menuOpen ? ' is-open' : ''}`} id="mobile-menu">
        {portfolio.lanes.map((lane) => (
          <button
            type="button"
            key={lane.key}
            className={`nav-drawer-link${current === lane.key ? ' is-active' : ''}`}
            onClick={() => go(lane.key)}
          >
            {lane.label}
          </button>
        ))}
        <button type="button" className="nav-drawer-link" onClick={() => go('home')}>
          Home
        </button>
        <div className="nav-drawer-icons">
          <a
            className="connect-btn"
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            className="connect-btn"
            href={`mailto:${portfolio.profile.email}`}
            aria-label="Email Milo"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </nav>
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
