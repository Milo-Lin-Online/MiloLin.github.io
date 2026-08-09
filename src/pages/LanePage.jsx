import { useMemo, useState } from 'react';
import { ArrowLeft } from '../components/Icons.jsx';
import ExperienceAccordion from '../components/ExperienceAccordion.jsx';
import ProjectGrid, { ProjectModal } from '../components/ProjectGrid.jsx';
import { Reel } from '../components/Chrome.jsx';

export default function LanePage({ portfolio, lane, onNavigate }) {
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => portfolio.groupsForLane(lane.key), [portfolio, lane.key]);
  const projects = useMemo(() => lane.projects, [lane]);

  return (
    <main id="main" className="page">
      <div className="wrap">
        <button type="button" className="back-link" onClick={() => onNavigate('home')}>
          <ArrowLeft size={13} /> All work
        </button>

        <header className="lane-head section">
          <h1>{lane.label}</h1>
          <p className="lane-tagline">{lane.tagline}</p>
          <p className="lane-blurb">{lane.blurb}</p>
        </header>

        <section className="section">
          <h2 className="section-label">Reel</h2>
          <Reel videoId={lane.reelId} label={`Play ${lane.label} reel`} />
        </section>

        <section className="section">
          <h2 className="section-label">Work</h2>
          <ProjectGrid projects={projects} onOpen={setSelected} />
        </section>

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
