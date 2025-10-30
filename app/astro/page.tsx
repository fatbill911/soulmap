import Link from "next/link";
import { zodiacSigns } from "@/lib/astrology";

export const metadata = {
  title: "星座運勢 | SoulMap 靈魂地圖",
  description: "12 星座每日、每週、每月運勢查詢。透過星象指引，找到你的生活方向。",
};

export default function AstroPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
          ⭐ 星座運勢
        </h1>
        <p className="text-lg text-cosmic-white/70 max-w-2xl mx-auto">
          星語心願 StarMuse - 讓星星為你指引方向
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.sign}
            href={`/astro/${sign.sign}`}
            className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6 hover:border-cosmic-purple transition-all hover:shadow-lg hover:shadow-cosmic-purple/20 group"
          >
            <div className="text-center">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {sign.emoji}
              </div>
              <h3 className="text-xl font-semibold text-cosmic-white mb-2">
                {sign.name}
              </h3>
              <div className="text-sm text-cosmic-purple mb-3">
                {sign.element}元素
              </div>
              <p className="text-sm text-cosmic-white/70 line-clamp-3">
                {sign.today.love}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-cosmic-white/50">
          💫 點擊星座查看完整的每日、每週、每月運勢
        </p>
      </div>
    </div>
  );
}
