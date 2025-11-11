"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RadarChart from "@/components/RadarChart";
import QuizSummaryCard from "@/components/QuizSummaryCard";
import { getQuizBySlug } from "@/lib/quizzes";

// 定義測驗維度
const QUIZ_DIMENSIONS = [
  { slug: "attachment", label: "Attachment", icon: "🌊", color: "#4AA3D4" },
  { slug: "emotion-style", label: "Expression", icon: "🔥", color: "#F47C3C" },
  { slug: "intimacy", label: "Intimacy", icon: "🌿", color: "#5CB85C" },
  { slug: "boundary", label: "Boundary", icon: "🪨", color: "#888888" },
  { slug: "core-belief", label: "Belief", icon: "🌙", color: "#9B59B6" },
];

interface QuizResultData {
  slug: string;
  type: string;
  label: string;
  summary: string;
  score: number;
}

export default function SoulProfilePage() {
  const [results, setResults] = useState<QuizResultData[]>([]);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 從 localStorage 讀取各測驗結果
    const loadedResults: QuizResultData[] = [];

    QUIZ_DIMENSIONS.forEach(({ slug }) => {
      const savedResult = localStorage.getItem(`quiz-result-${slug}`);
      if (savedResult) {
        try {
          const data = JSON.parse(savedResult);
          loadedResults.push({
            slug,
            type: data.type,
            label: data.label,
            summary: data.summary,
            score: mapResultToScore(data.type, slug),
          });
        } catch (e) {
          console.error(`Failed to parse result for ${slug}:`, e);
        }
      }
    });

    setResults(loadedResults);

    // 讀取 MBTI 結果
    const savedMbti = localStorage.getItem("mbti-result");
    if (savedMbti) {
      try {
        const mbtiData = JSON.parse(savedMbti);
        setMbtiType(mbtiData.type || null);
      } catch (e) {
        console.error("Failed to parse MBTI result:", e);
      }
    }

    setLoading(false);
  }, []);

  // 將結果類型映射到 0-100 分數
  const mapResultToScore = (type: string, slug: string): number => {
    // Attachment
    if (slug === "attachment") {
      if (type === "secure") return 85;
      if (type === "anxious") return 50;
      if (type === "avoidant") return 45;
      if (type === "fearful") return 40;
    }

    // Emotion Style
    if (slug === "emotion-style") {
      if (type === "expressive") return 75;
      if (type === "empathic") return 80;
      if (type === "controlled") return 60;
      if (type === "suppressed") return 45;
      if (type === "growing") return 65;
    }

    // Intimacy
    if (slug === "intimacy") {
      if (type === "balanced") return 85;
      if (type === "closeness-seeking") return 70;
      if (type === "independent") return 70;
      if (type === "withdrawn") return 40;
      if (type === "exploring") return 65;
    }

    // Boundary
    if (slug === "boundary") {
      if (type === "healthy") return 85;
      if (type === "soft") return 55;
      if (type === "blurry") return 40;
      if (type === "rigid") return 50;
      if (type === "growing") return 65;
    }

    // Core Belief
    if (slug === "core-belief") {
      if (type === "secure-belief") return 85;
      if (type === "self-doubt") return 45;
      if (type === "guarded") return 40;
      if (type === "world-anxious") return 40;
      if (type === "authenticity-struggle") return 45;
      if (type === "growing-belief") return 65;
    }

    return 50; // 預設中等分數
  };

  // 生成整合解讀文字
  const generateInterpretation = (): string => {
    if (results.length === 0) {
      return "你還沒有完成任何情感探索測驗。每完成一個測驗，你的靈魂地圖就會更完整一些。不急，慢慢來，從你最好奇的那一章開始吧。";
    }

    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const attachmentResult = results.find((r) => r.slug === "attachment");
    const intimacyResult = results.find((r) => r.slug === "intimacy");
    const boundaryResult = results.find((r) => r.slug === "boundary");
    const beliefResult = results.find((r) => r.slug === "core-belief");

    let interpretation = "";

    // 根據完成度與分數給予解讀
    if (results.length < 3) {
      interpretation += "你已經開始探索自己的內在世界，這需要很大的勇氣。";
    } else {
      interpretation += "你已經完成了大部分的情感探索旅程，對自己有了更深的認識。";
    }

    // Attachment + Intimacy 高分
    if (
      attachmentResult &&
      intimacyResult &&
      attachmentResult.score >= 70 &&
      intimacyResult.score >= 70
    ) {
      interpretation +=
        "你重視關係中的連結與親密，有能力建立深度的情感關係。";
    }

    // Boundary 低分
    if (boundaryResult && boundaryResult.score < 55) {
      interpretation +=
        "你正在學習如何照顧自己、設立界線，不讓過度的付出消耗自己。";
    } else if (boundaryResult && boundaryResult.score >= 75) {
      interpretation += "你懂得在關係中保護自己，同時也尊重他人的空間。";
    }

    // Belief 低分
    if (beliefResult && beliefResult.score < 55) {
      interpretation +=
        "你對自己或世界可能還有一些不安，但你已經開始覺察這些信念，這是改變的第一步。";
    } else if (beliefResult && beliefResult.score >= 75) {
      interpretation +=
        "你對自己有穩定的價值感，這份內在安全感是你在關係中的力量。";
    }

    // 整體評估
    if (avgScore >= 75) {
      interpretation +=
        "整體而言，你的情感風格相對健康成熟，繼續保持覺察與成長。";
    } else if (avgScore >= 60) {
      interpretation +=
        "你正處於成長的過程中，有些地方已經很穩定，有些地方還在學習，這都是正常的。";
    } else {
      interpretation +=
        "你可能在關係中經歷過一些挑戰，但你願意面對與探索，這本身就是療癒的開始。";
    }

    return interpretation;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-cosmic-white/70">載入你的靈魂地圖中...</p>
      </div>
    );
  }

  const completedCount = results.length;
  const radarData = QUIZ_DIMENSIONS.map((dim) => {
    const result = results.find((r) => r.slug === dim.slug);
    return {
      dimension: dim.label,
      value: result ? result.score : 0,
      color: dim.color,
    };
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* 1. 頂部標題區 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
            🗺️ Soul Profile
          </h1>
          <p className="text-lg text-cosmic-white/70 mb-2">
            從性格到情感，這裡是你目前的內在地圖快照。
          </p>
          {mbtiType ? (
            <p className="text-cosmic-purple font-semibold">
              {mbtiType} · 情感探索者
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 text-cosmic-white/50 text-sm">
              <span>尚未完成性格序章</span>
              <Link
                href="/quiz/mbti-mini"
                className="text-cosmic-purple hover:text-cosmic-pink transition-colors underline"
              >
                前往測驗
              </Link>
            </div>
          )}
          <div className="mt-3 text-sm text-cosmic-white/60">
            已完成 {completedCount} / 5 個情感章節
          </div>
        </div>

        {/* 2. 雷達圖區 */}
        <div className="mb-16">
          <div className="bg-cosmic-gray/30 backdrop-blur-sm border border-cosmic-purple/20 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-cosmic-white text-center mb-6">
              情感五維圖
            </h2>
            <RadarChart data={radarData} />
            {completedCount < 5 && (
              <p className="text-center text-cosmic-white/50 text-sm mt-6">
                當你完成更多章節，你的情感地圖會變得更完整。
              </p>
            )}
          </div>
        </div>

        {/* 3. 各測驗摘要卡片區 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-cosmic-white mb-6">
            你的情感風格
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_DIMENSIONS.map((dim) => {
              const result = results.find((r) => r.slug === dim.slug);
              const quiz = getQuizBySlug(dim.slug);
              return (
                <QuizSummaryCard
                  key={dim.slug}
                  slug={dim.slug}
                  title={quiz?.title || dim.label}
                  icon={dim.icon}
                  color={dim.color}
                  resultLabel={result?.label}
                  summary={result?.summary}
                />
              );
            })}
          </div>
        </div>

        {/* 4. 整合解讀文字區 + 分享 */}
        <div className="bg-gradient-to-br from-cosmic-purple/10 to-cosmic-pink/10 border border-cosmic-purple/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-cosmic-white mb-4">
            你的靈魂地圖解讀
          </h2>
          <p className="text-cosmic-white/80 leading-relaxed mb-6">
            {generateInterpretation()}
          </p>
          <p className="text-cosmic-white/70 leading-relaxed mb-8 text-sm italic">
            你的情感風格正在成形，每一個維度都不是對錯，只是你此刻的樣子。
            如果你願意，隨時可以回到這裡，看看自己的地圖如何改變。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                alert("分享功能開發中！未來可以分享你的情感地圖快照。")
              }
              className="bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
            >
              📤 分享你的情感地圖
            </button>
            <Link
              href="/tests"
              className="bg-cosmic-gray/50 text-cosmic-white px-8 py-3 rounded-lg font-semibold hover:bg-cosmic-purple/30 transition-colors text-center"
            >
              ← 回到測驗列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
