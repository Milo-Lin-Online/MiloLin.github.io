import { useMemo, useState } from 'react';
import { ArrowLeft } from '../components/Icons.jsx';
import ExperienceAccordion from '../components/ExperienceAccordion.jsx';
import ProjectGrid, { ProjectModal } from '../components/ProjectGrid.jsx';
import ContentSection from '../components/ContentSection.jsx';
import ReelPlayer, { hasReel } from '../components/ReelPlayer.jsx';

export default function LanePage({ portfolio, lane, onNavigate }) {
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => portfolio.groupsForLane(lane.key), [portfolio, lane.key]);
  const projects = useMemo(() => lane.projects, [lane]);

  // The three places a reel can come from, in priority order.
  const reelSources = {
    file: lane.content?.reel,
    link: lane.content?.reelLink,
    fallback: lane.reelUrl,
  };

  return (
    <main id="main" className="page">
      <div className="wrap">
        <button type="button" className="back-link" onClick={() => onNavigate('home')}>
          <ArrowLeft size={13} /> All work
        </button>

        <header className="lane-head section">
          <h1>{lane.label}</h1>
          <p className="lane-tagline">{lane.tagline}</p>
          {/* If content/<Section>/description.txt exists it replaces this and
              renders below the reel instead, per the intended reading order:
              title → reel → text → galleries. */}
          {!lane.content?.description && lane.blurb && (
            <p className="lane-blurb">{lane.blurb}</p>
          )}
        </header>

        {/* Reel, from whichever source exists: REEL.mp4, REEL.txt, or the
            reelUrl typed into portfolio.data.js. Skipped entirely if none. */}
        {hasReel(reelSources) && (
          <section className="section">
            <h2 className="section-label">Reel</h2>
            <ReelPlayer {...reelSources} label={`Play ${lane.label} reel`} />
          </section>
        )}

        {/* Intro text and galleries from content/<Section>/. */}
        {lane.hasContent && <ContentSection section={lane.content} />}

        {/* Hand-written projects from portfolio.data.js. The heading changes
            when there's also folder content above it, so the two don't read
            as the same list. */}
        {projects.length > 0 && (
          <section className="section">
            <h2 className="section-label">{lane.hasContent ? 'More work' : 'Work'}</h2>
            <ProjectGrid projects={projects} onOpen={setSelected} />
          </section>
        )}

        {groups.length > 0 && (
          <section className="section" style={{ marginBottom: 0 }}>
            <h2 className="section-label">Related Experience</h2>
            <ExperienceAccordion groups={groups} onLaneSelect={onNavigate} />
          </section>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
