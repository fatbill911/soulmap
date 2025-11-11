"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/quizzes";

interface QuestionStepperProps {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const scaleLabels = [
  "非常不同意",
  "不同意",
  "中立",
  "同意",
  "非常同意",
];

export default function QuestionStepper({
  questions,
  currentIndex,
  answers,
  onAnswer,
  onPrevious,
  onNext,
  onSubmit,
}: QuestionStepperProps) {
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-cosmic-white/60 mb-2">
          <span>
            第 {currentIndex + 1} 題 / 共 {questions.length} 題
          </span>
          <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-cosmic-gray rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cosmic-purple to-cosmic-pink h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question：切換動畫 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-2xl p-8 mb-6"
          style={{
            boxShadow: "0 8px 32px rgba(155, 93, 229, 0.1)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl text-cosmic-white mb-8 text-center"
          >
            {currentQuestion.text}
          </motion.h2>

          {/* 5-point Scale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-3"
          >
            {[1, 2, 3, 4, 5].map((value, index) => (
              <motion.label
                key={value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[currentQuestion.id] === value
                    ? "border-cosmic-purple bg-cosmic-purple/20 shadow-lg"
                    : "border-cosmic-gray/50 hover:border-cosmic-purple/50 hover:bg-cosmic-gray/30"
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={value}
                  checked={answers[currentQuestion.id] === value}
                  onChange={() => onAnswer(currentQuestion.id, value)}
                  className="mr-3 w-5 h-5 accent-cosmic-purple"
                />
                <span className="text-cosmic-white">{scaleLabels[value - 1]}</span>
              </motion.label>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={onPrevious}
          disabled={isFirst}
          whileHover={!isFirst ? { scale: 1.05 } : {}}
          whileTap={!isFirst ? { scale: 0.95 } : {}}
          className={`px-6 py-2 rounded-xl transition-colors ${
            isFirst
              ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
              : "bg-cosmic-gray text-cosmic-white hover:bg-cosmic-purple"
          }`}
        >
          ← 上一題
        </motion.button>

        {!isLast ? (
          <motion.button
            onClick={onNext}
            disabled={!hasAnswered}
            whileHover={hasAnswered ? { scale: 1.05 } : {}}
            whileTap={hasAnswered ? { scale: 0.95 } : {}}
            className={`px-6 py-2 rounded-xl transition-colors ${
              !hasAnswered
                ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
                : "bg-cosmic-purple text-white hover:bg-cosmic-pink"
            }`}
            style={{
              boxShadow: hasAnswered ? "0 4px 15px rgba(155, 93, 229, 0.3)" : "none",
            }}
          >
            下一題 →
          </motion.button>
        ) : (
          <motion.button
            onClick={onSubmit}
            disabled={!hasAnswered}
            whileHover={hasAnswered ? { scale: 1.05, y: -2 } : {}}
            whileTap={hasAnswered ? { scale: 0.95 } : {}}
            className={`px-8 py-3 rounded-xl transition-colors font-semibold ${
              !hasAnswered
                ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
                : "bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white"
            }`}
            style={{
              boxShadow: hasAnswered
                ? "0 8px 25px rgba(155, 93, 229, 0.5)"
                : "none",
            }}
          >
            看結果 ✨
          </motion.button>
        )}
      </div>
    </div>
  );
}
