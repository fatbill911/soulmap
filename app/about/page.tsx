export const metadata = {
  title: "關於我們 | SoulMap 靈魂地圖",
  description: "了解 SoulMap 靈魂地圖與 StarMuse 星語心願的理念與使命。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
            關於我們
          </h1>
          <p className="text-lg text-cosmic-white/70">
            探索內在，連結宇宙
          </p>
        </div>

        <div className="space-y-8">
          {/* SoulMap */}
          <section className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">✨</span>
              <h2 className="text-3xl font-bold text-cosmic-white">
                SoulMap 靈魂地圖
              </h2>
            </div>
            <p className="text-cosmic-white/80 leading-relaxed mb-4">
              我們相信每個人都有自己獨特的內在地圖，記錄著你的情感模式、性格特質與生命軌跡。
              SoulMap 靈魂地圖運用科學化的心理測驗工具，幫助你探索自我、理解情感依附模式、
              認識人格特質，並在這個過程中找到成長的方向。
            </p>
            <p className="text-cosmic-white/80 leading-relaxed">
              我們的測驗基於心理學研究與理論，包括依附理論、人格心理學等，
              並以淺顯易懂的方式呈現，讓心理學不再遙不可及。
            </p>
          </section>

          {/* StarMuse */}
          <section className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">⭐</span>
              <h2 className="text-3xl font-bold text-cosmic-white">
                StarMuse 星語心願
              </h2>
            </div>
            <p className="text-cosmic-white/80 leading-relaxed mb-4">
              星星是古老的陪伴者，在人類還不懂心理學之前，我們就懂得仰望星空尋找答案。
              StarMuse 星語心願結合占星學與現代心理視角，為你提供每日、每週、每月的星座運勢。
            </p>
            <p className="text-cosmic-white/80 leading-relaxed">
              我們的星座分析不只是預測未來，更是一種自我覺察的工具。
              透過星象的提醒，你可以更有意識地面對生活中的挑戰與機會。
            </p>
          </section>

          {/* Mission */}
          <section className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-cosmic-white mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              我們的使命
            </h2>
            <ul className="space-y-3 text-cosmic-white/80">
              <li className="flex items-start">
                <span className="text-cosmic-purple mr-2">▸</span>
                讓心理學知識變得平易近人，每個人都能透過測驗認識自己
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-purple mr-2">▸</span>
                結合科學與神秘學，提供全面的自我探索工具
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-purple mr-2">▸</span>
                陪伴你在關係中成長，理解自己也理解他人
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-purple mr-2">▸</span>
                創造一個溫暖的心靈空間，讓你感到被理解與支持
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="bg-cosmic-navy/50 border border-cosmic-purple/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-3">
              ⚠️ 重要提醒
            </h3>
            <p className="text-sm text-cosmic-white/70 leading-relaxed">
              SoulMap 的測驗與分析僅供自我探索與娛樂參考，不能取代專業的心理諮商或醫療診斷。
              如果你正在經歷嚴重的心理困擾，請尋求專業心理師或醫師的協助。
              我們在這裡陪伴你的成長旅程，但專業的協助永遠是最重要的。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
