# Contributing to Monolith

First off, thank you for considering contributing to Monolith! This project is a blend of experimental "Vibe Coding" and strict engineering practices.

## 🛠️ Development Philosophy

We value **Expression** over convention, but **Performance** is non-negotiable.

### Core Principles
1.  **Zero Jank**: Animations must run at 60fps (or 120fps). Use `transform` and `opacity` only. Avoid layout thrashing.
2.  **Accessibility (a11y)**: Art should be accessible. Ensure semantic HTML even when wrapped in WebGL overlays.
3.  **Type Safety**: No `any`. Seriously. We use strict TypeScript.

## 💻 Development Workflow

1.  **Fork & Branch**: Create a branch for your feature (`feat/amazing-shader`).
2.  **Install**: Use `pnpm` (preferred) or `npm`.
3.  **Dev**: Run `npm run dev`.
4.  **Lint**: Run `npm run lint` before committing.
5.  **Test**: If you add logic, add a test. `npm test`.

## 🎨 Design Contributions

If you are contributing design changes:
-   Please refer to [DESIGN.md](DESIGN.md) for our token system.
-   Do not introduce new colors without updating the Tailwind config.
-   Motion changes should be prototyped in Figma or clear code sandboxes first.

## 🐛 Reporting Bugs

Please use the Issue Template. Include:
-   Browser & OS version (Crucial for WebGL bugs).
-   Screenshots or Screen recordings (loom/gif).
-   Console errors.

## 📜 Code of Conduct

Be kind. We are all here to make cool stuff.
