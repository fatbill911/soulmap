# 🌟 SoulMap 靈魂地圖

> 星光懂你沒說的話。用心理學與星象為你描出命運的軌跡。

一個結合心理測驗、星座運勢與配對分析的現代化網站，採用 **Next.js 14 App Router** + **React** + **TypeScript** + **Tailwind CSS** 打造。

## ✨ 特色

### 🌊 情感探索五部曲（Emotional Journey Series）

完整的心理測驗旅程，帶你探索內在世界：

- **🌊 依附風格測驗** (Attachment)：了解你在關係中的依附模式
- **🔥 情緒表達測驗** (Emotion Style)：探索你的情緒風格
- **🌿 親密距離測驗** (Intimacy)：認識你對親密感的需求
- **🪨 界線測驗** (Boundary)：檢視你的人際界線健康度
- **🌙 核心信念測驗** (Core Belief)：覺察你的內在信念系統

每個測驗包含 8 題精心設計的問題，提供溫柔、療癒、無批判的專業解析。

### 🗺️ 靈魂地圖 (Soul Profile)

- **五維雷達圖**：視覺化呈現你的情感風格輪廓
- **進度追蹤**：即時顯示完成的章節數（X / 5）
- **整合解讀**：根據五個維度生成個人化的心理分析
- **MBTI 整合**：結合性格類型與情感風格

### 🖼️ 分享卡生成

- **專屬視覺卡片**：完成全部五章後，生成精美的靈魂地圖分享卡
- **PNG 下載**：一鍵下載高品質圖片，分享到社群媒體
- **隨機結尾語**：每次生成都有不同的溫柔提醒

### 🧭 旅程導航

- **智慧章節引導**：自動推薦下一個測驗
- **進度顯示**：清楚標示完成度與剩餘章節
- **流暢體驗**：從測驗→結果→下一章，無縫接軌

### 🔮 其他功能

- ⭐ **星座運勢**：12 星座的每日/每週/每月完整運勢
- 🎴 **塔羅運勢**：結合塔羅與星座的混合式占卜
- 💬 **心情看板**：分享與交流的社群空間（支援回覆、反應、檢舉）
- 💫 **靈魂配對**：結合星座與心理學的關係分析
- 🎨 **神秘星語風格**：深邃宇宙配色與優雅的 UI 設計
- 📱 **完全響應式**：支援所有裝置尺寸
- 🚀 **高效能**：使用 Next.js 14 App Router，支援 SSR 與 SSG

## 📁 專案結構

```
soulmap/
├── app/                      # Next.js App Router 頁面
│   ├── about/               # 關於我們
│   ├── api/                 # API 路由
│   │   ├── board/          # 看板 API
│   │   └── fortune/        # 運勢 API
│   ├── astro/               # 星座運勢
│   │   └── [sign]/         # 單一星座詳細頁
│   ├── board/               # 心情看板（社群功能）
│   ├── contact/             # 聯絡我們
│   ├── fortune/             # 塔羅 + 星座運勢
│   ├── legal/               # 法律相關
│   │   ├── disclaimer/     # 免責聲明
│   │   └── privacy/        # 隱私政策
│   ├── map/                 # 靈魂地圖
│   │   ├── page.tsx        # Soul Profile 主頁（雷達圖 + 摘要）
│   │   └── share/          # 分享卡生成與下載
│   ├── match/               # 配對分析
│   ├── quiz/                # 測驗頁面
│   │   ├── [slug]/         # 動態測驗頁面（情感五部曲）
│   │   └── mbti-mini/      # MBTI 性格測驗
│   ├── result/              # 測驗結果
│   │   └── [slug]/         # 單一測驗結果（含旅程導航）
│   ├── tests/               # 測驗列表
│   ├── layout.tsx           # 全域佈局
│   ├── page.tsx             # 首頁
│   └── globals.css          # 全域樣式
│
├── components/               # React 共用元件
│   ├── AdSlot.tsx           # 廣告位元件
│   ├── QuestionStepper.tsx  # 測驗題目步進器
│   ├── QuizCard.tsx         # 測驗卡片
│   ├── QuizSummaryCard.tsx  # Soul Profile 測驗摘要卡片
│   ├── RadarChart.tsx       # Canvas 雷達圖元件
│   ├── ResultBlock.tsx      # 結果顯示區塊
│   ├── SiteFooter.tsx       # 網站頁尾
│   └── SiteHeader.tsx       # 網站頁首
│
├── lib/                      # 業務邏輯與資料層
│   ├── astrology.ts         # 星座資料與邏輯
│   ├── board.ts             # 看板資料處理
│   ├── fortune.ts           # 塔羅與運勢邏輯
│   ├── match.ts             # 配對分析邏輯
│   ├── mbti.ts              # MBTI 測驗邏輯
│   └── quizzes.ts           # 情感五部曲測驗資料與計分邏輯
│
├── public/                   # 靜態資源
│
├── vercel.json              # Vercel 部署設定
├── next.config.js           # Next.js 設定
├── tailwind.config.ts       # Tailwind CSS 設定
├── tsconfig.json            # TypeScript 設定
├── package.json             # 專案依賴
└── README.md                # 本文件
```

