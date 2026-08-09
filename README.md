# Milo Lin — Portfolio

**Current version: v1.4.1** — shown faintly in the bottom-right corner of the page.

Rebuilt from the original single-file `App.jsx` into an object-oriented React app.
**17 roles, 21 projects**, populated from the resumes, the LinkedIn screenshots,
and the identity profile.

---

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run deploy     # build + push to GitHub Pages
```

> Moving to **milolinonline.com**? Change `base` in `vite.config.js` from
> `'/MiloLin.github.io/'` to `'/'`.


## ⚠ Don't open `index.html` directly

Double-clicking `index.html` gives a white screen every time, and always would
have. It isn't a bug — that file is a Vite **build source**, not a finished page:

1. It points at `/src/main.jsx`. Over `file://`, that absolute path resolves to
   your disk root, not to this folder.
2. `main.jsx` is JSX. No browser can execute JSX — Vite compiles it first.
3. ES modules are blocked by CORS over `file://` regardless.

As of v1.4.1 it no longer goes white: open it and you get a page explaining this
with the commands to run.

**To just look at the site:** double-click **`OPEN-THIS-preview.html`**.
One self-contained file, no install, no server.

**To run the real app:**

```bash
npm install
npm run dev
```

Then open the `localhost` address it prints. `npm run deploy` builds to `dist/`
and pushes to GitHub Pages — `dist/` is what works on a server, never
`index.html` on its own.

---

## If you get a white screen

A white screen is almost always a module that failed to load. Open the browser
console (F12) — the first red line names the file.

**Check the version badge first.** Bottom-right corner of the page, very faint.
Hover it to read it clearly. You can also type `__MILO_VERSION__` in the console,
or just look for the teal startup line it logs. If it doesn't say **v1.4.1**,
you're looking at an older build — most likely a stale `dist/` or a cached
GitHub Pages deploy.

Things that were fixed in v1.3.0, any of which could have caused it:

1. **A duplicate `const lane` declaration in `App.jsx`** — a nested `useEffect`
   left over from a bad patch. This is a hard parse error and would white-screen
   the whole app. Fixed.
2. **`lucide-react` removed entirely.** The seven icons are now inline SVG in
   `src/components/Icons.jsx`. The app's only runtime dependencies are `react`
   and `react-dom`, so a failed or partial `npm install` has far less to break.

If it's still white after pulling v1.3.0:

```bash
rm -rf node_modules dist package-lock.json
npm install
npm run dev
```

Two more things worth checking, both caused by unzipping over the old repo:

- **A leftover `postcss.config.js`** referencing `tailwindcss`. Tailwind is no
  longer a dependency, so Vite will fail to start if that config is still there.
  Delete it, along with `tailwind.config.js`.
- **Nested folders** — make sure `index.html` and `package.json` sit at the repo
  root, not inside a `MiloLin-portfolio/` subfolder.

---

## Quick preview, no build step

`OPEN-THIS-preview.html` (also shipped as `milo-portfolio-preview.html`) is a single self-contained file — open it directly
in a browser, no `npm install`, no server. Everything is inlined, including the
images.

It's generated from the real source files, so it can't drift:

```bash
python3 tools/build_preview.py
```

It reuses the actual stylesheet, the actual domain classes, and the actual
content file. Only the render layer is reimplemented in vanilla JS, since the
app itself uses React. **The React app in `src/` is the source of truth** — edit
there, then regenerate the preview if you want a quick look.

---

## Design (v1.4.0 — reverted to your original style)

The style now follows the original site and milolinonline.com, not a new one:

- **Pure black** background, white text at stepped opacities (70/50/40/30%)
- **One accent** — cyan `#22d3ee`. The three-colour lane system is gone.
- **Square corners**, 1px hairline borders, 900px centred column
- **No gradients, no drop shadows, no glows, no backdrop blur** — verified by
  walking every element's computed style in a real browser
- **Montserrat** for headers, loaded in `index.html`. To change it, edit one
  line — `--display` in `src/styles/index.css`.

### Section order, matching the original

`DEMO REEL → ABOUT ME → PROFESSIONAL EXPERIENCE → PORTFOLIO → SKILLS → CONNECT`

