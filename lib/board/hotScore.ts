/**
 * 熱度計分算法
 * score = reactions / ((hoursSince + 2) ^ 0.8)
 */

export function calculateHotScore(reactions: number, createdAt: string): number {
  const now = new Date()
  const created = new Date(createdAt)
  const hoursSince = (now.getTime() - created.getTime()) / (1000 * 60 * 60)

  const score = reactions / Math.pow(hoursSince + 2, 0.8)
  return parseFloat(score.toFixed(4))
}

export function updateHotScore(post: { reactions: number; created_at: string }): number {
  return calculateHotScore(post.reactions, post.created_at)
}
