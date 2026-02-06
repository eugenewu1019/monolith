<div align="center">

# 🌑 MONOLITH | Geological Pastry Lab

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://eugenewu1019.github.io/monolith/)
[![CI/CD](https://github.com/eugenewu1019/monolith/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/eugenewu1019/monolith/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Architecture of Taste. Ephemeral Sculpture.**

[Live Demo](https://eugenewu1019.github.io/monolith/) · [Report Bug](https://github.com/eugenewu1019/monolith/issues) · [Request Feature](https://github.com/eugenewu1019/monolith/issues) · [Discussions](https://github.com/eugenewu1019/monolith/discussions)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## 📚 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About The Project

**MONOLITH** is a high-end, immersive concept website for a fictional pastry brand that merges geology with gastronomy. The project explores the intersection of **"Vibe Coding"** and performance-driven web engineering.

**MONOLITH** 是一個極具沉浸感的概念網站，為一個將「地質學」與「甜點工藝」結合的虛構高端品牌而生。本專案旨在探索 **「氛圍編碼 (Vibe Coding)」** 與高效能網頁工程的交會點。

### Why This Project?

- 🎨 **Design Challenge**: Transform physical luxury experiences into compelling digital interfaces
- 🚀 **Technical Exploration**: Push boundaries of Next.js 14 App Router with complex animations
- 🌏 **Bilingual UX**: Implement seamless language switching for global audiences  
- 💡 **AI Integration**: Build interactive quiz with physics-based UI and smart recommendations
- ⚡ **Performance First**: Achieve 90+ Lighthouse scores while maintaining rich interactions

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

### Styling & Animation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scroll library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/react) - Component testing

### UI Components
- [Lucide React](https://lucide.dev/) - Beautiful icon set
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- Custom Design System - CSS Variables + Tailwind

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

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://eugenewu1019.github.io/monolith
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 🚀 Deployment

### GitHub Pages (Current Setup)

The project is configured to automatically deploy to GitHub Pages on push to `main`.

1. **Enable GitHub Pages**
   - Settings → Pages → Source: GitHub Actions

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically**:
   - Run tests
   - Build the project
   - Deploy to GitHub Pages

### Alternative Deployment Options

<details>
<summary><b>Vercel</b> (Recommended for Next.js)</summary>

1. Import repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eugenewu1019/monolith)

</details>

<details>
<summary><b>Netlify</b></summary>

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `out`
4. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/eugenewu1019/monolith)

</details>

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development process
- How to submit pull requests
- Coding standards
- Commit message conventions

### Quick Start for Contributors

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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

## 🙏 Acknowledgments

Special thanks to these amazing projects and resources:

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scroll
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D graphics

---

## 📊 Project Status

- [x] Core features implemented
- [x] Bilingual support (EN/ZH)
- [x] Responsive design
- [x] Dark mode
- [x] CI/CD pipeline
- [ ] Storybook documentation
- [ ] E2E testing
- [ ] CMS integration
- [ ] Admin dashboard
- [ ] PWA support

See [Roadmap](https://github.com/eugenewu1019/monolith/issues) for more details.

---

<div align="center">

**[⬆️ Back to top](#-monolith--geological-pastry-lab)**

Made with 🖤 by [Eugene Wu](https://github.com/eugenewu1019)

© 2026 MONOLITH | Geological Pastry Lab. All Rights Reserved.

</div>