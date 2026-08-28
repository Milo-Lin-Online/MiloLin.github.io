import { useState } from 'react';
import { Play } from './Icons.jsx';
import { parseVideoLink } from '../content/loadContent.js';

/**
 * ReelPlayer — one component for every way a reel can be supplied.
 *
 * It checks three sources, in this order, and uses the first one it finds:
 *
 *   1. `file`      a REEL.mp4 sitting in the content folder
 *   2. `link`      a REEL.txt in the content folder containing a URL
 *   3. `fallback`  a URL or YouTube ID typed into portfolio.data.js
 *
 * If all three are empty it returns null, so the surrounding section can be
 * skipped entirely rather than showing an empty placeholder.
 *
 * Use `hasReel()` below to decide whether to render the heading, so the
 * heading and the player always agree.
 */
export default function ReelPlayer({ file, link, fallback, label = 'Play reel' }) {
  // Only relevant for embeds. A local file plays inline with normal controls.
  const [playing, setPlaying] = useState(false);

  // 1. A real video file always wins — it's the fastest and most reliable.
  if (file) {
    return (
      <div className="video-reel">
        {/* preload="metadata" fetches just the first frame and the duration
            instead of downloading the whole file before anyone presses play. */}
        <video controls preload="metadata" playsInline>
          <source src={file} />
          Your browser can&rsquo;t play this video.
        </video>
      </div>
    );
  }

  // 2 and 3. Both are links, so they resolve the same way.
  const video = parseVideoLink(link) ?? parseVideoLink(fallback);
  if (!video) return null;

  // Click-to-load. Embedding YouTube directly pulls in several hundred KB of
  // their script on page load whether or not anyone watches, so we show a
  // plain button and only build the iframe once it's clicked.
  if (!playing) {
    return (
      <div className="reel">
        <button type="button" className="reel-play" onClick={() => setPlaying(true)}>
          <span className="ring">
            <Play size={18} />
          </span>
          {label}
        </button>
      </div>
    );
  }

  return (
    <div className="reel">
      <iframe
        src={`${video.embedUrl}?autoplay=1`}
        title={label}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/**
 * True when any of the three sources would actually produce a player.
 * Lets a page decide whether to render the "Reel" heading at all.
 */
export function hasReel({ file, link, fallback }) {
  return Boolean(file || parseVideoLink(link) || parseVideoLink(fallback));
}
