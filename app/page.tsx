import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import { getAllQuizzes } from "@/lib/quizzes";
import { getAllSignsTodayPreview } from "@/lib/astrology";

export default function HomePage() {
  const quizzes = getAllQuizzes();
  const signsPreview = getAllSignsTodayPreview();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-16">
        <div className="relative">
          {/* Decorative stars */}
          <div className="absolute top-0 left-1/4 text-4xl animate-pulse">✨</div>
          <div className="absolute top-10 right-1/4 text-2xl animate-pulse delay-75">
            ⭐
          </div>
          <div className="absolute bottom-0 left-1/3 text-3xl animate-pulse delay-150">
            🌟
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-cosmic-white mb-6">
            星光懂你沒說的話。
          </h1>
          <p className="text-xl md:text-2xl text-cosmic-white/80 mb-8 max-w-3xl mx-auto">
            靈魂地圖，用心理學與星象為你描出命運的軌跡。
          </p>
          <Link
            href="/tests"
            className="inline-block bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all transform hover:scale-105"
          >
            打開我的靈魂座標 →
          </Link>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-cosmic-white">
            🧭 熱門心理測驗
          </h2>
          <Link
            href="/tests"
            className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} {...quiz} />
          ))}
        </div>
      </section>

      {/* Zodiac Preview */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cosmic-white mb-3">
            ⭐ 星語心願
          </h2>
          <p className="text-cosmic-white/70">12 星座今日運勢預覽</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {signsPreview.map((sign) => (
            <Link
              key={sign.sign}
              href={`/astro/${sign.sign}`}
              className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-4 hover:border-cosmic-purple transition-all hover:shadow-lg hover:shadow-cosmic-purple/20 text-center"
            >
              <div className="text-3xl mb-2">{sign.emoji}</div>
              <div className="text-cosmic-white font-semibold mb-2">
                {sign.name}
              </div>
              <p className="text-sm text-cosmic-white/70 line-clamp-2">
                {sign.preview}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/astro"
            className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
          >
            查看完整運勢 →
          </Link>
        </div>
      </section>

      {/* Soul Match CTA */}
      <section className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-cosmic-white mb-4">
          💫 靈魂配對分析
        </h2>
        <p className="text-cosmic-white/80 mb-6 max-w-2xl mx-auto">
          想知道你們的星座合拍度嗎？透過星座與心理學的雙重視角，探索你們的相處之道。
        </p>
        <Link
          href="/match"
          className="inline-block bg-cosmic-purple hover:bg-cosmic-pink text-white px-8 py-3 rounded-lg transition-colors font-semibold"
        >
          開始配對分析 →
        </Link>
      </section>
    </div>
  );
}
