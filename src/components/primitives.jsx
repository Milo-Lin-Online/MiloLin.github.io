import { memo } from 'react';

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
          <Rich text={item} />
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
export const Avatar = memo(function Avatar({ experience, size = 44 }) {
  return (
    <div
      className="avatar"
      style={{ '--brand': experience.brand, width: size, height: size }}
      aria-hidden="true"
    >
      {experience.logo ? (
        <img src={experience.logo} alt="" loading="lazy" decoding="async" />
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

export function SectionHead({ eyebrow, title, note, children }) {
  return (
    <header className="section-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="section-title">{title}</h2>}
      </div>
      {note && <p className="section-note">{note}</p>}
      {children}
    </header>
  );
}

/** The fish, used by the cursor layer. Drawn once, animated entirely in CSS. */
export function FishGlyph() {
  return (
    <svg className="fish-body" viewBox="0 0 42 26" fill="none" aria-hidden="true">
      <path
        className="fish-tail"
        d="M29 13c3-3.4 6.6-6.1 10.4-7.4.9-.3 1.7.5 1.4 1.4-1.4 4-1.4 7.9 0 11.9.3.9-.5 1.7-1.4 1.4C35.6 19.1 32 16.4 29 13Z"
        fill="var(--lane-art)"
        opacity="0.85"
      />
      <path
        d="M30.5 13c0 5.5-6.6 9.6-14.2 9.6C8.7 22.6 1.6 18.5 1.6 13S8.7 3.4 16.3 3.4C23.9 3.4 30.5 7.5 30.5 13Z"
        fill="var(--lane-art)"
      />
      <path
        className="fish-fin"
        d="M17.5 21.4c1.6 1.8 3.6 3 5.6 3.4.7.2 1.2-.5.9-1.1a12 12 0 0 1-1.3-4.2Z"
        fill="var(--lane-art)"
        opacity="0.7"
      />
      <circle cx="9.4" cy="11.2" r="2" fill="var(--abyss)" />
      <circle cx="8.8" cy="10.6" r="0.7" fill="var(--foam)" />
    </svg>
  );
}
