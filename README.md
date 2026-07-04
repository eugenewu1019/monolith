<div align="right">

**Language**: [English](README.md) | [繁體中文](README.zh-TW.md)

</div>

<div align="center">

# MONOLITH | Geological Pastry Lab

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Production](https://img.shields.io/badge/production-GitHub%20Pages-2ea44f.svg)](https://eugenewu1019.github.io/monolith)
[![Design System](https://img.shields.io/badge/Design_System-Obsidian-black?style=flat&logo=figma)](DESIGN.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Architecture of taste. Geological dessert as an interactive digital exhibit.**

[Production Site](https://eugenewu1019.github.io/monolith) · [Latest Deploy](https://github.com/eugenewu1019/monolith/actions/workflows/deploy.yml) · [Design System](DESIGN.md) · [Issues](https://github.com/eugenewu1019/monolith/issues)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## About

**MONOLITH** is an immersive bilingual concept site for a fictional luxury pastry brand. It treats dessert as edible geology: mineral textures, exhibition-like navigation, atmospheric 3D motion, and quiet editorial typography.

The current release focuses on the **V1.5 experience upgrade**: a more cinematic hero, a click-ready horizontal tasting journey, stronger mobile handling, cleaner navigation contrast, and a more complete interaction model.

## V1.5 Experience

### Interactive Hero System

- Mode-based hero controls: **Structure**, **Texture**, and **Time**.
- A Three.js / React Three Fiber background that reacts to the selected mode.
- Layered scan lines, orbital motion, exhibit panels, and specimen labels.
- Reduced-motion fallback so the hero still works without WebGL-heavy animation.

### Tasting Journey Gallery

- Seven-station horizontal tasting sequence with a stronger exhibition rhythm.
- Dessert cards are fully clickable: selecting a card scrolls it into focus and opens the matching detail modal.
- The final reservation card was removed to keep the gallery focused on tasting and selection.
- The closing quiz station remains interactive and uses dialog semantics, Escape close, and focus-safe controls.

### Navigation And Reading Contrast

- Header was redesigned with a dark glass backing so navigation stays readable over bright or complex sections.
- Desktop and mobile layouts use clearer layering, contrast, and pointer states.

### Testimonials

- Customer review section includes compact bottom-right previous / next controls.
- Pagination and review transitions are tuned to feel quieter and more gallery-like.

### Mobile Experience

- Mobile-specific layout keeps the brand atmosphere while avoiding desktop-only horizontal mechanics.
- Touch-first cards, stable spacing, and reduced visual overlap across small screens.

## Design Direction

MONOLITH uses an **Obsidian** visual system:

- **Raw / Refined tension**: mineral surfaces, glass, gold hairlines, and restrained luxury.
- **Dark geological palette**: deep black, graphite, weathered gold, moss, and amber.
- **Editorial pacing**: large type where it matters, compact labels where the UI needs to scan.
- **Motion as material**: slow orbital movement, parallax, depth, and tactile hover states.

Full design documentation: [DESIGN.md](DESIGN.md)

## Tech Stack

### Core

- [Next.js 16](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

### Motion And 3D

- [Framer Motion 12](https://www.framer.com/motion/)
- [React Three Fiber 9](https://docs.pmnd.rs/react-three-fiber/)
- [Drei 10](https://github.com/pmndrs/drei)
- [Lenis](https://github.com/darkroomengineering/lenis)

### UI And Tooling

- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [ESLint 9](https://eslint.org/)
- [Prettier 3](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)

## Getting Started

### Requirements

- Node.js 20 or later is recommended.
- npm is the project default package manager.

### Installation

```bash
git clone https://github.com/eugenewu1019/monolith.git
cd monolith
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Scripts

```bash
npm run dev            # Start the development server
npm run build          # Create a production build
npm start              # Start the production server
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format supported files with Prettier
npm run type-check     # Run TypeScript without emitting files
npm run docs:check     # Verify README links and production entry points
npm test               # Run Jest tests
npm run test:watch     # Run Jest in watch mode
npm run test:coverage  # Generate coverage output
```

## Project Structure

```text
monolith/
├── src/
│   ├── app/                    # Next.js app routes and global styles
│   ├── components/
│   │   ├── gallery/            # Horizontal tasting journey and quiz
│   │   ├── hero/               # Interactive hero, modes, and 3D background
│   │   ├── mobile/             # Mobile-specific experience
│   │   ├── sections/           # Editorial page sections
│   │   └── ui/                 # Shared UI primitives
│   └── lib/                    # Utilities, hooks, and shared data
├── public/
│   └── images/                 # Brand and dessert imagery
├── docs/                       # Project documentation
├── DESIGN.md                   # Design system notes
├── README.md                   # English README
└── README.zh-TW.md             # Traditional Chinese README
```

## Validation

The V1.5 upgrade was verified with:

- `npm run lint`
- `npm run type-check`
- `npm run docs:check`
- `npm test -- --runInBand`
- `npm run build`
- Playwright interaction checks for hero modes, gallery card clicks, quiz modal behavior, testimonial controls, header contrast, and reduced-motion fallback.

## License

This project is released under the [MIT License](LICENSE).

## Contact

Owen Wu

- GitHub: [@eugenewu1019](https://github.com/eugenewu1019)
- LinkedIn: [@owenwuwork](https://www.linkedin.com/in/owenwuwork)
