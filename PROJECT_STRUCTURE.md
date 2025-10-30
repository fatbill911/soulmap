# 📂 SoulMap 專案結構完整圖

```
soulmap/
│
├── 📦 package.json                    # 專案依賴與腳本
├── 📦 package-lock.json               # 鎖定依賴版本
├── ⚙️ next.config.js                  # Next.js 設定
├── ⚙️ tsconfig.json                   # TypeScript 設定
├── ⚙️ tailwind.config.ts              # Tailwind CSS 設定
├── ⚙️ postcss.config.mjs              # PostCSS 設定
├── 📝 README.md                       # 專案說明文件
├── 📝 PROJECT_STRUCTURE.md            # 本文件
├── 🙈 .gitignore                      # Git 忽略檔案
│
├── 📁 app/                            # Next.js 14 App Router 目錄
│   │
│   ├── 🎨 globals.css                 # 全域 CSS 樣式
│   ├── 📄 layout.tsx                  # 根佈局（含 Header & Footer）
│   ├── 🏠 page.tsx                    # 首頁 (/)
│   │
│   ├── 📁 tests/                      # 測驗列表頁
│   │   └── 📄 page.tsx                # /tests
│   │
│   ├── 📁 quiz/                       # 測驗執行
│   │   └── 📁 [slug]/                 # 動態路由
│   │       └── 📄 page.tsx            # /quiz/[slug] (客戶端互動)
│   │
│   ├── 📁 result/                     # 測驗結果
│   │   └── 📁 [slug]/                 # 動態路由
│   │       └── 📄 page.tsx            # /result/[slug]?scores=...
│   │
│   ├── 📁 astro/                      # 星座運勢
│   │   ├── 📄 page.tsx                # /astro (12星座總覽)
│   │   └── 📁 [sign]/                 # 動態路由
│   │       └── 📄 page.tsx            # /astro/[sign] (單一星座詳細)
│   │
│   ├── 📁 match/                      # 配對分析
│   │   └── 📄 page.tsx                # /match (表單+即時結果)
│   │
│   ├── 📁 about/                      # 關於我們
│   │   └── 📄 page.tsx                # /about
│   │
│   ├── 📁 contact/                    # 聯絡我們
│   │   └── 📄 page.tsx                # /contact (含表單)
│   │
│   └── 📁 legal/                      # 法律聲明
│       ├── 📁 privacy/                # 隱私政策
│       │   └── 📄 page.tsx            # /legal/privacy
│       └── 📁 disclaimer/             # 免責聲明
│           └── 📄 page.tsx            # /legal/disclaimer
│
├── 📁 components/                     # React 共用元件
│   ├── 🧩 SiteHeader.tsx              # 網站頁首（Logo + 導覽 + 深色模式切換）
│   ├── 🧩 SiteFooter.tsx              # 網站頁尾（連結 + 版權）
│   ├── 🧩 QuizCard.tsx                # 測驗卡片（用於首頁與列表）
│   ├── 🧩 QuestionStepper.tsx         # 測驗題目步進器（進度條 + 題目 + 按鈕）
│   ├── 🧩 ResultBlock.tsx             # 測驗結果顯示區塊
│   └── 🧩 AdSlot.tsx                  # 廣告位 placeholder
│
├── 📁 lib/                            # 業務邏輯與資料層（核心！）
│   ├── 🧠 quizzes.ts                  # 測驗資料、題目、計分邏輯、結果對應
│   ├── ⭐ astrology.ts                # 12星座資料、每日/週/月運勢
│   └── 💫 match.ts                    # 配對分析邏輯（星座相性計算）
│
├── 📁 data/                           # 靜態資料檔案（未來可擴充為 JSON）
│   └── (目前資料寫在 lib/ 內，可移到這裡改用 JSON)
│
├── 📁 public/                         # 靜態資源（圖片、favicon 等）
│   └── (未來可放 logo、og-image 等)
│
└── 📁 .next/                          # Next.js 建置輸出（自動生成，已加入 .gitignore）
```

---

## 🎯 關鍵設計原則

### 1. **資料與邏輯分離** (Separation of Concerns)
```
頁面層 (app/)         →  只負責渲染 UI
    ↓ 呼叫
邏輯層 (lib/)         →  處理計算、過濾、轉換
    ↓ 讀取
資料層 (data/ 或 lib/) →  儲存測驗題目、星座內容
```

