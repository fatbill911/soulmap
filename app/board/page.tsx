import Board from "@/components/board/Board"

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 dark:text-purple-100 mb-4">
            💭 靈魂留言板
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            Soul Board · 分享你的心情與靈魂訊息
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            溫柔療癒 × 搞笑趣味 · 匿名友善空間
          </p>
        </div>

        {/* Board Component */}
        <Board />

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>✨ 這是一個溫柔的空間，請友善對待每顆靈魂</p>
          <p className="mt-1">🚩 發現不當內容可使用檢舉功能</p>
        </div>
      </div>
    </div>
  )
}
