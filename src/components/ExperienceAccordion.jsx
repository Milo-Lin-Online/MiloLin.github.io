import { memo, useCallback, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar, Bullets, Rich, TagRow } from './primitives.jsx';

const LANE_LABELS = {
  art: '3D Art',
  techart: 'Tech Art',
  product: 'Product + Marketing',
};

const LANE_VARS = {
  art: '--lane-art',
  techart: '--lane-tech',
  product: '--lane-product',
};

/**
 * One accordion row. Memoised so opening a row only re-renders that row.
 * Every visual difference between a co-op, a research role, and a client
 * project comes from the object's own kindLabel / accentVar / contextLine.
 */
const ExperienceRow = memo(function ExperienceRow({ experience, isOpen, onToggle, onLaneSelect }) {
  const panelId = useId();

  return (
    <div
      className={`acc-item${isOpen ? ' is-open' : ''}`}
      style={{ '--lane': `var(${experience.accentVar})` }}
    >
      <button
        type="button"
        className="acc-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(experience.id)}
      >
        <Avatar experience={experience} />

        <span>
          <span className="acc-role" style={{ display: 'block' }}>
            {experience.role}
          </span>
          <span className="acc-org" style={{ display: 'block' }}>
            {experience.org}
          </span>
          {experience.contextLine && (
            <span className="acc-context" style={{ display: 'block' }}>
              {experience.contextLine}
            </span>
          )}
        </span>

        <span className="acc-badge">{experience.kindLabel}</span>

        <span className="acc-period">
          {experience.period}
          {experience.isCurrent && ' ●'}
        </span>

        <ChevronDown className="acc-chevron" size={18} aria-hidden="true" />
      </button>

      <div className="acc-panel" id={panelId} role="region">
        <div className="acc-clip">
          <div className="acc-body">
            {/* Left: what I actually did */}
            <div>
              {experience.summary && (
                <p className="acc-summary">
                  <Rich text={experience.summary} />
                </p>
              )}
              <Bullets items={experience.bullets} />
            </div>

            {/* Right: the panel that fills the space */}
            <aside className="acc-aside">
              {experience.highlight ? (
                <div className="aside-block">
                  <p className="eyebrow">Highlight</p>
                  <p className="highlight-value">{experience.highlight.value}</p>
                  <p className="highlight-label">{experience.highlight.label}</p>
                </div>
              ) : (
                <div className="aside-block">
                  <p className="eyebrow">{experience.kindLabel}</p>
                  <p className="highlight-label" style={{ marginTop: 8 }}>
                    {experience.org}
                  </p>
                </div>
              )}

              {experience.tools?.length > 0 && (
                <div className="aside-block">
                  <p className="eyebrow" style={{ marginBottom: 9 }}>
                    Tools & methods
                  </p>
                  <TagRow items={experience.tools} />
                </div>
              )}

              {experience.lanes?.length > 0 && (
                <div className="aside-block">
                  <p className="eyebrow" style={{ marginBottom: 9 }}>
                    Related work
                  </p>
                  <div className="tag-row">
                    {experience.lanes.map((lane) => (
                      <button
                        type="button"
                        key={lane}
                        className="lane-chip"
                        style={{ '--chip': `var(${LANE_VARS[lane]})` }}
                        onClick={() => onLaneSelect?.(lane)}
                      >
                        {LANE_LABELS[lane] ?? lane} →
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * ExperienceAccordion — renders ExperienceGroup objects in order.
 * Pass `groups` from portfolio.groups (home) or portfolio.groupsForLane(key).
 */
export default function ExperienceAccordion({ groups, onLaneSelect, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  const toggle = useCallback((id) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div>
      {groups.map((group) => (
        <section className="acc-group" key={group.key}>
          <header className="acc-group-head">
            <h3>{group.label}</h3>
            {group.note && <span className="section-note">{group.note}</span>}
          </header>

          {group.items.map((experience) => (
            <ExperienceRow
              key={experience.id}
              experience={experience}
              isOpen={openId === experience.id}
              onToggle={toggle}
              onLaneSelect={onLaneSelect}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
