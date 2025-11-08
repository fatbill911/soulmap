import { createClient } from '@supabase/supabase-js'

// Supabase 客戶端配置
// 使用環境變數來保護敏感資訊

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// 建立 Supabase 客戶端（用於客戶端與伺服器端）
// 注意：若環境變數未設定，會使用 placeholder 值，實際呼叫會 fallback 到 localStorage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // 留言板不需要持久化 session
  },
})

// 檢查是否使用了 placeholder（僅在 runtime 警告）
if (typeof window !== 'undefined' && supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('⚠️ Supabase environment variables not set. Using localStorage fallback.')
}

// 伺服器端專用客戶端（使用 Service Role Key，擁有完整權限）
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    // Service Role Key 為選用，若未設定則使用 Anon Key
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using ANON_KEY')
    return supabase
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
