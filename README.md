# Briggs Davis

Briggs Davis is a static React/Vite agency site for web development, native app development, and selected project case studies.

## Working locally

```sh
bun install
bun run dev
```

Use `bun run build` for the production build and `bun run lint` before committing. Both commands run in GitHub Actions for pull requests and updates to `main`.

## Where to make changes

- `src/app/routes.ts` holds the canonical internal paths.
- `src/app/metadata.tsx` manages page titles, descriptions, and canonical URLs.
- `src/data/projects.ts` is the single portfolio catalogue and display order.
- `src/data/site.ts` holds shared contact and booking information.
- `src/pages/` contains route-level page composition.
- `src/components/` contains reusable site sections and interactions.

## Content and assets

Project imagery belongs under `public/images/projects/<project-id>/`. Add a project to `projectCatalog`, then place its ID in `portfolioOrder`; the catalogue deliberately throws during development if an ordered project is missing or duplicated.

Only active production assets should live in `public/`, because Vite copies that directory into every deployment unchanged. Retired material belongs in version control history or a separate archive, not in the deployment payload.

## Motion and accessibility

The site uses motion as a supporting layer. Every new interaction must work with keyboard input, remain useful without hover, and honour `prefers-reduced-motion`. Do not add an always-running canvas, WebGL, or requestAnimationFrame loop without a defined lifecycle and a reduced-motion fallback.
