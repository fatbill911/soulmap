"use client"

import { useEffect, useState } from "react"
import { listReplies } from "@/lib/board/api"
import { formatTimeAgo } from "@/lib/board/utils"
import AuthBadge from "./AuthBadge"
import type { Reply } from "@/lib/board/types"

type ReplyListProps = {
  postId: string
  refreshTrigger?: number
}

export default function ReplyList({ postId, refreshTrigger = 0 }: ReplyListProps) {
  const [replies, setReplies] = useState<Reply[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReplies()
  }, [postId, refreshTrigger])

  const loadReplies = async () => {
    setLoading(true)
    try {
      const data = await listReplies(postId)
      setReplies(data)
    } catch (error) {
      console.error("Failed to load replies:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-500 dark:text-gray-400 py-2">載入回覆中...</div>
  }

  if (replies.length === 0) {
    return <div className="text-sm text-gray-500 dark:text-gray-400 py-2">還沒有回覆</div>
  }

  return (
    <div className="space-y-3 mt-3">
      {replies.map((reply) => (
        <div key={reply.id} className="pl-4 border-l-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-1">
            <AuthBadge nickname={reply.nickname} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(reply.created_at)}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {reply.message}
          </p>
        </div>
      ))}
    </div>
  )
}
