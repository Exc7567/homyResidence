# Task: Fix blank white page on GitHub Pages (Vite + React)

## Context

- **Repo:** `Exc7567/homyResidence`
- **Live URL:** https://exc7567.github.io/homyResidence/
- **Stack:** Vite + React
- **Problem:** The deployed site loads as a blank white page. Nothing renders.
- **Likely cause:** The site is a GitHub *project* page, so it is served from the sub-path `/homyResidence/`, not from `/`. Vite defaults to `base: '/'`, so the built JS/CSS are requested from the wrong URL and 404. GitHub Pages may also be serving source code instead of the built `dist` output.

> Note: The repo name is **case-sensitive** in the URL. It must be exactly `homyResidence`.

## Goal

Make https://exc7567.github.io/homyResidence/ render the full React app correctly, with all assets, images, and routes working. Set up automatic deployment so future pushes redeploy.

---

## Step 1: Diagnose

1. Inspect the repo structure. Confirm `package.json`, `vite.config.js` (or `.ts`), `index.html`, and `src/`.
2. Check `vite.config.*` for a `base` option.
3. Check whether the app uses `react-router-dom` (look for `BrowserRouter`, `createBrowserRouter`, `Routes`).
4. Search the code for hardcoded absolute asset paths such as `"/images/..."`, `"/logo.png"`, `url(/...)`.
5. Check which branch and folder GitHub Pages is serving from (Settings, Pages). If it serves `main` / root, it is serving source files, which will always render white.

## Step 2: Fix `vite.config`

Set `base` to the exact repo name with a leading and trailing slash:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/homyResidence/',
})
```

## Step 3: Fix routing (only if react-router is used)

Use one of these:

- **Simplest and most reliable:** replace `BrowserRouter` with `HashRouter`.
- **Or** keep `BrowserRouter` and set the basename:
  ```jsx
  <BrowserRouter basename="/homyResidence">
  ```
  If using `BrowserRouter`, also add a `public/404.html` SPA fallback that redirects to `index.html`, so deep links and refreshes don't 404.

If the app does not use a router, skip this step.

## Step 4: Fix asset paths

- Files in `public/` referenced from code must NOT start with a bare `/`. Use:
  ```js
  `${import.meta.env.BASE_URL}images/photo.jpg`
  ```
  or a relative path.
- Images imported from `src/` (`import img from './assets/x.png'`) are handled by Vite and need no change.
- In `index.html`, favicon and other links must also respect the base path (e.g. `href="%BASE_URL%favicon.ico"` or a relative path).
- **Check filename case.** GitHub Pages is case-sensitive: `Hero.JPG` is not `hero.jpg`. Make every reference match the real filename exactly.

## Step 5: Set up deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Notes:
- If the default branch is not `main`, change it in `on.push.branches`.
- If the project uses `yarn` or `pnpm` instead of npm, adjust the install and cache steps.
- If `package-lock.json` is missing, use `npm install` instead of `npm ci`.

## Step 6: Change the GitHub Pages setting (manual, if the agent cannot do it)

Go to **Repo, Settings, Pages, Build and deployment, Source** and choose **GitHub Actions**.

(Alternative if you prefer not to use Actions: install `gh-pages`, add `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"` to `package.json` scripts, run `npm run deploy`, and set Pages source to the `gh-pages` branch, `/ (root)`.)

## Step 7: Verify locally before pushing

```bash
npm run build
npm run preview
```

Open the preview URL. It should be served under `/homyResidence/`. Confirm the page renders and no requests 404 in the browser DevTools Network tab.

## Step 8: Commit, push, and verify live

1. Commit and push to the default branch.
2. Wait for the Actions workflow to finish (Actions tab, green check).
3. Open https://exc7567.github.io/homyResidence/ and hard refresh (Ctrl+Shift+R).
4. In DevTools Console and Network, confirm there are no red errors or 404s.

## Definition of done

- [ ] The live site renders the full app (no white screen).
- [ ] All images, fonts, CSS, and JS load with status 200.
- [ ] Navigation between pages and a browser refresh on any route work.
- [ ] Pushing to the default branch triggers an automatic redeploy.
- [ ] A short summary of what was changed and why is provided.

## If it is still white after the fixes

Report the exact red errors from the browser Console and any failing URLs from the Network tab. Common remaining causes:
- A runtime JS error in the app (fix the component).
- A missing environment variable that exists only locally in `.env` (GitHub Actions needs it as a repo secret or variable, and Vite only exposes variables prefixed with `VITE_`).
- A wrong filename case in an import or asset reference.
