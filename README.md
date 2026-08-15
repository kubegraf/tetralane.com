# tetralane.com

Marketing site for **Tetralane** — the autonomous AI SRE platform.

**Live:** https://kubegraf.github.io/tetralane.com/

A single-page, dependency-free static site: hand-written HTML, CSS and vanilla JS,
self-hosted fonts, and SVG brand assets. No build step, no framework, no CDN calls.

## Structure

```
index.html                 # the whole page
assets/css/styles.css      # design tokens + all styling
assets/js/main.js          # sticky nav, mobile menu, scroll reveal, counters, form
assets/fonts/              # self-hosted Inter / Sora / JetBrains Mono (woff2, latin subset)
assets/img/IMG_1620.png    # the supplied logo file — single source for every logo
assets/img/og-image.png    # social preview
assets/favicon-*.png       # tab and app icons, resized from the logo file
.github/workflows/         # GitHub Pages deployment
```

## Local development

Any static file server works:

```bash
npx http-server -p 8080
# then open http://localhost:8080
```

Edit and refresh — there is nothing to compile.

## Deployment

GitHub Pages serves this repo directly: **Settings → Pages → Source: Deploy from
a branch → `main` → `/ (root)`**. The site lives at the repo root and ships a
`.nojekyll` file, so pushing to `main` publishes it as-is with no build step.

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) is
kept for the alternative setup — switching Source to "GitHub Actions" makes that
workflow deploy instead. While Source is set to a branch, the workflow detects
it and skips, so it is a no-op rather than a failing check.

## Logo

`assets/img/IMG_1620.png` is the supplied logo file and the single source for
every appearance of the logo. It is used as delivered — never redrawn,
recoloured or re-exported.

The file is 1408x768 and its artwork occupies x 182-1224, y 302-466, so roughly
four fifths of it is blank canvas. The header and footer load the file itself
and frame that region in CSS (see `.logo` in `styles.css`) rather than cropping
a new copy, which is why the offsets there are expressed as fractions of 216.

The tab and app icons are resizes of the same region, letterboxed into a square
so nothing is cropped. That leaves the wordmark small: readable at 180px and
above, a smudge at 32px, effectively blank at 16px. Cropping the icons to the
mark alone would give a sharp favicon at the cost of showing only part of the
logo.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| Blue | `#6EB8E0` | Lane 1 — Observe |
| Navy | `#16346B` | Lane 2 — Diagnose |
| Green | `#46A45C` | Lane 3 — Act |
| Amber | `#F5A623` | Lane 4 — Learn |
| Teal | `#2E9BC0` | The lane you take — primary accent |

Fonts are subsets of Inter, Sora and JetBrains Mono, all under the
SIL Open Font License 1.1.
