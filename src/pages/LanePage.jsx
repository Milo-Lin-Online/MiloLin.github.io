import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ExperienceAccordion from '../components/ExperienceAccordion.jsx';
import ProjectGrid, { ProjectModal } from '../components/ProjectGrid.jsx';
import { SectionHead } from '../components/primitives.jsx';
import { Reel } from '../components/Chrome.jsx';

/**
 * One portfolio lane: 3D Art, Tech Art, or Product + Marketing.
 *
 * The experience accordion here is filtered to roles that belong to this lane,
 * so a recruiter looking at Product + Marketing sees WB Games and DraftKings,
 * while Tech Art shows the labs and capture research.
 */
export default function LanePage({ portfolio, lane, onNavigate }) {
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => portfolio.groupsForLane(lane.key), [portfolio, lane.key]);
  const projects = useMemo(() => lane.projects, [lane]);

  return (
    <main id="main" style={{ '--lane': `var(${lane.accentVar})` }}>
      <section className="hero" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <button
            type="button"
            className="nav-link"
            style={{ paddingLeft: 0, marginBottom: 14, display: 'inline-flex', gap: 8, alignItems: 'center' }}
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft size={13} /> All work
          </button>

          <p className="eyebrow">{lane.tagline}</p>
          <h1 className="hero-name" style={{ fontSize: 'clamp(38px, 7.5vw, 82px)' }}>
            {lane.label}
          </h1>
          <p className="prose" style={{ marginTop: 22 }}>
            {lane.blurb}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Reel" title="Selected motion" />
          <Reel videoId={lane.reelId} label={`Play ${lane.label} reel`} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Projects"
            title="Work"
            note={`${projects.length} project${projects.length === 1 ? '' : 's'}`}
          />
          <ProjectGrid projects={projects} onOpen={setSelected} />
        </div>
      </section>

      {groups.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead
              eyebrow="Experience"
              title={`${lane.label} experience`}
              note="Filtered to this lane"
            />
            <ExperienceAccordion groups={groups} onLaneSelect={onNavigate} />
          </div>
        </section>
      )}

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
