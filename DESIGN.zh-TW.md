# 🎨 設計系統與 Vibe Coding 哲學

> 「程式碼不只是功能，更是數位體驗的肌理。」

本文件概述了 **MONOLITH** 專案中所使用的設計決策、美學原則以及「氛圍編碼 (Vibe Coding)」技術。

## 🌑 設計概念：地質甜點 (Geological Pastry)
核心視覺隱喻融合了 **地質學 (Geology)**（永恆、原始紋理、深邃）與 **美食學 (Gastronomy)**（轉瞬即逝、精緻、細膩）。

- **關鍵字**: `原始 (Raw)`, `精緻 (Refined)`, `觸感 (Tactile)`, `大氣 (Atmospheric)`
- **視覺張力**: 粗糙的礦物紋理 vs. 光滑的玻璃/液體介面。

## 💎 設計系統："Obsidian" (黑曜石)

### 色彩計畫
我們採用基於礦物特性的語意化色彩系統。

| Token | 值 | 語意用途 |
|-------|-------|----------------|
| `bg-void` | `#0a0a0a` | 最深層背景，象徵「虛空」 |
| `bg-surface` | `#1a1a1a` | 隆起的表面、卡片 |
| `text-gold` | `#d4af37` | 強調色、奢華亮點、活躍狀態 |
| `text-mineral` | `#a0a0a0` | 次要文字、細微資訊 |
| `border-faint` | `rgba(255,255,255,0.05)` | 微型邊框、玻璃邊緣 |

### 排版 (Typography)
- **展示字體 (Display)**: *Playfair Display* (或類似襯線體) - 用於標題，喚起奢華與雜誌印刷感。
- **介面/內文 (UI/Body)**: *Inter* 或 *Geist Sans* - 用於易讀性、技術數據與 UI 控制項。

### 動態原則 (The "Vibe")
動態不僅是裝飾；它是互動的 **實質 (Substance)**。

1.  **流動性 (Fluidity)**: 元素應感覺像漂浮在黏稠介質中，而非真空。
    -   *實作*: 使用 Framer Motion 的自訂 `bezier` 曲線與彈簧物理 (spring physics)。
2.  **視差深度 (Parallax Depth)**: 使用者是在內容 **之中** 移動，而不僅僅是滑過它。
    -   *實作*: React Three Fiber 深度映射與多層 CSS 變換。
3.  **微互動 (Micro-Interactions)**: 每個懸停、點擊與拖曳都應產生觸覺反饋（發光、縮放、音效）。

## 🔮 Vibe Coding 實作

Monolith 中的 "Vibe Coding" 意味著將應用程式的 **感覺 (Feeling)** 置於與功能同等重要的位置。

### 使用技術
-   **程序化噪聲 (Procedural Noise)**: 使用 GLSL shaders 生成有機、變幻的背景，模仿岩漿或流動的巧克力。
-   **光照即 UI (Lighting as UI)**: 使用 CSS 陰影與 R3F 光照來引導使用者注意力，而非傳統邊框。
-   **聲音設計 (Sound Design)**: (規劃中) 細微的環境嗡鳴與清脆的互動點擊聲以增強沉浸感。

## 📱 響應式設計
"Monolith" 體驗會隨裝置適配：
-   **桌面端**: 全沉浸式 3D 藝廊，橫向捲動。
-   **行動端**: 垂直動態牆，簡化的 shader 以優化電池續航，觸控優先的手勢操作。

---

*本設計系統為活文件，將隨專案演進而更新。*
