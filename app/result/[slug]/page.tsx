"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizBySlug, QuizResult, getAllQuizzes } from "@/lib/quizzes";
import ResultBlock from "@/components/ResultBlock";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

// 情感探索五部曲的順序
const JOURNEY_ORDER = [
  "attachment",
  "emotion-style",
  "intimacy",
  "boundary",
  "core-belief",
];

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;

  const [result, setResult] = useState<QuizResult | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [nextQuiz, setNextQuiz] = useState<{
    slug: string;
    title: string;
    icon: string;
    color: string;
    introText: string;
  } | null>(null);

  useEffect(() => {
    const quiz = getQuizBySlug(slug);
    if (!quiz) return;

    const scoresParam = searchParams.get("scores");
    const signParam = searchParams.get("sign");

    if (!scoresParam) return;

    try {
      const scores = JSON.parse(decodeURIComponent(scoresParam));
      const extra = signParam ? { sign: signParam } : undefined;
      const quizResult = quiz.scoreToResult(scores, extra);
      setResult(quizResult);

      // 保存結果到 localStorage（供 Soul Profile 頁面使用）
      localStorage.setItem(
        `quiz-result-${slug}`,
        JSON.stringify({
          type: quizResult.type,
          label: quizResult.label,
          summary: quizResult.summary,
          timestamp: Date.now(),
        })
      );

      // 計算已完成的測驗數量
      let completed = 0;
      JOURNEY_ORDER.forEach((quizSlug) => {
        if (localStorage.getItem(`quiz-result-${quizSlug}`)) {
          completed++;
        }
      });
      setCompletedCount(completed);

      // 找出下一個測驗
      const currentIndex = JOURNEY_ORDER.indexOf(slug);
      if (currentIndex >= 0 && currentIndex < JOURNEY_ORDER.length - 1) {
        const nextSlug = JOURNEY_ORDER[currentIndex + 1];
        const nextQuizData = getQuizBySlug(nextSlug);
        if (nextQuizData) {
          setNextQuiz({
            slug: nextSlug,
            title: nextQuizData.title,
            icon: nextQuizData.icon || "📝",
            color: nextQuizData.themeColor || "#8B5CF6",
            introText: nextQuizData.introText || "繼續探索你的內在世界。",
          });
        }
      }
    } catch (error) {
      console.error("Failed to parse scores:", error);
    }
  }, [slug, searchParams]);

  const handleShare = () => {
    console.log("分享結果功能（待實作）");
    alert("分享功能開發中！未來可以分享到社群媒體或複製連結。");
  };

  const handleUnlock = () => {
    console.log("解鎖完整解析（待實作）");
    alert("付費解鎖功能開發中！未來可以獲得更深入的分析與建議。");
  };

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-cosmic-white/70">載入結果中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cosmic-white mb-3">
            你的測驗結果
          </h1>
          <p className="text-cosmic-white/70">
            以下是根據你的回答分析出的結果
          </p>
        </div>

        {/* Result Content */}
        <ResultBlock {...result} />

        {/* Ad Slot */}
        <AdSlot />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleUnlock}
            className="bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
          >
            🔓 解鎖完整解析
          </button>
          <button
            onClick={handleShare}
            className="bg-cosmic-gray text-cosmic-white px-8 py-3 rounded-lg font-semibold hover:bg-cosmic-purple transition-colors"
          >
            📤 分享結果
          </button>
        </div>

        {/* Journey Navigation */}
        <div className="mt-12 bg-gradient-to-br from-cosmic-purple/10 to-cosmic-pink/10 border border-cosmic-purple/30 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-cosmic-white mb-2">
              🧭 情感探索旅程
            </h2>
            <p className="text-cosmic-white/70">
              {completedCount === 5 ? (
                <span className="text-cosmic-purple font-semibold">
                  恭喜你已完成全部五章 🌟
                </span>
              ) : (
                <span>你已完成 {completedCount} / 5 章</span>
              )}
            </p>
          </div>

          {nextQuiz ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-cosmic-gray/30 rounded-2xl p-6 mb-6 border border-transparent hover:border-cosmic-purple/50 transition-all"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
                  className="text-3xl"
                >
                  {nextQuiz.icon}
                </motion.span>
                <div>
                  <p className="text-sm text-cosmic-white/60">下一章</p>
                  <h3 className="text-lg font-semibold text-cosmic-white">
                    {nextQuiz.title}
                  </h3>
                </div>
              </div>
              <p
                className="text-cosmic-white/80 text-sm italic mb-4"
                style={{ color: nextQuiz.color }}
              >
                {nextQuiz.introText}
              </p>
              <Link href={`/quiz/${nextQuiz.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.05, brightness: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-center text-white px-8 py-3 rounded-xl font-semibold transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${nextQuiz.color}, ${nextQuiz.color}dd)`,
                    boxShadow: `0 4px 20px ${nextQuiz.color}40`,
                  }}
                >
                  ▶️ 開始下一章
                </motion.div>
              </Link>
            </motion.div>
          ) : (
            completedCount === 5 && (
              <div className="text-center mb-6">
                <p className="text-cosmic-white/80 mb-4">
                  你已經走完了這趟旅程，現在可以看看完整的靈魂地圖了。
                </p>
                <Link
                  href="/map"
                  className="inline-block bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
                >
                  🗺️ 前往靈魂地圖
                </Link>
              </div>
            )
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <Link
              href="/map"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              🗺️ 查看靈魂地圖
            </Link>
            <Link
              href="/tests"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              📋 返回測驗列表
            </Link>
          </div>
        </div>

        {/* More Resources */}
        <div className="mt-8 text-center">
          <Link
            href="/astro"
            className="text-cosmic-white/50 hover:text-cosmic-purple transition-colors text-sm"
          >
            查看星座運勢 →
          </Link>
        </div>
      </div>
    </div>
  );
}
