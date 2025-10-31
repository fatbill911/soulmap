# Soul Board 功能規格

## 版本資訊

- **版本**：v1.0.0
- **分支**：feature/board-v1
- **狀態**：✅ 開發完成

## 概述

Soul Board（靈魂留言板）是 SoulMap 專案的社交互動模組，讓使用者可以匿名分享抽牌心得、心情，並互相回覆。風格延續「溫柔療癒 + 搞笑趣味」，提供低門檻、友善的匿名社群空間。

## 目的與定位

讓使用者以匿名或自訂暱稱方式分享：
- 抽牌心得
- 心情感受
- 靈魂訊息

並透過回覆、共鳴（按讚）功能互相支持與交流。

## 入口

### A) 獨立頁面：`/board`
完整留言牆，包含：
- 發文編輯器
- 主題篩選（愛情/工作/隨機/塔羅）
- 排序方式（最新/熱門/我的）
- 完整留言列表

### B) 內嵌元件：`/fortune` 頁面底部
精簡版 MiniBoard，包含：
- 簡化版發文編輯器
- 僅顯示塔羅主題最新 5 則
- 查看完整留言板連結

## 主要 UX 流程

1. **進入頁面**：訪問 /board 或 /fortune（底部）
2. **匿名識別**：使用 localStorage 的 anon_id（UUID）自動識別
3. **發表留言**：
   - 選擇主題（love/work/random/tarot）
   - 輸入暱稱（選填，未填顯示「某顆靈魂 🌟」）
   - 輸入留言內容（1-500 字）
   - 發送（受 15 秒節流限制）
4. **互動功能**：
   - 💖 共鳴（按讚/取消）
   - 💬 查看回覆
   - ✍️ 撰寫回覆（1-400 字）
   - 🚩 檢舉不當內容
5. **篩選排序**：
   - 主題：全部/愛情/工作/隨機/塔羅
   - 排序：最新/熱門/我的

## 技術架構

### 資料儲存

**當前版本（v1）**：使用 localStorage
- 優點：無需後端設定，立即可用
- 限制：僅本地資料，不支援多人同步

**未來升級（v2+）**：升級至 Supabase
- 完整的 PostgreSQL 資料庫
- Row Level Security (RLS) 安全策略
- 即時同步與多人協作
- 詳見 [lib/board/schema.sql](../lib/board/schema.sql)

### 資料模型

#### Post（貼文）
```typescript
{
  id: string
  author_id?: string          // 登入使用者 ID（未來）
  anon_id: string             // 匿名識別 ID
  nickname?: string           // 自訂暱稱
  topic: "love"|"work"|"random"|"tarot"
  message: string             // 1-500 字
  reactions: number           // 共鳴數
  hot_score: number           // 熱度分數
  created_at: string
  updated_at: string
}
```

#### Reply（回覆）
```typescript
{
  id: string
  post_id: string
  author_id?: string
  anon_id: string
  nickname?: string
  message: string             // 1-400 字
  created_at: string
}
```

#### Reaction（反應）
```typescript
{
  id: string
  post_id: string
  user_key: string            // 匿名 ID 或登入 ID
  kind: "like"|"sparkle"
  created_at: string
}
```

#### Report（檢舉）
```typescript
{
  id: string
  post_id: string
  reporter_key: string
  reason: "spam"|"abuse"|"privacy"|"other"
  created_at: string
}
```

### 檔案結構

```
lib/board/
 ├─ types.ts              // TypeScript 型別定義
 ├─ utils.ts              // 工具函數（匿名 ID、節流、遮蔽）
 ├─ hotScore.ts           // 熱度計算算法
 ├─ api.ts                // API 封裝（localStorage 實作）
 └─ schema.sql            // Supabase 資料庫 schema（預留）

components/board/
 ├─ Board.tsx             // 完整留言板容器
 ├─ MiniBoard.tsx         // 精簡版留言板
 ├─ PostComposer.tsx      // 發文編輯器
 ├─ PostList.tsx          // 留言列表
 ├─ PostItem.tsx          // 單則留言
 ├─ ReplyComposer.tsx     // 回覆編輯器
 ├─ ReplyList.tsx         // 回覆列表
 ├─ ReactionBar.tsx       // 反應按鈕列
 ├─ Filters.tsx           // 篩選器
 └─ AuthBadge.tsx         // 使用者身份標記

app/
 ├─ board/page.tsx        // 留言板主頁
 └─ fortune/page.tsx      // 已整合 MiniBoard
```

## 核心功能

### 1. 匿名系統
- 自動生成 UUID 儲存於 localStorage
- 未填暱稱顯示「某顆靈魂」+ 隨機 emoji（🌟✨💫🌙☀️🌈💖🦋🌸🍀）
- 支援自訂暱稱（最多 20 字）

### 2. 節流機制
- 同一 anon_id 發文間隔：15 秒
- 同一 anon_id 回覆間隔：15 秒
- 顯示剩餘等待時間

### 3. 內容審核
- 客戶端髒話遮蔽（關鍵字替換為 ★）
- 檢舉功能（廣告/辱罵/侵犯/其他）
- 字數限制（貼文 500 字、回覆 400 字）

### 4. 熱度算法
```
hot_score = reactions / ((hoursSince + 2) ^ 0.8)
```
- 新貼文有初始優勢（+2 小時緩衝）
- 隨時間衰減（0.8 次方）
- 反應數越多排序越前

