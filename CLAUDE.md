# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview the production build locally
npm run astro ... # Run Astro CLI commands (e.g. astro add, astro check)
```

## Architecture

This is an Astro 6 portfolio site using strict TypeScript. No UI framework integrations are configured — components are pure `.astro` files.

**Data flow:** Page content is stored in `src/data/*.json` files and imported directly into `.astro` components. `src/data/home.json` drives the home section (name, photo, intro, resume URL, social links).

**Component pattern:** Each page section has a dedicated component in `src/components/` (e.g. `home.astro`) that imports its corresponding JSON, defines TypeScript interfaces inline, and renders the section. The `src/layouts/Layout.astro` wraps pages with the base HTML shell.

**Styling:** Tailwind utility classes are used inline in `.astro` templates. Global/animation styles are written in `<style is:global>` blocks within the component that owns them.

**Adding a section:** Create `src/data/<section>.json`, create `src/components/<section>.astro` that imports from it, then add the component to `src/pages/index.astro`.

## Localize Table

| Japanese         | English          |
| ---------------- | ---------------- |
| 都会のエレキベア | Elekibear Blog   |
| ゆるいオセロ     | Loose Reversi    |
| 漫画風描画HDA    | Comic Render HDA |
| もぐら叩きAR     | Whac-A-Mole AR   |
| マグネタワー     | Mag Tower        |
| ゴーゴーゴロヤン | Go Go Goloyan    |
