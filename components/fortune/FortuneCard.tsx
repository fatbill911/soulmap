"use client"

type FortuneCardProps = {
  card: {
    name: string
    position: "upright" | "reversed"
    soft: string
    fun: string
    meaning: string
  }
  blurb: string
}

export default function FortuneCard({ card, blurb }: FortuneCardProps) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800">
        {/* 卡片名稱與位置 */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">
            {card.name}
          </h3>
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200">
            {card.position === "upright" ? "正位 Upright" : "逆位 Reversed"}
          </span>
        </div>

        {/* 意義 */}
        <div className="text-center mb-6 text-purple-600 dark:text-purple-300 font-medium">
          {card.meaning}
        </div>

        {/* 溫柔版 */}
        <div className="mb-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
          <div className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
            💜 溫柔療癒
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {card.soft}
          </p>
        </div>

        {/* 搞笑版 */}
        <div className="mb-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
          <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
            😄 搞笑趣味
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {card.fun}
          </p>
        </div>

        {/* 星座一句話 */}
        <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl">
          <div className="text-sm font-semibold text-pink-700 dark:text-pink-300 mb-1">
            ✨ 星座訊息
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {blurb}
          </p>
        </div>
      </div>
    </div>
  )
}
