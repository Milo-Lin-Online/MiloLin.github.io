#!/usr/bin/env python3
"""
Builds a single self-contained HTML preview from the real source files.

Reuses the actual stylesheet, the actual domain classes, and the actual content
file, so the preview can't silently drift from the app. Only the render layer is
reimplemented in vanilla JS (the app uses React).

    python3 tools/build_preview.py

Output: milo-portfolio-preview.html
"""

import base64
import io
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"


def read(rel):
    return (SRC / rel).read_text()


# ── 1. Stylesheet, verbatim ──────────────────────────────────────────────────
css = read("styles/index.css")


# ── 2. Domain classes, in dependency order, with modules stripped ────────────
def to_script(source):
    source = re.sub(r"^\s*import .*?;\s*$", "", source, flags=re.M | re.S)
    source = re.sub(r"^export default .*?;\s*$", "", source, flags=re.M)
    source = re.sub(r"^export ", "", source, flags=re.M)
    return source


domain = "\n".join(
    to_script(read(f))
    for f in ("domain/Entity.js", "domain/Project.js", "domain/Experience.js", "domain/Portfolio.js")
)
fish = to_script(read("services/FishCursor.js"))
splash = to_script(read("services/SplashEffect.js"))
version = to_script(read("version.js"))


# ── 3. Images, downscaled and inlined as data URIs ───────────────────────────
def data_uri(path, width):
    from PIL import Image

    im = Image.open(ROOT / "public" / path).convert("RGB")
    w, h = im.size
    if w > width:
        im = im.resize((width, round(h * width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=78, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


images = {
    "media/profile.webp": data_uri("media/profile.webp", 460),
    "media/profile@2x.webp": data_uri("media/profile.webp", 460),
    "media/boardfun-blockout.webp": data_uri("media/boardfun-blockout.webp", 900),
    "media/boardfun-sculpt.webp": data_uri("media/boardfun-sculpt.webp", 330),
}

# ── 4. Content file, with asset() pointed at the inlined images ──────────────
data = read("data/portfolio.data.js")
data = re.sub(r"^const asset = .*?;\s*$", "const asset = (p) => IMAGES[p] || '';", data, flags=re.M)
data = to_script(data)

image_map = "const IMAGES = {\n" + "".join(
    f"  {k!r}: {v!r},\n".replace("'", '"', 2) for k, v in images.items()
) + "};\n"
# keep JS-safe quoting
image_map = "const IMAGES = {\n" + "".join(f'  "{k}": "{v}",\n' for k, v in images.items()) + "};\n"




# ── 5b. content/ folder, scanned the same way loadContent.js does ───────────
def scan_content():
    """Mirrors src/content/loadContent.js so the preview shows real folders."""
    import json

    base = ROOT / "content"
    if not base.is_dir():
        return {"home": {"reel": None, "reelLink": None, "about": None}, "sections": []}

    # Order prefix: digits + a separator ("01_"), so "3D Art" stays intact.
    ORDER_PREFIX = r"^(\d+)[_\-.\s]+"

    IMG = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"}
    VID = {".mp4", ".webm", ".mov", ".m4v"}

    def order(name):
        m = re.match(ORDER_PREFIX, name)
        return (int(m.group(1)) if m else 10**9, name.lower())

    def display(name, is_file=False):
        # Extensions are stripped only for files: the folder "Board.fun" has to
        # keep its ".fun", and "3D Art" must not lose its leading "3" — which is
        # why ORDER_PREFIX requires a separator after the digits.
        if is_file:
            name = re.sub(r"\.[a-z0-9]+$", "", name, flags=re.I)
        name = re.sub(ORDER_PREFIX, "", name)
        return re.sub(r"\s{2,}", " ", name.replace("_", " ")).strip()

    def slugify(v):
        return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", v.lower()))

    def img_uri(path, width=760):
        from PIL import Image
        im = Image.open(path).convert("RGB")
        w, h = im.size
        if w > width:
            im = im.resize((width, round(h * width / w)), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=76, method=6)
        return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()

    home = {"reel": None, "reelLink": None, "about": None}
    for f in base.iterdir():
        if f.is_file():
            if f.suffix.lower() in VID and f.stem.lower() == "reel":
                home["reel"] = f"content/{f.name}"
            elif f.name.lower() == "reel.txt":
                home["reelLink"] = f.read_text().strip() or None
            elif f.name.lower() in ("about.txt", "description.txt"):
                home["about"] = f.read_text().strip() or None

    sections = []
    for d in sorted([d for d in base.iterdir() if d.is_dir()], key=lambda x: order(x.name)):
        entry = {"name": display(d.name), "slug": slugify(display(d.name)),
                 "reel": None, "reelLink": None, "description": None, "blocks": []}
        for f in d.iterdir():
            if f.is_file():
                if f.suffix.lower() in VID and f.stem.lower() == "reel":
                    entry["reel"] = f"content/{d.name}/{f.name}"
                elif f.name.lower() == "reel.txt":
                    entry["reelLink"] = f.read_text().strip() or None
                elif f.name.lower() == "description.txt":
                    entry["description"] = f.read_text().strip() or None

        for bd in sorted([b for b in d.iterdir() if b.is_dir()], key=lambda x: order(x.name)):
            blk = {"name": display(bd.name), "slug": slugify(display(bd.name)),
                   "description": None, "images": []}
            for f in sorted([f for f in bd.iterdir() if f.is_file()], key=lambda x: order(x.name)):
                if f.name.lower() == "description.txt":
                    blk["description"] = f.read_text().strip() or None
                elif f.suffix.lower() in IMG:
                    blk["images"].append({"src": img_uri(f), "alt": display(f.name, True)})
            if blk["images"] or blk["description"]:
                entry["blocks"].append(blk)
        sections.append(entry)

    return {"home": home, "sections": sections}


content_js = "const CONTENT = " + __import__("json").dumps(scan_content()) + ";\n"

# ── 5. The vanilla render layer ─────────────────────────────────────────────
renderer = r"""
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** **bold** → highlighted stat, matching the React <Rich> component. */
const rich = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong class="stat">$1</strong>');

const LANE_LABELS = { art: '3D Art', techart: 'Tech Art', product: 'Product + Marketing' };

const ICONS = {
  chevron: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-10h4v1.5"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49 49 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49 49 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  boat: '<path d="M12 3v9" stroke-width="1.4"/><path d="M12.9 4.2 18 10.2a.5.5 0 0 1-.4.8h-4.7V4.5c0-.5.6-.7.9-.3Z" fill="currentColor" stroke="none"/><path d="M3.4 14h17.2l-2.2 4.7a2 2 0 0 1-1.8 1.1H7.4a2 2 0 0 1-1.8-1.1L3.4 14Z" stroke-width="1.4"/>',
};
const icon = (name, size = 18, cls = '') =>
  `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

const portfolio = Portfolio.from(portfolioData, content);
const state = { view: 'home', open: null, modal: null, menu: false };

const tagRow = (items) =>
  !items || !items.length ? '' :
  `<div class="tag-row">${items.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;

const bullets = (items) =>
  !items || !items.length ? '' :
  `<ul class="bullets">${items.map((b) => `<li><span>${rich(b)}</span></li>`).join('')}</ul>`;

/** Logo when the file exists, monogram when it doesn't. */
const avatar = (e) => e.logo
  ? `<div class="avatar"><img src="${esc(e.logo)}" alt="" loading="lazy"
       onerror="this.parentNode.textContent='${esc(e.initials)}'"></div>`
  : `<div class="avatar">${esc(e.initials)}</div>`;

function accordionRow(e) {
  const open = state.open === e.id;
  return `
  <div class="acc-item${open ? ' is-open' : ''}">
    <button type="button" class="acc-trigger" data-acc="${esc(e.id)}" aria-expanded="${open}">
      ${avatar(e)}
      <span>
        <span class="acc-role">${esc(e.role)}</span>
        <span class="acc-org">${esc(e.org)}</span>
        ${e.contextLine ? `<span class="acc-context">${esc(e.contextLine)}</span>` : ''}
      </span>
      <span class="acc-badge">${esc(e.kindLabel)}</span>
      <span class="acc-period">${esc(e.period)}</span>
      ${icon('chevron', 16, 'acc-chevron')}
    </button>
    <div class="acc-panel"><div class="acc-clip"><div class="acc-body">
      <div>
        ${e.summary ? `<p class="acc-summary">${rich(e.summary)}</p>` : ''}
        ${bullets(e.bullets)}
      </div>
      <aside class="acc-aside">
        ${e.hasProgression ? `<div class="aside-block">
            <p class="aside-label">Progression</p>
            <ol class="progression">${e.progression.map((s, i) => `
              <li class="${i === e.progression.length - 1 ? 'is-current' : ''}">
                <span class="progression-role">${esc(s.role)}</span>
                ${s.note ? `<span class="progression-note">${esc(s.note)}</span>` : ''}
              </li>`).join('')}</ol></div>` : ''}
        ${e.tools && e.tools.length ? `<div class="aside-block">
            <p class="aside-label">Tools &amp; methods</p>${tagRow(e.tools)}</div>` : ''}
        ${e.lanes && e.lanes.length ? `<div class="aside-block">
            <p class="aside-label">Related work</p>
            <div class="tag-row">${e.lanes.map((l) =>
              `<button type="button" class="lane-chip" data-nav="${l}">${LANE_LABELS[l]}</button>`).join('')}</div></div>` : ''}
      </aside>
    </div></div></div>
  </div>`;
}

const accordion = (groups) => groups.map((g) => `
  <section class="acc-group">
    <header class="acc-group-head"><h3>${esc(g.label)}</h3>
      ${g.note ? `<span class="acc-note">${esc(g.note)}</span>` : ''}</header>
    <div class="acc-list">${g.items.map(accordionRow).join('')}</div>
  </section>`).join('');

const projectCard = (p) => `
  <button type="button" class="proj-card" data-proj="${esc(p.id)}">
    <div class="proj-media">
      ${p.cover
        ? `<img src="${p.cover.src}" alt="${esc(p.cover.alt || p.title)}" loading="lazy">`
        : `<div class="proj-plate"><span>${esc(p.plate)}</span></div>`}
    </div>
    <div class="proj-text">
      <h3 class="proj-title">${esc(p.title)}</h3>
      ${p.subtitle ? `<p class="proj-sub">${rich(p.subtitle)}</p>` : ''}
      ${p.metaLine ? `<p class="proj-meta">${esc(p.metaLine)}</p>` : ''}
    </div>
  </button>`;

const videoReel = (src) => `<div class="video-reel"><video controls preload="metadata" playsinline>
  <source src="${esc(src)}"></video></div>`;

const embedReel = (v, label) => `<div class="reel" data-embed="${esc(v.embedUrl)}">
  <button type="button" class="reel-play" data-play="${esc(v.embedUrl)}">
    <span class="ring">${icon('play', 18)}</span>${esc(label || 'Play reel')}</button></div>`;

/** file > REEL.txt link > reelUrl in the data file. Empty means no reel at all. */
const reelBlock = (sources, label) => {
  if (sources.file) return videoReel(sources.file);
  const v = parseVideoLink(sources.link) || parseVideoLink(sources.fallback);
  return v ? embedReel(v, label) : '';
};

const textBlock = (t, cls) => {
  const paras = toParagraphs(t);
  return paras.length ? `<div class="content-text ${cls || ''}">${paras.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : '';
};

const contentBlock = (b) => `
  <section class="content-block">
    <h3 class="content-block-title">${esc(b.name)}</h3>
    ${textBlock(b.description)}
    ${b.images.length ? `<div class="content-gallery" data-count="${Math.min(b.images.length, 4)}">
      ${b.images.map(im => `<figure class="content-shot"><img src="${im.src}" alt="${esc(im.alt)}" loading="lazy"></figure>`).join('')}
    </div>` : ''}
  </section>`;

const contentSection = (c) => !c ? '' : `
  ${c.description ? `<section class="section">${textBlock(c.description, 'content-intro')}</section>` : ''}
  ${c.blocks.map(contentBlock).join('')}`;

function homePage() {
  const pr = portfolio.profile;
  return `
  <main id="main" class="page"><div class="wrap">
    <header class="masthead">
      <figure class="masthead-portrait">
        <img src="${pr.photo}" alt="${esc(pr.photoAlt)}">
        <figcaption>${esc(pr.photoCaption)}</figcaption>
      </figure>
      <h1>MILO LIN</h1>
      <p>${esc(pr.tagline)}</p>
    </header>

    ${(() => {
      const r = reelBlock({ file: content.home.reel, link: content.home.reelLink, fallback: pr.reelUrl }, 'Play demo reel');
      return r ? `<section class="section"><h2 class="section-label">Demo Reel</h2>${r}</section>` : '';
    })()}

    <section class="section">
      <h2 class="section-label">About Me</h2>
      <div class="panel about">
        ${(content.home.about ? toParagraphs(content.home.about) : pr.about).map((p) => `<p>${esc(p)}</p>`).join('')}
        <p class="edu-line"><strong>${esc(pr.education.school)}</strong> &mdash;
          ${esc(pr.education.degree)}, ${esc(pr.education.minor)}.
          ${esc(pr.education.detail)}. ${esc(pr.education.period)}.</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-label">Professional Experience</h2>
      ${accordion(portfolio.groups)}
    </section>

    <section class="section">
      <h2 class="section-label">Portfolio</h2>
      <div class="portfolio-grid">${portfolio.lanes.map((l) => `
        <button type="button" class="portfolio-btn" data-nav="${l.key}">
          <h3>${esc(l.label.toUpperCase())}</h3>
          <p>${esc(l.tagline)}</p>
          ${icon('chevronRight', 16)}
        </button>`).join('')}</div>
    </section>

    <section class="section">
      <h2 class="section-label">Skills</h2>
      <div class="skill-grid">${Object.entries(pr.skills).map(([g, items]) => `
        <div class="skill-block"><h4>${esc(g)}</h4>${tagRow(items)}</div>`).join('')}</div>
    </section>

    <section class="section" style="margin-bottom:0">
      <h2 class="section-label">Connect</h2>
      <div class="connect-row">
        <a class="connect-btn" href="${esc(pr.youtube)}" target="_blank" rel="noreferrer noopener">${icon('youtube', 16)}</a>
        <a class="connect-btn" href="${esc(pr.linkedin)}" target="_blank" rel="noreferrer noopener">${icon('linkedin', 16)}</a>
        <a class="connect-btn" href="mailto:${esc(pr.email)}">${icon('mail', 16)}</a>
      </div>
    </section>
  </div></main>`;
}

function lanePage(lane) {
  const groups = portfolio.groupsForLane(lane.key);
  return `
  <main id="main" class="page"><div class="wrap">
    <button type="button" class="back-link" data-nav="home">${icon('arrowLeft', 13)} All work</button>
    <header class="lane-head section">
      <h1>${esc(lane.label)}</h1>
      <p class="lane-tagline">${esc(lane.tagline)}</p>
      ${!(lane.content && lane.content.description) && lane.blurb ? `<p class="lane-blurb">${esc(lane.blurb)}</p>` : ''}
    </header>
    ${(() => {
      const src = { file: lane.content && lane.content.reel, link: lane.content && lane.content.reelLink, fallback: lane.reelUrl };
      const r = reelBlock(src, `Play ${lane.label} reel`);
      return r ? `<section class="section"><h2 class="section-label">Reel</h2>${r}</section>` : '';
    })()}
    ${contentSection(lane.content)}
    ${lane.projects.length ? `<section class="section">
      <h2 class="section-label">${lane.hasContent ? 'More work' : 'Work'}</h2>
      <div class="proj-grid">${lane.projects.map(projectCard).join('')}</div>
    </section>` : ''}
    ${groups.length ? `<section class="section" style="margin-bottom:0">
      <h2 class="section-label">Related Experience</h2>${accordion(groups)}</section>` : ''}
  </div></main>`;
}

function modalMarkup() {
  if (!state.modal) return '';
  const p = state.modal;
  return `
  <div class="modal-scrim" data-close-modal><div class="modal">
    <div class="modal-head">
      <div><h2 class="modal-title">${esc(p.title)}</h2>
        ${p.subtitle ? `<p class="modal-sub">${rich(p.subtitle)}</p>` : ''}</div>
      <button type="button" class="modal-close" data-close-modal aria-label="Close">${icon('x', 16)}</button>
    </div>
    <div class="modal-body">
      ${p.hasMedia ? `<div class="modal-gallery">${p.media.map((m) => `
        <figure class="modal-shot"><img src="${m.src}" alt="${esc(m.alt || p.title)}" loading="lazy">
        ${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}
      ${bullets(p.bullets)}
      ${p.note ? `<p class="modal-note">${esc(p.note)}</p>` : ''}
      ${p.tools && p.tools.length ? `<div><p class="aside-label">Tools</p>${tagRow(p.tools)}</div>` : ''}
      ${p.links && p.links.length ? `<div class="link-row">${p.links.map((l) =>
        `<a class="link-pill" href="${esc(l.href)}" target="_blank" rel="noreferrer noopener">${esc(l.label)}</a>`).join('')}</div>` : ''}
    </div>
  </div></div>`;
}

function render() {
  const lane = portfolio.lane(state.view);
  const pr = portfolio.profile;
  document.getElementById('root').innerHTML = `
    <canvas class="splash-layer" id="splash"></canvas>

    <div class="fish-layer" id="fish"><svg class="fish-body" viewBox="0 0 38 24" fill="none">
      <path class="fish-tail" d="M26 12c2.7-3.1 6-5.6 9.4-6.8.8-.3 1.5.5 1.3 1.3-1.3 3.6-1.3 7.2 0 10.8.3.8-.5 1.6-1.3 1.3C32 17.4 28.7 14.9 26 12Z" fill="var(--accent)" opacity=".85"/>
      <path d="M27.5 12c0 5-6 8.7-12.8 8.7C7.9 20.7 1.4 17 1.4 12S7.9 3.3 14.7 3.3C21.5 3.3 27.5 7 27.5 12Z" fill="var(--accent)"/>
      <path class="fish-fin" d="M15.8 19.5c1.4 1.6 3.2 2.7 5 3.1.6.2 1.1-.5.8-1a11 11 0 0 1-1.2-3.8Z" fill="var(--accent)" opacity=".7"/>
      <circle cx="8.5" cy="10.1" r="1.8" fill="#000"/>
    </svg></div>

    <nav class="nav"><div class="nav-inner">
      <button type="button" class="nav-mark" data-nav="home">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round">${ICONS.boat}</svg>Milo Lin</button>
      <div class="nav-links">
        ${portfolio.lanes.map((l) => `<button type="button"
          class="nav-link${state.view === l.key ? ' is-active' : ''}"
          data-nav="${l.key}">${esc(l.label)}</button>`).join('')}
        <a class="nav-icon" href="${esc(pr.linkedin)}" target="_blank" rel="noreferrer noopener">${icon('linkedin', 15)}</a>
        <a class="nav-icon" href="mailto:${esc(pr.email)}">${icon('mail', 15)}</a>
      </div>
      <button type="button" class="nav-toggle" id="navToggle"
        aria-expanded="${state.menu}" aria-label="${state.menu ? 'Close menu' : 'Open menu'}">
        ${icon(state.menu ? 'x' : 'menu', 18)}</button>
    </div>
    <div class="nav-drawer${state.menu ? ' is-open' : ''}" id="mobile-menu">
      ${portfolio.lanes.map((l) => `<button type="button"
        class="nav-drawer-link${state.view === l.key ? ' is-active' : ''}"
        data-nav="${l.key}">${esc(l.label)}</button>`).join('')}
      <button type="button" class="nav-drawer-link" data-nav="home">Home</button>
      <div class="nav-drawer-icons">
        <a class="connect-btn" href="${esc(pr.linkedin)}" target="_blank" rel="noreferrer noopener">${icon('linkedin', 16)}</a>
        <a class="connect-btn" href="mailto:${esc(pr.email)}">${icon('mail', 16)}</a>
      </div>
    </div></nav>

    ${lane ? lanePage(lane) : homePage()}

    <footer class="footer"><div class="wrap footer-inner">
      <span>&copy; 2026 Milo Lin &mdash; ${esc(pr.location)}</span>
      <div class="footer-links">
        <button type="button" class="fish-toggle" id="fishToggle">Fish cursor: on</button>
      </div>
    </div></footer>

    <span class="version-badge" title="Build ${VERSION_LABEL}">${VERSION_LABEL}</span>
    ${modalMarkup()}`;

  mountFish();
  mountSplash();

  const toggle = document.getElementById('navToggle');
  if (toggle) toggle.onclick = () => { state.menu = !state.menu; render(); };
}

document.addEventListener('click', (ev) => {
  const nav = ev.target.closest('[data-nav]');
  if (nav) { state.view = nav.dataset.nav; state.open = null; state.modal = null; state.menu = false; render(); window.scrollTo(0, 0); return; }

  const play = ev.target.closest('[data-play]');
  if (play) {
    const wrap = play.closest('.reel');
    wrap.innerHTML = `<iframe src="${play.dataset.play}?autoplay=1" title="Reel"
      allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
    return;
  }

  const acc = ev.target.closest('[data-acc]');
  if (acc) { state.open = state.open === acc.dataset.acc ? null : acc.dataset.acc; render(); return; }

  const proj = ev.target.closest('[data-proj]');
  if (proj) {
    const lane = portfolio.lane(state.view);
    state.modal = lane ? lane.find(proj.dataset.proj) : null;
    render(); return;
  }
  if (ev.target.closest('.modal-close') || ev.target.classList.contains('modal-scrim')) {
    state.modal = null; render();
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && state.modal) { state.modal = null; render(); }
});

let splashInstance = null;
function mountSplash() {
  const el = document.getElementById('splash');
  if (splashInstance) splashInstance.detach();
  splashInstance = null;
  if (el && SplashEffect.isSupported()) splashInstance = new SplashEffect(el).attach();
}

let fishInstance = null;
let fishOn = FishCursor.isSupported();

function mountFish() {
  const el = document.getElementById('fish');
  if (fishInstance) fishInstance.detach();
  fishInstance = null;
  if (fishOn && el && FishCursor.isSupported()) fishInstance = new FishCursor(el).attach();
  const btn = document.getElementById('fishToggle');
  if (btn) {
    btn.textContent = 'Fish cursor: ' + (fishOn ? 'on' : 'off');
    btn.onclick = (e) => { e.stopPropagation(); fishOn = !fishOn; render(); };
  }
}

render();
console.log('%cMilo Lin portfolio ' + VERSION_LABEL + ' (standalone preview)', 'color:#22d3ee');
"""


html = rf"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Milo Lin — portfolio preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<div id="root"></div>
<script>
{image_map}
{content_js}
const slugify = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const slug = slugify;
const toParagraphs = (t) => !t ? [] : String(t).split(/\n\s*\n/).map(b => b.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
function parseVideoLink(raw) {{
  if (!raw) return null;

  // A REEL.txt might have a trailing newline, or a stray comment line.
  const value = String(raw)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#'));

  if (!value) return null;

  const youtube =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{{11}})/.exec(
      value
    );
  if (youtube) {{
    return {{
      provider: 'youtube',
      id: youtube[1],
      // -nocookie means YouTube sets no tracking cookie until playback starts.
      embedUrl: `https://www.youtube-nocookie.com/embed/${{youtube[1]}}`,
    }};
  }}

  const vimeo = /vimeo\.com\/(?:video\/)?(?:channels\/[^/]+\/)?(\d{{6,}})/.exec(value);
  if (vimeo) {{
    return {{
      provider: 'vimeo',
      id: vimeo[1],
      embedUrl: `https://player.vimeo.com/video/${{vimeo[1]}}`,
    }};
  }}

  // A bare 11-character YouTube ID pasted on its own.
  if (/^[A-Za-z0-9_-]{{11}}$/.test(value)) {{
    return {{
      provider: 'youtube',
      id: value,
      embedUrl: `https://www.youtube-nocookie.com/embed/${{value}}`,
    }};
  }}

  return null;
}}
const content = CONTENT;

{version}
{domain}
{fish}
{splash}
{data}
{renderer}
</script>
</body>
</html>
"""

for name in ("milo-portfolio-preview.html", "OPEN-THIS-preview.html"):
    out = ROOT / name
    out.write_text(html)
    print(f"wrote {out.name}  ({len(html) / 1024:.0f} KB)")
