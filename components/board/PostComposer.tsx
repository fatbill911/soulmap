"use client"

import { useState } from "react"
import { createPost } from "@/lib/board/api"
import { getAnonId, checkRateLimit, recordAction, getRemainingWaitTime } from "@/lib/board/utils"
import type { Topic } from "@/lib/board/types"

type PostComposerProps = {
  defaultTopic?: Topic
  onPostCreated: () => void
  compact?: boolean
}

const topics: { value: Topic; label: string; emoji: string }[] = [
  { value: "love", label: "愛情", emoji: "💕" },
  { value: "work", label: "工作", emoji: "💼" },
  { value: "random", label: "隨機", emoji: "🎲" },
  { value: "tarot", label: "塔羅", emoji: "🔮" }
]

export default function PostComposer({ defaultTopic = "random", onPostCreated, compact = false }: PostComposerProps) {
  const [topic, setTopic] = useState<Topic>(defaultTopic)
  const [nickname, setNickname] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!message.trim()) {
      setError("請輸入留言內容")
      return
    }

    if (message.length > 500) {
      setError("留言不能超過 500 字")
      return
    }

    // Rate limit check
    if (checkRateLimit("post")) {
      const remaining = getRemainingWaitTime("post")
      setError(`請等待 ${remaining} 秒後再發文`)
      return
    }

    setLoading(true)
    try {
      const anonId = getAnonId()
      await createPost({
        topic,
        message: message.trim(),
        nickname: nickname.trim() || undefined,
        anon_id: anonId
      })

      recordAction("post")
      setMessage("")
      setNickname("")
      onPostCreated()
    } catch (err) {
      setError("發文失敗，請稍後再試")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-${compact ? '4' : '6'}`}>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          主題
        </label>
        <div className="flex gap-2 flex-wrap">
          {topics.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTopic(t.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                topic === t.value
                  ? "bg-purple-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="mr-1">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            暱稱（選填）
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="留空則顯示為「某顆靈魂」"
            maxLength={20}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          留言內容
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="分享你的心情或抽牌心得..."
          maxLength={500}
          rows={compact ? 3 : 4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
          {message.length} / 500
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "發送中..." : "✨ 發送留言"}
      </button>
    </form>
  )
}
