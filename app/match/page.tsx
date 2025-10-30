"use client";

import { useState } from "react";
import { analyzeMatch, zodiacOptions, statusOptions, MatchResult } from "@/lib/match";

export default function MatchPage() {
  const [aSign, setASign] = useState("");
  const [bSign, setBSign] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleAnalyze = () => {
    if (!aSign || !bSign || !status) {
      alert("請填寫所有欄位");
      return;
    }

    const matchResult = analyzeMatch({
      aSign,
      bSign,
      status: status as any,
    });

    setResult(matchResult);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
            💫 靈魂配對分析
          </h1>
          <p className="text-lg text-cosmic-white/70">
            透過星座與心理學的雙重視角，探索你們的相處之道
          </p>
        </div>

        {/* Form */}
        <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Person A */}
            <div>
              <label className="block text-cosmic-white font-semibold mb-2">
                對象 A 的星座
              </label>
              <select
                value={aSign}
                onChange={(e) => setASign(e.target.value)}
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
              >
                <option value="">請選擇星座</option>
                {zodiacOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Person B */}
            <div>
              <label className="block text-cosmic-white font-semibold mb-2">
                對象 B 的星座
              </label>
              <select
                value={bSign}
                onChange={(e) => setBSign(e.target.value)}
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
              >
                <option value="">請選擇星座</option>
                {zodiacOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Relationship Status */}
          <div className="mb-6">
            <label className="block text-cosmic-white font-semibold mb-2">
              目前關係狀態
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
            >
              <option value="">請選擇狀態</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
          >
            分析配對 ✨
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Score */}
            <div className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-xl p-8 text-center">
              <div className="text-6xl font-bold text-cosmic-white mb-2">
                {result.score}%
              </div>
              <div className="text-cosmic-purple font-semibold">合拍度指數</div>
            </div>

            {/* Dynamic */}
            <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-cosmic-white mb-3 flex items-center">
                <span className="mr-2">🌟</span>
                相處模式
              </h3>
              <p className="text-cosmic-white/80 leading-relaxed">
                {result.dynamic}
              </p>
            </div>

            {/* Hotspot */}
            <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-cosmic-white mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                容易吵架的點
              </h3>
              <p className="text-cosmic-white/80 leading-relaxed">
                {result.hotspot}
              </p>
            </div>

            {/* Tip */}
            <div className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-cosmic-white mb-3 flex items-center">
                <span className="mr-2">💡</span>
                溝通建議
              </h3>
              <p className="text-cosmic-white/90 leading-relaxed">
                {result.tip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
