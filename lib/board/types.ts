export type Topic = "love" | "work" | "random" | "tarot"
export type SortMode = "new" | "hot" | "mine"
export type ReactionKind = "like" | "sparkle"
export type ReportReason = "spam" | "abuse" | "privacy" | "other"

export interface Post {
  id: string
  author_id?: string
  anon_id: string
  nickname?: string
  topic: Topic
  message: string
  reactions: number
  hot_score: number
  created_at: string
  updated_at: string
}

export interface Reply {
  id: string
  post_id: string
  author_id?: string
  anon_id: string
  nickname?: string
  message: string
  created_at: string
}

export interface Reaction {
  id: string
  post_id: string
  user_key: string
  kind: ReactionKind
  created_at: string
}

export interface Report {
  id: string
  post_id: string
  reporter_key: string
  reason: ReportReason
  created_at: string
}

export interface CreatePostInput {
  topic: Topic
  message: string
  nickname?: string
  anon_id: string
  author_id?: string
}

export interface CreateReplyInput {
  post_id: string
  message: string
  nickname?: string
  anon_id: string
  author_id?: string
}

export interface ListPostsParams {
  topic?: Topic
  sort?: SortMode
  limit?: number
  cursor?: string
}

export interface ReactInput {
  post_id: string
  kind: ReactionKind
  user_key: string
}

export interface ReportInput {
  post_id: string
  reason: ReportReason
  reporter_key: string
}
