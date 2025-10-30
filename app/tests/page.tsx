import QuizCard from "@/components/QuizCard";
import { getAllQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "心理測驗 | SoulMap 靈魂地圖",
  description: "探索你的內在世界，透過科學化的心理測驗了解自己的人格特質與依附型態。",
};

export default function TestsPage() {
  const quizzes = getAllQuizzes();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
          🧭 心理測驗
        </h1>
        <p className="text-lg text-cosmic-white/70 max-w-2xl mx-auto">
          透過科學化的測驗工具，探索你的內在世界。了解自己，是改變的第一步。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.slug} {...quiz} />
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-cosmic-white/50">目前沒有可用的測驗，敬請期待！</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-cosmic-white/50">
          💡 提示：測驗結果僅供參考，如需專業協助請諮詢心理師。
        </p>
      </div>
    </div>
  );
}
