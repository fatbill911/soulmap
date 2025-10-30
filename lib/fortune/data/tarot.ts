export type TarotCard = {
  id: string
  name: string
  arcana: "major" | "minor"
  upright: {
    meaning: string
    soft: string
    fun: string
  }
  reversed: {
    meaning: string
    soft: string
    fun: string
  }
  image?: string
}

export const tarotCards: TarotCard[] = [
  {
    id: "the-star",
    name: "The Star / 星星",
    arcana: "major",
    upright: {
      meaning: "希望、療癒、重新開始",
      soft: "你正在走出混亂，重新找到屬於你的光。",
      fun: "你需要的不是星星，是 Wi-Fi 滿格。"
    },
    reversed: {
      meaning: "失去信心、迷失方向",
      soft: "有時候迷路是為了找到更好的路，別急著責怪自己。",
      fun: "GPS 失靈中，建議原地坐下來吃點東西。"
    }
  },
  {
    id: "the-fool",
    name: "The Fool / 愚者",
    arcana: "major",
    upright: {
      meaning: "新開始、冒險、純真",
      soft: "你不需要準備好才能出發，勇氣就是帶著不安前進。",
      fun: "人生像盲盒，拆開才知道是驚喜還是驚嚇。"
    },
    reversed: {
      meaning: "魯莽、猶豫、害怕改變",
      soft: "停下來喘口氣沒關係，不是每次都要衝第一。",
      fun: "今天適合當沙發馬鈴薯，明天再當勇者。"
    }
  },
  {
    id: "the-lovers",
    name: "The Lovers / 戀人",
    arcana: "major",
    upright: {
      meaning: "愛情、選擇、連結",
      soft: "真正的愛是能讓你做自己，而不是變成別人想要的樣子。",
      fun: "感情像 Wi-Fi，有時滿格卻沒連上。"
    },
    reversed: {
      meaning: "分歧、不平衡、選擇困難",
      soft: "有些人的離開，是為了讓更適合的人進來。",
      fun: "單身是一種狀態，不是一種錯誤，別自己嚇自己。"
    }
  },
  {
    id: "the-moon",
    name: "The Moon / 月亮",
    arcana: "major",
    upright: {
      meaning: "直覺、夢境、潛意識",
      soft: "你的內心比你想的更有智慧，聽聽它在說什麼。",
      fun: "月亮說：今晚做夢要記得存檔。"
    },
    reversed: {
      meaning: "焦慮、混亂、幻覺",
      soft: "別讓焦慮說服你相信不存在的怪物。",
      fun: "腦內劇場今天加演三場，建議退票休息。"
    }
  },
  {
    id: "the-sun",
    name: "The Sun / 太陽",
    arcana: "major",
    upright: {
      meaning: "快樂、成功、活力",
      soft: "你值得擁有陽光般的生活，不需要向誰證明。",
      fun: "開運秘訣：曬太陽、吃好吃、睡飽飽。"
    },
    reversed: {
      meaning: "失望、缺乏熱情",
      soft: "烏雲遮不住太陽，只是暫時看不見而已。",
      fun: "今天雲層厚，建議改看 Netflix。"
    }
  },
  {
    id: "the-tower",
    name: "The Tower / 高塔",
    arcana: "major",
    upright: {
      meaning: "突然改變、毀滅、覺醒",
      soft: "有些東西倒下了，是為了讓更真實的你站起來。",
      fun: "命運像泡麵，等三分鐘就會開運。"
    },
    reversed: {
      meaning: "逃避改變、延遲危機",
      soft: "不想面對沒關係，但別假裝問題不存在。",
      fun: "逃避雖然可恥但有用，但只限今天。"
    }
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune / 命運之輪",
    arcana: "major",
    upright: {
      meaning: "轉機、好運、循環",
      soft: "生命是一場旋轉木馬，上上下下都是風景。",
      fun: "好運要來了，記得帶購物袋。"
    },
    reversed: {
      meaning: "壞運、失控、停滯",
      soft: "今天運氣差沒關係，明天的運氣還沒開始算。",
      fun: "轉盤卡住了，建議重新開機（睡一覺）。"
    }
  },
  {
    id: "strength",
    name: "Strength / 力量",
    arcana: "major",
    upright: {
      meaning: "勇氣、內在力量、溫柔",
      soft: "你不需要馬上變好，只要願意呼吸就很好。",
      fun: "你比珍珠奶茶還堅強，而且更有料。"
    },
    reversed: {
      meaning: "自我懷疑、軟弱、缺乏信心",
      soft: "今天適合放過自己，也放下昨天的錯。",
      fun: "沒關係，今天當軟爛布丁也很可以。"
    }
  }
]