Removed: **What I do**, **How I work**, and **What I'm into**. None were on the
original site. The copy for all three is still in `src/data/portfolio.data.js`
history if you want any of them back.

The **Highlight** block is gone from the accordion panel. The right-hand side now
shows Progression, Tools & methods, and Related work. Your numbers are still
bolded inside the bullets themselves.

`Where I've worked` is now `Professional Experience`.

---

## Company logos

I can't download logos — they're trademarks and I have no network access here.
So the site is **already wired to expect them**, and every row falls back to a
lettered monogram until the file appears. Nothing breaks in the meantime.

Drop files into `public/logos/` with these **exact** names:

```
wbgames_logo.png          knack_logo.png
draftkings_logo.png       generate_logo.png
schellgames_logo.png      scout_logo.png
goodwin_logo.png          freelance_logo.png
lykostudios_logo.png      nuvr_logo.png
sentry_logo.png           animationclub_logo.png
humonlab_logo.png         siggraph_logo.png
northeastern_logo.png
```

**15 files, covering 17 roles** — `northeastern_logo.png` is shared by the
Immersive Media Lab, Robotics Lab, and Animation TA rows.

Transparent PNG on black works best; SVG also works if you update the extension
in `portfolio.data.js`. They render at 38×38 with `object-fit: contain`, so
nothing gets cropped. Full table in `public/logos/README.md`.

---

## Where things live

```
src/
  domain/                 ← plain ES6 classes, zero React
    Entity.js               abstract base — id, title, slug, search
    Project.js              Project → ArtProject | TechArtProject | ProductProject
    Experience.js           Experience → Coop | Internship | Research | Studio
                                       | ClientProject | Leadership | Volunteer
    Portfolio.js            Lane, ExperienceGroup, Portfolio root + factory
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
    HomePage.jsx            hero, who I am, how I work, experience, skills, taste
    LanePage.jsx            one portfolio section
  styles/index.css          design tokens + all component styles
```

### How the OOP earns its place

Each subclass answers three questions about itself — `kindLabel`, `accentVar`,
and `contextLine` / `metaLine`. Components never ask *what type* something is:

```jsx
<span className="acc-badge">{experience.kindLabel}</span>
<div style={{ '--lane': `var(${experience.accentVar})` }}>
```

A client project renders "CLIENT PROJECT" in the art colour showing
`Client: Board (board.fun)`; a co-op renders "CO-OP" in the product colour
showing `Boston, MA · Internship`. Same component, no branching. A new category
of work means one new subclass, not edits to any JSX.

`Portfolio.from(data)` is the factory that reads the `type` field and picks the
constructor.

---

## Editing content

Everything is in **`src/data/portfolio.data.js`**.

**Bold a number** — wrap it in double asterisks:

```js
bullets: ['Produced **450+ video ads and GIFs** across five screen formats']
```

**Lanes** — every role and project lists its sections:

```js
lanes: ['product', 'art']   // 'art' | 'techart' | 'product'
```

Tagged with two lanes, it appears in both. That's how DraftKings shows under
Product + Marketing *and* 3D Art. Section filtering is automatic.

**Promotions** — for roles where you moved up, list every title oldest-first:

```js
progression: [
  { role: 'Ambassador', note: 'recruitment and outreach' },
  { role: 'Vice President', note: 'current' },
],
```

The accordion header shows your current title; the panel draws a small timeline
of the climb. Currently set on Generate (Art Designer → Art Director), NUVR
(VP/Project Manager → President), and Animation Club (Ambassador → VP).

**Dates** — leave `start: ''` and the date line hides itself rather than showing
a guess. Four roles are in that state right now (see below).

**Company logos** — each row shows a monogram on the brand colour. To use a real
logo, drop the file in `public/logos/` and add one line:

```js
logo: '/MiloLin.github.io/logos/draftkings.svg',
```

**Demo reels** — each lane has `reelId: null`. Add a YouTube video ID and the
player appears. It's a click-to-load facade, so YouTube's ~700KB of script is
only fetched if someone presses play.

---

## ⚠ Four roles need dates

These came from the identity profile without dates. Rather than invent them, the
date line is hidden. Search the data file for `NEEDS DATES`:

