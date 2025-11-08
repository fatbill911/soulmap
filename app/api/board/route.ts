import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { calculateHotScore } from '@/lib/board/hotScore'
import { censorBadWords } from '@/lib/board/utils'
import type { Topic, SortMode } from '@/lib/board/types'

// 主題白名單
const VALID_TOPICS: Topic[] = ['love', 'work', 'random', 'tarot']

// 速率限制 Map（簡易版，生產環境建議用 Redis）
const rateLimitMap = new Map<string, number[]>()

// 速率限制檢查：15 秒內最多 1 則
function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(identifier) || []

  // 清除超過 15 秒的記錄
  const recentTimestamps = timestamps.filter(t => now - t < 15000)

  if (recentTimestamps.length >= 1) {
    return false // 超過限制
  }

  recentTimestamps.push(now)
  rateLimitMap.set(identifier, recentTimestamps)
  return true
}

// GET - 取得貼文列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic') as Topic | 'all' | null
    const sort = (searchParams.get('sort') as SortMode) || 'new'
    const limit = parseInt(searchParams.get('limit') || '20', 10)

    // 建立查詢
    let query = supabase
      .from('posts')
      .select('*')

    // 主題篩選
    if (topic && topic !== 'all') {
      if (!VALID_TOPICS.includes(topic as Topic)) {
        return NextResponse.json(
          { error: 'Invalid topic' },
          { status: 400 }
        )
      }
      query = query.eq('topic', topic)
    }

    // 排序
    switch (sort) {
      case 'hot':
        query = query.order('hot_score', { ascending: false })
        break
      case 'new':
      default:
        query = query.order('created_at', { ascending: false })
    }

    // 限制數量
    query = query.limit(Math.min(limit, 100))

    const { data, error } = await query

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      )
    }

    // 轉換 id 為字串（前端期望 string）
    const posts = (data || []).map(post => ({
      ...post,
      id: post.id.toString(),
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('GET /api/board error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - 新增貼文
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { anon_id, nickname, topic, message } = body

    // 1. 輸入驗證
    if (!anon_id || typeof anon_id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid anon_id' },
        { status: 400 }
      )
    }

    if (!topic || !VALID_TOPICS.includes(topic)) {
      return NextResponse.json(
        { error: 'Invalid topic' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long (max 500 characters)' },
        { status: 400 }
      )
    }

    if (nickname && nickname.length > 20) {
      return NextResponse.json(
        { error: 'Nickname too long (max 20 characters)' },
        { status: 400 }
      )
    }

    // 2. 速率限制檢查
    const identifier = anon_id
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: '發文太頻繁，請等待 15 秒後再試' },
        { status: 429 }
      )
    }

    // 3. 內容審查
    const censoredMessage = censorBadWords(message.trim())

    // 4. 寫入資料庫
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          anon_id,
          nickname: nickname?.trim() || null,
          topic,
          message: censoredMessage,
          reactions: 0,
          hot_score: 0,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }

    // 5. 計算並更新 hot_score
    const hotScore = calculateHotScore(0, data.created_at)
    await supabase
      .from('posts')
      .update({ hot_score: hotScore })
      .eq('id', data.id)

    const newPost = {
      ...data,
      id: data.id.toString(),
      hot_score: hotScore,
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('POST /api/board error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
