"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // 未來可以整合到 localStorage 或 context
  };

  return (
    <header className="bg-cosmic-navy/80 backdrop-blur-sm border-b border-cosmic-purple/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">✨</span>
            <div>
              <div className="text-xl font-bold text-cosmic-white group-hover:text-cosmic-purple transition-colors">
                SoulMap
              </div>
              <div className="text-xs text-cosmic-purple">靈魂地圖</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              首頁
            </Link>
            <Link
              href="/tests"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              測驗
            </Link>
            <Link
              href="/astro"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              星座
            </Link>
            <Link
              href="/match"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              配對
            </Link>
            <Link
              href="/fortune"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              算命
            </Link>
            <Link
              href="/board"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              留言板
            </Link>
            <Link
              href="/about"
              className="text-cosmic-white hover:text-cosmic-purple transition-colors"
            >
              關於
            </Link>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-cosmic-gray hover:bg-cosmic-purple/20 transition-colors"
            aria-label="切換深色模式"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            首頁
          </Link>
          <Link
            href="/tests"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            測驗
          </Link>
          <Link
            href="/astro"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            星座
          </Link>
          <Link
            href="/match"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            配對
          </Link>
          <Link
            href="/fortune"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            算命
          </Link>
          <Link
            href="/board"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            留言板
          </Link>
          <Link
            href="/about"
            className="text-sm text-cosmic-white hover:text-cosmic-purple transition-colors"
          >
            關於
          </Link>
        </nav>
      </div>
    </header>
  );
}
