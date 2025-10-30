# 🎯 SoulMap 速查表 (Cheat Sheet)

## 🚀 快速啟動

```bash
cd soulmap
npm install          # 首次安裝依賴
npm run dev         # 啟動開發伺服器
npm run build       # 建置正式版本
npm start           # 執行正式版本
```

瀏覽器訪問：http://localhost:3000

---

## 📝 新增測驗（3 步驟）

### 1. 編輯 `lib/quizzes.ts`

```typescript
const myQuiz: Quiz = {
  slug: "my-quiz",  // URL slug
  title: "測驗標題",
  description: "測驗描述",
  estTimeMins: 5,

  questions: [
    {
      id: "q1",
      text: "題目文字",
      type: "scale5",
      dimension: "維度名稱",
      reverse: false,  // 反向計分
    },
    // ... 更多題目
  ],

  scoreToResult: (scores, extra) => {
    const score = scores.維度名稱 || 0;

    if (score > 70) {
      return {
        type: "high",
        label: "高分型 🌟",
        summary: "你的特質描述",
        strengths: ["優點1", "優點2"],
        weaknesses: ["盲點1", "盲點2"],
        advice: "給你的建議",
      };
    }
    // ... 其他分數範圍
  },
};
```

### 2. 加入陣列

```typescript
export const quizzes: Quiz[] = [
  attachmentQuiz,
  myQuiz,  // 👈 加在這裡
];
```

### 3. 完成！測驗自動出現在所有頁面

---

## ⭐ 更新星座運勢

### 編輯 `lib/astrology.ts`

```typescript
{
  sign: "aries",
  name: "牡羊座",
  emoji: "♈",
  element: "火",

  today: {
    love: "愛情運勢文字",
    work: "工作運勢文字",
    mood: "心情描述",
    advice: "今日建議",
  },

  week: { /* 同上 */ },
  month: { /* 同上 */ },
}
```

---

## 💫 調整配對邏輯

### 編輯 `lib/match.ts`

#### 新增特殊配對

```typescript
const specificPairings = {
  leo: {
    virgo: {
      adjust: 5,  // 分數調整
      dynamic: "相處模式描述",
      hotspot: "容易吵架的點",
      tip: "溝通建議",
    },
  },
};
```

#### 修改元素相性

```typescript
const elementCompatibility = {
  fire: { fire: 85, earth: 60, air: 80, water: 50 },
  // ... 其他元素
};
```

---

## 🎨 修改配色

### 編輯 `tailwind.config.ts`

```typescript
colors: {
  "cosmic-navy": "#0B0F2F",      // 背景色
  "cosmic-purple": "#9B5DE5",    // 主色
  "cosmic-pink": "#F72585",      // 強調色
  "cosmic-white": "#F0EFFF",     // 文字色
  "cosmic-gray": "#2A2E4F",      // 次要背景
}
```

---

## 📁 重要檔案速覽

| 檔案 | 用途 | 修改頻率 |
|------|------|----------|
| `lib/quizzes.ts` | 測驗資料 | 🔥 常改 |
| `lib/astrology.ts` | 星座資料 | 🔥 常改 |
| `lib/match.ts` | 配對邏輯 | 🔥 常改 |
| `app/page.tsx` | 首頁 | 🔹 偶爾改 |
| `components/SiteHeader.tsx` | 導覽列 | 🔹 偶爾改 |
| `tailwind.config.ts` | 樣式設定 | 🔹 偶爾改 |

---

## 🔗 URL 路由速查

| URL | 檔案 | 用途 |
|-----|------|------|
| `/` | `app/page.tsx` | 首頁 |
| `/tests` | `app/tests/page.tsx` | 測驗列表 |
| `/quiz/xxx` | `app/quiz/[slug]/page.tsx` | 測驗頁 |
| `/result/xxx` | `app/result/[slug]/page.tsx` | 結果頁 |
| `/astro` | `app/astro/page.tsx` | 星座列表 |
| `/astro/xxx` | `app/astro/[sign]/page.tsx` | 星座詳細 |
| `/match` | `app/match/page.tsx` | 配對分析 |

