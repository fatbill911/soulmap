"use client"

import { useState } from "react"
import { formatTimeAgo, getAnonId } from "@/lib/board/utils"
import { submitReport } from "@/lib/board/api"
import AuthBadge from "./AuthBadge"
import ReactionBar from "./ReactionBar"
import ReplyList from "./ReplyList"
import ReplyComposer from "./ReplyComposer"
import type { Post, ReportReason } from "@/lib/board/types"

type PostItemProps = {
  post: Post
  onUpdate: () => void
}

const topicLabels: Record<string, { emoji: string; label: string }> = {
  love: { emoji: "💕", label: "愛情" },
  work: { emoji: "💼", label: "工作" },
  random: { emoji: "🎲", label: "隨機" },
  tarot: { emoji: "🔮", label: "塔羅" }
}

export default function PostItem({ post, onUpdate }: PostItemProps) {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyComposer, setShowReplyComposer] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [replyRefresh, setReplyRefresh] = useState(0)

  const topicInfo = topicLabels[post.topic] || { emoji: "📝", label: post.topic }

  const handleReplyCreated = () => {
    setReplyRefresh(prev => prev + 1)
    setShowReplyComposer(false)
    if (!showReplies) setShowReplies(true)
  }

  const handleReport = async (reason: ReportReason) => {
    try {
      const reporterKey = getAnonId()
      await submitReport({ post_id: post.id, reason, reporter_key: reporterKey })
      alert("檢舉已提交，感謝你的回報")
      setShowReportDialog(false)
    } catch (error) {
      alert("檢舉失敗，請稍後再試")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              {topicInfo.emoji} {topicInfo.label}
            </span>
          </div>
          <AuthBadge nickname={post.nickname} />
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimeAgo(post.created_at)}
          </span>
          <button
            onClick={() => setShowReportDialog(!showReportDialog)}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
            title="檢舉"
          >
            🚩
          </button>
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-4">
        {post.message}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <ReactionBar postId={post.id} reactions={post.reactions} onUpdate={onUpdate} />
        <button
          onClick={() => {
            setShowReplies(!showReplies)
            if (!showReplies) setShowReplyComposer(false)
          }}
          className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          💬 回覆
        </button>
        <button
          onClick={() => setShowReplyComposer(!showReplyComposer)}
          className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          ✍️ 寫回覆
        </button>
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">選擇檢舉原因：</p>
          <div className="flex flex-wrap gap-2">
            {(["spam", "abuse", "privacy", "other"] as ReportReason[]).map((reason) => (
              <button
                key={reason}
                onClick={() => handleReport(reason)}
                className="px-3 py-1 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-sm hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
              >
                {reason === "spam" && "廣告"}
                {reason === "abuse" && "辱罵"}
                {reason === "privacy" && "侵犯"}
                {reason === "other" && "其他"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reply Composer */}
      {showReplyComposer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <ReplyComposer postId={post.id} onReplyCreated={handleReplyCreated} />
        </div>
      )}

      {/* Reply List */}
      {showReplies && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <ReplyList postId={post.id} refreshTrigger={replyRefresh} />
        </div>
      )}
    </div>
  )
}
