"use client"

type DrawButtonProps = {
  onClick: () => void
  loading: boolean
  hasResult: boolean
}

export default function DrawButton({ onClick, loading, hasResult }: DrawButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full max-w-md mx-auto block px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "抽牌中..." : hasResult ? "再抽一張" : "✨ 抽一張牌"}
    </button>
  )
}
