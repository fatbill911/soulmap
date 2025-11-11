"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RadarChart from "@/components/RadarChart";

// 情感探索五部曲
const QUIZ_DIMENSIONS = [
  { slug: "attachment", label: "Attachment", icon: "🌊", color: "#4AA3D4" },
  { slug: "emotion-style", label: "Expression", icon: "🔥", color: "#F47C3C" },
  { slug: "intimacy", label: "Intimacy", icon: "🌿", color: "#5CB85C" },
  { slug: "boundary", label: "Boundary", icon: "🪨", color: "#888888" },
  { slug: "core-belief", label: "Belief", icon: "🌙", color: "#9B59B6" },
];

// 結尾語（隨機選擇）
const CLOSING_MESSAGES = [
  "每一次理解自己，都是一種療癒。",
  "你不必完美，只要願意靠近自己。",
  "你的地圖會改變，而那正是生命的美。",
  "學會愛人，也學會愛自己。",
  "溫柔地，繼續前進。",
];

interface QuizResultData {
  slug: string;
  type: string;
  label: string;
  summary: string;
}

export default function ShareCardPage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<QuizResultData[]>([]);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [closingMessage, setClosingMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 讀取所有測驗結果
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
          });
        } catch (e) {
          console.error(`Failed to parse result for ${slug}:`, e);
        }
      }
    });

    setResults(loadedResults);
    setIsComplete(loadedResults.length === 5);

    // 讀取 MBTI
    const savedMbti = localStorage.getItem("mbti-result");
    if (savedMbti) {
      try {
        const mbtiData = JSON.parse(savedMbti);
        setMbtiType(mbtiData.type || null);
      } catch (e) {
        console.error("Failed to parse MBTI result:", e);
      }
    }

    // 隨機選擇結尾語
    const randomMessage =
      CLOSING_MESSAGES[Math.floor(Math.random() * CLOSING_MESSAGES.length)];
    setClosingMessage(randomMessage);

    setLoading(false);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // 動態導入 html2canvas
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0f0f23",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `soulmap-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
      alert("圖片生成失敗，請稍後再試。");
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/map/share?user=${Date.now()}`;
    navigator.clipboard.writeText(url);
    alert("連結已複製到剪貼簿！");
  };

  // 將結果映射到雷達圖數據
  const mapResultToScore = (type: string, slug: string): number => {
    if (slug === "attachment") {
      if (type === "secure") return 85;
      if (type === "anxious") return 50;
      if (type === "avoidant") return 45;
      if (type === "fearful") return 40;
    }
    if (slug === "emotion-style") {
      if (type === "expressive") return 75;
      if (type === "empathic") return 80;
      if (type === "controlled") return 60;
      if (type === "suppressed") return 45;
      if (type === "growing") return 65;
    }
    if (slug === "intimacy") {
      if (type === "balanced") return 85;
      if (type === "closeness-seeking") return 70;
      if (type === "independent") return 70;
      if (type === "withdrawn") return 40;
      if (type === "exploring") return 65;
    }
    if (slug === "boundary") {
      if (type === "healthy") return 85;
      if (type === "soft") return 55;
      if (type === "blurry") return 40;
      if (type === "rigid") return 50;
      if (type === "growing") return 65;
    }
    if (slug === "core-belief") {
      if (type === "secure-belief") return 85;
      if (type === "self-doubt") return 45;
      if (type === "guarded") return 40;
      if (type === "world-anxious") return 40;
      if (type === "authenticity-struggle") return 45;
      if (type === "growing-belief") return 65;
    }
    return 50;
  };

  const radarData = QUIZ_DIMENSIONS.map((dim) => {
    const result = results.find((r) => r.slug === dim.slug);
    return {
      dimension: dim.label,
      value: result ? mapResultToScore(result.type, result.slug) : 0,
      color: dim.color,
    };
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-cosmic-white/70">載入中...</p>
      </div>
    );
  }

  if (!isComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">🌙</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-cosmic-white mb-4">
            你還沒走完這趟旅程
          </h1>
          <p className="text-cosmic-white/70 mb-8">
            完成全部五章的情感探索，才能生成你的靈魂地圖分享卡。
          </p>
          <p className="text-cosmic-white/60 text-sm mb-8">
            你已完成 {results.length} / 5 章
          </p>
          <Link
            href="/tests"
            className="inline-block bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
          >
            回去完成剩下的章節
          </Link>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cosmic-white mb-3">
            ✨ 你的靈魂地圖
          </h1>
          <p className="text-cosmic-white/70">
            這是屬於你的情感輪廓，一張由五章故事繪成的地圖。
          </p>
        </div>

        {/* Share Card */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-cosmic-purple/20 via-cosmic-gray/50 to-cosmic-pink/20 border border-cosmic-purple/30 rounded-2xl p-8 mb-8"
          style={{ aspectRatio: "3/4" }}
        >
          {/* Card Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cosmic-white mb-2">
              SoulMap 靈魂地圖
            </h2>
            {mbtiType && (
              <p className="text-cosmic-purple font-semibold">{mbtiType}</p>
            )}
            <p className="text-cosmic-white/50 text-sm mt-2">
              {currentDate} 生成
            </p>
          </div>

          {/* Radar Chart */}
          <div className="mb-6">
            <RadarChart data={radarData} />
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {QUIZ_DIMENSIONS.map((dim) => {
              const result = results.find((r) => r.slug === dim.slug);
              return (
                <div
                  key={dim.slug}
                  className="bg-cosmic-gray/30 rounded-lg p-3 text-center"
                >
                  <span className="text-2xl mb-1 block">{dim.icon}</span>
                  <p className="text-xs text-cosmic-white/60 mb-1">
                    {dim.label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: dim.color }}
                  >
                    {result ? result.label.replace(/\s.*/, "") : "未完成"}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Closing Message */}
          <div className="text-center pt-4 border-t border-cosmic-white/10">
            <p className="text-cosmic-white/80 italic text-sm">
              {closingMessage}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
          >
            📸 下載圖片
          </button>
          <button
            onClick={handleCopyLink}
            className="bg-cosmic-gray/50 text-cosmic-white px-8 py-3 rounded-lg font-semibold hover:bg-cosmic-purple/30 transition-colors"
          >
            🔗 複製分享連結
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/map"
            className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
          >
            ↩️ 回到靈魂地圖
          </Link>
        </div>
      </div>
    </div>
  );
}
