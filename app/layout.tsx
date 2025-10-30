import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "SoulMap 靈魂地圖 | 心理測驗與星座運勢",
  description:
    "用心理學與星象為你描出命運的軌跡。探索你的內在世界，了解你的靈魂座標。",
  keywords: "心理測驗,星座運勢,配對分析,依附型態,占星,靈魂地圖",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-cosmic-gradient min-h-screen text-cosmic-white">
        <SiteHeader />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
