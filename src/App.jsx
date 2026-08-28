import { useCallback, useEffect, useMemo, useState } from 'react';
import { Portfolio } from './domain/Portfolio.js';
import { portfolioData } from './data/portfolio.data.js';
import { content } from './content/loadContent.js';
import { FishCursor } from './services/FishCursor.js';
import FishCursorLayer from './components/FishCursorLayer.jsx';
import SplashLayer from './components/SplashLayer.jsx';
import { Nav, Footer } from './components/Chrome.jsx';
import HomePage from './pages/HomePage.jsx';
import LanePage from './pages/LanePage.jsx';
import { VERSION, VERSION_LABEL } from './version.js';

export default function App() {
  // Built once. Every component below reads objects, not raw data.
  const portfolio = useMemo(() => Portfolio.from(portfolioData, content), []);

  const [view, setView] = useState('home');
  const [fishEnabled, setFishEnabled] = useState(() => FishCursor.isSupported());

  const navigate = useCallback((next) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Keep the tab title in step with the current lane.
  useEffect(() => {
    const current = portfolio.lane(view);
    document.title = current
      ? `${current.label} — Milo Lin`
      : 'Milo Lin — Game Art, Tech Art, Product';
  }, [view, portfolio]);

  // Makes the live build identifiable without squinting at the corner.
  useEffect(() => {
    window.__MILO_VERSION__ = VERSION;
    console.log(`%cMilo Lin portfolio ${VERSION_LABEL}`, 'color:#5FD4C4');
  }, []);

  const lane = portfolio.lane(view);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SplashLayer />
      <FishCursorLayer enabled={fishEnabled} />

      <Nav portfolio={portfolio} current={view} onNavigate={navigate} />

      {lane ? (
        <LanePage portfolio={portfolio} lane={lane} onNavigate={navigate} />
      ) : (
        <HomePage portfolio={portfolio} onNavigate={navigate} />
      )}

      <Footer
        portfolio={portfolio}
        fishEnabled={fishEnabled}
        onToggleFish={() => setFishEnabled((on) => !on)}
      />

      <span className="version-badge" title={`Build ${VERSION_LABEL}`}>
        {VERSION_LABEL}
      </span>
    </>
  );
}