### 2. **模組化測驗系統**
```
新增測驗流程：
1. 編輯 lib/quizzes.ts
2. 加入新的 Quiz 物件
3. 自動出現在：
   - 首頁 (/)
   - 測驗列表 (/tests)
   - 測驗頁面 (/quiz/[slug])
   - 結果頁面 (/result/[slug])
```

### 3. **集中式星座資料**
```
所有星座內容都在 lib/astrology.ts
→ 更新運勢只需編輯一個檔案
→ 未來可改為 API 或資料庫驅動
```

### 4. **可重用元件**
```
QuizCard        →  用於首頁 & 測驗列表
QuestionStepper →  用於所有測驗頁面
ResultBlock     →  用於所有結果頁面
AdSlot          →  用於任何需要廣告的位置
```

---

## 🔄 資料流向圖

### 測驗流程
```
使用者選擇測驗
    ↓
/quiz/[slug]
    ↓
lib/quizzes.ts → getQuizBySlug()
    ↓
QuestionStepper 元件顯示題目
    ↓
使用者逐題回答 (useState 管理)
    ↓
提交時計算各維度分數
    ↓
呼叫 quiz.scoreToResult(scores)
    ↓
導向 /result/[slug]?scores={...}
    ↓
ResultBlock 元件顯示結果
```

### 星座查詢流程
```
使用者點選星座
    ↓
/astro/[sign]
    ↓
lib/astrology.ts → getSignData(sign)
    ↓
顯示 today/week/month 運勢
```

### 配對分析流程
```
使用者填寫表單 (2 個星座 + 關係狀態)
    ↓
/match (客戶端互動)
    ↓
lib/match.ts → analyzeMatch({ aSign, bSign, status })
    ↓
計算元素相性 + 特定配對修正
    ↓
根據關係狀態調整結果
    ↓
即時顯示結果（不跳頁）
```

---

## 🚀 未來擴充方向

### 短期擴充（不需改架構）
- ✅ 新增更多測驗（編輯 `lib/quizzes.ts`）
- ✅ 更新星座內容（編輯 `lib/astrology.ts`）
- ✅ 優化配對邏輯（編輯 `lib/match.ts`）
- ✅ 增加新的共用元件

### 中期擴充（需要小幅重構）
- 📊 將資料移到 JSON 檔案 (`data/`)
- 🎨 整合圖示庫（Lucide React / Heroicons）
- 📱 社群分享功能（產生結果圖片）
- 🔐 簡單的使用者系統（儲存測驗記錄）

### 長期擴充（需要架構升級）
- 🗄️ 資料庫整合（PostgreSQL / MongoDB）
- 🔐 完整使用者系統（註冊、登入、個人頁面）
- 💳 付費功能（Stripe 整合）
- 📊 後台 CMS（讓非技術人員管理內容）
- 🤖 AI 整合（ChatGPT 個人化建議）
- 🌐 多語系支援（i18n）
- 📧 Email 系統（每日運勢推送）

---

## 📝 開發筆記

### 為什麼選擇這個架構？

1. **Next.js App Router**
   - 現代化的檔案系統路由
   - 支援 Server Components（未來優化效能）
   - 內建 SEO 優化（metadata）

2. **TypeScript**
   - 型別安全，減少 bug
   - 更好的開發體驗（IDE 提示）
   - 易於重構與擴充

3. **Tailwind CSS**
   - 快速開發 UI
   - 高度可客製化
   - 內建響應式設計

4. **資料邏輯分離**
   - 方便未來遷移到資料庫
   - 非技術人員可透過編輯檔案更新內容
   - 易於測試與維護

### 設計理念

> "頁面只負責渲染，邏輯交給函式，資料集中管理。"

這樣的設計讓整個系統：
- ✅ 易於擴充（加新測驗不用改頁面）
- ✅ 易於維護（改資料不用動程式）
- ✅ 易於測試（邏輯函式可獨立測試）
- ✅ 易於協作（前後端分工清楚）

---

**最後提醒**：這個結構是為「可擴充性」而設計的。不要為了短期方便而打破資料與邏輯的分離，否則未來會後悔！💜
