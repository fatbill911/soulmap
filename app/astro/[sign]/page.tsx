import { notFound } from "next/navigation";
import { getSignData, getSignName } from "@/lib/astrology";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { sign: string };
}) {
  const signData = getSignData(params.sign);
  if (!signData) return {};

  return {
    title: `${signData.name}運勢 | SoulMap 靈魂地圖`,
    description: `${signData.name}的每日、每週、每月運勢查詢。愛情、工作、心情全方位分析。`,
  };
}

export default function SignDetailPage({
  params,
}: {
  params: { sign: string };
}) {
  const signData = getSignData(params.sign);

  if (!signData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">{signData.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-3">
            {signData.name}
          </h1>
          <div className="inline-block bg-cosmic-purple/20 text-cosmic-purple px-4 py-2 rounded-full">
            {signData.element}元素
          </div>
        </div>

        {/* Today's Fortune */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cosmic-white mb-6 flex items-center">
            <span className="mr-2">🌟</span>
            今日運勢
          </h2>
          <div className="space-y-4">
            <FortuneCard
              icon="💕"
              title="愛情運勢"
              content={signData.today.love}
            />
            <FortuneCard
              icon="💼"
              title="工作運勢"
              content={signData.today.work}
            />
            <FortuneCard
              icon="🎭"
              title="心情指數"
              content={signData.today.mood}
            />
            <FortuneCard
              icon="💡"
              title="今日建議"
              content={signData.today.advice}
              highlight
            />
          </div>
        </section>

        {/* Weekly Fortune */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cosmic-white mb-6 flex items-center">
            <span className="mr-2">📅</span>
            本週運勢
          </h2>
          <div className="space-y-4">
            <FortuneCard
              icon="💕"
              title="愛情運勢"
              content={signData.week.love}
            />
            <FortuneCard
              icon="💼"
              title="工作運勢"
              content={signData.week.work}
            />
            <FortuneCard
              icon="🎭"
              title="心情指數"
              content={signData.week.mood}
            />
            <FortuneCard
              icon="💡"
              title="本週建議"
              content={signData.week.advice}
              highlight
            />
          </div>
        </section>

        {/* Monthly Fortune */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cosmic-white mb-6 flex items-center">
            <span className="mr-2">🗓️</span>
            本月運勢
          </h2>
          <div className="space-y-4">
            <FortuneCard
              icon="💕"
              title="愛情運勢"
              content={signData.month.love}
            />
            <FortuneCard
              icon="💼"
              title="工作運勢"
              content={signData.month.work}
            />
            <FortuneCard
              icon="🎭"
              title="心情指數"
              content={signData.month.mood}
            />
            <FortuneCard
              icon="💡"
              title="本月建議"
              content={signData.month.advice}
              highlight
            />
          </div>
        </section>

        {/* Ad Slot */}
        <AdSlot />

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            href="/astro"
            className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
          >
            ← 返回所有星座
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fortune Card Component
function FortuneCard({
  icon,
  title,
  content,
  highlight = false,
}: {
  icon: string;
  title: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-xl border ${
        highlight
          ? "bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 border-cosmic-purple/50"
          : "bg-cosmic-gray/50 border-cosmic-purple/30"
      }`}
    >
      <h3 className="text-lg font-semibold text-cosmic-white mb-2 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h3>
      <p className="text-cosmic-white/80 leading-relaxed">{content}</p>
    </div>
  );
}
