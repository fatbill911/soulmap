"use client"

import type { ZodiacSign } from "@/lib/fortune/data/zodiac"

type ZodiacSelectProps = {
  value?: ZodiacSign
  onChange: (sign?: ZodiacSign) => void
}

const zodiacOptions: { value: ZodiacSign; label: string }[] = [
  { value: "aries", label: "♈ 白羊座" },
  { value: "taurus", label: "♉ 金牛座" },
  { value: "gemini", label: "♊ 雙子座" },
  { value: "cancer", label: "♋ 巨蟹座" },
  { value: "leo", label: "♌ 獅子座" },
  { value: "virgo", label: "♍ 處女座" },
  { value: "libra", label: "♎ 天秤座" },
  { value: "scorpio", label: "♏ 天蠍座" },
  { value: "sagittarius", label: "♐ 射手座" },
  { value: "capricorn", label: "♑ 摩羯座" },
  { value: "aquarius", label: "♒ 水瓶座" },
  { value: "pisces", label: "♓ 雙魚座" }
]

export default function ZodiacSelect({ value, onChange }: ZodiacSelectProps) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
        選擇你的星座（可選）
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange((e.target.value as ZodiacSign) || undefined)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">未選擇</option>
        {zodiacOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
