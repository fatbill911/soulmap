-- ============================================
-- SoulMap Board - Supabase Schema
-- ============================================
-- 此檔案定義留言板所需的資料表與 RLS 政策
-- 請在 Supabase Dashboard > SQL Editor 執行此腳本

-- 1. 建立 posts 資料表
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anon_id TEXT NOT NULL,
  nickname TEXT,
  topic TEXT NOT NULL CHECK (topic IN ('love', 'work', 'random', 'tarot')),
  message TEXT NOT NULL CHECK (char_length(message) <= 500),
  reactions INTEGER DEFAULT 0 CHECK (reactions >= 0),
  hot_score DECIMAL(10, 4) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 建立索引以優化查詢
CREATE INDEX IF NOT EXISTS idx_posts_topic ON public.posts(topic);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_hot_score ON public.posts(hot_score DESC);
CREATE INDEX IF NOT EXISTS idx_posts_anon_id ON public.posts(anon_id);

-- 3. 建立 updated_at 自動更新觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 4. 啟用 Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 5. RLS 政策：任何人可讀取
CREATE POLICY "Anyone can read posts"
  ON public.posts
  FOR SELECT
  USING (true);

-- 6. RLS 政策：任何人可新增（由 API 層做驗證）
CREATE POLICY "Anyone can insert posts"
  ON public.posts
  FOR INSERT
  WITH CHECK (true);

-- 7. RLS 政策：只有作者可更新自己的貼文（用於 reactions）
CREATE POLICY "Anyone can update own posts"
  ON public.posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 8. RLS 政策：只有作者可刪除自己的貼文
CREATE POLICY "Authors can delete own posts"
  ON public.posts
  FOR DELETE
  USING (anon_id = current_setting('request.jwt.claims', true)::json->>'anon_id');

-- ============================================
-- 未來擴充：replies 資料表（預留）
-- ============================================
CREATE TABLE IF NOT EXISTS public.replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anon_id TEXT NOT NULL,
  nickname TEXT,
  message TEXT NOT NULL CHECK (char_length(message) <= 300),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_replies_post_id ON public.replies(post_id);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON public.replies(created_at);

ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read replies"
  ON public.replies
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert replies"
  ON public.replies
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 未來擴充：reactions 資料表（預留）
-- ============================================
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  anon_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, anon_id)
);

CREATE INDEX IF NOT EXISTS idx_reactions_post_id ON public.reactions(post_id);

ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reactions"
  ON public.reactions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert reactions"
  ON public.reactions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authors can delete own reactions"
  ON public.reactions
  FOR DELETE
  USING (anon_id = current_setting('request.jwt.claims', true)::json->>'anon_id');

-- ============================================
-- 完成設定
-- ============================================
-- 執行完成後，請確認：
-- 1. Tables 頁面可看到 posts, replies, reactions 三個表
-- 2. 每個表的 RLS 都已啟用（顯示綠色勾勾）
-- 3. 測試查詢：SELECT * FROM posts LIMIT 10;
