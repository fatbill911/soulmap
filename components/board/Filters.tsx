"use client"

import type { Topic, SortMode } from "@/lib/board/types"

type FiltersProps = {
  topic: Topic | "all"
  sort: SortMode
  onTopicChange: (topic: Topic | "all") => void
  onSortChange: (sort: SortMode) => void
}

const topics: { value: Topic | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "全部", emoji: "📋" },
  { value: "love", label: "愛情", emoji: "💕" },
  { value: "work", label: "工作", emoji: "💼" },
  { value: "random", label: "隨機", emoji: "🎲" },
  { value: "tarot", label: "塔羅", emoji: "🔮" }
]

const sorts: { value: SortMode; label: string }[] = [
  { value: "new", label: "最新" },
  { value: "hot", label: "熱門" },
  { value: "mine", label: "我的" }
]

export default function Filters({ topic, sort, onTopicChange, onSortChange }: FiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
      {/* Topic Filter */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          主題篩選
        </label>
        <div className="flex gap-2 flex-wrap">
          {topics.map((t) => (
            <button
              key={t.value}
              onClick={() => onTopicChange(t.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                topic === t.value
                  ? "bg-purple-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="mr-1">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          排序方式
        </label>
        <div className="flex gap-2">
          {sorts.map((s) => (
            <button
              key={s.value}
              onClick={() => onSortChange(s.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sort === s.value
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
