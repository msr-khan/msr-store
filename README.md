# MSR Store — Professional UI

A scratch-built React/Vite storefront UI for MSR Store. The redesign keeps the existing app data, routes, repositories, and download URLs intact while replacing the visible interface with a modern, polished software-store experience.

## What changed

- New responsive store header with adaptive three-dot menu
- Animated search field with app suggestions and clear action
- Animated hero/featured-app spotlight on the home page
- Staggered app-card entrance animations and hover motion
- Responsive category navigation and search-result state
- Full app product page redesign with stronger hierarchy
- YouTube preview support with native YouTube controls, responsive sizing, and preview navigation
- Product specifications, installation panel, tags, related apps, and developer profile
- Modern light/dark themes
- Mobile-first breakpoints for phones and tablets
- Refined footer and developer page
- Existing `apps.json`, download URLs, repository URLs, and app routes preserved
- No backend/API/data changes required

## Run

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/Home.jsx` — store home and animated featured area
- `src/pages/AppDetail.jsx` — product/app page and media viewer
- `src/pages/About.jsx` — developer page
- `src/components/Header.jsx` — responsive navigation and search
- `src/components/AppCard.jsx` — reusable app cards
- `src/styles/global.css` — complete visual system and responsive styling
- `src/data/apps.json` — existing app catalog/data
- `src/data/developer.json` — existing developer data

The UI is intentionally inspired by contemporary software stores without copying a specific store's exact branding or source code.
