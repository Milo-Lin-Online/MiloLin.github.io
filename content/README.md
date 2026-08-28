# Adding work to the site

**You should not have to open a code file to add a project.** Drop folders and
files into `content/`, push, and the site rebuilds around whatever it finds.

---

## The shape

```
content/
│
├── REEL.mp4                      ← demo reel video file            (optional)
│   or REEL.txt                   ← a text file holding a video LINK (optional)
├── about.txt                     ← replaces the About Me text      (optional)
│
├── 3D Art/                       ← folder name = section name
│   ├── REEL.mp4 or REEL.txt      ← this section's reel             (optional)
│   ├── description.txt           ← intro text, sits under the reel (optional)
│   │
│   ├── 01_Board.fun/             ← a block of work
│   │   ├── description.txt       ← text above this block's images
│   │   ├── 01_blockout.png       ← images appear in number order
│   │   └── 02_prop study.png
│   │
│   └── 02_WB GAMES WORK/
│       ├── description.txt
│       ├── 01_ingame changes.png
│       ├── 02_dashboard.png
│       └── 03_offer card.png
│
├── Tech Art/
└── Product + Marketing/
```

Each section page then reads, top to bottom:

**Section title → REEL → description text → each block, in order**

---

## The rules

**If a file isn't there, that part doesn't appear.**
No `REEL.mp4` means no reel section — not an empty box. No `description.txt`
means no text. No images means no gallery. Nothing to delete, nothing to
disable.

**Number things `01_`, `02_`, `03_` — with the leading zero.**
Two digits, always. `01_`, `02_` … `10_`, `11_`.

The site reads them as numbers either way, so `1_` works too. The reason to pad
them is your own Finder or Explorer window: those sort by text, so unpadded,
`10_thing` sits between `1_thing` and `2_thing` in your file browser. Padding
keeps the folder looking the same way it looks on the site.

Past 99 items, use three digits (`001_`).

**Folders order the same way.**
`01_Board.fun` before `02_WB GAMES WORK`. The number is stripped from the title
shown on the page. Unnumbered folders fall back to alphabetical.

**The number needs a separator after it.**
`01_Thing`, `01 Thing`, `01-Thing` all work. This is why a section called
`3D Art` is safe — nothing separates the `3` from the `D`, so it isn't read as
an order number.

**Filenames become alt text.**
`2_dashboard detail.png` is described to screen readers as "dashboard detail".
Underscores become spaces, the number and extension are dropped. Worth the extra
few seconds when you name things.

**Section folder names match by name.**
A folder called `Product + Marketing` merges into the existing Product +
Marketing page. A folder with a name that doesn't match anything creates a
**brand new section**, and it appears in the navigation automatically.

---

## The galleries resize themselves

You don't choose a layout — it follows the number of images in the folder:

| Images in the folder | Desktop | Phone |
|---|---|---|
| 1 | full width, uncropped | full width |
| 2 | side by side | stacked |
| 3 | three across (two on a tablet) | stacked |
| 4 or more | grid that reflows | stacked |

Images keep their own proportions rather than being cropped into squares, so a
tall Blender screenshot and a wide render both sit correctly next to each other.

---

## Writing description.txt

Just type. Leave a blank line between paragraphs and they'll render as separate
paragraphs:

```
Art direction for Board, a 24-inch face-to-face game console.

The format rewrites the art brief completely: everything has to read from
every seat around the table.
```

Single line breaks inside a paragraph are ignored, so you can wrap text however
you like in your editor without it affecting the page.

---

## Getting it live

```bash
git add content
git commit -m "Add WB Games work"
git push
```

That's it. The GitHub Actions workflow rebuilds and redeploys automatically —
about a minute. See `DEPLOY.md` if the site isn't updating.

To preview locally before pushing:

```bash
npm run dev
```

Files are picked up as soon as you save.

---

## Reels — three ways, pick whichever suits

The site checks these in order and uses the first one it finds.

### 1. A video file — `REEL.mp4`

Drop it in the folder. Plays directly on the page, no third party involved.

- `.mp4` is the safe choice. `.webm` works; `.mov` often won't play in Chrome.
- Name it `REEL` — `REEL.mp4` or `reel.mp4`, either is fine.
- **Keep it under 50MB.** GitHub warns above 50MB and refuses above 100MB.
- Only the first frame and duration load up front. The rest downloads when
  someone presses play.

### 2. A link in a text file — `REEL.txt`

Make a file called `REEL.txt` and paste the link into it. That's the whole job.

```
https://www.youtube.com/watch?v=aB3xY_9kQ1c
```

Any shape of link works — the address bar, the Share button, `youtu.be`,
Shorts, or a Vimeo URL. A bare video ID works too.

Lines starting with `#` are ignored, so you can leave yourself notes. There's a
template at `content/REEL.txt` already: paste your link under the comments and
it goes live. Until then it does nothing, which is why no reel shows right now.

**Best for reels over 50MB**, since the video lives on YouTube or Vimeo.

### 3. In the code — `src/data/portfolio.data.js`

If you'd rather keep it with the rest of the written content, there's a
`reelUrl` field on the profile and on each section:

```js
reelUrl: 'https://www.youtube.com/watch?v=aB3xY_9kQ1c',
```

Same link formats. A `REEL.mp4` or `REEL.txt` in the folder overrides it.

### If none of the three exist

The reel section doesn't render. No empty box, no "coming soon" placeholder.

### One nice detail

Linked videos don't load until someone clicks play. You get a plain button
instead, and YouTube's several hundred KB of script is never fetched for
visitors who don't watch. It also uses the no-cookie domain, so YouTube sets no
tracking cookie until playback starts.

---

## What still lives in the code

`src/data/portfolio.data.js` holds the things that aren't files:

- your bio, education, and skills
- the experience accordion (roles, dates, bullets, promotions)
- the hand-written project cards, which appear under **More work** below the
  folder galleries
- `reelUrl`, if you'd rather keep reel links in code than in a `REEL.txt`

That file is heavily commented and is the only one you'd ever need to edit.
Everything visual now comes from `content/`.
