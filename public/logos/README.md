# Company logos

Drop logo files in this folder using the **exact filenames** below. The site
already points at every one of these paths — until a file exists, that row shows
a lettered monogram instead, and nothing breaks.

## Exact filenames to use

| Filename | Company / organisation | Used by |
|---|---|---|
| `wbgames_logo.png` | WB Games Boston | Product Management Co-op |
| `draftkings_logo.png` | DraftKings | Motion Graphics Co-op |
| `schellgames_logo.png` | Schell Games | Marketing / Product Intern |
| `goodwin_logo.png` | Goodwin Law | Multimedia & Marketing Co-op |
| `lykostudios_logo.png` | Lyko Studios | Environment Art and Implementor |
| `sentry_logo.png` | SENTRY (DHS research org) | Video Production & Animation Intern |
| `humonlab_logo.png` | HuM0N Lab | Research Assistant, Mocap Kinetics Lab |
| `northeastern_logo.png` | Northeastern University | **3 roles** — Immersive Media Lab, Robotics Lab, Animation TA |
| `knack_logo.png` | KNACK | Game Art & Animation Tutor |
| `generate_logo.png` | Generate Product Development Studio | Art Director |
| `scout_logo.png` | Scout (Northeastern) | Animator & Videographer |
| `freelance_logo.png` | Freelance | Art Direction Consultant |
| `nuvr_logo.png` | NUVR / NUXR Club | President |
| `animationclub_logo.png` | Northeastern Animation Club | Vice President |
| `siggraph_logo.png` | SIGGRAPH | Conference Volunteer row |

That's **15 files** covering 17 roles — `northeastern_logo.png` is reused by
three roles, so you only need it once.

## Format notes

- `.png` with a transparent background works best on the black background.
- `.svg` also works — if you use SVG, change the extension in
  `src/data/portfolio.data.js` (search for `logos/`).
- Square-ish crops look best. They render at 38×38 with 4px padding, using
  `object-fit: contain`, so nothing gets cropped.
- White or light-coloured marks read better than dark ones here.

## Why these aren't already included

Company logos are trademarks, and I can't download them for you. Grab each from
the company's own press or brand page — most have one. Wikipedia's article for
each company usually links the official SVG too.
