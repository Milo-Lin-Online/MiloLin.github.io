# Why the live site never changed — and how to fix it

## The diagnosis

Your source on `main` is correct and up to date. The problem is that **GitHub
Pages doesn't serve source — it serves a build.**

I compared the two directly:

| | `<title>` |
|---|---|
| `main/index.html` in your repo | `Milo Lin — Game Art, Tech Art, Product` (current) |
| The live site | `milo-portfolio` (the **original** build) |

They're different files. Pages is still serving a build published a long time ago
onto a `gh-pages` branch, from before any of this work existed. Every commit since
has pushed source only, and nothing has ever rebuilt it. So the live site has sat
frozen on the original site this whole time.

`dist/` is in `.gitignore`, which is correct — you don't want build output in
version control. But it means something has to build it for you.

## The fix — 3 steps, about two minutes

### 1. Copy in the new files

From this package, copy into your repo:

- `.github/workflows/deploy.yml` ← **this is the important one**
- `public/.nojekyll`
- everything else as usual (`src/`, `index.html`, `package.json`, …)

### 2. Delete two leftover files from your repo

```bash
git rm tailwind.config.js eslint.config.js
```

Both are from the original setup. Tailwind isn't a dependency any more, and
eslint was removed from `package.json`, so `eslint.config.js` refers to plugins
that no longer install. Neither breaks the build, but they'll confuse you later.

Optionally also delete the stale lockfile and let it regenerate:

```bash
rm package-lock.json
npm install
```

### 3. Change one setting on GitHub — you have to do this part

**Settings → Pages → Build and deployment → Source → select "GitHub Actions"**

Right now it's set to "Deploy from a branch", pointed at the old `gh-pages`
branch. That single dropdown is why nothing you push shows up.

### Then push

```bash
git add -A
git commit -m "Add Pages build workflow"
git push
```

Watch it run under the **Actions** tab. It takes about a minute. When it goes
green, hard-refresh the site:

**https://milo-lin-online.github.io/MiloLin.github.io/**

## How to confirm it actually worked

The bottom-right corner shows a faint version badge. It should read **v1.5.0**.
You can also open the console and type `__MILO_VERSION__`.

If it still says something else, you're on a cached copy — hard-refresh with
Ctrl+Shift+R (Cmd+Shift+R on Mac).

## After this

Every push to `main` rebuilds and redeploys automatically. You never run
`npm run deploy` again, and what's on `main` is always what's live.

`gh-pages` is still in `package.json` as a manual fallback, and the old
`gh-pages` branch can be deleted once the workflow is running — Pages won't be
looking at it any more.

## One thing to double-check

`vite.config.js` sets:

```js
base: '/MiloLin.github.io/',
```

That's correct for this repo, because your username is `Milo-Lin-Online` and the
repo is `MiloLin.github.io` — so the site lives at a subpath. If it were named
`milo-lin-online.github.io` it would be served at the domain root and `base`
would need to be `'/'`.

When you move to **milolinonline.com**, change `base` to `'/'` and add a `CNAME`
file in `public/` containing your domain.
