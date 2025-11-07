export type MbtiDim = 'EI' | 'SN' | 'TF' | 'JP'

export interface MbtiMiniQuestion {
  id: string
  text: string
  type: 'scale5'
  dimension: MbtiDim
  reverse?: boolean
}

export const MBTI_MINI_QUESTIONS: MbtiMiniQuestion[] = [
  {
    id: 'q1',
    text: '在聚會裡你通常很快就能跟新朋友聊起來。',
    dimension: 'EI',
    type: 'scale5'
  },
  {
    id: 'q2',
    text: '長時間的獨處能讓你恢復能量。',
    dimension: 'EI',
    type: 'scale5',
    reverse: true
  },
  {
    id: 'q3',
    text: '做事時你更依賴可觀察到的細節與事實。',
    dimension: 'SN',
    type: 'scale5'
  },
  {
    id: 'q4',
    text: '你常被「可能性與聯想」吸引，而不是當下細節。',
    dimension: 'SN',
    type: 'scale5',
    reverse: true
  },
  {
    id: 'q5',
    text: '做決策時你優先考慮邏輯與一致性。',
    dimension: 'TF',
    type: 'scale5'
  },
  {
    id: 'q6',
    text: '面對衝突時你會先顧及他人的感受。',
    dimension: 'TF',
    type: 'scale5',
    reverse: true
  },
  {
    id: 'q7',
    text: '你喜歡把計畫先排好、按步驟完成。',
    dimension: 'JP',
    type: 'scale5'
  },
  {
    id: 'q8',
    text: '你偏好彈性與即興，而不是嚴格的日程表。',
    dimension: 'JP',
    type: 'scale5',
    reverse: true
  }
]
