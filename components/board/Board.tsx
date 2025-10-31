"use client"

import { useState, useEffect } from "react"
import { listPosts } from "@/lib/board/api"
import PostComposer from "./PostComposer"
import PostList from "./PostList"
import Filters from "./Filters"
import type { Post, Topic, SortMode } from "@/lib/board/types"

export default function Board() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState<Topic | "all">("all")
  const [sort, setSort] = useState<SortMode>("new")

  useEffect(() => {
    loadPosts()
  }, [topic, sort])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const params = {
        topic: topic === "all" ? undefined : topic,
        sort,
        limit: 50
      }
      const data = await listPosts(params)
      setPosts(data)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Composer */}
      <div className="mb-6">
        <PostComposer onPostCreated={loadPosts} />
      </div>

      {/* Filters */}
      <Filters
        topic={topic}
        sort={sort}
        onTopicChange={setTopic}
        onSortChange={setSort}
      />

      {/* Posts */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin text-6xl">✨</div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">載入中...</p>
        </div>
      ) : (
        <PostList posts={posts} onUpdate={loadPosts} />
      )}
    </div>
  )
}
