# Panama

One-page Next.js landing site for GitHub and [Vercel](https://vercel.com) deployment.

## Stack

- Next.js (App Router)
- Single global stylesheet: `src/app/globals.css`
- [Geist](https://fontsource.org/fonts/geist) and [Geist Mono](https://fontsource.org/fonts/geist-mono) via Fontsource (`@fontsource-variable/geist`)

## Editorial content

All site copy (meta, nav, hero, features, CTA, footer) lives in `src/data/content.json`. Edit that file to update wording without touching page markup. The page (`src/app/page.tsx`) and layout (`src/app/layout.tsx`) import from it.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the project in the Vercel dashboard and use the default Next.js settings.
3. Deploy.

Search engines are blocked via page metadata (`noindex, nofollow`) and `src/app/robots.ts`.
