<div align="right">

**Language**: [🇺🇸 English](README.md) | [🇹🇼 繁體中文](README.zh-TW.md)

</div>

<div align="center">

# 🌑 MONOLITH | Geological Pastry Lab

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://eugenewu1019.github.io/monolith/)
[![Design System](https://img.shields.io/badge/Design_System-Obsidian-black?style=flat&logo=figma)](DESIGN.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Architecture of Taste. Ephemeral Sculpture. Vibe Coding.**

[Live Demo](https://eugenewu1019.github.io/monolith/) · [Design System](DESIGN.md) · [Report Bug](https://github.com/eugenewu1019/monolith/issues) · [Discussions](https://github.com/eugenewu1019/monolith/discussions)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## 📚 Table of Contents

- [About The Project](#-about-the-project)
- [Design & Aesthetics](#-design--aesthetics)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About The Project

**MONOLITH** is a high-end, immersive concept website for a fictional pastry brand that merges geology with gastronomy. The project explores the intersection of **"Vibe Coding"**—where technical engineering serves atmospheric storytelling.

### Why This Project?

- 🎨 **Design Challenge**: Transform physical luxury experiences into compelling digital interfaces
- 🚀 **Technical Exploration**: Push boundaries of Next.js 14 App Router with complex animations
- 🌏 **Bilingual UX**: Implement seamless language switching for global audiences
- 💡 **AI Integration**: Build interactive quiz with physics-based UI and smart recommendations
- ⚡ **Performance First**: Achieve 90+ Lighthouse scores while maintaining rich interactions

---

## 🎨 Design & Aesthetics
> Full documentation: [DESIGN.md](DESIGN.md)

This project implements the **"Obsidian" Design System**, prioritizing atmosphere over convention.

- **Visual Language**: A tension between "Raw" (mineral textures) and "Refined" (gold/glass accents).
- **Motion Philosophy**: Elements float in a viscous medium. We use spring physics (via Framer Motion) rather than linear easings to create a "tactile" digital feel.
- **Vibe Coding**: Utilizing WebGL shaders and procedural noise to create living backgrounds that breathe with the user's interaction.

---

## ✨ Key Features

### 🌍 Bilingual First
- Complete i18n implementation with custom `useLocale` hook
- Instant language switching (English / Traditional Chinese)
- SEO-optimized metadata for both languages

### 💎 Immersive Horizontal Gallery
- **Scroll-Jacked Motion**: Smooth horizontal navigation that feels like an exhibition walkthrough
- **Parallax Depth**: Layers of geological textures with 3D parallax effects
- **Optimized Performance**: RequestAnimationFrame-based smooth scrolling

### 🧠 AI Sommelier Quiz
- **Physics-Based Interaction**: Spring-physics modals powered by Framer Motion
- **Weighted Preference Matching**: Smart algorithm for personalized recommendations
- **Multi-dimensional Profiling**: Mood, flavor, texture, and occasion analysis

### 🌒 Immersive Dark Theme
- **Zodiac Palette**: Curated dark mode with "Zodiac Black" and "Zodiac Gold" tokens
- **Micro-glow Effects**: Subtle light bleeds and mesh gradients
- **Natural Aesthetics**: Inspired by mineral veins and geological formations

### 🚀 Performance & Accessibility
- Lazy loading and code splitting
- Image optimization with Next.js Image
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly

---

## 🛠️ Tech Stack

This project utilizes a modern Next.js stack focused on performance, modularity, and high-fidelity animations.

### Core
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better DX
- [React 18](https://react.dev/) - UI library with Server Components

### Styling & Animation (Vibe Engineering)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scroll library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/react) - Component testing

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eugenewu1019/monolith.git
   cd monolith
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Export static site (for GitHub Pages)
npm run build
```

---

## 📂 Project Structure

```text
monolith/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/           # Reusable components
│   │   ├── sections/         # Page sections
│   │   ├── ui/               # UI primitives
│   │   └── __tests__/        # Component tests
│   ├── lib/                  # Utilities & helpers
│   │   ├── i18n/             # Internationalization
│   │   ├── data/             # Static data
│   │   └── __tests__/        # Utility tests
│   └── docs/                 # Brand guidelines
├── public/                  # Static assets
│   ├── images/              # Images
│   ├── fonts/               # Custom fonts
│   └── icons/               # Icons & favicons
├── .github/                 # GitHub configs
│   └── workflows/           # CI/CD pipelines
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Test setup
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Type Checking
npm run type-check       # Check TypeScript types
```

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development process
- How to submit pull requests
- Coding standards
- Commit message conventions

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea?

- **Bug Reports**: [Create an issue](https://github.com/eugenewu1019/monolith/issues/new?template=bug_report.md)
- **Feature Requests**: [Create an issue](https://github.com/eugenewu1019/monolith/issues/new?template=feature_request.md)
- **Questions**: [Start a discussion](https://github.com/eugenewu1019/monolith/discussions)

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

**Owen Wu** - UI/UX Designer & Frontend Developer

- LinkedIn: [@owenwuwork](https://www.linkedin.com/in/owenwuwork)
- GitHub: [@eugenewu1019](https://github.com/eugenewu1019)
- Portfolio: [Coming Soon]

**Project Link**: [https://github.com/eugenewu1019/monolith](https://github.com/eugenewu1019/monolith)

**Live Demo**: [https://eugenewu1019.github.io/monolith/](https://eugenewu1019.github.io/monolith/)

---

<div align="center">

**[⬆️ Back to top](#-monolith--geological-pastry-lab)**

Made with 🖤 by [Eugene Wu](https://github.com/eugenewu1019)

© 2026 MONOLITH | Geological Pastry Lab. All Rights Reserved.

</div>