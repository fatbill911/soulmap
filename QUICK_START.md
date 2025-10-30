# 🚀 SoulMap 快速上手指南

## 📦 第一次使用

### 1. 安裝依賴
```bash
cd soulmap
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```

### 3. 開啟瀏覽器
訪問 [http://localhost:3000](http://localhost:3000)

---

## ✅ 檢查清單

安裝完成後，你應該能看到：
- ✅ 首頁 Hero 區塊「星光懂你沒說的話」
- ✅ 熱門心理測驗區（顯示「情感依附型態測驗」）
- ✅ 12 星座預覽卡片
- ✅ 靈魂配對入口

測試導覽功能：
- ✅ 點擊「開始測驗」→ 進入測驗頁面
- ✅ 完成測驗 → 看到結果頁面
- ✅ 點擊任意星座 → 看到該星座詳細運勢
- ✅ 前往「配對」→ 填寫表單看到分析結果

---

## 🎯 常見任務

### 任務 1：新增一個測驗

**範例：新增「五大人格測驗」**

1. 打開 `lib/quizzes.ts`
2. 在檔案底部，複製 `attachmentQuiz` 的結構
3. 修改內容：

```typescript
const bigFiveQuiz: Quiz = {
  slug: "big-five-personality",
  title: "五大人格特質測驗",
  description: "探索你的開放性、嚴謹性、外向性、親和性與神經質程度。",
  estTimeMins: 8,

  questions: [
    {
      id: "q1",
      text: "我喜歡嘗試新事物，對新經驗充滿好奇",
      type: "scale5",
      dimension: "openness",  // 開放性
    },
    {
      id: "q2",
      text: "我做事有計畫、井然有序",
      type: "scale5",
      dimension: "conscientiousness",  // 嚴謹性
    },
    {
      id: "q3",
      text: "我在社交場合感到活力充沛",
      type: "scale5",
      dimension: "extraversion",  // 外向性
    },
    {
      id: "q4",
      text: "我容易感到壓力和焦慮",
      type: "scale5",
      dimension: "neuroticism",  // 神經質
    },
    {
      id: "q5",
      text: "我善於與人合作，樂於助人",
      type: "scale5",
      dimension: "agreeableness",  // 親和性
    },
    // ... 建議每個維度至少 5-8 題
  ],

  scoreToResult: (scores, extra) => {
    // 根據各維度分數判斷人格類型
    const openness = scores.openness || 0;
    const conscientiousness = scores.conscientiousness || 0;
    const extraversion = scores.extraversion || 0;
    const agreeableness = scores.agreeableness || 0;
    const neuroticism = scores.neuroticism || 0;

    // 簡化邏輯：找出最高分的維度
    const dimensions = {
      openness,
      conscientiousness,
      extraversion,
      agreeableness,
      neuroticism,
    };

    const highest = Object.entries(dimensions).sort(
      ([, a], [, b]) => b - a
    )[0][0];

    // 根據最高維度回傳對應結果
    if (highest === "openness") {
      return {
        type: "creative-explorer",
        label: "創意探險家 🎨",
        summary: "你對新事物充滿好奇，富有想像力與創造力。",
        strengths: ["思想開放", "創意豐富", "願意嘗試"],
        weaknesses: ["可能過於理想化", "容易分心"],
        advice: "保持好奇心，但也要學會專注完成事情。",
      };
    }
    // ... 其他維度的結果

    return {
      type: "balanced",
      label: "平衡型人格 ⚖️",
      summary: "你在各個維度都很平衡。",
      strengths: ["適應力強", "全面發展"],
      weaknesses: ["可能缺乏明顯特色"],
      advice: "找到你最想發展的面向並深入培養。",
    };
  },
};
```

4. 將新測驗加入陣列：

```typescript
export const quizzes: Quiz[] = [
  attachmentQuiz,
  bigFiveQuiz,  // 👈 加在這裡
];
```

5. 儲存檔案，重新整理瀏覽器
6. 完成！新測驗自動出現在首頁與測驗列表

---

### 任務 2：更新星座運勢

**範例：更新牡羊座今日運勢**

1. 打開 `lib/astrology.ts`
2. 找到 `aries` 物件
3. 修改 `today` 區塊：

```typescript
{
  sign: "aries",
  name: "牡羊座",
  // ...
  today: {
    love: "今天適合主動表白，火星能量為你加持！",  // 👈 改這裡
    work: "新專案啟動的好日子，勇敢提出你的想法。", // 👈 改這裡
    mood: "活力滿點，準備迎接挑戰。",              // 👈 改這裡
    advice: "衝動前先深呼吸，勇敢但不魯莽。",      // 👈 改這裡
  },
  // ...
}
```

4. 儲存檔案
5. 前往 `/astro/aries` 查看更新

**批次更新技巧**：
- 每週一次更新 `week` 區塊
- 每月一次更新 `month` 區塊
- 可以建立腳本自動化這個流程

---

### 任務 3：修改配對邏輯

**範例：新增獅子座與處女座的特殊配對描述**

1. 打開 `lib/match.ts`
2. 找到 `specificPairings` 物件
3. 在 `leo` 下新增：

```typescript
const specificPairings: Record<string, Record<string, any>> = {
  // ... 其他星座
  leo: {
    aquarius: { /* ... 已存在 */ },
    virgo: {  // 👈 新增這段
      adjust: 0,
      dynamic: "獅子的熱情遇上處女的細膩，你想要掌聲，對方想要完美。",
      hotspot: "你的自尊心vs對方的批判眼光，常常針鋒相對。",
      tip: "獅子要學會接受建設性批評，處女要看見對方的努力而非只有缺點。",
    },
  },
  // ...
};
```

4. 儲存檔案
5. 前往 `/match` 測試獅子+處女的配對

---

### 任務 4：自訂顏色主題

**範例：改成「紫月銀河」配色**

1. 打開 `tailwind.config.ts`
2. 修改 `colors` 區塊：

```typescript
colors: {
  "cosmic-navy": "#1a0033",      // 更深的紫黑色
  "cosmic-purple": "#b388ff",    // 亮紫色
  "cosmic-pink": "#ff6090",      // 粉紅色
  "cosmic-white": "#f5f3ff",     // 淡紫白
  "cosmic-gray": "#3d2c5c",      // 紫灰色
},
```

3. 儲存檔案，Tailwind 會自動重新編譯
4. 重新整理瀏覽器看到新配色

---

## 🐛 除錯指南

### 問題 1：測驗沒有出現在列表

**檢查清單**：
- ✅ 新測驗有加入 `quizzes` 陣列嗎？
- ✅ `slug` 是否重複？（每個測驗的 slug 必須唯一）
- ✅ TypeScript 有報錯嗎？（檢查終端機）

### 問題 2：測驗結果顯示錯誤

**檢查清單**：
- ✅ `scoreToResult` 函式有正確回傳物件嗎？
- ✅ 維度名稱（`dimension`）拼寫正確嗎？
- ✅ 分數計算邏輯有問題嗎？（可在函式內加 `console.log(scores)` 除錯）

### 問題 3：星座頁面 404

**檢查清單**：
- ✅ 檔案路徑是 `app/astro/[sign]/page.tsx` 嗎？（注意中括號）
- ✅ 星座代碼拼寫正確嗎？（例如 `aries` 不是 `aries座`）
- ✅ `lib/astrology.ts` 中的 `sign` 屬性與 URL 一致嗎？

### 問題 4：樣式沒有套用

**檢查清單**：
- ✅ Tailwind CSS class 名稱正確嗎？（例如 `bg-cosmic-purple`）
- ✅ `globals.css` 有引入 Tailwind 指令嗎？
- ✅ 重新啟動開發伺服器試試（Ctrl+C 後重新 `npm run dev`）

---

## 📚 進階學習

### 想深入了解架構？
閱讀 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### 想了解完整功能？
閱讀 [README.md](./README.md)

### 想學習 Next.js？
- [Next.js 官方文件](https://nextjs.org/docs)
- [Next.js App Router 教學](https://nextjs.org/docs/app)

### 想學習 TypeScript？
- [TypeScript 官方手冊](https://www.typescriptlang.org/docs/)
- [TypeScript 中文網](https://ts.nodejs.cn/)

### 想學習 Tailwind CSS？
- [Tailwind CSS 官方文件](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

## 🎉 恭喜！

你現在已經掌握了 SoulMap 的基本操作！

接下來你可以：
1. 🧪 新增更多測驗（MBTI、愛情語言、生命靈數...）
2. ⭐ 豐富星座內容（每日更新、特殊星象提醒）
3. 💫 優化配對邏輯（加入更多星座組合）
4. 🎨 客製化 UI（改顏色、字體、動畫）
5. 🚀 部署到 Vercel（讓全世界看到你的作品！）

**記住**：保持資料與邏輯的分離，未來擴充會更輕鬆！

---

**需要幫助？**
- 📧 檢查 `README.md` 的完整文件
- 🐛 遇到 bug？先看終端機的錯誤訊息
- 💡 想要新功能？先思考要改 `lib/` 還是 `app/`

**Happy Coding! ✨💜**
