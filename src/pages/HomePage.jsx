import { Linkedin } from 'lucide-react';
import ExperienceAccordion from '../components/ExperienceAccordion.jsx';
import { SectionHead, TagRow } from '../components/primitives.jsx';

const LANE_VARS = {
  art: '--lane-art',
  techart: '--lane-tech',
  product: '--lane-product',
};

export default function HomePage({ portfolio, onNavigate }) {
  const { profile } = portfolio;

  return (
    <main id="main">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <p className="eyebrow">{'Game Art & Animation · Northeastern \u201927'}</p>
            <h1 className="hero-name">
              Milo
              <em>Lin</em>
            </h1>
            <p className="hero-lanes">{profile.lanesLine}</p>

            <div className="hero-meta">
              <span>{profile.location}</span>
              <span>{profile.email}</span>
            </div>

            <div className="hero-cta">
              {portfolio.lanes.map((lane) => (
                <button
                  type="button"
                  key={lane.key}
                  className="lane-btn"
                  style={{ '--lane': `var(${lane.accentVar})` }}
                  onClick={() => onNavigate(lane.key)}
                >
                  <span className="lane-dot" />
                  {lane.label}
                  <span style={{ color: 'var(--faint)' }}>{lane.count}</span>
                </button>
              ))}
            </div>
          </div>

          <img
            className="hero-photo"
            src={profile.photo}
            srcSet={`${profile.photo} 640w, ${profile.photo2x} 1120w`}
            sizes="(max-width: 720px) 60vw, 268px"
            alt={profile.photoAlt}
            width="268"
            height="268"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* ── Who I am / What I do ─────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="About" title="Who I am" />

          <div className="about-grid">
            <div>
              <div className="prose">
                {profile.whoIAm.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="edu-card">
                <p className="eyebrow">Education</p>
                <h3>{profile.education.school}</h3>
                <p>{profile.education.degree}</p>
                <p>{profile.education.minor}</p>
                <p style={{ marginTop: 8, color: 'var(--faint)' }}>{profile.education.detail}</p>
                <p style={{ marginTop: 6, fontFamily: 'var(--mono)', fontSize: 11 }}>
                  {profile.education.period}
                </p>
              </div>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                What I do
              </p>
              <div className="do-list">
                {profile.whatIDo.map((item) => (
                  <article
                    className="do-card"
                    key={item.lane}
                    style={{ '--lane': `var(${LANE_VARS[item.lane]})` }}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <section className="section" id="experience">
        <div className="wrap">
          <SectionHead
            eyebrow="Experience"
            title={'Where I\u2019ve worked'}
            note="Open a role for the detail"
          />
          <ExperienceAccordion groups={portfolio.groups} onLaneSelect={onNavigate} />

          <div style={{ marginTop: 34 }}>
            <a
              className="link-pill"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Linkedin size={13} /> See more updates on my LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills & awards ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Toolkit" title="Skills & awards" />

          <div className="skill-grid">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div className="skill-block" key={group}>
                <h4>{group}</h4>
                <TagRow items={items} />
              </div>
            ))}

            <div className="skill-block">
              <h4>Awards</h4>
              <ul className="bullets" style={{ '--lane': 'var(--lane-product)' }}>
                {profile.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
