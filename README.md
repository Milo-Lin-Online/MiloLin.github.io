# Milo Lin — Portfolio

Rebuilt from the original single-file `App.jsx` into an object-oriented React app.

---

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run deploy     # build + push to GitHub Pages
```

> If you move to **milolinonline.com**, change `base` in `vite.config.js` from
> `'/MiloLin.github.io/'` to `'/'`.

---

## Where things live

```
src/
  domain/                 ← plain ES6 classes, zero React
    Entity.js               abstract base — id, title, slug, search
    Project.js              Project → ArtProject | TechArtProject | ProductProject
    Experience.js           Experience → Coop | Internship | Research | Studio
                                       | ClientProject | Leadership | Volunteer
    Portfolio.js            Lane, ExperienceGroup, and the Portfolio root + factory
  services/
    FishCursor.js           the cursor, as a self-contained class
  data/
    portfolio.data.js     ← ★ THE ONLY FILE YOU EDIT TO CHANGE CONTENT
  components/
    primitives.jsx          Rich text, Avatar, Bullets, Tags, the fish glyph
    ExperienceAccordion.jsx
    ProjectGrid.jsx         cards + modal
    Chrome.jsx              nav, footer, click-to-load reel
    FishCursorLayer.jsx     React ↔ FishCursor bridge
  pages/
    HomePage.jsx
    LanePage.jsx
  styles/index.css          design tokens + all component styles
```

### How the OOP actually earns its place

Each subclass answers three questions about itself — `kindLabel`, `accentVar`,
and `contextLine` / `metaLine`. That means the components never ask *what type*
something is:

```jsx
<span className="acc-badge">{experience.kindLabel}</span>
<div style={{ '--lane': `var(${experience.accentVar})` }}>
```

A client project renders "CLIENT PROJECT" in the art colour and shows
`Client: Board (board.fun)`; a co-op renders "CO-OP" in the product colour and
shows `Boston, MA · Internship`. Same component, no branching. Adding a new
category of work means adding one subclass, not editing any JSX.

`Portfolio.from(data)` is the factory that reads the `type` field in the data
file and picks the right constructor.

---

## Editing content

Everything is in **`src/data/portfolio.data.js`**.

**Bold a number** — wrap it in double asterisks. This is how quantified results
get highlighted:

```js
bullets: [
  'One offer/event made **$234k in a single day**',
  'Batch rendered **380 animations** from a single script',
]
```

**Lanes** — every role and project lists which sections it belongs to:

```js
lanes: ['product', 'art']   // 'art' | 'techart' | 'product'
```

A role tagged with two lanes appears in both, which is how DraftKings shows up
under Product + Marketing *and* 3D Art. The lane filtering on each section page
is automatic.

**Add a role** — one object in the right `experienceGroups` block. Set `type` to
`coop`, `internship`, `research`, `studio`, `client`, `leadership`, or
`volunteer`.

**Add a project** — one object in the right `lanes[].projects` array. Set `type`
to `art`, `techart`, or `product`.

### Adding real company logos

Right now each accordion row shows a monogram on the company's brand colour.
To use a real logo, drop the file in `public/logos/` and add one line:

```js
logo: '/MiloLin.github.io/logos/draftkings.svg',
brand: '#53D337',
```

The `Avatar` component switches automatically. Keeping the fallback means no
external logo requests and nothing breaks if a file is missing.

### Adding your demo reels

Each lane has `reelId: null`. Put a YouTube video ID there:

```js
reelId: 'aB3xY_9kQ1c',
```

Until then it shows "Reel coming soon". The player is a click-to-load facade —
YouTube's ~700KB of script is only fetched if someone presses play.

---

## What changed from the old site

**Removed** — the placeholder content that wasn't yours: LOH Studio, the XGen
hair system, the auto-rig tool, the particle presets, the Unsplash stock
thumbnails, and the rickroll video IDs that were sitting in all three reel slots.
Projects with no image now show a typographic plate instead of a stock photo.

**Removed** — Tailwind. It was in `package.json` at v4 while `index.css` used v3
`@tailwind` directives with no PostCSS config, so it was never running. Every
style was inline anyway. The stylesheet is now plain CSS with custom properties.

**Performance**

| | before | after |
|---|---|---|
| Images | 2.9 MB (PNG/JPG) | 249 KB (WebP) |
| Web fonts | — | none, system stack only |
| YouTube on load | 3 iframes | 0, click-to-load |
| Re-render on mouse move | — | none, cursor bypasses React |

Also: `React.memo` on accordion rows and project cards, `loading="lazy"` on all
non-hero images, `srcSet` on the profile photo, and the accordion animates with
`grid-template-rows` so nothing is measured in JavaScript.

**Accessibility** — real `aria-expanded` / `aria-controls` on the accordion,
Escape closes the modal, visible focus rings, a skip link, and the fish cursor
disables itself under `prefers-reduced-motion` or on touch devices. There's a
manual toggle in the footer too.

---

## The fish cursor

`src/services/FishCursor.js`. One `requestAnimationFrame` loop that **stops
itself** when the fish catches up to the pointer, so an idle page runs zero
frames. The pointer listener is passive and only stores two numbers. Each frame
writes a `transform` and two custom properties — no layout, no paint.

The fish mirrors vertically instead of rotating past 90°, so it never swims
upside down. Tail and fin wiggle are pure CSS keyframes.

---

## Still to do

1. **The job-application documents** — the two/three PDFs with your written
   answers about past roles didn't upload. Re-send them and the "Who I am" and
   experience copy can be rewritten with those specifics.
2. **LinkedIn posts** — LinkedIn blocks automated access, so the recent-posts
   section isn't there. The experience section ends with a "See more updates on
   my LinkedIn" link instead. If you want the WB Games and SIGGRAPH posts on the
   page, send the text and URLs.
3. **Board.fun images** — `MiloLinSheep.png` is a raw Blender screenshot with the
   full UI visible. Worth cropping to just the viewport, or swapping in a render.
4. **Reels and project images** — every project except Board.fun is currently a
   typographic plate.
