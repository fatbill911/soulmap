"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface QuizCardProps {
  slug: string;
  title: string;
  description: string;
  estTimeMins: number;
  themeColor?: string;
  icon?: string;
  series?: string;
  order?: number;
}

export default function QuizCard({
  slug,
  title,
  description,
  estTimeMins,
  themeColor,
  icon,
}: QuizCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-cosmic-gray/50 backdrop-blur-sm border rounded-2xl p-6 transition-all hover:shadow-2xl relative overflow-hidden"
      style={{
        borderColor: themeColor ? `${themeColor}40` : "#9B5DE5 40",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* 漸層背景層 */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500"
        style={{
          background: themeColor
            ? `linear-gradient(135deg, ${themeColor}20, transparent)`
            : "linear-gradient(135deg, #9B5DE520, transparent)",
        }}
      />
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="text-xl font-semibold text-cosmic-white">{title}</h3>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: themeColor ? `${themeColor}33` : "rgba(155, 93, 229, 0.2)",
            color: themeColor || "#9B5DE5",
          }}
        >
          {estTimeMins} 分鐘
        </span>
      </div>
      <p className="text-cosmic-white/70 text-sm mb-4 line-clamp-2 relative z-10">
        {description}
      </p>
      <Link href={`/quiz/${slug}`} className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-white px-6 py-2 rounded-lg font-medium relative overflow-hidden hover:opacity-90"
          style={{
            background: themeColor
              ? `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`
              : "linear-gradient(135deg, #9B5DE5, #F72585)",
            boxShadow: `0 4px 15px ${themeColor || "#9B5DE5"}40`,
          }}
        >
          開始測驗 →
        </motion.div>
      </Link>
    </motion.div>
  );
}
