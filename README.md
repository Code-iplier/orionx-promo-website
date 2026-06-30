# OrionX

A promotional website for exploring outer space through immersive visuals, concept guides, and community discussions.

## Tech Stack

- **React 19** + **TypeScript 6** — UI framework
- **Vite 8** — Build tool and dev server
- **MUI v9** — Component library (Material UI)
- **Spline** — Interactive 3D scenes
- **Emotion** — CSS-in-JS styling
- **Vitest** — Unit testing
- **Prettier** — Code formatting

## Project Structure

```
.github/workflows/deploy.yml   — CI/CD pipeline
public/
  hero-background.mp4           — Hero section background video
  hero-audio.mp3                — Hero section audio track (plays on first interaction)
  space-visuals/                — Gallery images (1–8)
  favicon.svg, icons.svg, rocket-favicon.svg
src/
  main.tsx                      — App entry point
  App.tsx                       — Main app component (pages, nav, sections)
  index.css                     — Global styles & animations
  App.css                       — (reserved)
  placeholder.test.ts           — Placeholder test for CI
.eslint.config.js               — ESLint configuration
.prettierrc                     — Prettier configuration
.prettierignore                 — Files ignored by Prettier
tsconfig.json                   — TypeScript configuration
vite.config.ts                  — Vite configuration
vitest.config.ts                — Vitest configuration
index.html                      — HTML shell with SEO meta tags
```

## Features

- Hero section with auto-playing muted video and separate audio track started on first user interaction
- Interactive 3D Spline scene (lazy-loaded, WebGL-detected, play-on-demand)
- Space Visual Gallery with crossfade slideshow and thumbnail navigation
- 6 concept pages (Space Missions, Constellations, Planets, Galaxies, Black Holes, Wormholes)
- Blog and Discussion page placeholders
- Responsive navigation with mobile hamburger menu
- Dark theme with gold/amber accent palette
- SEO: OG tags, Twitter cards, JSON-LD structured data

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command                | Description                         |
|------------------------|-------------------------------------|
| `npm run dev`          | Start development server            |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview production build            |
| `npm run typecheck`    | Run TypeScript type checking        |
| `npm run lint`         | Run ESLint                          |
| `npm run format:check` | Check code formatting (Prettier)    |
| `npm test`             | Run Vitest                          |
| `npm run test:ci`      | Run Vitest with coverage            |

## Build

```bash
npm run build
```

Output goes to `dist/`.
