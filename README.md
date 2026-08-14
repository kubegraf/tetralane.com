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
assets/img/                # logo lockup, mark, social preview image
assets/favicon.svg         # browser tab icon (+ png/ico variants alongside)
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

Pushes to `main` are published to GitHub Pages by
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

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
