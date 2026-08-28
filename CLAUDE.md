# Milo Lin — Portfolio

Project context for Claude Code. Read this before making changes.

## What this is

A Vite + React portfolio site deployed to GitHub Pages at
`https://milo-lin-online.github.io/MiloLin.github.io/`.

Repo: `Milo-Lin-Online/MiloLin.github.io`

Milo is an animation and 3D art student, **not a developer**. The single most
important constraint on this project: **she should not have to edit code to
update the site.** Prefer solutions that move things into files and folders she
can edit directly over solutions that add code she'd have to maintain.

## Commands

```bash
npm install          # npm install, NOT npm ci — see "Gotchas"
npm run dev          # local dev server
npm run build        # production build → dist/
python3 tools/build_preview.py   # regenerate the standalone preview file
```

## Architecture

```
src/
  domain/            plain ES6 classes, zero React
    Entity.js          abstract base (constructing it directly throws)
    Project.js         Project → ArtProject | TechArtProject | ProductProject
    Experience.js      Experience → Coop | Internship | Research | Studio
                                  | ClientProject | Leadership | Volunteer
    Portfolio.js       Lane, ExperienceGroup, Portfolio root + factory
  services/          self-contained animation classes, no React
    FishCursor.js      the fish that follows the pointer
    SplashEffect.js    canvas water splash on click
  content/
    loadContent.js     turns the content/ folder into site structure
  data/
    portfolio.data.js  ← hand-written content (bio, experience, skills)
  components/
  pages/
  styles/index.css     all styling, design tokens at the top
```

### The OOP layer is load-bearing, not decoration

Subclasses answer for themselves via `kindLabel`, `contextLine`, and `metaLine`.
Components never branch on type. If you find yourself writing
`if (type === 'client')` in JSX, add a subclass instead.

`Portfolio.from(data, content)` is the factory: it reads the `type` field from
the data file and picks the constructor.

## Content system — the important part

`content/` drives the site. Milo drops folders in and the site rebuilds around
them via `import.meta.glob` (build-time, so changes need a rebuild).

```
content/
  REEL.mp4                    home demo reel        (optional)
  about.txt                   replaces About Me     (optional)
  REEL.txt                    OR a link to a reel   (optional)
  <Section Name>/
    REEL.mp4 / REEL.txt       section reel          (optional)
    description.txt           intro text            (optional)
    <Block Name>/
      description.txt
      01_image.png            zero-padded order prefix
      02_image.png
```

Reels resolve in priority order: `REEL.mp4` → `REEL.txt` link → `reelUrl` in
`portfolio.data.js`. All three go through `<ReelPlayer>`; `hasReel()` decides
whether the heading renders. `parseVideoLink()` in `loadContent.js` handles
YouTube (watch / youtu.be / embed / shorts / live), Vimeo, and bare IDs, and
returns null on anything it can't parse so a typo hides the reel rather than
rendering a broken box.

Rules, all enforced in `loadContent.js`:

- Missing file → that part doesn't render. No empty placeholders, ever.
- Order prefixes are zero-padded by convention (`01_`, `02_`) so Finder's text
  sort matches the site's numeric sort. Unpadded still parses.
- Order prefix must be digits **followed by a separator** (`01_Thing`). This is
  why `3D Art` isn't read as order number 3.
- Extensions are stripped from **files only**, never folders — otherwise the
  folder `Board.fun` loses its `.fun`.
- A section folder whose name matches an existing lane merges into it. A new
  name creates a new lane, which appears in the nav automatically.
- Galleries reshape by image count via `data-count` in CSS (1 / 2 / 3 / 4+).

Full user-facing guide: `ADDING-WORK.md` (mirrored at `content/README.md`).

**If you change the naming rules in `loadContent.js`, mirror them in
`scan_content()` inside `tools/build_preview.py`.** The two implementations are
intentionally parallel and will silently diverge otherwise.

## Design rules — these came from explicit feedback

Milo rejected an earlier version for looking AI-generated. Do not reintroduce:

- **No glows.** No `box-shadow`, no `drop-shadow`, no `filter`, no
  `backdrop-filter`, no radial gradients. This was checked by walking computed
  styles in a browser; keep it that way.
- **One accent only.** Cyan `#22d3ee`. An earlier three-colour per-section
  system was explicitly removed.
- **Square corners**, 1px hairline borders, pure black, white text at stepped
  opacities (70/50/40/30%), 900px centred column.
- **Montserrat** for headers, via `--display` in `index.css`.
- Section order on the home page matches her original site:
  `DEMO REEL → ABOUT ME → PROFESSIONAL EXPERIENCE → PORTFOLIO → SKILLS → CONNECT`

Sections she removed and does not want back: "What I do", "How I work",
"What I'm into".

## Gotchas

**`npm ci` fails.** The committed `package-lock.json` predates a dependency
cleanup and still lists `tailwindcss`, `lucide-react`, and `eslint`. The CI
workflow uses `npm install` deliberately. Either keep it that way or regenerate
the lockfile.

**Two files should be deleted from the repo** if still present:
`tailwind.config.js` and `eslint.config.js`. Both are orphaned — neither
dependency exists any more.

**`index.html` can't be opened directly.** It's a Vite build source. It ships
with a fallback notice inside `#root` explaining this, which React overwrites on
mount. Don't remove it.

**Fish glyph geometry.** `FishGlyph` in `primitives.jsx` is drawn for a 38×24
viewBox. The `transform-origin` values for `.fish-tail` and `.fish-fin` in
`index.css` depend on it. Change one, change the other.

**Bullet list items.** `.bullets li` used to be a grid container, which put every
inline `<strong>` in its own grid cell and broke bolded stats across lines. The
marker is now a positioned pseudo-element. Don't convert it back to grid.

**Deployment is via GitHub Actions**, `.github/workflows/deploy.yml`, on every
push to `main`. Pages must be set to Source = "GitHub Actions" in repo settings.
See `DEPLOY.md`.

## Content conventions

- `**bold**` in `portfolio.data.js` bullets renders as a highlighted stat. Used
  for real numbers only.
- Roles with no confirmed dates use `start: ''`, which hides the date line rather
  than showing a guess. Search `NEEDS DATES`.
- Company logos live in `public/logos/` with exact filenames listed in
  `public/logos/README.md`. Missing file falls back to a monogram.

## Outstanding

1. **Pages source setting** — must be switched to "GitHub Actions" or nothing
   deploys. Highest priority; the live site is currently a stale build.
2. **Four roles need dates** (search `NEEDS DATES` in `portfolio.data.js`).
3. **Company logos** — 15 files, none supplied yet.
4. **Reels** — no video files exist yet; every reel section is hidden.
5. **Project images** — most project cards render a typographic plate.
6. **`milo-portfolio-preview.html` and `OPEN-THIS-preview.html`** are generated
   duplicates committed to the repo. Consider gitignoring them once local dev is
   working, since they're only there so the site can be viewed without a build.

## Verification

There are no automated tests. Before claiming something works, actually run it:
`npm run dev` and check the page, or `npm run build` and confirm it compiles.
Past sessions could only lint and statically analyse, which let real rendering
bugs through — the bolded-stat grid bug and the clipped fish glyph both survived
type-checking and were only caught by looking at a rendered page.
