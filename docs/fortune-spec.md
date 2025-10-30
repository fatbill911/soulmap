# Soul Fortune 功能規格

## 版本管理策略

本功能採用版本化開發，確保穩定性與可擴充性：

- **main / master**：穩定版本，不直接修改
- **feature/fortune-v1**：基礎塔羅 + 星座算命功能（當前版本）
- **feature/fortune-v2**：每日運勢與使用者紀錄功能（規劃中）
- **feature/fortune-v3**：AI 聊天互動式解牌功能（規劃中）
- **feature/fortune-v4**：社群分享卡片生成功能（規劃中）

### 當前版本：v1

## 概述

Soul Fortune 是 SoulMap 專案的獨立算命功能模組，結合塔羅牌與星座，提供溫柔療癒與搞笑趣味並存的運勢訊息。

## 功能特色

- 🎴 塔羅牌抽牌（8 張大阿卡納）
- ⭐ 星座一句話（12 星座）
- 💜 雙風格文案：溫柔療癒 + 搞笑趣味
- 🎲 三種主題：愛情 / 工作 / 隨機
- ✨ 無需登入，一鍵體驗

## 技術架構

### API Endpoint

```
GET /api/fortune?t=love|work|random&sign=aries|...|pisces
```

回傳格式：
```json
{
  "card": {
    "id": "the-star",
    "name": "The Star / 星星",
    "position": "upright",
    "soft": "你正在走出混亂，重新找到屬於你的光。",
    "fun": "你需要的不是星星，是 Wi-Fi 滿格。",
    "meaning": "希望、療癒、重新開始"
  },
  "blurb": "雙魚座今天容易感性爆棚，記得帶面紙。"
}
```

### 檔案結構

```
app/
 ├─ fortune/
 │   └─ page.tsx               # 主頁面
 └─ api/
     └─ fortune/
         └─ route.ts           # API handler

lib/
 └─ fortune/
     ├─ data/
     │   ├─ tarot.ts           # 塔羅卡資料 (8 cards)
     │   └─ zodiac.ts          # 星座文案 (12 signs)
     └─ logic/
         └─ pick.ts            # 抽牌邏輯

components/
 └─ fortune/
     ├─ FortuneCard.tsx        # 結果顯示卡片
     ├─ DrawButton.tsx         # 抽牌按鈕
     ├─ Tabs.tsx               # 主題切換
     └─ ZodiacSelect.tsx       # 星座選擇
```

## 使用流程

1. 使用者進入 `/fortune` 頁面
2. 選擇主題（愛情 / 工作 / 隨機）
3. 可選擇星座（或不選）
4. 點擊「抽一張牌」按鈕
5. 顯示結果：
   - 塔羅牌名稱
   - 正位或逆位
   - 溫柔版文案
   - 搞笑版文案
   - 星座一句話
6. 可再抽一張或分享結果

## 視覺風格

- 柔和漸層背景（粉紫、藍白）
- 圓角陰影卡片設計
- 淡入翻牌動畫效果
- 響應式設計（支援手機/平板/桌面）
- 不影響原 SoulMap 全域樣式

## 文案風格示例

### 溫柔療癒
- 「你不需要馬上變好，只要願意呼吸就很好。」
- 「今天適合放過自己，也放下昨天的錯。」
- 「有些人的離開，是為了讓更適合的人進來。」

### 搞笑趣味
- 「命運像泡麵，等三分鐘就會開運。」
- 「感情像 Wi-Fi，有時滿格卻沒連上。」
- 「逃避雖然可恥但有用，但只限今天。」

### 星座一句話
- 白羊：今天適合出門，但錢包說先不要。
- 雙魚：想太多沒關係，別把自己想沒了。
- 處女：細節控發作，但生活不是 Excel。

## 驗收標準

- ✅ `/fortune` 頁面正常開啟
- ✅ 可切換主題與星座
- ✅ 抽牌功能運作正常
- ✅ 顯示塔羅 + 星座內容
- ✅ 風格溫柔又幽默
- ✅ 不影響原專案功能
- ✅ 響應式設計完整

