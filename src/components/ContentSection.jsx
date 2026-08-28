import { memo } from 'react';
import { toParagraphs } from '../content/loadContent.js';

/**
 * ContentBlock — one folder from `content/<Section>/<Folder>/`.
 *
 * Renders as: heading → description text → image gallery.
 * Any of the three can be missing and the block simply leaves it out.
 *
 * The gallery reshapes itself based on how many images the folder holds,
 * because a two-image folder and a nine-image folder want different layouts:
 *
 *   1 image   → full width, uncropped
 *   2 images  → side by side
 *   3 images  → three across
 *   4+        → responsive grid that reflows down to one column on a phone
 *
 * That's handled by the `data-count` attribute and CSS, so there's no
 * JavaScript measuring anything and nothing shifts after load.
 */
const ContentBlock = memo(function ContentBlock({ block }) {
  const paragraphs = toParagraphs(block.description);
  const count = block.images.length;

  // Anything past 4 uses the same auto-fill grid, so cap the attribute.
  const layout = count === 0 ? '0' : String(Math.min(count, 4));

  return (
    <section className="content-block">
      <h3 className="content-block-title">{block.name}</h3>

      {paragraphs.length > 0 && (
        <div className="content-text">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {count > 0 && (
        <div className="content-gallery" data-count={layout}>
          {block.images.map((image, i) => (
            <figure className="content-shot" key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                /* The first image of the first block is usually above the
                   fold, so it loads eagerly; everything else waits. */
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
          ))}
        </div>
      )}
    </section>
  );
});

/**
 * ContentSection — everything found in one `content/<Section>/` folder:
 * its reel, its intro text, then each of its blocks in order.
 */
export default function ContentSection({ section }) {
  const intro = toParagraphs(section.description);

  return (
    <>
      {/* The reel is rendered by the page, above this, via <ReelPlayer>. */}
      {intro.length > 0 && (
        <section className="section">
          <div className="content-text content-intro">
            {intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {section.blocks.map((block) => (
        <ContentBlock block={block} key={block.slug} />
      ))}
    </>
  );
}
