<div align="right">

**語言**: [🇺🇸 English](README.md) | [🇹🇼 繁體中文](README.zh-TW.md)

</div>

<div align="center">

# 🌑 MONOLITH | 地質甜點工作室

[![MIT 授權](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![線上展示](https://img.shields.io/badge/demo-online-green.svg)](https://eugenewu1019.github.io/monolith/)
[![CI/CD](https://github.com/eugenewu1019/monolith/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/eugenewu1019/monolith/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![歡迎 PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**品味的建築。轉瞬的雕塑。**

[線上展示](https://eugenewu1019.github.io/monolith/) · [回報錯誤](https://github.com/eugenewu1019/monolith/issues) · [功能請求](https://github.com/eugenewu1019/monolith/issues) · [討論區](https://github.com/eugenewu1019/monolith/discussions)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## 📚 目錄

- [關於專案](#-關於專案)
- [核心功能](#-核心功能)
- [技術棧](#️-技術棧)
- [快速開始](#-快速開始)
- [專案結構](#-專案結構)
- [開發指南](#-開發指南)
- [部署](#-部署)
- [貢獻](#-貢獻)
- [授權](#-授權)
- [聯絡方式](#-聯絡方式)
- [致謝](#-致謝)

---

## 🎯 關於專案

**MONOLITH** 是一個極具沉浸感的概念網站,為一個將「地質學」與「甜點工藝」結合的虛構高端品牌而生。本專案旨在探索 **「氛圍編碼 (Vibe Coding)」** 與高效能網頁工程的交會點。

### 為什麼做這個專案?

- 🎨 **設計挑戰**: 將實體奢華體驗轉化為吸引人的數位介面
- 🚀 **技術探索**: 挑戰 Next.js 14 App Router 的極限,實現複雜動畫效果
- 🌏 **雙語使用者體驗**: 為全球用戶實現無縫的語言切換體驗
- 💡 **AI 整合**: 打造結合物理感介面與智慧推薦的互動測驗
- ⚡ **效能優先**: 在維持豐富互動的同時達到 90 分以上的 Lighthouse 評分

---

## ✨ 核心功能

### 🌍 雙語優先
- 完整的國際化實作,搭配自訂 `useLocale` hook
- 即時語言切換(英文/繁體中文)
- 針對雙語優化的 SEO metadata

### 💎 沉浸式橫向藝廊
- **滾動劫持運鏡**: 平滑的橫向導覽,如同漫步於藝廊展覽之中
- **視差深度**: 多層次地質紋理搭配 3D 視差效果
- **效能優化**: 基於 RequestAnimationFrame 的流暢滾動

### 🧠 AI 甜點風味測驗
- **物理感互動**: 由 Framer Motion 驅動的彈簧物理感對話框
- **權重偏好配對**: 智慧演算法提供個人化推薦
- **多維度分析**: 分析心情、風味、質地與場合

### 🌒 沉浸式極黑美學
- **原石配色**: 精心策劃的深色模式,採用「原石黑」與「礦脈金」色票
- **微光效果**: 細緻的光暈擴散與網格漸層
- **自然美學**: 靈感來自礦脈紋理與地質形成

### 🚀 效能與無障礙
- 延遲載入與程式碼分割
- Next.js Image 圖片優化
- 符合 WCAG 2.1 AA 標準
- 鍵盤導覽支援
- 螢幕閱讀器友善

---

## 🛠️ 技術棧

本專案採用現代 Next.js 技術棧,專注於效能、模組化與高質感動畫。

### 核心
- [Next.js 14](https://nextjs.org/) - 搭載 App Router 的 React 框架
- [TypeScript](https://www.typescriptlang.org/) - 型別安全與更好的開發體驗
- [React 18](https://react.dev/) - 具備伺服器元件的 UI 函式庫

### 樣式與動畫
- [Tailwind CSS](https://tailwindcss.com/) - 工具優先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 生產級動畫函式庫
- [Lenis](https://github.com/darkroomengineering/lenis) - 平滑滾動函式庫
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - Three.js 的 React 渲染器

### 開發工具
- [ESLint](https://eslint.org/) - 程式碼檢查
- [Prettier](https://prettier.io/) - 程式碼格式化
- [Jest](https://jestjs.io/) - 測試框架
- [React Testing Library](https://testing-library.com/react) - 元件測試

### UI 元件
- [Lucide React](https://lucide.dev/) - 精美圖示集
- [Radix UI](https://www.radix-ui.com/) - 無障礙元件基礎
- 客製化設計系統 - CSS Variables + Tailwind

---

## 🚀 快速開始

### 前置需求

- **Node.js** 18.17 或更新版本
- **npm** 或 **yarn** 或 **pnpm**

### 安裝步驟

1. **複製儲存庫**
   ```bash
   git clone https://github.com/eugenewu1019/monolith.git
   cd monolith
   ```

2. **安裝依賴套件**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   ```

4. **在瀏覽器開啟**
   
   前往 [http://localhost:3000](http://localhost:3000)

### 正式環境建置

```bash
# 建立優化的正式版本
npm run build

# 啟動正式伺服器
npm start

# 匯出靜態網站(用於 GitHub Pages)
npm run build
```

---

## 📂 專案結構

```text
monolith/
├── src/
│   ├── app/                  # Next.js 應用路由
│   │   ├── [locale]/          # 國際化路由
│   │   ├── layout.tsx         # 根佈局
│   │   └── page.tsx           # 首頁
│   ├── components/           # 可重用元件
│   │   ├── sections/         # 頁面區塊
│   │   ├── ui/               # UI 基礎元件
│   │   └── __tests__/        # 元件測試
│   ├── lib/                  # 工具函式與輔助程式
│   │   ├── i18n/             # 國際化
│   │   ├── data/             # 靜態資料
│   │   └── __tests__/        # 工具函式測試
│   └── docs/                 # 品牌指南
├── public/                  # 靜態資源
│   ├── images/              # 圖片
│   ├── fonts/               # 自訂字型
│   └── icons/               # 圖示與網站圖示
├── .github/                 # GitHub 配置
│   └── workflows/           # CI/CD 流程
├── jest.config.js           # Jest 配置
├── jest.setup.js            # 測試設定
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 本檔案
```

---

## 💻 開發指南

### 可用指令

```bash
# 開發
npm run dev              # 啟動開發伺服器
npm run build            # 建置正式版本
npm start                # 啟動正式伺服器

# 程式碼品質
npm run lint             # 執行 ESLint
npm run lint:fix         # 自動修復 ESLint 問題
npm run format           # 使用 Prettier 格式化

# 測試
npm test                 # 執行測試
npm run test:watch       # 監看模式執行測試
npm run test:coverage    # 生成測試覆蓋率報告

# 型別檢查
npm run type-check       # 檢查 TypeScript 型別
```

### 環境變數

在根目錄建立 `.env.local` 檔案:

```env
# 環境變數範例
NEXT_PUBLIC_SITE_URL=https://eugenewu1019.github.io/monolith
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 🚀 部署

### GitHub Pages (目前設定)

本專案配置為推送至 `main` 分支時自動部署到 GitHub Pages。

1. **啟用 GitHub Pages**
   - Settings → Pages → Source: GitHub Actions

2. **推送至 main 分支**
   ```bash
   git push origin main
   ```

3. **GitHub Actions 將自動**:
   - 執行測試
   - 建置專案
   - 部署到 GitHub Pages

### 其他部署選項

<details>
<summary><b>Vercel</b> (推薦用於 Next.js)</summary>

1. 將儲存庫匯入 Vercel
2. 配置建置設定(自動偵測)
3. 部署!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eugenewu1019/monolith)

</details>

<details>
<summary><b>Netlify</b></summary>

1. 連接儲存庫
2. 建置指令: `npm run build`
3. 發布目錄: `out`
4. 部署!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/eugenewu1019/monolith)

</details>

---

## 🤝 貢獻

貢獻讓開源社群變得如此美好!我們非常感謝您的任何貢獻。

請閱讀我們的[貢獻指南](CONTRIBUTING.md)以了解:

- 行為準則
- 開發流程
- 如何提交 pull requests
- 程式碼標準
- commit 訊息規範

### 貢獻者快速開始

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 🐛 錯誤回報與功能請求

發現錯誤或有功能建議?

- **錯誤回報**: [建立 issue](https://github.com/eugenewu1019/monolith/issues/new?template=bug_report.md)
- **功能請求**: [建立 issue](https://github.com/eugenewu1019/monolith/issues/new?template=feature_request.md)
- **問題討論**: [開啟討論](https://github.com/eugenewu1019/monolith/discussions)

---

## 📝 授權

本專案採用 MIT 授權。詳情請見 [`LICENSE`](LICENSE) 檔案。

---

## 📬 聯絡方式

**Owen Wu** - UI/UX 設計師與前端工程師

- LinkedIn: [@owenwuwork](https://www.linkedin.com/in/owenwuwork)
- GitHub: [@eugenewu1019](https://github.com/eugenewu1019)
- 作品集: [即將推出]

**專案連結**: [https://github.com/eugenewu1019/monolith](https://github.com/eugenewu1019/monolith)

**線上展示**: [https://eugenewu1019.github.io/monolith/](https://eugenewu1019.github.io/monolith/)

---

## 🙏 致謝

特別感謝這些出色的專案與資源:

- [Next.js](https://nextjs.org/) - React 框架
- [Vercel](https://vercel.com/) - 部署平台
- [Radix UI](https://www.radix-ui.com/) - 無障礙元件
- [Framer Motion](https://www.framer.com/motion/) - 動畫函式庫
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide Icons](https://lucide.dev/) - 精美圖示
- [Lenis](https://github.com/darkroomengineering/lenis) - 平滑滾動
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D 圖形

---

<div align="center">

**[⬆️ 返回頂部](#-monolith--地質甜點工作室)**

Made with 🖤 by [Eugene Wu](https://github.com/eugenewu1019)

© 2026 MONOLITH | Geological Pastry Lab. All Rights Reserved.

</div>