## 版本規劃與擴充路線

### 📦 v1：基礎算命功能（當前版本）
**分支**：`feature/fortune-v1`
**狀態**：✅ 已完成

功能清單：
- ✅ 8 張塔羅大阿卡納卡片
- ✅ 12 星座一句話文案
- ✅ 三種主題（愛情/工作/隨機）
- ✅ 雙風格文案（溫柔療癒 + 搞笑趣味）
- ✅ 響應式 UI 設計
- ✅ 獨立 API endpoint
- ✅ 不影響原專案功能

### 🚀 v2：每日運勢與使用者紀錄（規劃中）
**分支**：`feature/fortune-v2`（未建立）
**預計功能**：

1. **每日自動運勢**
   - 每日 00:00 自動更新當日運勢
   - 依星座提供專屬每日訊息
   - 支援「今日幸運色」、「今日提醒」

2. **使用者歷史紀錄**
   - 記錄使用者抽牌歷史
   - 支援「我的抽牌紀錄」頁面
   - 可查看過去 30 天的抽牌結果

3. **技術實作位置**（預留）：
   - `lib/fortune/services/daily.ts` - 每日運勢邏輯
   - `lib/fortune/services/history.ts` - 歷史紀錄管理
   - `app/api/fortune/daily/route.ts` - 每日運勢 API
   - `app/api/fortune/history/route.ts` - 歷史紀錄 API
   - `app/fortune/history/page.tsx` - 歷史頁面

### 🤖 v3：AI 聊天互動式解牌（規劃中）
**分支**：`feature/fortune-v3`（未建立）
**預計功能**：

1. **AI 對話式占卜**
   - 使用者可與 AI 對話詢問運勢
   - AI 根據問題推薦適合的塔羅牌
   - 支援多輪對話深入解讀

2. **個人化解牌**
   - 根據使用者情境客製化解讀
   - 提供更深入的建議與指引

3. **技術實作位置**（預留）：
   - `lib/fortune/services/ai-chat.ts` - AI 對話邏輯
   - `lib/fortune/prompts/` - AI prompt 模板
   - `app/api/fortune/chat/route.ts` - AI 對話 API
   - `app/fortune/chat/page.tsx` - 對話頁面
   - `components/fortune/ChatInterface.tsx` - 對話 UI

### 🎨 v4：社群分享卡片生成（規劃中）
**分支**：`feature/fortune-v4`（未建立）
**預計功能**：

1. **分享圖片生成**
   - 將抽牌結果生成精美圖片
   - 支援多種視覺風格模板
   - 包含 SoulMap 品牌標識

2. **社群分享功能**
   - 一鍵分享到 Facebook / Instagram / Line
   - 複製分享連結功能
   - 生成唯一分享 ID

3. **技術實作位置**（預留）：
   - `lib/fortune/services/image-gen.ts` - 圖片生成邏輯
   - `lib/fortune/templates/` - 圖片模板
   - `app/api/fortune/share/route.ts` - 分享 API
   - `components/fortune/ShareCard.tsx` - 分享卡片元件
   - `components/fortune/ShareButton.tsx` - 分享按鈕

### 🔮 未來可能擴充（v5+）

- [ ] 加入更多塔羅卡（小阿卡納 56 張）
- [ ] 支援多語言（英文、日文版）
- [ ] 加入真實塔羅牌圖片素材
- [ ] 支援語音朗讀功能
- [ ] 整合推播通知（每日運勢提醒）
- [ ] 建立使用者社群（分享與討論）

---

## 開發注意事項

1. **版本獨立性**：每個版本在獨立分支開發，確保不影響其他版本
2. **向後相容**：新版本需保持對舊版 API 的相容性
3. **模組化設計**：預留擴充位置，使用清晰的資料夾結構
4. **文件同步**：每個版本更新時同步更新此規格文件
