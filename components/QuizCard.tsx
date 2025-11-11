import Link from "next/link";

interface QuizCardProps {
  slug: string;
  title: string;
  description: string;
  estTimeMins: number;
  themeColor?: string;
  icon?: string;
  series?: string;
  order?: number;
}

export default function QuizCard({
  slug,
  title,
  description,
  estTimeMins,
  themeColor,
  icon,
}: QuizCardProps) {
  // 使用 themeColor 或預設色
  const borderColor = themeColor
    ? `border-[${themeColor}]/30 hover:border-[${themeColor}]`
    : "border-cosmic-purple/30 hover:border-cosmic-purple";
  const shadowColor = themeColor
    ? `hover:shadow-[${themeColor}]/20`
    : "hover:shadow-cosmic-purple/20";
  const badgeColor = themeColor
    ? `bg-[${themeColor}]/20 text-[${themeColor}]`
    : "bg-cosmic-purple/20 text-cosmic-purple";
  const buttonColor = themeColor ? "" : "bg-cosmic-purple hover:bg-cosmic-pink";

  return (
    <div
      className={`bg-cosmic-gray/50 backdrop-blur-sm border rounded-xl p-6 transition-all hover:shadow-lg ${borderColor} ${shadowColor}`}
      style={{
        borderColor: themeColor ? `${themeColor}40` : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="text-xl font-semibold text-cosmic-white">{title}</h3>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}
          style={{
            backgroundColor: themeColor ? `${themeColor}33` : undefined,
            color: themeColor || undefined,
          }}
        >
          {estTimeMins} 分鐘
        </span>
      </div>
      <p className="text-cosmic-white/70 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      <Link
        href={`/quiz/${slug}`}
        className={`inline-block text-white px-6 py-2 rounded-lg transition-colors font-medium ${buttonColor}`}
        style={{
          backgroundColor: themeColor || undefined,
        }}
      >
        開始測驗 →
      </Link>
    </div>
  );
}
