"use client"

import type { FortuneTheme } from "@/lib/fortune/logic/pick"

type TabsProps = {
  selected: FortuneTheme
  onChange: (theme: FortuneTheme) => void
}

const themes: { value: FortuneTheme; label: string; emoji: string }[] = [
  { value: "random", label: "隨機", emoji: "🎲" },
  { value: "love", label: "愛情", emoji: "💕" },
  { value: "work", label: "工作", emoji: "💼" }
]

export default function Tabs({ selected, onChange }: TabsProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {themes.map((theme) => (
        <button
          key={theme.value}
          onClick={() => onChange(theme.value)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selected === theme.value
              ? "bg-purple-500 text-white shadow-lg scale-105"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <span className="mr-2">{theme.emoji}</span>
          {theme.label}
        </button>
      ))}
    </div>
  )
}
