# Soul Fortune v1 Release Notes

## 版本資訊

- **版本**：v1.0.0
- **分支**：feature/fortune-v1
- **發布日期**：2025-10-30
- **狀態**：✅ 開發完成，待測試

## 功能概述

Soul Fortune v1 是基礎算命功能，結合塔羅牌與星座，提供溫柔療癒與搞笑趣味並存的運勢訊息。

## 新增功能

### 🎴 塔羅牌系統
- 8 張塔羅大阿卡納卡片
- 支援正位與逆位（50% 機率）
- 每張卡片包含：
  - 卡片名稱（中英文）
  - 意義說明
  - 溫柔療癒文案
  - 搞笑趣味文案

### ⭐ 星座系統
- 12 星座專屬一句話
- 幽默風格文案
- 可選擇或不選擇星座

### 🎲 三種主題模式
- 💕 愛情模式
- 💼 工作模式
- 🎲 隨機模式

### 🎨 使用者介面
- 響應式設計（支援手機/平板/桌面）
- 柔和漸層背景
- 淡入翻牌動畫效果
- 清晰的卡片顯示設計
- 整合至 SoulMap 導航列

## 技術實作

### 新增檔案清單

#### API 層
- `app/api/fortune/route.ts` - Fortune API endpoint

#### 頁面層
- `app/fortune/page.tsx` - Fortune 主頁面

#### 資料層
- `lib/fortune/data/tarot.ts` - 塔羅卡資料（8 cards）
- `lib/fortune/data/zodiac.ts` - 星座資料（12 signs）

#### 邏輯層
- `lib/fortune/logic/pick.ts` - 抽牌邏輯

#### UI 元件層
- `components/fortune/FortuneCard.tsx` - 結果顯示卡片
- `components/fortune/DrawButton.tsx` - 抽牌按鈕
- `components/fortune/Tabs.tsx` - 主題切換
- `components/fortune/ZodiacSelect.tsx` - 星座選擇

#### 文件
- `docs/fortune-spec.md` - 完整功能規格（含版本規劃）
- `docs/fortune-v1-release.md` - v1 發布說明（本檔案）

### 修改檔案清單
- `app/globals.css` - 新增淡入動畫樣式
- `components/SiteHeader.tsx` - 導航列加入「算命」連結

## API 規格

### GET /api/fortune

**參數**：
- `t` (optional): 主題 - `love` | `work` | `random`（預設：random）
- `sign` (optional): 星座 - `aries` | `taurus` | ... | `pisces`

**回應範例**：
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

## 測試指令

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```

### 3. 訪問頁面
- 主頁面：http://localhost:3000/fortune
- 或點擊導航列「算命」連結

### 4. 測試 API
```bash
# 測試基本抽牌
curl "http://localhost:3000/api/fortune"

# 測試愛情主題 + 雙魚座
curl "http://localhost:3000/api/fortune?t=love&sign=pisces"

# 測試工作主題
curl "http://localhost:3000/api/fortune?t=work"
```

## 驗收標準

- ✅ `/fortune` 頁面正常開啟
- ✅ 可切換主題（愛情/工作/隨機）
- ✅ 可選擇星座或不選
- ✅ 抽牌功能運作正常
- ✅ 顯示塔羅牌名稱、位置、雙版本文案
- ✅ 顯示星座一句話
- ✅ 風格溫柔又幽默
- ✅ 響應式設計完整
- ✅ 不影響原 SoulMap 專案功能
- ✅ 導航列顯示「算命」連結

## 已知限制

1. 目前僅包含 8 張大阿卡納（v2+ 將加入更多）
2. 無使用者歷史紀錄功能（計劃於 v2 加入）
3. 無分享功能（計劃於 v4 加入）
4. 無 AI 互動解牌（計劃於 v3 加入）

## 後續版本預告

- **v2**：每日運勢與使用者紀錄
- **v3**：AI 聊天互動式解牌
- **v4**：社群分享卡片生成

詳見 [fortune-spec.md](./fortune-spec.md) 的「版本規劃與擴充路線」章節。

## 相容性

- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+

## 授權

與 SoulMap 專案相同
