import { memo, useCallback, useId, useState } from 'react';
import { ChevronDown } from './Icons.jsx';
import { Avatar, Bullets, Rich, TagRow } from './primitives.jsx';

const LANE_LABELS = {
  art: '3D Art',
  techart: 'Tech Art',
  product: 'Product + Marketing',
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

        {/* Rendered even when empty so the grid columns stay aligned. */}
        <span className="acc-period">
          {experience.period}
          {experience.period && experience.isCurrent ? ' ●' : ''}
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
              {experience.hasProgression && (
                <div className="aside-block">
                  <p className="aside-label">Progression</p>
                  <ol className="progression">
                    {experience.progression.map((step, i) => (
                      <li
                        key={step.role}
                        className={i === experience.progression.length - 1 ? 'is-current' : ''}
                      >
                        <span className="progression-role">{step.role}</span>
                        {step.note && <span className="progression-note">{step.note}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {experience.tools?.length > 0 && (
                <div className="aside-block">
                  <p className="aside-label">Tools &amp; methods</p>
                  <TagRow items={experience.tools} />
                </div>
              )}

              {experience.lanes?.length > 0 && (
                <div className="aside-block">
                  <p className="aside-label">Related work</p>
                  <div className="tag-row">
                    {experience.lanes.map((lane) => (
                      <button
                        type="button"
                        key={lane}
                        className="lane-chip"
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
            {group.note && <span className="acc-note">{group.note}</span>}
          </header>

          <div className="acc-list">
          {group.items.map((experience) => (
            <ExperienceRow
              key={experience.id}
              experience={experience}
              isOpen={openId === experience.id}
              onToggle={toggle}
              onLaneSelect={onLaneSelect}
            />
          ))}
          </div>
        </section>
      ))}
    </div>
  );
}
