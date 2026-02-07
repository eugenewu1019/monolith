<div align="center">

# 🌑 MONOLITH | Geological Pastry Lab

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://eugenewu1019.github.io/monolith/)
[![CI/CD](https://github.com/eugenewu1019/monolith/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/eugenewu1019/monolith/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Architecture of Taste. Ephemeral Sculpture.**  
**品味的建築。轉瞬的雕塑。**

[Live Demo](https://eugenewu1019.github.io/monolith/) · [Report Bug](https://github.com/eugenewu1019/monolith/issues) · [Request Feature](https://github.com/eugenewu1019/monolith/issues) · [Discussions](https://github.com/eugenewu1019/monolith/discussions)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## 📚 Table of Contents | 目錄

- [About The Project](#-about-the-project--關於專案)
- [Key Features](#-key-features--核心功能)
- [Tech Stack](#️-tech-stack--技術棧)
- [Getting Started](#-getting-started--快速開始)
- [Project Structure](#-project-structure--專案結構)
- [Development](#-development--開發指南)
- [Deployment](#-deployment--部署)
- [Contributing](#-contributing--貢獻)
- [License](#-license--授權)
- [Contact](#-contact--聯絡方式)
- [Acknowledgments](#-acknowledgments--致謝)

---

## 🎯 About The Project | 關於專案

**MONOLITH** is a high-end, immersive concept website for a fictional pastry brand that merges geology with gastronomy. The project explores the intersection of **"Vibe Coding"** and performance-driven web engineering.

**MONOLITH** 是一個極具沉浸感的概念網站,為一個將「地質學」與「甜點工藝」結合的虛構高端品牌而生。本專案旨在探索 **「氛圍編碼 (Vibe Coding)」** 與高效能網頁工程的交會點。

### Why This Project? | 為什麼做這個專案?

- 🎨 **Design Challenge** | 設計挑戰  
  Transform physical luxury experiences into compelling digital interfaces  
  將實體奢華體驗轉化為吸引人的數位介面

- 🚀 **Technical Exploration** | 技術探索  
  Push boundaries of Next.js 14 App Router with complex animations  
  挑戰 Next.js 14 App Router 的極限,實現複雜動畫效果

- 🌏 **Bilingual UX** | 雙語使用者體驗  
  Implement seamless language switching for global audiences  
  為全球用戶實現無縫的語言切換體驗

- 💡 **AI Integration** | AI 整合  
  Build interactive quiz with physics-based UI and smart recommendations  
  打造結合物理感介面與智慧推薦的互動測驗

- ⚡ **Performance First** | 效能優先  
  Achieve 90+ Lighthouse scores while maintaining rich interactions  
  在維持豐富互動的同時達到 90 分以上的 Lighthouse 評分

---

## ✨ Key Features | 核心功能

### 🌍 Bilingual First | 雙語優先

- Complete i18n implementation with custom `useLocale` hook  
  完整的國際化實作,搭配自訂 `useLocale` hook

- Instant language switching (English / Traditional Chinese)  
  即時語言切換(英文/繁體中文)

- SEO-optimized metadata for both languages  
  針對雙語優化的 SEO metadata

### 💎 Immersive Horizontal Gallery | 沉浸式橫向藝廊

- **Scroll-Jacked Motion** | 滾動劫持運鏡  
  Smooth horizontal navigation that feels like an exhibition walkthrough  
  平滑的橫向導覽,如同漫步於藝廊展覽之中

- **Parallax Depth** | 視差深度  
  Layers of geological textures with 3D parallax effects  
  多層次地質紋理搭配 3D 視差效果

- **Optimized Performance** | 效能優化  
  RequestAnimationFrame-based smooth scrolling  
  基於 RequestAnimationFrame 的流暢滾動

### 🧠 AI Sommelier Quiz | AI 甜點風味測驗

- **Physics-Based Interaction** | 物理感互動  
  Spring-physics modals powered by Framer Motion  
  由 Framer Motion 驅動的彈簧物理感對話框

- **Weighted Preference Matching** | 權重偏好配對  
  Smart algorithm for personalized recommendations  
  智慧演算法提供個人化推薦

- **Multi-dimensional Profiling** | 多維度分析  
  Mood, flavor, texture, and occasion analysis  
  分析心情、風味、質地與場合

### 🌒 Immersive Dark Theme | 沉浸式極黑美學

- **Zodiac Palette** | 原石配色  
  Curated dark mode with "Zodiac Black" and "Zodiac Gold" tokens  
  精心策劃的深色模式,採用「原石黑」與「礦脈金」色票

- **Micro-glow Effects** | 微光效果  
  Subtle light bleeds and mesh gradients  
  細緻的光暈擴散與網格漸層

- **Natural Aesthetics** | 自然美學  
  Inspired by mineral veins and geological formations  
  靈感來自礦脈紋理與地質形成

### 🚀 Performance & Accessibility | 效能與無障礙

- Lazy loading and code splitting | 延遲載入與程式碼分割
- Image optimization with Next.js Image | Next.js Image 圖片優化
- WCAG 2.1 AA compliant | 符合 WCAG 2.1 AA 標準
- Keyboard navigation support | 鍵盤導覽支援
- Screen reader friendly | 螢幕閱讀器友善

---

## 🛠️ Tech Stack | 技術棧

This project utilizes a modern Next.js stack focused on performance, modularity, and high-fidelity animations.

本專案採用現代 Next.js 技術棧,專注於效能、模組化與高質感動畫。

### Core | 核心
- [Next.js 14](https://nextjs.org/) - React framework with App Router | 搭載 App Router 的 React 框架
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better DX | 型別安全與更好的開發體驗
- [React 18](https://react.dev/) - UI library with Server Components | 具備伺服器元件的 UI 函式庫

### Styling & Animation | 樣式與動畫
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework | 工具優先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library | 生產級動畫函式庫
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scroll library | 平滑滾動函式庫
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js | Three.js 的 React 渲染器

### Development Tools | 開發工具
- [ESLint](https://eslint.org/) - Code linting | 程式碼檢查
- [Prettier](https://prettier.io/) - Code formatting | 程式碼格式化
- [Jest](https://jestjs.io/) - Testing framework | 測試框架
- [React Testing Library](https://testing-library.com/react) - Component testing | 元件測試

### UI Components | UI 元件
- [Lucide React](https://lucide.dev/) - Beautiful icon set | 精美圖示集
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives | 無障礙元件基礎
- Custom Design System | 客製化設計系統 - CSS Variables + Tailwind

---

## 🚀 Getting Started | 快速開始

### Prerequisites | 前置需求

- **Node.js** 18.17 or later | 18.17 或更新版本
- **npm** or **yarn** or **pnpm**

### Installation | 安裝步驟

1. **Clone the repository | 複製儲存庫**
   ```bash
   git clone https://github.com/eugenewu1019/monolith.git
   cd monolith
   ```

2. **Install dependencies | 安裝依賴套件**
   ```bash
   npm install
   # or | 或
   yarn install
   # or | 或
   pnpm install
   ```

3. **Run development server | 啟動開發伺服器**
   ```bash
   npm run dev
   # or | 或
   yarn dev
   # or | 或
   pnpm dev
   ```

4. **Open in browser | 在瀏覽器開啟**
   
   Navigate to | 前往 [http://localhost:3000](http://localhost:3000)

### Build for Production | 正式環境建置

```bash
# Create optimized production build | 建立優化的正式版本
npm run build

# Start production server | 啟動正式伺服器
npm start

# Export static site (for GitHub Pages) | 匯出靜態網站(用於 GitHub Pages)
npm run build
```

---

## 📂 Project Structure | 專案結構

```text
monolith/
├── src/
│   ├── app/                  # Next.js App Router | Next.js 應用路由
│   │   ├── [locale]/          # Internationalized routes | 國際化路由
│   │   ├── layout.tsx         # Root layout | 根佈局
│   │   └── page.tsx           # Home page | 首頁
│   ├── components/           # Reusable components | 可重用元件
│   │   ├── sections/         # Page sections | 頁面區塊
│   │   ├── ui/               # UI primitives | UI 基礎元件
│   │   └── __tests__/        # Component tests | 元件測試
│   ├── lib/                  # Utilities & helpers | 工具函式與輔助程式
│   │   ├── i18n/             # Internationalization | 國際化
│   │   ├── data/             # Static data | 靜態資料
│   │   └── __tests__/        # Utility tests | 工具函式測試
│   └── docs/                 # Brand guidelines | 品牌指南
├── public/                  # Static assets | 靜態資源
│   ├── images/              # Images | 圖片
│   ├── fonts/               # Custom fonts | 自訂字型
│   └── icons/               # Icons & favicons | 圖示與網站圖示
├── .github/                 # GitHub configs | GitHub 配置
│   └── workflows/           # CI/CD pipelines | CI/CD 流程
├── jest.config.js           # Jest configuration | Jest 配置
├── jest.setup.js            # Test setup | 測試設定
├── next.config.ts           # Next.js configuration | Next.js 配置
├── tailwind.config.ts       # Tailwind configuration | Tailwind 配置
├── tsconfig.json            # TypeScript configuration | TypeScript 配置
└── README.md                # This file | 本檔案
```

---

## 💻 Development | 開發指南

### Available Scripts | 可用指令

```bash
# Development | 開發
npm run dev              # Start development server | 啟動開發伺服器
npm run build            # Build for production | 建置正式版本
npm start                # Start production server | 啟動正式伺服器

# Code Quality | 程式碼品質
npm run lint             # Run ESLint | 執行 ESLint
npm run lint:fix         # Fix ESLint issues | 自動修復 ESLint 問題
npm run format           # Format with Prettier | 使用 Prettier 格式化

# Testing | 測試
npm test                 # Run tests | 執行測試
npm run test:watch       # Run tests in watch mode | 監看模式執行測試
npm run test:coverage    # Generate coverage report | 生成測試覆蓋率報告

# Type Checking | 型別檢查
npm run type-check       # Check TypeScript types | 檢查 TypeScript 型別
```

### Environment Variables | 環境變數

Create a `.env.local` file in the root directory:

在根目錄建立 `.env.local` 檔案:

```env
# Example environment variables | 環境變數範例
NEXT_PUBLIC_SITE_URL=https://eugenewu1019.github.io/monolith
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 🚀 Deployment | 部署

### GitHub Pages (Current Setup) | GitHub Pages(目前設定)

The project is configured to automatically deploy to GitHub Pages on push to `main`.

本專案配置為推送至 `main` 分支時自動部署到 GitHub Pages。

1. **Enable GitHub Pages | 啟用 GitHub Pages**
   - Settings → Pages → Source: GitHub Actions

2. **Push to main branch | 推送至 main 分支**
   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically | GitHub Actions 將自動**:
   - Run tests | 執行測試
   - Build the project | 建置專案
   - Deploy to GitHub Pages | 部署到 GitHub Pages

### Alternative Deployment Options | 其他部署選項

<details>
<summary><b>Vercel</b> (Recommended for Next.js | 推薦用於 Next.js)</summary>

1. Import repository to Vercel | 將儲存庫匯入 Vercel
2. Configure build settings (auto-detected) | 配置建置設定(自動偵測)
3. Deploy! | 部署!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eugenewu1019/monolith)

</details>

<details>
<summary><b>Netlify</b></summary>

1. Connect repository | 連接儲存庫
2. Build command: `npm run build` | 建置指令: `npm run build`
3. Publish directory: `out` | 發布目錄: `out`
4. Deploy! | 部署!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/eugenewu1019/monolith)

</details>

---

## 🤝 Contributing | 貢獻

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

貢獻讓開源社群變得如此美好!我們非常感謝您的任何貢獻。

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

請閱讀我們的[貢獻指南](CONTRIBUTING.md)以了解:

- Code of Conduct | 行為準則
- Development process | 開發流程
- How to submit pull requests | 如何提交 pull requests
- Coding standards | 程式碼標準
- Commit message conventions | commit 訊息規範

### Quick Start for Contributors | 貢獻者快速開始

1. Fork the Project | Fork 專案
2. Create your Feature Branch | 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes | 提交變更 (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch | 推送到分支 (`git push origin feature/AmazingFeature`)
5. Open a Pull Request | 開啟 Pull Request

---

## 🐛 Bug Reports & Feature Requests | 錯誤回報與功能請求

Found a bug or have a feature idea?

發現錯誤或有功能建議?

- **Bug Reports | 錯誤回報**: [Create an issue](https://github.com/eugenewu1019/monolith/issues/new?template=bug_report.md)
- **Feature Requests | 功能請求**: [Create an issue](https://github.com/eugenewu1019/monolith/issues/new?template=feature_request.md)
- **Questions | 問題討論**: [Start a discussion](https://github.com/eugenewu1019/monolith/discussions)

---

## 📝 License | 授權

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

本專案採用 MIT 授權。詳情請見 [`LICENSE`](LICENSE) 檔案。

---

## 📬 Contact | 聯絡方式

**Owen Wu** - UI/UX Designer & Frontend Developer | UI/UX 設計師與前端工程師

- LinkedIn: [@owenwuwork](https://www.linkedin.com/in/owenwuwork)
- GitHub: [@eugenewu1019](https://github.com/eugenewu1019)
- Portfolio | 作品集: [Coming Soon | 即將推出]

**Project Link | 專案連結**: [https://github.com/eugenewu1019/monolith](https://github.com/eugenewu1019/monolith)

**Live Demo | 線上展示**: [https://eugenewu1019.github.io/monolith/](https://eugenewu1019.github.io/monolith/)

---

## 🙏 Acknowledgments | 致謝

Special thanks to these amazing projects and resources:

特別感謝這些出色的專案與資源:

- [Next.js](https://nextjs.org/) - The React Framework | React 框架
- [Vercel](https://vercel.com/) - Deployment platform | 部署平台
- [Radix UI](https://www.radix-ui.com/) - Accessible components | 無障礙元件
- [Framer Motion](https://www.framer.com/motion/) - Animation library | 動畫函式庫
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework | CSS 框架
- [Lucide Icons](https://lucide.dev/) - Beautiful icons | 精美圖示
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scroll | 平滑滾動
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D graphics | 3D 圖形

---

<div align="center">

**[⬆️ Back to top | 返回頂部](#-monolith--geological-pastry-lab)**

Made with 🖤 by [Eugene Wu](https://github.com/eugenewu1019)

© 2026 MONOLITH | Geological Pastry Lab. All Rights Reserved.

</div>