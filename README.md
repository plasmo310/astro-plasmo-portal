# Plasmo Portal

## Setup

```sh
npm install
```

## How to Use

```sh
# Start dev server at localhost:4321
npm run dev

# Build production site to ./dist/
npm run build

# Preview the production build locally
npm run preview
```

## Main Libraries

| Category    | Library      |
| ----------- | ------------ |
| Framework   | Astro        |
| Styling     | Tailwind CSS |
| 3D Graphics | Three.js     |

## Page Routing

Adding `/en` prefix to any route switches the language to English (e.g. `/en/works`).

| Route    | Page  |
| -------- | ----- |
| `/`      | Home  |
| `/works` | Works |

## Directory Structure

```
astro-plasmo-portal/
├── public/              # Static assets
└── src/
    ├── components/
    │   ├── common/      # Shared UI components
    │   ├── pages/       # Page-level components
    │   └── sections/    # Section components (home, works, career, etc.)
    ├── data/
    │   ├── ja/          # Japanese content data (JSON)
    │   └── en/          # English content data (JSON)
    ├── layouts/         # Base HTML layout
    ├── lib/             # Utility functions (data loader, etc.)
    ├── pages/           # Astro file-based routes
    │   └── en/          # English routes
    ├── styles/          # Global CSS
    └── types/           # TypeScript type definitions
        ├── data/        # Types for JSON data
        └── ui/          # Types for UI components
```

### Dependencies

**Runtime**

| Package                     | Purpose                     |
| --------------------------- | --------------------------- |
| `astro`                     | Static site framework       |
| `astro-icon`                | Icon component for Astro    |
| `tailwindcss`               | Utility-first CSS framework |
| `three`                     | 3D graphics                 |
| `@iconify-json/fa-brands`   | Font Awesome brand icons    |
| `@iconify-json/fa7-brands`  | Font Awesome 7 brand icons  |
| `@iconify-json/mdi`         | Material Design Icons       |
| `@iconify-json/skill-icons` | Skill/tech stack icons      |

**Dev**

| Package                       | Purpose                               |
| ----------------------------- | ------------------------------------- |
| `prettier`                    | Code formatter                        |
| `prettier-plugin-astro`       | Prettier support for `.astro` files   |
| `prettier-plugin-tailwindcss` | Auto-sorts Tailwind classes on format |
| `@types/three`                | TypeScript types for Three.js         |

## License

- **Code** (`.astro`, `.ts`, `.js`, config files):
  - [MIT License](./LICENSE)
- **Content** (`src/data/`, `public/`):
  - [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)