---

## 🧩 常用元件

### QuizCard
```tsx
<QuizCard
  slug="my-quiz"
  title="測驗標題"
  description="測驗描述"
  estTimeMins={5}
/>
```

### ResultBlock
```tsx
<ResultBlock
  label="結果標籤"
  summary="摘要"
  strengths={["優點1", "優點2"]}
  weaknesses={["盲點1", "盲點2"]}
  advice="建議"
  starNote="星語提醒"
/>
```

### AdSlot
```tsx
<AdSlot />
```

---

## 🐛 常見錯誤除錯

### 編譯錯誤
```bash
# 清除快取重新編譯
rm -rf .next
npm run dev
```

### 樣式沒套用
```bash
# 檢查 Tailwind 是否正確載入
# 確認 app/globals.css 有這三行：
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

### 測驗沒出現
```typescript
// 檢查是否加入陣列
export const quizzes: Quiz[] = [
  attachmentQuiz,
  myQuiz,  // 👈 有加嗎？
];
```

### TypeScript 錯誤
```typescript
// 確認型別是否正確
const myQuiz: Quiz = { /* ... */ };  // 👈 有加型別嗎？
```

---

## 📊 計分邏輯速查

### 反向計分
```typescript
{
  id: "q1",
  text: "我不喜歡社交",
  dimension: "extraversion",
  reverse: true,  // 👈 會自動 6 - 原始分數
}
```

### 分數範圍判斷
```typescript
scoreToResult: (scores) => {
  const score = scores.維度 || 0;

  if (score < 30) return { /* 低分結果 */ };
  if (score < 70) return { /* 中分結果 */ };
  return { /* 高分結果 */ };
}
```

### 多維度判斷
```typescript
scoreToResult: (scores) => {
  const anxiety = scores.anxiety || 0;
  const avoidance = scores.avoidance || 0;

  if (anxiety < 25 && avoidance < 25) {
    return { /* 安全依附 */ };
  }
  // ... 其他組合
}
```

---

## 🎯 Tailwind 常用 Class

### 佈局
```
flex, grid, container
justify-center, items-center
space-x-4, space-y-4, gap-4
```

### 顏色
```
bg-cosmic-navy, bg-cosmic-purple
text-cosmic-white, text-cosmic-purple
border-cosmic-purple
```

### 尺寸
```
w-full, h-full
max-w-4xl, max-w-3xl
px-4, py-8, p-6
```

### 效果
```
rounded-xl, rounded-lg
hover:bg-cosmic-purple
transition-colors, transition-all
shadow-lg, backdrop-blur-sm
```

---

## 🔄 Git 工作流程

```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 連結 GitHub
git remote add origin https://github.com/username/soulmap.git
git branch -M main
git push -u origin main

# 日常開發
git add .
git commit -m "描述你的變更"
git push
```

---

## 🚀 部署到 Vercel

### 方法一：CLI
```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

### 方法二：GitHub 整合
1. 推送到 GitHub
2. 前往 vercel.com
3. Import Project
4. 選擇儲存庫
5. Deploy

---

## 📚 快速參考連結

- [README.md](./README.md) - 完整文件
- [QUICK_START.md](./QUICK_START.md) - 快速上手
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 架構說明
- [INSTALL_AND_TEST.md](./INSTALL_AND_TEST.md) - 安裝測試

---

## 💡 記住這些原則

✅ **永遠記得**
- 資料放 `lib/`，不放頁面裡
- 新增測驗只改 `lib/quizzes.ts`
- 更新星座只改 `lib/astrology.ts`
- 元件只負責 UI，不寫業務邏輯

❌ **永遠不要**
- 把測驗題目寫在頁面裡
- 把星座資料寫在元件裡
- 在元件內計算測驗分數
- 為了方便而打破架構

---

**這張速查表應該解決 90% 的日常操作！**

需要更詳細的說明請參考其他文件 📚

Made with ✨ and 💜
