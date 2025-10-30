"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getQuizBySlug, Quiz } from "@/lib/quizzes";
import QuestionStepper from "@/components/QuestionStepper";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const quizData = getQuizBySlug(slug);
    if (!quizData) {
      router.push("/tests");
      return;
    }
    setQuiz(quizData);
  }, [slug, router]);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;

    // 計算各維度分數
    const dimensionScores: Record<string, number> = {};

    quiz.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer === undefined) return;

      // 處理反向計分
      const score = question.reverse ? 6 - answer : answer;

      if (!dimensionScores[question.dimension]) {
        dimensionScores[question.dimension] = 0;
      }
      dimensionScores[question.dimension] += score;
    });

    // 轉換為百分制
    Object.keys(dimensionScores).forEach((dim) => {
      const questionsInDim = quiz.questions.filter(
        (q) => q.dimension === dim
      ).length;
      dimensionScores[dim] = (dimensionScores[dim] / (questionsInDim * 5)) * 100;
    });

    // 將分數編碼到 URL
    const scoresParam = encodeURIComponent(JSON.stringify(dimensionScores));
    router.push(`/result/${slug}?scores=${scoresParam}`);
  };

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-cosmic-white/70">載入中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Quiz Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-cosmic-white mb-3">
          {quiz.title}
        </h1>
        <p className="text-cosmic-white/70">{quiz.description}</p>
      </div>

      {/* Question Stepper */}
      <QuestionStepper
        questions={quiz.questions}
        currentIndex={currentIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
