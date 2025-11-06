export type MbtiType =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP'

export interface MbtiMiniResult {
  type: MbtiType
  title: string
  brief: string
  tips?: string[]
}

export const MBTI_MINI_RESULTS: MbtiMiniResult[] = [
  {
    type: 'INTJ',
    title: '建築師',
    brief: '策略型、重視效率與結構。',
    tips: ['先講重點', '給空間思考']
  },
  {
    type: 'INTP',
    title: '邏輯學家',
    brief: '好奇求真、喜歡拆解原理。',
    tips: ['給探索自由', '少干預']
  },
  {
    type: 'ENTJ',
    title: '指揮官',
    brief: '目標導向、擅長整合資源。',
    tips: ['聚焦成果', '清楚分工']
  },
  {
    type: 'ENTP',
    title: '辯論家',
    brief: '點子多、喜歡挑戰與試驗。',
    tips: ['容許試錯', '把握節奏']
  },
  {
    type: 'INFJ',
    title: '提倡者',
    brief: '洞察深、重視價值與意義。',
    tips: ['肯定初心', '尊重界線']
  },
  {
    type: 'INFP',
    title: '調停者',
    brief: '溫柔理想派、同理心強。',
    tips: ['給予時間', '接納差異']
  },
  {
    type: 'ENFJ',
    title: '主人公',
    brief: '領導感、擅長連結人心。',
    tips: ['合作共贏', '回饋具體']
  },
  {
    type: 'ENFP',
    title: '激勵者',
    brief: '熱情創意、善於啟發。',
    tips: ['彈性目標', '鼓勵嘗試']
  },
  {
    type: 'ISTJ',
    title: '物流師',
    brief: '踏實可靠、重視規範。',
    tips: ['清楚流程', '按期追蹤']
  },
  {
    type: 'ISFJ',
    title: '守護者',
    brief: '細膩周到、重視承諾。',
    tips: ['感謝付出', '逐步變更']
  },
  {
    type: 'ESTJ',
    title: '管理者',
    brief: '務實決斷、行動力強。',
    tips: ['明確責任', '數據說話']
  },
  {
    type: 'ESFJ',
    title: '執政官',
    brief: '善於協調、重視關係。',
    tips: ['公開表揚', '明確期待']
  },
  {
    type: 'ISTP',
    title: '鑄造師',
    brief: '冷靜實作、喜歡動手解題。',
    tips: ['給工具', '少廢話']
  },
  {
    type: 'ISFP',
    title: '探險家',
    brief: '感受導向、重視真實體驗。',
    tips: ['尊重選擇', '別逼規則']
  },
  {
    type: 'ESTP',
    title: '企業家',
    brief: '行動派、臨場反應快。',
    tips: ['實戰演練', '短週期']
  },
  {
    type: 'ESFP',
    title: '表演者',
    brief: '樂觀外向、帶動氣氛。',
    tips: ['即時回饋', '讓他上場']
  }
]

export function pickMiniResult(type: MbtiType): MbtiMiniResult {
  const r = MBTI_MINI_RESULTS.find((x) => x.type === type)
  if (!r) throw new Error('Unknown MBTI type: ' + type)
  return r
}
