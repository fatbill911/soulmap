"use client"

import { useState, useEffect } from "react"
import { listPosts } from "@/lib/board/api"
import { formatTimeAgo } from "@/lib/board/utils"
import PostComposer from "./PostComposer"
import AuthBadge from "./AuthBadge"
import type { Post } from "@/lib/board/types"
import Link from "next/link"

export default function MiniBoard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const data = await listPosts({ topic: "tarot", sort: "new", limit: 5 })
      setPosts(data)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mt-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">
          💭 靈魂留言板
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          分享你的抽牌心得與靈魂訊息
        </p>
      </div>

      {/* Composer */}
      <div className="mb-6">
        <PostComposer defaultTopic="tarot" onPostCreated={loadPosts} compact />
      </div>

      {/* Recent Posts */}
      <div className="space-y-4 mb-6">
        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            載入中...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            還沒有留言，成為第一個分享的靈魂吧
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <AuthBadge nickname={post.nickname} />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(post.created_at)}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.message}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                💖 {post.reactions}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Link */}
      <div className="text-center">
        <Link
          href="/board"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          查看完整留言板 →
        </Link>
      </div>
    </div>
  )
}
