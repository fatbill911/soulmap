"use client";

import { motion } from "framer-motion";
import QuizCard from "@/components/QuizCard";
import { getAllQuizzes } from "@/lib/quizzes";

export default function TestsPage() {
  const quizzes = getAllQuizzes();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero 區塊：從下往上浮出 + 淡入 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4"
        >
          🧭 心理測驗
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-cosmic-white/70 max-w-2xl mx-auto"
        >
          透過科學化的測驗工具，探索你的內在世界。了解自己，是改變的第一步。
        </motion.p>
      </motion.div>

      {/* 測驗卡片列表：stagger 動畫 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* MBTI 迷你版 - 獨立測驗 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <QuizCard
            slug="mbti-mini"
            title="🧠 MBTI 迷你版"
            description="8 題快速測驗，了解你的人格類型（外向/內向、實感/直覺、思考/情感、判斷/知覺）"
            estTimeMins={3}
          />
        </motion.div>

        {quizzes.map((quiz) => (
          <motion.div
            key={quiz.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <QuizCard {...quiz} />
          </motion.div>
        ))}
      </motion.div>

      {quizzes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-cosmic-white/50">目前沒有可用的測驗，敬請期待！</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-cosmic-white/50">
          💡 提示：測驗結果僅供參考，如需專業協助請諮詢心理師。
        </p>
      </div>
    </div>
  );
}
