import { memo, useState } from 'react';

/**
 * Rich — renders **double-asterisk** spans as highlighted stats.
 * Lets the data file mark up numbers without pulling in a markdown parser.
 */
export const Rich = memo(function Rich({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong className="stat" key={i}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
});

/** A list of bullets, each able to contain **stats**. */
export const Bullets = memo(function Bullets({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="bullets">
      {items.map((item, i) => (
        <li key={i}>
          {/* The <li> is a grid container, so all inline content has to sit in
              one child — otherwise each <strong> becomes its own grid cell. */}
          <span>
            <Rich text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
});

/**
 * Avatar — the circular company mark next to each accordion row.
 * Uses a real logo when `logo` is set in the data file, otherwise falls back to
 * a monogram on the company's brand colour. No third-party logo requests.
 */
export const Avatar = memo(function Avatar({ experience, size = 38 }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = experience.logo && !logoFailed;

  return (
    <div className="avatar" style={{ width: size, height: size }} aria-hidden="true">
      {showLogo ? (
        <img
          src={experience.logo}
          alt=""
          loading="lazy"
          decoding="async"
          /* Missing file falls back to initials instead of a broken image. */
          onError={() => setLogoFailed(true)}
        />
      ) : (
        experience.initials
      )}
    </div>
  );
});

export const Tag = memo(function Tag({ children }) {
  return <span className="tag">{children}</span>;
});

export function TagRow({ items }) {
  if (!items?.length) return null;
  return (
    <div className="tag-row">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

/** The fish, used by the cursor layer. Drawn once, animated entirely in CSS. */
export function FishGlyph() {
  // Geometry is drawn for a 38x24 viewBox. If you change the viewBox, the
  // transform-origin values for .fish-tail / .fish-fin in index.css have to
  // move with it, or the tail will pivot around the wrong point.
  return (
    <svg className="fish-body" viewBox="0 0 38 24" fill="none" aria-hidden="true">
      <path
        className="fish-tail"
        d="M26 12c2.7-3.1 6-5.6 9.4-6.8.8-.3 1.5.5 1.3 1.3-1.3 3.6-1.3 7.2 0 10.8.3.8-.5 1.6-1.3 1.3C32 17.4 28.7 14.9 26 12Z"
        fill="var(--accent)"
        opacity="0.85"
      />
      <path
        d="M27.5 12c0 5-6 8.7-12.8 8.7C7.9 20.7 1.4 17 1.4 12S7.9 3.3 14.7 3.3C21.5 3.3 27.5 7 27.5 12Z"
        fill="var(--accent)"
      />
      <path
        className="fish-fin"
        d="M15.8 19.5c1.4 1.6 3.2 2.7 5 3.1.6.2 1.1-.5.8-1a11 11 0 0 1-1.2-3.8Z"
        fill="var(--accent)"
        opacity="0.7"
      />
      {/* --bg, not --abyss: the palette variables were renamed in v1.4.0 */}
      <circle cx="8.5" cy="10.1" r="1.8" fill="var(--bg)" />
    </svg>
  );
}

