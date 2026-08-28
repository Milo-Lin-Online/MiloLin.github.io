/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTENT LOADER — turns the `content/` folder into the site, automatically.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * You should never need to edit this file. It exists so that YOU never have to
 * touch code to add work to the site: you drop files into `content/`, push, and
 * the site rebuilds around whatever it finds.
 *
 * ── The folder shape ───────────────────────────────────────────────────────
 *
 *   content/
 *     REEL.mp4                    ← the demo reel on the home page (optional)
 *     about.txt                   ← replaces the About Me text (optional)
 *
 *     Product + Marketing/        ← folder name = section name
 *       REEL.mp4                  ← this section's reel (optional)
 *       description.txt           ← intro text, shown under the reel (optional)
 *
 *       WB GAMES WORK/            ← folder name = the heading for this block
 *         description.txt         ← text shown above this block's images
 *         1_ingame-changes.png    ← images render in numeric order, 1 → N
 *         2_dashboard.png
 *         3_offer-card.png
 *
 * ── The rules ──────────────────────────────────────────────────────────────
 *
 *  • No REEL file  →  the reel section doesn't render at all.
 *  • No description.txt  →  that text block doesn't render.
 *  • No images  →  no gallery.
 *  • Images sort by their leading number. `10_x.png` comes after `9_x.png`,
 *    because they're compared as numbers, not as text.
 *  • Folder order can be controlled the same way: `1_WB GAMES WORK` sorts
 *    first, and the number is stripped from the displayed title. Without
 *    numbers, folders are alphabetical.
 *  • A section folder whose name matches a section already on the site merges
 *    into it. A folder with a NEW name creates a whole new section, which
 *    appears in the navigation on its own.
 *
 * ── How it works ───────────────────────────────────────────────────────────
 *
 * `import.meta.glob` is a Vite feature that scans the filesystem at BUILD time
 * and inlines the results. That means:
 *   - there is no server and no fetching at runtime,
 *   - images get hashed filenames and long-term caching for free,
 *   - and the file list is baked in when GitHub Actions builds the site.
 *
 * The practical consequence: adding files only takes effect after a rebuild.
 * Locally `npm run dev` picks them up on save. On GitHub, pushing triggers the
 * workflow and the site updates itself.
 */

