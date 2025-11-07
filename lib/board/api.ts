/**
 * Board API - LocalStorage Implementation
 * 可輕鬆升級為 Supabase 版本
 */

import type {
  Post,
  Reply,
  Reaction,
  Report,
  CreatePostInput,
  CreateReplyInput,
  ListPostsParams,
  ReactInput,
  ReportInput,
  SortMode
} from "./types"
import { generateId, censorBadWords, getAnonId } from "./utils"
import { calculateHotScore } from "./hotScore"

const POSTS_KEY = "soulmap_posts"
const REPLIES_KEY = "soulmap_replies"
const REACTIONS_KEY = "soulmap_reactions"
const REPORTS_KEY = "soulmap_reports"

// Helper functions for localStorage
function getFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 創建貼文
 */
export async function createPost(input: CreatePostInput): Promise<Post> {
  const posts = getFromStorage<Post>(POSTS_KEY)

  const newPost: Post = {
    id: generateId(),
    author_id: input.author_id,
    anon_id: input.anon_id,
    nickname: input.nickname ? censorBadWords(input.nickname) : undefined,
    topic: input.topic,
    message: censorBadWords(input.message),
    reactions: 0,
    hot_score: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  posts.unshift(newPost)
  saveToStorage(POSTS_KEY, posts)

  return newPost
}

/**
 * 列出貼文
 */
export async function listPosts(params: ListPostsParams = {}): Promise<Post[]> {
  let posts = getFromStorage<Post>(POSTS_KEY)

  // Filter by topic
  if (params.topic) {
    posts = posts.filter(p => p.topic === params.topic)
  }

  // Filter by mine
  if (params.sort === "mine") {
    const anonId = getAnonId()
    posts = posts.filter(p => p.anon_id === anonId)
  }

  // Update hot scores
  posts = posts.map(post => ({
    ...post,
    hot_score: calculateHotScore(post.reactions, post.created_at)
  }))

  // Sort
  switch (params.sort) {
    case "hot":
      posts.sort((a, b) => b.hot_score - a.hot_score || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
    case "new":
    default:
      posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }

  // Limit
  const limit = params.limit || 10
  return posts.slice(0, limit)
}

/**
 * 獲取單個貼文
 */
export async function getPost(postId: string): Promise<Post | null> {
  const posts = getFromStorage<Post>(POSTS_KEY)
  return posts.find(p => p.id === postId) || null
}

/**
 * 創建回覆
 */
export async function createReply(input: CreateReplyInput): Promise<Reply> {
  const replies = getFromStorage<Reply>(REPLIES_KEY)

  const newReply: Reply = {
    id: generateId(),
    post_id: input.post_id,
    author_id: input.author_id,
    anon_id: input.anon_id,
    nickname: input.nickname ? censorBadWords(input.nickname) : undefined,
    message: censorBadWords(input.message),
    created_at: new Date().toISOString()
  }

  replies.push(newReply)
  saveToStorage(REPLIES_KEY, replies)

  return newReply
}

/**
 * 列出回覆
 */
export async function listReplies(postId: string): Promise<Reply[]> {
  const replies = getFromStorage<Reply>(REPLIES_KEY)
  return replies
    .filter(r => r.post_id === postId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
}

/**
 * 添加反應
 */
export async function addReaction(input: ReactInput): Promise<void> {
  const reactions = getFromStorage<Reaction>(REACTIONS_KEY)
  const posts = getFromStorage<Post>(POSTS_KEY)

  // Check if already reacted
  const existing = reactions.find(
    r => r.post_id === input.post_id && r.user_key === input.user_key && r.kind === input.kind
  )

  if (existing) {
    // Remove reaction (toggle off)
    const filtered = reactions.filter(r => r.id !== existing.id)
    saveToStorage(REACTIONS_KEY, filtered)

    // Decrease post reaction count
    const postIndex = posts.findIndex(p => p.id === input.post_id)
    if (postIndex !== -1) {
      posts[postIndex].reactions = Math.max(0, posts[postIndex].reactions - 1)
      posts[postIndex].updated_at = new Date().toISOString()
      saveToStorage(POSTS_KEY, posts)
    }
  } else {
    // Add reaction
    const newReaction: Reaction = {
      id: generateId(),
      post_id: input.post_id,
      user_key: input.user_key,
      kind: input.kind,
      created_at: new Date().toISOString()
    }

    reactions.push(newReaction)
    saveToStorage(REACTIONS_KEY, reactions)

    // Increase post reaction count
    const postIndex = posts.findIndex(p => p.id === input.post_id)
    if (postIndex !== -1) {
      posts[postIndex].reactions += 1
      posts[postIndex].updated_at = new Date().toISOString()
      saveToStorage(POSTS_KEY, posts)
    }
  }
}

/**
 * 檢查是否已反應
 */
export async function hasReacted(postId: string, userKey: string, kind: string): Promise<boolean> {
  const reactions = getFromStorage<Reaction>(REACTIONS_KEY)
  return reactions.some(r => r.post_id === postId && r.user_key === userKey && r.kind === kind)
}

/**
 * 提交檢舉
 */
export async function submitReport(input: ReportInput): Promise<void> {
  const reports = getFromStorage<Report>(REPORTS_KEY)

  const newReport: Report = {
    id: generateId(),
    post_id: input.post_id,
    reporter_key: input.reporter_key,
    reason: input.reason,
    created_at: new Date().toISOString()
  }

  reports.push(newReport)
  saveToStorage(REPORTS_KEY, reports)
}
