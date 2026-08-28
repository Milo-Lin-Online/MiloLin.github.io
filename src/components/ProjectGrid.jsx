import { memo, useEffect } from 'react';
import { ExternalLink, X } from './Icons.jsx';
import { Bullets, Rich, TagRow } from './primitives.jsx';

/**
 * ProjectCard — one tile. Projects without a finished image get a typographic
 * plate rather than a stock photo, so nothing on the page is filler.
 */
const ProjectCard = memo(function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      className={`proj-card${project.featured ? ' is-featured' : ''}`}
      onClick={() => onOpen(project)}
    >
      <div className="proj-media">
        {project.cover ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt ?? project.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="proj-plate">
            <span>{project.plate}</span>
          </div>
        )}
        <span className="proj-kind">{project.kindLabel}</span>
      </div>

      <div className="proj-text">
        <h3 className="proj-title">{project.title}</h3>
        {project.subtitle && (
          <p className="proj-sub">
            <Rich text={project.subtitle} />
          </p>
        )}
        {project.metaLine && <p className="proj-meta">{project.metaLine}</p>}
      </div>
    </button>
  );
});

export function ProjectModal({ project, onClose }) {
  // Close on Escape, and stop the page behind from scrolling.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="aside-label">{project.kindLabel}</p>
            <h2 className="modal-title">{project.title}</h2>
            {project.subtitle && (
              <p className="modal-sub">
                <Rich text={project.subtitle} />
              </p>
            )}
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close project">
            <X size={17} />
          </button>
        </div>

        <div className="modal-body">
          {project.hasMedia && (
            <div className="modal-gallery">
              {project.media.map((shot) => (
                <figure className="modal-shot" key={shot.src}>
                  <img src={shot.src} alt={shot.alt ?? project.title} loading="lazy" decoding="async" />
                  {shot.caption && <figcaption>{shot.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          <Bullets items={project.bullets} />

          {project.note && <p className="modal-note">{project.note}</p>}

          {project.tools?.length > 0 && (
            <div>
              <p className="aside-label" style={{ marginBottom: 9 }}>
                Tools
              </p>
              <TagRow items={project.tools} />
            </div>
          )}

          {project.links?.length > 0 && (
            <div className="link-row">
              {project.links.map((link) => (
                <a
                  className="link-pill"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {link.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid({ projects, onOpen }) {
  if (!projects?.length) return null;
  return (
    <div className="proj-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpen} />
      ))}
    </div>
  );
}
