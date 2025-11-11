import Link from "next/link";

interface QuizSummaryCardProps {
  slug: string;
  title: string;
  icon: string;
  color: string;
  resultLabel?: string;
  summary?: string;
}

export default function QuizSummaryCard({
  slug,
  title,
  icon,
  color,
  resultLabel,
  summary,
}: QuizSummaryCardProps) {
  const isCompleted = !!resultLabel;

  return (
    <div
      className="bg-cosmic-gray/50 backdrop-blur-sm border rounded-xl p-6 transition-all hover:shadow-lg relative"
      style={{
        borderColor: isCompleted ? `${color}40` : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* 測驗標題與圖示 */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-lg font-semibold text-cosmic-white">{title}</h3>
      </div>

      {isCompleted ? (
        <>
          {/* 結果標籤 */}
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
            style={{
              backgroundColor: `${color}33`,
              color: color,
            }}
          >
            {resultLabel}
          </div>

          {/* 摘要文字 */}
          <p className="text-cosmic-white/70 text-sm mb-4 line-clamp-3">
            {summary}
          </p>

          {/* 查看完整結果連結 */}
          <Link
            href={`/result/${slug}`}
            className="text-sm text-cosmic-purple hover:text-cosmic-pink transition-colors inline-flex items-center gap-1"
          >
            查看完整結果 →
          </Link>
        </>
      ) : (
        <>
          {/* 尚未完成狀態 */}
          <div className="text-cosmic-white/40 text-sm mb-3">尚未完成</div>
          <p className="text-cosmic-white/50 text-sm mb-4">
            完成這個測驗，讓你的靈魂地圖更完整。
          </p>
          <Link
            href={`/quiz/${slug}`}
            className="text-sm text-cosmic-purple/60 hover:text-cosmic-purple transition-colors inline-flex items-center gap-1"
          >
            開始測驗 →
          </Link>
        </>
      )}
    </div>
  );
}