### 5. 排序方式
- **最新（new）**：created_at DESC
- **熱門（hot）**：hot_score DESC, created_at DESC
- **我的（mine）**：僅顯示當前 anon_id 的貼文

## API 設計

### createPost(input)
創建貼文
```typescript
input: {
  topic: Topic
  message: string
  nickname?: string
  anon_id: string
}
```

### listPosts(params)
列出貼文
```typescript
params: {
  topic?: Topic
  sort?: "new"|"hot"|"mine"
  limit?: number
}
```

### createReply(input)
創建回覆
```typescript
input: {
  post_id: string
  message: string
  nickname?: string
  anon_id: string
}
```

### listReplies(postId)
列出回覆

### addReaction(input)
添加/取消反應（toggle）
```typescript
input: {
  post_id: string
  kind: "like"|"sparkle"
  user_key: string
}
```

### submitReport(input)
提交檢舉
```typescript
input: {
  post_id: string
  reason: "spam"|"abuse"|"privacy"|"other"
  reporter_key: string
}
```

## UI/UX 設計

### 視覺風格
- 柔和漸層背景（紫粉藍色系）
- 圓角卡片設計
- 柔和陰影效果
- Emoji 裝飾點綴
- 與 /fortune 頁面視覺一致

### 互動反饋
- 按鈕懸停效果
- 載入狀態動畫
- 表單驗證提示
- 操作成功/失敗訊息

### 響應式設計
- 桌面版：完整排版
- 平板版：調整間距
- 手機版：堆疊排版

## 安全性與隱私

### 當前版本（localStorage）
- 資料僅儲存於本地瀏覽器
- 清除瀏覽器資料將遺失所有內容
- 不同裝置不會同步

### 未來版本（Supabase）
- Row Level Security (RLS) 策略
- 公開讀取，認證寫入
- 作者可編輯/刪除自己的內容
- 管理員審核機制

## 驗收標準

### 功能驗收
- ✅ /board 頁面正常開啟
- ✅ 可發表貼文（含主題、暱稱、內容）
- ✅ 可查看貼文列表
- ✅ 可添加回覆
- ✅ 可按讚/取消按讚
- ✅ 可檢舉貼文
- ✅ 主題篩選功能正常
- ✅ 排序功能正常（最新/熱門/我的）
- ✅ /fortune 底部顯示 MiniBoard
- ✅ MiniBoard 顯示最新 5 則塔羅主題貼文

### 體驗驗收
- ✅ 匿名系統運作正常
- ✅ 15 秒節流生效
- ✅ 髒話遮蔽生效
- ✅ 熱度計算正確
- ✅ 時間顯示格式友善
- ✅ 響應式設計完整
- ✅ 載入狀態清晰

### 效能驗收
- ✅ 頁面載入速度快
- ✅ 不拖慢原有頁面效能
- ✅ localStorage 操作順暢

## 已知限制

### 當前版本（v1）
1. 資料僅儲存於本地，無法跨裝置同步
2. 清除瀏覽器資料會遺失所有內容
3. 無真實多人協作功能
4. 檢舉功能僅記錄，無後台審核

### 解決方案（未來版本）
- v2：升級至 Supabase 資料庫
- v3：加入即時同步與推播通知
- v4：管理員後台與審核工具

## 版本規劃

### 📦 v1：基礎留言板功能（當前版本）
- ✅ LocalStorage 資料儲存
- ✅ 匿名發文與回覆
- ✅ 反應與檢舉功能
- ✅ 主題篩選與排序
- ✅ 整合至 /fortune 頁面

### 🚀 v2：Supabase 資料庫升級（規劃中）
- 升級至 PostgreSQL 資料庫
- 即時多人同步
- RLS 安全策略
- 登入功能（可選）
- 管理員審核介面

### 🎨 v3：進階互動功能（規劃中）
- 貼圖/圖片上傳（Supabase Storage）
- AI「靈魂回信」功能
- 星座/MBTI 主題牆
- 即時通知（新回覆提醒）

### 🔮 v4：社群與個人化（規劃中）
- 使用者個人頁面
- 追蹤與被追蹤
- 私人訊息功能
- 個人化推薦演算法

## 升級至 Supabase 指南

當準備升級至 Supabase 時，請參考以下步驟：

1. **建立 Supabase 專案**
   - 前往 https://supabase.com 註冊
   - 建立新專案

2. **執行資料庫遷移**
   ```bash
   # 執行 schema.sql 建立資料表
   psql -h [YOUR_HOST] -U postgres -d postgres -f lib/board/schema.sql
   ```

3. **更新 API 實作**
   - 修改 `lib/board/api.ts`
   - 從 localStorage 改為 Supabase JS SDK
   - 範例程式碼已預留在註解中

4. **環境變數設定**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

5. **資料遷移**（可選）
   - 匯出 localStorage 資料
   - 批次匯入至 Supabase

## 測試指令

### 啟動開發伺服器
```bash
npm run dev
```

### 訪問頁面
- 完整留言板：http://localhost:3000/board
- Fortune + MiniBoard：http://localhost:3000/fortune

### 測試流程
1. 發表貼文（測試節流）
2. 添加回覆
3. 按讚/取消按讚
4. 切換主題篩選
5. 切換排序方式
6. 測試檢舉功能
7. 清除 localStorage，確認資料重置

## 相容性

- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- 瀏覽器支援 localStorage 與 crypto.randomUUID()

## 授權

與 SoulMap 專案相同

---

**開發完成日期**：2025-10-30
**開發者**：Claude Code + SoulMap Team
