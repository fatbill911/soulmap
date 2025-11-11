"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizBySlug, QuizResult } from "@/lib/quizzes";
import ResultBlock from "@/components/ResultBlock";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;

  const [result, setResult] = useState<QuizResult | null>(null);

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

        {/* More Tests */}
        <div className="mt-12 text-center">
          <p className="text-cosmic-white/70 mb-4">想了解更多關於自己嗎？</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors font-semibold"
            >
              🗺️ 查看你的靈魂地圖
            </Link>
            <Link
              href="/tests"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              ← 返回測驗列表
            </Link>
            <Link
              href="/astro"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              查看星座運勢 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