// `?url` gives us a final, hashed URL for each asset.
// `?raw` gives us the text content of a file as a string.
// `eager: true` resolves everything at build time instead of returning promises.
const imageFiles = import.meta.glob('/content/**/*.{png,jpg,jpeg,webp,gif,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const videoFiles = import.meta.glob('/content/**/*.{mp4,webm,mov,m4v}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const textFiles = import.meta.glob('/content/**/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// ── Small helpers ───────────────────────────────────────────────────────────

/** Splits "/content/Tech Art/1_Rig/2_shot.png" into ["Tech Art", "1_Rig", "2_shot.png"]. */
function segments(path) {
  return path.replace(/^\/content\//, '').split('/').filter(Boolean);
}

/**
 * Pulls the leading order number off a name: "05_thing.png" → 5.
 *
 * Write these zero-padded — 01, 02 … 10, 11. Two reasons:
 *   1. They stay in the right order in Finder and Explorer, which sort by text.
 *      Unpadded, "10_x" lands between "1_x" and "2_x" in your own file browser,
 *      which is confusing even though the site would still get it right.
 *   2. It reads as an obvious ordering marker rather than part of the name.
 *
 * Unpadded numbers still work — "1_thing" is read as 1 — so nothing breaks if
 * you forget. Leading zeros are just stripped when parsed.
 *
 * The number MUST be followed by a separator (_ - . or a space). Without that
 * rule a folder called "3D Art" would be read as order number 3 and renamed
 * "D Art".
 */
const ORDER_PREFIX = /^(\d+)[_\-.\s]+/;

function leadingNumber(name) {
  const match = ORDER_PREFIX.exec(name);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

/**
 * Turns a raw filename or folder name into a readable title.
 *
 * @param name           the raw name from disk
 * @param isFile         strip a trailing extension. Only true for files —
 *                       a FOLDER called "Board.fun" must keep its ".fun".
 */
function displayName(name, isFile = false) {
  let out = name;
  if (isFile) out = out.replace(/\.[a-z0-9]+$/i, '');
  return out
    .replace(ORDER_PREFIX, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Sorts by leading number first, then alphabetically for anything unnumbered. */
function byOrderThenName(a, b) {
  const diff = leadingNumber(a.rawName) - leadingNumber(b.rawName);
  if (diff !== 0 && Number.isFinite(diff)) return diff;
  if (leadingNumber(a.rawName) !== leadingNumber(b.rawName)) {
    return leadingNumber(a.rawName) - leadingNumber(b.rawName);
  }
  return a.rawName.localeCompare(b.rawName);
}

/** True for a file named REEL.mp4, reel.mp4, Reel.webm, etc. */
function isReel(fileName) {
  return /^reel\.(mp4|webm|mov|m4v)$/i.test(fileName);
}

/** True for a REEL.txt holding a video link rather than a video file. */
function isReelText(fileName) {
  return /^reel\.txt$/i.test(fileName);
}

/** True for description.txt / DESCRIPTION.TXT / about.txt at root. */
function isDescription(fileName) {
  return /^description\.txt$/i.test(fileName);
}

/** Trims a text file and drops it entirely if it's blank or just whitespace. */
function cleanText(value) {
  const text = String(value ?? '').trim();
  return text.length > 0 ? text : null;
}

/**
 * Splits description text into paragraphs on blank lines, so you can write
 * naturally in a .txt file and get proper paragraph spacing on the site.
 */
export function toParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

// ── The loader ──────────────────────────────────────────────────────────────

/**
 * Walks everything found in `content/` and returns a plain, sorted structure:
 *
 *   {
 *     home:     { reel, about },
 *     sections: [
 *       {
 *         name, slug, reel, description,
 *         blocks: [ { name, slug, description, images: [{ src, alt }] } ]
 *       }
 *     ]
 *   }
 *
 * Everything is optional. An empty `content/` folder returns empty values and
 * the site renders exactly as it does without it.
 */
export function loadContent() {
  // `reel` is a local video file; `reelLink` is a URL from a REEL.txt.
  const home = { reel: null, reelLink: null, about: null };

  // Keyed by folder name so we can collect files across several glob results.
  const sections = new Map();

  function section(name) {
    if (!sections.has(name)) {
      sections.set(name, {
        rawName: name,
        name: displayName(name), // folder: keep dots like "Board.fun"
        reel: null,
        reelLink: null,
        description: null,
        blockMap: new Map(),
      });
    }
    return sections.get(name);
  }

  function block(sectionName, blockName) {
    const parent = section(sectionName);
    if (!parent.blockMap.has(blockName)) {
      parent.blockMap.set(blockName, {
        rawName: blockName,
        name: displayName(blockName), // folder, so no extension stripping
        description: null,
        images: [],
      });
    }
    return parent.blockMap.get(blockName);
  }

  // ── Videos ────────────────────────────────────────────────────────────────
  for (const [path, url] of Object.entries(videoFiles)) {
    const parts = segments(path);
    const fileName = parts[parts.length - 1];
    if (!isReel(fileName)) continue;

    if (parts.length === 1) {
      home.reel = url; // content/REEL.mp4
    } else if (parts.length === 2) {
      section(parts[0]).reel = url; // content/<Section>/REEL.mp4
    }
  }

  // ── Text ──────────────────────────────────────────────────────────────────
  for (const [path, raw] of Object.entries(textFiles)) {
    const parts = segments(path);
    const fileName = parts[parts.length - 1];
    const text = cleanText(raw);
    if (!text) continue;

    if (parts.length === 1) {
      // content/REEL.txt — a link to the home page reel
      if (isReelText(fileName)) home.reelLink = text;
      // content/about.txt (or description.txt) replaces the About Me copy
      else if (/^(about|description)\.txt$/i.test(fileName)) home.about = text;
    } else if (parts.length === 2 && isReelText(fileName)) {
      // content/<Section>/REEL.txt — a link to that section's reel
      section(parts[0]).reelLink = text;
    } else if (parts.length === 2 && isDescription(fileName)) {
      section(parts[0]).description = text;
    } else if (parts.length === 3 && isDescription(fileName)) {
      block(parts[0], parts[1]).description = text;
    }
  }

  // ── Images ────────────────────────────────────────────────────────────────
  for (const [path, url] of Object.entries(imageFiles)) {
    const parts = segments(path);

    // Only images two levels deep belong to a gallery:
    //   content/<Section>/<Block>/<image>
    if (parts.length !== 3) continue;

    const [sectionName, blockName, fileName] = parts;
    block(sectionName, blockName).images.push({
      rawName: fileName,
      src: url,
      // Alt text is derived from the filename, which is why descriptive
      // filenames are worth the extra few seconds: "2_dashboard-detail.png"
      // becomes "dashboard detail".
      alt: displayName(fileName, true), // file, so drop the extension
    });
  }

  // ── Sort everything and drop the bookkeeping fields ───────────────────────
  const ordered = [...sections.values()]
    .sort(byOrderThenName)
    .map((entry) => ({
      name: entry.name,
      slug: slugify(entry.name),
      reel: entry.reel,
      reelLink: entry.reelLink,
      description: entry.description,
      blocks: [...entry.blockMap.values()]
        .sort(byOrderThenName)
        .map((b) => ({
          name: b.name,
          slug: slugify(b.name),
          description: b.description,
          images: b.images.sort(byOrderThenName).map(({ src, alt }) => ({ src, alt })),
        }))
        // A folder with nothing usable in it shouldn't render an empty heading.
        .filter((b) => b.images.length > 0 || b.description),
    }));

  return { home, sections: ordered };
}

/**
 * Turns a video link into something embeddable.
 *
 * Accepts basically any shape of YouTube or Vimeo URL you'd get from the
 * address bar or a Share button, plus a bare YouTube ID:
 *
 *   https://www.youtube.com/watch?v=aB3xY_9kQ1c
 *   https://youtu.be/aB3xY_9kQ1c?t=30
 *   https://www.youtube.com/shorts/aB3xY_9kQ1c
 *   https://vimeo.com/123456789
 *   aB3xY_9kQ1c
 *
 * Returns { provider, id, embedUrl } or null if it can't make sense of it.
 * Returning null rather than guessing means a typo'd link hides the reel
 * instead of rendering a broken black box.
 */
export function parseVideoLink(raw) {
  if (!raw) return null;

  // A REEL.txt might have a trailing newline, or a stray comment line.
  const value = String(raw)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#'));

  if (!value) return null;

  const youtube =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/.exec(
      value
    );
  if (youtube) {
    return {
      provider: 'youtube',
      id: youtube[1],
      // -nocookie means YouTube sets no tracking cookie until playback starts.
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtube[1]}`,
    };
  }

  const vimeo = /vimeo\.com\/(?:video\/)?(?:channels\/[^/]+\/)?(\d{6,})/.exec(value);
  if (vimeo) {
    return {
      provider: 'vimeo',
      id: vimeo[1],
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
    };
  }

  // A bare 11-character YouTube ID pasted on its own.
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) {
    return {
      provider: 'youtube',
      id: value,
      embedUrl: `https://www.youtube-nocookie.com/embed/${value}`,
    };
  }

  return null;
}

/** "Product + Marketing" → "product-marketing". Used to match content to sections. */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const content = loadContent();
export default content;
