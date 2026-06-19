# Phoenix website

Marketing site and docs for [Phoenix](https://github.com/phoenix-language/phoenix), built with [Rspress](https://rspress.rs/).

**Live site:** https://phoenix-language.github.io/website/

## Local development

From the phoenix repo root:

```bash
just website install
just website dev
```

Or from this directory:

```bash
pnpm install
pnpm run dev
```

The dev server uses the same `/website/` base path as production. Open http://localhost:5173/website/

## Build

```bash
pnpm run build   # output → doc_build/
pnpm run preview
```

## Deployment

GitHub Actions builds Rspress and deploys `doc_build/` to GitHub Pages on every push to `main`.

Repository **Settings → Pages → Build and deployment → Source** must be **GitHub Actions** (not “Deploy from a branch”).
