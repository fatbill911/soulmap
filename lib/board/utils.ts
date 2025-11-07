/**
 * 匿名 ID 管理與工具函數
 */

const ANON_ID_KEY = "soulmap_anon_id"
const LAST_POST_KEY = "soulmap_last_post"
const LAST_REPLY_KEY = "soulmap_last_reply"
const RATE_LIMIT_MS = 15000 // 15 seconds

/**
 * 獲取或生成匿名 ID
 */
export function getAnonId(): string {
  if (typeof window === "undefined") return ""

  let anonId = localStorage.getItem(ANON_ID_KEY)
  if (!anonId) {
    anonId = crypto.randomUUID()
    localStorage.setItem(ANON_ID_KEY, anonId)
  }
  return anonId
}

/**
 * 檢查是否在節流期間內
 */
export function checkRateLimit(type: "post" | "reply"): boolean {
  if (typeof window === "undefined") return false

  const key = type === "post" ? LAST_POST_KEY : LAST_REPLY_KEY
  const lastTime = localStorage.getItem(key)

  if (!lastTime) return false

  const elapsed = Date.now() - parseInt(lastTime, 10)
  return elapsed < RATE_LIMIT_MS
}

/**
 * 記錄最後操作時間
 */
export function recordAction(type: "post" | "reply"): void {
  if (typeof window === "undefined") return

  const key = type === "post" ? LAST_POST_KEY : LAST_REPLY_KEY
  localStorage.setItem(key, Date.now().toString())
}

/**
 * 獲取剩餘等待時間（秒）
 */
export function getRemainingWaitTime(type: "post" | "reply"): number {
  if (typeof window === "undefined") return 0

  const key = type === "post" ? LAST_POST_KEY : LAST_REPLY_KEY
  const lastTime = localStorage.getItem(key)

  if (!lastTime) return 0

  const elapsed = Date.now() - parseInt(lastTime, 10)
  const remaining = RATE_LIMIT_MS - elapsed
  return Math.max(0, Math.ceil(remaining / 1000))
}

/**
 * 髒話遮蔽
 */
const badWords = [
  "幹", "靠", "媽的", "fuck", "shit", "damn",
  "白痴", "智障", "垃圾", "廢物"
]

export function censorBadWords(text: string): string {
  let censored = text
  badWords.forEach(word => {
    const regex = new RegExp(word, "gi")
    censored = censored.replace(regex, "★".repeat(word.length))
  })
  return censored
}

/**
 * 生成隨機匿名暱稱
 */
const soulEmojis = ["🌟", "✨", "💫", "🌙", "☀️", "🌈", "💖", "🦋", "🌸", "🍀"]

export function getRandomSoulEmoji(): string {
  return soulEmojis[Math.floor(Math.random() * soulEmojis.length)]
}

export function getAnonymousDisplayName(): string {
  return `某顆靈魂 ${getRandomSoulEmoji()}`
}

/**
 * 格式化時間
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "剛剛"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分鐘前`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小時前`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} 天前`
  return date.toLocaleDateString("zh-TW")
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
