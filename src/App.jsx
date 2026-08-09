import { useCallback, useEffect, useMemo, useState } from 'react';
import { Portfolio } from './domain/Portfolio.js';
import { portfolioData } from './data/portfolio.data.js';
import { FishCursor } from './services/FishCursor.js';
import FishCursorLayer from './components/FishCursorLayer.jsx';
import { Nav, Footer } from './components/Chrome.jsx';
import HomePage from './pages/HomePage.jsx';
import LanePage from './pages/LanePage.jsx';

export default function App() {
  // Built once. Every component below reads objects, not raw data.
  const portfolio = useMemo(() => Portfolio.from(portfolioData), []);

  const [view, setView] = useState('home');
  const [fishEnabled, setFishEnabled] = useState(() => FishCursor.isSupported());

  const navigate = useCallback((next) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Keep the tab title in step with the current lane.
  useEffect(() => {
    const lane = portfolio.lane(view);
    document.title = lane ? `${lane.label} — Milo Lin` : 'Milo Lin — Game Art, Tech Art, Product';
  }, [view, portfolio]);

  const lane = portfolio.lane(view);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

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
    </>
  );
}
