import type { MbtiDim } from './questions'
import { MBTI_MINI_QUESTIONS } from './questions'
import type { MbtiType } from './results'

type Answers = Record<string, number>

function dimPair(dim: MbtiDim): [string, string] {
  switch (dim) {
    case 'EI':
      return ['E', 'I']
    case 'SN':
      return ['S', 'N']
    case 'TF':
      return ['T', 'F']
    case 'JP':
      return ['J', 'P']
  }
}

export function scoreMbtiMini(answers: Answers): {
  type: MbtiType
  detail: Record<MbtiDim, number>
} {
  const sums: { [k in MbtiDim]: number } = { EI: 0, SN: 0, TF: 0, JP: 0 }

  for (const q of MBTI_MINI_QUESTIONS) {
    const raw = answers[q.id]
    if (!raw) continue
    let s = raw - 3 // 1-5 scale, centered at 3
    if (q.reverse) s = -s
    sums[q.dimension] += s
  }

  function letter(dim: MbtiDim): string {
    const [L, R] = dimPair(dim)
    if (sums[dim] > 0) return L
    if (sums[dim] < 0) return R
    // Tie-breaker: use first question's direction
    const first = MBTI_MINI_QUESTIONS.find((q) => q.dimension === dim)
    if (!first) return L
    return first.reverse ? R : L
  }

  const type = (letter('EI') + letter('SN') + letter('TF') + letter('JP')) as MbtiType

  return { type, detail: sums }
}
