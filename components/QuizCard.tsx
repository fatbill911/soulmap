import Link from "next/link";

interface QuizCardProps {
  slug: string;
  title: string;
  description: string;
  estTimeMins: number;
}

export default function QuizCard({
  slug,
  title,
  description,
  estTimeMins,
}: QuizCardProps) {
  return (
    <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6 hover:border-cosmic-purple transition-all hover:shadow-lg hover:shadow-cosmic-purple/20">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-cosmic-white">{title}</h3>
        <span className="text-xs bg-cosmic-purple/20 text-cosmic-purple px-2 py-1 rounded-full">
          {estTimeMins} 分鐘
        </span>
      </div>
      <p className="text-cosmic-white/70 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      <Link
        href={`/quiz/${slug}`}
        className="inline-block bg-cosmic-purple hover:bg-cosmic-pink text-white px-6 py-2 rounded-lg transition-colors font-medium"
      >
        開始測驗 →
      </Link>
    </div>
  );
}
