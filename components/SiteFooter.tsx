import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-cosmic-navy border-t border-cosmic-purple/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="text-xl font-bold text-cosmic-white mb-2">
              SoulMap 靈魂地圖
            </div>
            <div className="text-sm text-cosmic-purple mb-2">
              StarMuse 星語心願
            </div>
            <p className="text-sm text-cosmic-white/60">
              用心理學與星象為你描出命運的軌跡
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cosmic-white font-semibold mb-3">快速連結</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tests"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  心理測驗
                </Link>
              </li>
              <li>
                <Link
                  href="/astro"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  星座運勢
                </Link>
              </li>
              <li>
                <Link
                  href="/match"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  靈魂配對
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  關於我們
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-cosmic-white font-semibold mb-3">法律資訊</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  隱私政策
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/disclaimer"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  免責聲明
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cosmic-white/70 hover:text-cosmic-purple transition-colors"
                >
                  聯絡我們
                </Link>
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center space-x-1 text-sm text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              <span>☕</span>
              <span>請我喝一杯咖啡</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cosmic-purple/20">
          <div className="text-center text-sm text-cosmic-white/50">
            <p className="mb-2">
              © {new Date().getFullYear()} SoulMap 靈魂地圖. All rights reserved.
            </p>
            <p className="text-xs">
              ⚠️ 本網站內容僅供參考與心靈陪伴，不構成專業醫療或心理諮詢建議
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
