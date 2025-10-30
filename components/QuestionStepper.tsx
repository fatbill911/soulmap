"use client";

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

      {/* Question */}
      <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-8 mb-6">
        <h2 className="text-2xl text-cosmic-white mb-8 text-center">
          {currentQuestion.text}
        </h2>

        {/* 5-point Scale */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                answers[currentQuestion.id] === value
                  ? "border-cosmic-purple bg-cosmic-purple/20"
                  : "border-cosmic-gray hover:border-cosmic-purple/50"
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
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isFirst
              ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
              : "bg-cosmic-gray text-cosmic-white hover:bg-cosmic-purple"
          }`}
        >
          ← 上一題
        </button>

        {!isLast ? (
          <button
            onClick={onNext}
            disabled={!hasAnswered}
            className={`px-6 py-2 rounded-lg transition-colors ${
              !hasAnswered
                ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
                : "bg-cosmic-purple text-white hover:bg-cosmic-pink"
            }`}
          >
            下一題 →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!hasAnswered}
            className={`px-8 py-3 rounded-lg transition-colors font-semibold ${
              !hasAnswered
                ? "bg-cosmic-gray/30 text-cosmic-white/30 cursor-not-allowed"
                : "bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white hover:shadow-lg hover:shadow-cosmic-purple/50"
            }`}
          >
            看結果 ✨
          </button>
        )}
      </div>
    </div>
  );
}