| Role | Organisation |
|---|---|
| Animation Researcher & Teaching Assistant | Northeastern (Prof. Bill Stout) |
| Game Art & Animation Tutor | KNACK |
| Animator & Videographer | Scout, Northeastern |
| Art Direction Consultant | Freelance — bullet-hell game |

---

## Conflicts resolved

The identity profile flagged some inconsistencies. Here's what's live:

- **DraftKings output** — the profile said "450+" and "452"; the resume said 380.
  Both are on the site as separate claims: **450+** video ads and GIFs total, and
  **380** animations batch-rendered via JavaScript. If those actually describe
  the same work, delete one.
- **GTV Cribs length** — described as both 7-part and 9-part, so the site leads
  with the unambiguous number instead: **40 co-ops** involved.
- **24-Hour Challenge** — resume said 49th/700, profile said top 50 of 700+ and
  top 7%. The site uses **top 50 of 700+ teams — top 7%**.
- **Schell Games** — treated as completed work (Jun–Aug 2025), per the resume.
- **Aspirational companies** — Twitch, DreamWorks, LAIKA, Sony Pictures Animation
  and the rest are **not** on the site. They were target applications, not work.

## Deliberately left off

Your call to add any of these — they're in the identity profile but they're
personal or third-party:

- **Phone number** — the profile said to omit unless you want it public.
- **References and their emails** — publishing other people's contact details on
  a public page is different from putting them on a resume you hand over.
- **Personal identity details** — the Malaysian-Taiwanese American and family
  background. APIQTWC volunteering *is* included, since it's on your resumes.

---

## What changed from the old site

**Removed** — placeholder content that wasn't yours: LOH Studio, the XGen hair
system, the auto-rig tool, the particle presets, the Unsplash stock thumbnails,
and the rickroll video IDs sitting in all three reel slots. Projects without a
finished image show a typographic plate instead of a stock photo.

**Removed** — Tailwind. It was v4 in `package.json` against v3 `@tailwind`
directives with no PostCSS config, so it never ran. Every style was inline
anyway. Now plain CSS with custom properties.

**Removed** — `lucide-react`. Seven inline SVG icons replace it. Runtime
dependencies are now exactly `react` and `react-dom`.

**Fixed in v1.3.0, found by rendering the page in a real browser:**

- Bulleted list items are grid containers, so every `<strong>` from a **bolded
  stat** was being placed in its own grid cell — numbers were landing on separate
  lines and overlapping the text. Markers are now positioned pseudo-elements.
- Featured project cards span two columns; at 16:9 their media towered over the
  row and stretched every neighbouring card. Now 2:1, with `align-items: start`
  and `grid-auto-flow: dense` so short cards backfill the gap.
- Modal galleries stretched short images to match tall ones.
- Stats that wrap across two lines keep their highlight (`box-decoration-break`).

**Performance**

| | before | after |
|---|---|---|
| Images | 2.9 MB (PNG/JPG) | 433 KB (WebP) |
| Web fonts | — | none, system stack |
| YouTube on load | 3 iframes | 0, click-to-load |
| Re-render on mouse move | — | none, cursor bypasses React |

Plus `React.memo` on accordion rows and project cards, `loading="lazy"` on
non-hero images, `srcSet` on the portrait, and an accordion that animates with
`grid-template-rows` so nothing is measured in JavaScript.

**Accessibility** — real `aria-expanded` / `aria-controls`, Escape closes the
modal, visible focus rings, a skip link, and a fish cursor that disables itself
under `prefers-reduced-motion` or on touch. Manual toggle in the footer.

---

## The fish cursor

`src/services/FishCursor.js`. One `requestAnimationFrame` loop that **stops
itself** once the fish catches the pointer, so an idle page runs zero frames. The
pointer listener is passive and stores two numbers. Each frame writes a
`transform` and two custom properties — no layout, no paint.

The fish mirrors vertically rather than rotating past 90°, so it never swims
upside down. Tail and fin wiggle are pure CSS keyframes.

---

## Photos

All three are on the site **uncropped**, including the full Blender viewport with
the UI visible — captioned as process shots so the toolset and workflow read as
intentional rather than accidental.

Still to add: reels for each lane, and images for the 18 projects currently
showing a typographic plate.
