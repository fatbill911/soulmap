"use client"

import { useState, useEffect } from "react"
import { addReaction, hasReacted } from "@/lib/board/api"
import { getAnonId } from "@/lib/board/utils"
import type { ReactionKind } from "@/lib/board/types"

type ReactionBarProps = {
  postId: string
  reactions: number
  onUpdate: () => void
}

export default function ReactionBar({ postId, reactions, onUpdate }: ReactionBarProps) {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkIfLiked()
  }, [postId])

  const checkIfLiked = async () => {
    const userKey = getAnonId()
    const hasLiked = await hasReacted(postId, userKey, "like")
    setLiked(hasLiked)
  }

  const handleReact = async (kind: ReactionKind) => {
    if (loading) return

    setLoading(true)
    try {
      const userKey = getAnonId()
      await addReaction({ post_id: postId, kind, user_key: userKey })
      setLiked(!liked)
      onUpdate()
    } catch (error) {
      console.error("Failed to react:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleReact("like")}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all ${
          liked
            ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
        }`}
      >
        <span className="text-lg">{liked ? "💖" : "🤍"}</span>
        <span className="text-sm font-medium">{reactions}</span>
      </button>
    </div>
  )
}