## 🚀 快速部署

### 從 GitHub Clone 並部署

```bash
# 1. Clone 專案
git clone https://github.com/fatbill911/soulmap.git
cd soulmap

# 2. 切換到穩定版本（推薦）
git checkout release/v1-emotional-journey

# 3. 安裝依賴
npm install

# 4. 建置專案
npm run build

# 5. 啟動正式環境
npm start
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 開發模式

```bash
# 啟動開發伺服器（支援熱重載）
npm run dev
```

### 環境變數

本專案目前**不需要任何環境變數**即可運行。所有功能均為前端實作，無需後端 API 或資料庫連線。

未來若需要串接外部服務（如運勢 API、分析工具），請在專案根目錄建立 `.env.local` 檔案。

## 🌐 部署到 Vercel

### 方法一：透過 Vercel CLI

1. 安裝 Vercel CLI：
```bash
npm install -g vercel
```

2. 登入 Vercel：
```bash
vercel login
```

3. 部署專案：
```bash
vercel
```

4. 正式環境部署：
```bash
vercel --prod
```

### 方法二：透過 GitHub 整合

1. 將專案推送到 GitHub
2. 前往 [Vercel](https://vercel.com)
3. 點擊 "Import Project"
4. 選擇你的 GitHub 儲存庫
5. Vercel 會自動偵測 Next.js 並進行設定
6. 點擊 "Deploy" 完成部署

每次推送到主分支，Vercel 會自動重新部署。

## 📝 如何新增測驗

這是整個系統最重要的擴充性設計！新增測驗**完全不需要修改頁面程式碼**，只需要編輯 `lib/quizzes.ts`。

### 步驟

1. 打開 `lib/quizzes.ts`
2. 參考現有的 `attachmentQuiz` 範例
3. 創建新的測驗物件：

```typescript
const myNewQuiz: Quiz = {
  slug: "my-new-quiz",  // URL 路徑，例如 /quiz/my-new-quiz
  title: "我的新測驗",
  description: "測驗描述",
  estTimeMins: 5,  // 預估分鐘數

  questions: [
    {
      id: "q1",
      text: "題目文字",
      type: "scale5",  // 5點量表
      dimension: "維度名稱",  // 例如 "extraversion"
      reverse: false,  // 是否為反向計分
    },
    // ... 更多題目
  ],

  scoreToResult: (scores, extra) => {
    // 根據分數計算結果
    const myScore = scores.維度名稱 || 0;

    return {
      type: "result-type",
      label: "結果標籤 🌟",
      summary: "結果摘要說明",
      strengths: ["優點1", "優點2"],
      weaknesses: ["盲點1", "盲點2"],
      advice: "給使用者的建議",
      starNote: extra?.sign ? `給${extra.sign}的提醒` : undefined,
    };
  },
};
```

4. 將新測驗加入 `quizzes` 陣列：

```typescript
export const quizzes: Quiz[] = [
  attachmentQuiz,
  myNewQuiz,  // 加在這裡
];
```

5. 完成！測驗會自動出現在：
   - 首頁的熱門測驗區
   - `/tests` 測驗列表頁
   - `/quiz/my-new-quiz` 自動生成測驗頁面
   - `/result/my-new-quiz` 自動生成結果頁面

### 計分邏輯說明

- 每個問題對應一個 `dimension`（維度）
- 系統自動將同維度的題目分數加總
- 如果 `reverse: true`，會自動進行反向計分（6 - 原始分數）
- 分數會自動轉換為百分制（0-100）
- 在 `scoreToResult` 函式中根據分數判斷結果類型

## ⭐ 如何更新星座資料

星座運勢資料集中在 `lib/astrology.ts`，更新方式：

### 更新單一星座

1. 打開 `lib/astrology.ts`
2. 找到對應星座的物件（例如 `aries`）
3. 修改 `today`、`week` 或 `month` 的內容：

```typescript
{
  sign: "aries",
  name: "牡羊座",
  emoji: "♈",
  element: "火",
  today: {
    love: "更新的愛情運勢",
    work: "更新的工作運勢",
    mood: "更新的心情描述",
    advice: "更新的建議",
  },
  week: { /* ... */ },
  month: { /* ... */ },
}
```

### 批次更新所有星座

如果你想要每日自動更新運勢，建議：

1. 將資料移到 `data/astro/*.json` JSON 檔案
2. 修改 `lib/astrology.ts` 改為讀取 JSON
3. 建立自動化腳本定期更新 JSON 檔案
4. 或串接運勢 API

### 未來進階擴充方向

- 🗄️ **資料庫整合**：將測驗與星座資料移到資料庫（如 PostgreSQL, MongoDB）
- 🔐 **使用者系統**：登入、儲存測驗記錄、追蹤歷史
- 💳 **付費功能**：解鎖完整解析、專屬諮詢
- 📊 **後台管理**：CMS 系統讓非技術人員也能更新內容
- 🌐 **多語系**：支援英文、日文等語言
- 📱 **分享功能**：產生精美的結果圖片分享到社群媒體
- 📧 **Email 通知**：每日/每週運勢推送
- 🤖 **AI 整合**：結合 ChatGPT 產生個人化建議

## 🎨 自訂樣式

### 顏色配置

在 `tailwind.config.ts` 中修改主題色彩：

```typescript
colors: {
  "cosmic-navy": "#0B0F2F",      // 背景深藍
  "cosmic-purple": "#9B5DE5",    // 主要紫色
  "cosmic-pink": "#F72585",      // 強調粉色
  "cosmic-white": "#F0EFFF",     // 主要文字
  "cosmic-gray": "#2A2E4F",      // 次要背景
}
```

### 字體

預設使用系統字體。如要使用 Google Fonts：

1. 前往 [Google Fonts](https://fonts.google.com)
2. 選擇字體（推薦：Noto Sans TC、Noto Serif TC）
3. 在 `app/layout.tsx` 中引入
4. 在 `tailwind.config.ts` 中設定 `fontFamily`

## 🧪 技術棧

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, TypeScript 5
- **Styling**: Tailwind CSS 3
- **Canvas Graphics**: HTML5 Canvas API（雷達圖繪製）
- **Image Export**: html2canvas（分享卡 PNG 生成）
- **Storage**: LocalStorage（測驗結果暫存）
- **Icons**: Emoji（未來可改用 Lucide React 或 Heroicons）

## 📄 授權

本專案僅供學習與個人使用。如需商業使用，請確保：
- 遵守相關法律與倫理規範
- 添加適當的專業諮詢免責聲明
- 尊重心理學與占星學的專業性

## 🙏 致謝

- 依附理論基於 John Bowlby 與 Mary Ainsworth 的研究
- 星座系統基於西方占星學傳統
- UI 靈感來自神秘學與宇宙美學

---

**Remember**: 這個工具是為了幫助人們認識自己、成長與連結。請負責任地使用，並在需要時鼓勵使用者尋求專業協助。💜

**Made with ✨ and 💜 for self-discovery**
