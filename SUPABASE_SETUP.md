# SoulMap - Supabase 整合指南

## 📋 目錄

1. [環境變數設定](#環境變數設定)
2. [Supabase 專案建立](#supabase-專案建立)
3. [資料庫 Schema 設定](#資料庫-schema-設定)
4. [RLS 規則說明](#rls-規則說明)
5. [本地測試](#本地測試)
6. [Vercel 部署](#vercel-部署)
7. [常見問題](#常見問題)

---

## 環境變數設定

### 必要環境變數

建立 `.env.local` 檔案並填入以下變數（可參考 `.env.example`）：

```bash
# Supabase 專案設定
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 取得環境變數

1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 選擇您的專案
3. 左側選單點擊 **Settings** > **API**
4. 複製以下資訊：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (選用)

---

## Supabase 專案建立

### 步驟 1: 建立新專案

1. 前往 https://supabase.com
2. 點擊 **Start your project**
3. 登入或註冊帳號
4. 點擊 **New Project**
5. 填寫資訊：
   - Name: `soulmap` 或任意名稱
   - Database Password: 設定強密碼（請妥善保存）
   - Region: 選擇 `Northeast Asia (Tokyo)` 或最近的區域
   - Pricing Plan: **Free** (免費方案)

### 步驟 2: 等待建立完成

專案建立需要 1-2 分鐘，完成後會進入 Dashboard。

---

## 資料庫 Schema 設定

### 執行 SQL 腳本

1. 在 Supabase Dashboard 左側選單點擊 **SQL Editor**
2. 點擊 **New query**
3. 複製 `supabase/schema.sql` 的完整內容
4. 貼上到 SQL 編輯器
5. 點擊右下角 **Run** 按鈕執行

### 驗證建立成功

執行完成後，點擊左側 **Table Editor**，應該看到以下資料表：

- ✅ `posts` - 貼文主表
- ✅ `replies` - 回覆表（預留）
- ✅ `reactions` - 反應表（預留）

### 資料表結構

#### posts 資料表

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | UUID | 主鍵（自動生成）|
| anon_id | TEXT | 匿名用戶 ID |
| nickname | TEXT | 暱稱（選填）|
| topic | TEXT | 主題 (love/work/random/tarot) |
| message | TEXT | 貼文內容（最多 500 字）|
| reactions | INTEGER | 反應數量 |
| hot_score | DECIMAL | 熱度分數 |
| created_at | TIMESTAMPTZ | 建立時間 |
| updated_at | TIMESTAMPTZ | 更新時間 |

---

## RLS 規則說明

### 什麼是 Row Level Security (RLS)？

RLS 是 Supabase/PostgreSQL 的安全機制，可以針對每一列資料設定存取權限。

### 目前設定的規則

#### posts 資料表

| 操作 | 規則名稱 | 權限 |
|------|----------|------|
| SELECT | Anyone can read posts | 所有人可讀取 |
| INSERT | Anyone can insert posts | 所有人可新增 |
| UPDATE | Anyone can update own posts | 所有人可更新（用於 reactions）|
| DELETE | Authors can delete own posts | 作者可刪除自己的貼文 |

### 為什麼允許匿名新增？

- 留言板設計為匿名系統，不需要註冊登入
- 輸入驗證與速率限制由 **API 層**負責（`/app/api/board/route.ts`）
- API 層檢查項目：
  - ✅ 主題白名單驗證
  - ✅ 字數限制（500 字）
  - ✅ 敏感詞過濾
  - ✅ 速率限制（15 秒 1 則）

---

## 本地測試

### 步驟 1: 安裝依賴

```bash
npm install
```

### 步驟 2: 設定環境變數

確認 `.env.local` 檔案已建立並填入正確的 Supabase 憑證。

### 步驟 3: 啟動開發伺服器

```bash
npm run dev
```

### 步驟 4: 測試留言板功能

1. **開啟留言板頁面**: http://localhost:3000/board

2. **測試發文**:
   - 選擇主題（愛情/工作/隨機/塔羅）
   - 輸入暱稱（選填）
   - 輸入訊息內容
   - 點擊「發文」

3. **驗證成功**:
   - 貼文應立即出現在列表頂部
   - 刷新頁面後貼文仍存在
   - 前往 Supabase Dashboard > Table Editor > posts 查看資料

4. **測試跨裝置/瀏覽器**:
   - 開啟無痕模式或另一個瀏覽器
   - 訪問 http://localhost:3000/board
   - 應該看到相同的貼文列表

### 步驟 5: 檢查錯誤處理

開啟瀏覽器 Console (F12)，確認：
- ✅ 無紅色錯誤訊息
- ✅ API 請求成功（200 OK）
- ✅ 如果 Supabase 連線失敗，會自動 fallback 到 localStorage

---

## Vercel 部署

### 步驟 1: 在 Vercel 設定環境變數

1. 前往 https://vercel.com/dashboard
2. 選擇您的專案 (`soulmap-v1`)
3. 點擊 **Settings** > **Environment Variables**
4. 新增以下變數：

| 變數名稱 | 值 | 環境 |
|---------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxx.supabase.co | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJhbG... | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | eyJhbG... | Production, Preview, Development |

### 步驟 2: 重新部署

1. 方式 A: 推送新的 commit 到 GitHub（自動觸發部署）
2. 方式 B: 在 Vercel Dashboard 點擊 **Deployments** > **Redeploy**

### 步驟 3: 驗證部署成功

1. 開啟 Production URL (例如: https://soulmap-v1.vercel.app/board)
2. 測試發文功能
3. 確認資料寫入 Supabase（而非 localStorage）

---

## 常見問題

### Q1: 發文後沒有出現在列表中？

**檢查項目**:
1. 瀏覽器 Console 是否有錯誤訊息
2. 確認 `.env.local` 環境變數設定正確
3. 確認 Supabase 專案沒有暫停（免費方案閒置 1 週會暫停）
4. 檢查 Network tab，API 請求是否成功

### Q2: 出現 "Failed to create post" 錯誤？

**可能原因**:
1. 環境變數未設定或錯誤
2. Supabase RLS 規則未啟用
3. SQL Schema 未執行完成
4. 超過速率限制（15 秒內重複發文）

**解決方式**:
```bash
# 1. 檢查環境變數
cat .env.local

# 2. 重新執行 SQL Schema
# 前往 Supabase Dashboard > SQL Editor 重新執行 supabase/schema.sql

# 3. 清除速率限制（重啟開發伺服器）
npm run dev
```

### Q3: localhost 可以但 Vercel 部署後無法使用？

**檢查項目**:
1. Vercel 的環境變數是否已設定
2. 確認勾選了 **Production**, **Preview**, **Development** 三個環境
3. 重新部署專案

### Q4: 如何清空測試資料？

**方式 A: 透過 Supabase Dashboard**
```sql
-- 前往 SQL Editor 執行
DELETE FROM posts WHERE true;
```

**方式 B: 重置 AUTO INCREMENT**
```sql
TRUNCATE TABLE posts RESTART IDENTITY CASCADE;
```

### Q5: localStorage fallback 何時啟用？

當以下情況發生時，自動切換到 localStorage：
- Supabase 無法連線
- 環境變數未設定
- API 請求失敗

Console 會顯示警告訊息：
```
createPost error, falling back to localStorage: Error...
```

---

## 架構圖

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │
       │ fetch('/api/board')
       ▼
┌─────────────────┐
│   Next.js API   │
│  /api/board     │
│                 │
│  • 輸入驗證     │
│  • 速率限制     │
│  • 敏感詞過濾   │
└────────┬────────┘
         │
         │ Supabase Client
         ▼
┌─────────────────┐
│   Supabase      │
│   PostgreSQL    │
│                 │
│  • RLS 規則     │
│  • Schema       │
│  • Indexes      │
└─────────────────┘
```

---

## 檔案清單

| 檔案 | 說明 |
|------|------|
| `supabase/schema.sql` | 資料庫 Schema 與 RLS 規則 |
| `lib/supabase/client.ts` | Supabase 客戶端設定 |
| `app/api/board/route.ts` | 留言板 API 路由 |
| `lib/board/api.ts` | 前端 API 函式（整合 Supabase）|
| `.env.local` | 本地環境變數（不要提交到 Git）|
| `.env.example` | 環境變數範例檔 |

---

## 安全性注意事項

### ✅ 已實作

- Row Level Security (RLS) 啟用
- API 層輸入驗證
- 速率限制（15 秒 / 1 則）
- 敏感詞過濾
- 字數限制
- 主題白名單

### ⚠️ 生產環境建議

1. **啟用 Supabase Realtime Rate Limiting**
   - 前往 Settings > API > Rate Limiting
   - 設定合理的請求限制

2. **監控資料庫使用量**
   - 免費方案限制: 500 MB 資料庫
   - 定期清理舊資料

3. **備份資料**
   - 定期匯出資料庫備份
   - 使用 Supabase CLI: `supabase db dump`

4. **升級 Rate Limiting**
   - 建議使用 Redis 或 Upstash
   - 目前使用 Memory Map (重啟後清除)

---

## 支援

如有問題請聯絡：
📧 soulmapcontact@gmail.com

**相關文件**:
- [Supabase 官方文件](https://supabase.com/docs)
- [Next.js 文件](https://nextjs.org/docs)
- [RLS 說明](https://supabase.com/docs/guides/auth/row-level-security)
