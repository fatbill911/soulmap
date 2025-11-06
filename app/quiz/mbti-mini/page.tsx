"use client"

import { useEffect, useState } from "react"
import QuestionStepper from "@/components/QuestionStepper"
import { MBTI_MINI_QUESTIONS } from "@/lib/mbti/mini/questions"
import { scoreMbtiMini } from "@/lib/mbti/mini/score"
import { pickMiniResult } from "@/lib/mbti/mini/results"
import type { MbtiType } from "@/lib/mbti/mini/results"

type Answers = Record<string, number>

export default function MbtiMiniPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [resultType, setResultType] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem("mbti:mini:last")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed?.resultType) setResultType(parsed.resultType)
        if (parsed?.answers) setAnswers(parsed.answers)
      } catch {}
    }
  }, [])

  const handleAnswer = (qid: string, value: number) =>
    setAnswers((p) => ({ ...p, [qid]: value }))

  const handlePrevious = () => setCurrentIndex((i) => Math.max(0, i - 1))

  const handleNext = () =>
    setCurrentIndex((i) => Math.min(MBTI_MINI_QUESTIONS.length - 1, i + 1))

  const handleSubmit = () => {
    const { type } = scoreMbtiMini(answers)
    setResultType(type)
    if (typeof window !== "undefined")
      window.localStorage.setItem(
        "mbti:mini:last",
        JSON.stringify({ resultType: type, answers })
      )
  }

  const resetAll = () => {
    setAnswers({})
    setCurrentIndex(0)
    setResultType(null)
    if (typeof window !== "undefined")
      window.localStorage.removeItem("mbti:mini:last")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">
            🧠 MBTI 迷你版（8 題）
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            2–3 分鐘完成，快速了解你的人格類型
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            四軸各 2 題：外向/內向、實感/直覺、思考/情感、判斷/知覺
          </p>
        </div>

        {!resultType ? (
          <QuestionStepper
            questions={MBTI_MINI_QUESTIONS as any}
            currentIndex={currentIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        ) : (
          <ResultView type={resultType as MbtiType} onReset={resetAll} />
        )}
      </div>
    </div>
  )
}

function ResultView({ type, onReset }: { type: MbtiType; onReset: () => void }) {
  const r = pickMiniResult(type)

  return (
    <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 p-8 space-y-6 bg-white dark:bg-gray-800 shadow-xl">
      <div>
        <div className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
          你的 MBTI 類型
        </div>
        <div className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-100 mb-2">
          {r.type}
        </div>
        <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
          {r.title}
        </div>
      </div>

      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          {r.brief}
        </p>
      </div>

      {r.tips?.length ? (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <div className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
            💡 小提醒
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            {r.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex gap-4">
        <button
          className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-md"
          onClick={onReset}
        >
          再測一次
        </button>
        <button
          className="flex-1 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors shadow-md"
          onClick={() => (window.location.href = "/tests")}
        >
          更多測驗
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p>✨ 結果已自動儲存，重新整理後可繼續查看</p>
      </div>
    </div>
  )
}
