"use client"

import { useState } from "react"
import { createReply } from "@/lib/board/api"
import { getAnonId, checkRateLimit, recordAction, getRemainingWaitTime } from "@/lib/board/utils"

type ReplyComposerProps = {
  postId: string
  onReplyCreated: () => void
}

export default function ReplyComposer({ postId, onReplyCreated }: ReplyComposerProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!message.trim()) {
      setError("請輸入回覆內容")
      return
    }

    if (message.length > 400) {
      setError("回覆不能超過 400 字")
      return
    }

    if (checkRateLimit("reply")) {
      const remaining = getRemainingWaitTime("reply")
      setError(`請等待 ${remaining} 秒後再回覆`)
      return
    }

    setLoading(true)
    try {
      const anonId = getAnonId()
      await createReply({
        post_id: postId,
        message: message.trim(),
        anon_id: anonId
      })

      recordAction("reply")
      setMessage("")
      onReplyCreated()
    } catch (err) {
      setError("回覆失敗，請稍後再試")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="寫下你的回應..."
        maxLength={400}
        rows={3}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {message.length} / 400
        </span>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "發送中..." : "回覆"}
        </button>
      </div>
      {error && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-xs">
          {error}
        </div>
      )}
    </form>
  )
}
