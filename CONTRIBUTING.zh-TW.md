# 貢獻至 Monolith

首先，感謝您考慮為 Monolith 做出貢獻！這是一個融合了實驗性「氛圍編碼 (Vibe Coding)」與嚴謹工程實踐的專案。

## 🛠️ 開發哲學

我們看重 **表達力 (Expression)** 勝於慣例，但 **效能 (Performance)** 是不可妥協的。

### 核心原則
1.  **零卡頓 (Zero Jank)**: 動畫必須維持 60fps (或 120fps)。僅使用 `transform` 與 `opacity` 屬性。避免佈局抖動 (layout thrashing)。
2.  **無障礙 (Accessibility/a11y)**: 藝術應當是可被訪問的。即使在 WebGL 覆蓋層下，也要確保語意化的 HTML。
3.  **型別安全 (Type Safety)**: 拒絕 `any`。認真的。我們使用嚴格的 TypeScript。

## 💻 開發工作流

1.  **Fork & Branch**: 為您的功能建立一個分支 (`feat/amazing-shader`)。
2.  **Install**: 使用 `pnpm` (建議) 或 `npm`。
3.  **Dev**: 執行 `npm run dev`。
4.  **Lint**: 提交前執行 `npm run lint`。
5.  **Test**: 如果您新增了邏輯，請加入測試。`npm test`。

## 🎨 設計貢獻

如果您要貢獻設計變更：
-   請參閱 [DESIGN.zh-TW.md](DESIGN.zh-TW.md) 了解我們的 Token 系統。
-   請勿在未更新 Tailwind config 的情況下引入新顏色。
-   動態變更應先在 Figma 或清晰的程式碼沙盒 (code sandbox) 中製作原型。

## 🐛 回報錯誤

請使用 Issue Template。請包含：
-   瀏覽器與作業系統版本 (對 WebGL 錯誤至關重要)。
-   截圖或螢幕錄影 (loom/gif)。
-   Console 錯誤訊息。

## 📜 行為準則 (Code of Conduct)

保持友善。我們都是來創造很酷的東西的。
