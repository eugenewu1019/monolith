<div align="right">

**語言**: [English](README.md) | [繁體中文](README.zh-TW.md)

</div>

<div align="center">

# MONOLITH | 地質甜點工作室

[![MIT 授權](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![線上展示](https://img.shields.io/badge/demo-online-green.svg)](https://eugenewu1019.github.io/monolith/)
[![設計系統](https://img.shields.io/badge/Design_System-Obsidian-black?style=flat&logo=figma)](DESIGN.zh-TW.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**品味的建築。把地質甜點做成可互動的數位展覽。**

[線上展示](https://eugenewu1019.github.io/monolith/) · [設計系統](DESIGN.zh-TW.md) · [Issues](https://github.com/eugenewu1019/monolith/issues)

![Project Banner](public/images/obsidian-tart.png)

</div>

---

## 專案介紹

**MONOLITH** 是一個沉浸式雙語概念網站，為虛構高端甜點品牌打造。它把甜點視為「可食用的地質標本」：礦物質感、展覽式導覽、具氛圍的 3D 動態，以及安靜但有張力的編輯排版。

目前版本重點是 **V1.5 體驗升級**：首頁更有電影感、橫向品味旅程全面可點擊、手機版更穩定、導航列可讀性更清楚，互動流程也更完整。

## V1.5 體驗升級

### 互動式首頁 Hero

- Hero 模式可切換：**Structure / 結構**、**Texture / 質地**、**Time / 時間**。
- Three.js / React Three Fiber 背景會依目前模式改變光線、材質與動態。
- 加入掃描線、軌道動態、展覽資訊卡與標本標籤，讓首屏更像沉浸式展件。
- 支援 reduced-motion fallback，使用者關閉動態時仍可正常閱讀與操作。

### 品味旅程藝廊

- 七段式橫向 tasting journey，節奏更像展覽動線。
- 甜點卡片全面可點擊：點擊後會先滑動到對應卡片，再打開對應的詳細彈窗。
- 已移除最後的預約卡片，避免內容重疊與錯誤操作，讓藝廊專注在甜點選擇。
- 最後保留互動測驗站，並補上 dialog 語意、Escape 關閉與更安全的互動狀態。

### 導航列與閱讀對比

- 導航列改成深色玻璃底，避免文字和背景重疊造成不可讀。
- 桌機與手機版都強化層級、對比與 hover / pointer 狀態。

### 評論區

- 評論區右下角新增簡潔的上一則 / 下一則按鈕。
- 分頁與評論切換動態調整成更安靜、接近藝廊瀏覽的節奏。

### 手機版體驗

- 手機版使用專用 layout，保留品牌氛圍但避開桌機橫向互動造成的壓縮問題。
- 卡片、間距、觸控區域與文字尺寸重新整理，降低小螢幕重疊風險。

## 設計方向

MONOLITH 使用 **Obsidian / 黑曜石** 視覺系統：

- **Raw / Refined 張力**：礦物表面、玻璃、金色細線與克制的高級感。
- **深色地質色盤**：深黑、石墨、舊金、苔綠與琥珀。
- **編輯式節奏**：真正需要吸睛時才放大字級，介面操作則保持細緻易掃讀。
- **把動態當材質**：慢速軌道、視差、深度與有觸感的 hover 狀態。

完整設計文件：[DESIGN.zh-TW.md](DESIGN.zh-TW.md)

## 技術棧

### 核心

- [Next.js 16](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

### 動態與 3D

- [Framer Motion 12](https://www.framer.com/motion/)
- [React Three Fiber 9](https://docs.pmnd.rs/react-three-fiber/)
- [Drei 10](https://github.com/pmndrs/drei)
- [Lenis](https://github.com/darkroomengineering/lenis)

### UI 與開發工具

- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [ESLint 9](https://eslint.org/)
- [Prettier 3](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)

## 快速開始

### 前置需求

- 建議使用 Node.js 20 或更新版本。
- 本專案預設使用 npm。

### 安裝

```bash
git clone https://github.com/eugenewu1019/monolith.git
cd monolith
npm install
```

### 本機開發

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

### 正式環境建置

```bash
npm run build
npm start
```

## 可用指令

```bash
npm run dev            # 啟動開發伺服器
npm run build          # 建立正式版本
npm start              # 啟動正式伺服器
npm run lint           # 執行 ESLint
npm run lint:fix       # 自動修復 ESLint 問題
npm run format         # 使用 Prettier 格式化支援的檔案
npm run type-check     # 執行 TypeScript 型別檢查
npm test               # 執行 Jest 測試
npm run test:watch     # 使用 watch 模式執行 Jest
npm run test:coverage  # 產生測試覆蓋率報告
```

## 專案結構

```text
monolith/
├── src/
│   ├── app/                    # Next.js app routes 與全域樣式
│   ├── components/
│   │   ├── gallery/            # 橫向品味旅程與測驗
│   │   ├── hero/               # 互動首頁、模式切換與 3D 背景
│   │   ├── mobile/             # 手機版專用體驗
│   │   ├── sections/           # 編輯式頁面區塊
│   │   └── ui/                 # 共用 UI 基礎元件
│   └── lib/                    # 工具函式、hooks 與共用資料
├── public/
│   └── images/                 # 品牌與甜點圖片
├── docs/                       # 專案文件
├── DESIGN.md                   # 英文設計系統文件
├── DESIGN.zh-TW.md             # 繁中設計系統文件
├── README.md                   # 英文 README
└── README.zh-TW.md             # 繁中 README
```

## 驗證紀錄

V1.5 升級已用以下方式驗證：

- `npm run lint`
- `npm run type-check`
- `npm test -- --runInBand`
- `npm run build`
- Playwright 互動檢查：Hero 模式切換、藝廊卡片點擊、測驗彈窗、評論切換按鈕、導航列對比、reduced-motion fallback。

## 授權

本專案採用 [MIT License](LICENSE)。

## 聯絡

Owen Wu

- GitHub: [@eugenewu1019](https://github.com/eugenewu1019)
- LinkedIn: [@owenwuwork](https://www.linkedin.com/in/owenwuwork)
