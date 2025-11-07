"use client"

import { useState } from "react"
import type { FortuneTheme } from "@/lib/fortune/logic/pick"
import type { ZodiacSign } from "@/lib/fortune/data/zodiac"
import Tabs from "@/components/fortune/Tabs"
import ZodiacSelect from "@/components/fortune/ZodiacSelect"
import DrawButton from "@/components/fortune/DrawButton"
import FortuneCard from "@/components/fortune/FortuneCard"
import MiniBoard from "@/components/board/MiniBoard"

type FortuneResult = {
  card: {
    id: string
    name: string
    position: "upright" | "reversed"
    soft: string
    fun: string
    meaning: string
  }
  blurb: string
}

export default function FortunePage() {
  const [theme, setTheme] = useState<FortuneTheme>("random")
  const [zodiac, setZodiac] = useState<ZodiacSign | undefined>(undefined)
  const [result, setResult] = useState<FortuneResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDraw = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        t: theme,
        ...(zodiac && { sign: zodiac })
      })
      const res = await fetch(`/api/fortune?${params}`)
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("抽牌失敗:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 dark:text-purple-100 mb-4">
            ✨ Soul Fortune
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            靈魂塔羅 · 一點溫柔 一點幽默
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            讓 AI 幫你抽出今日靈魂訊息
          </p>
        </div>

        {/* 主題選擇 */}
        <Tabs selected={theme} onChange={setTheme} />

        {/* 星座選擇 */}
        <ZodiacSelect value={zodiac} onChange={setZodiac} />

        {/* 抽牌按鈕 */}
        <div className="mb-12">
          <DrawButton onClick={handleDraw} loading={loading} hasResult={!!result} />
        </div>

        {/* 結果顯示 */}
        {result && <FortuneCard card={result.card} blurb={result.blurb} />}

        {/* 說明 */}
        {!result && (
          <div className="text-center text-gray-600 dark:text-gray-400 mt-12">
            <p>選擇主題與星座，然後點擊按鈕抽一張牌</p>
            <p className="text-sm mt-2">每次抽牌都是獨一無二的訊息</p>
          </div>
        )}

        {/* 靈魂留言板 */}
        <MiniBoard />
      </div>
    </div>
  )
}
