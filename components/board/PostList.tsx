"use client"

import PostItem from "./PostItem"
import type { Post } from "@/lib/board/types"

type PostListProps = {
  posts: Post[]
  onUpdate: () => void
}

export default function PostList({ posts, onUpdate }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl">💭</span>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          還沒有留言，成為第一個分享的靈魂吧
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
