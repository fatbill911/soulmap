// 測驗類型定義
export interface QuizQuestion {
  id: string;
  text: string;
  type: "scale5"; // 5點量表
  dimension: string; // 對應的維度 (例如 "attachment", "anxiety")
  reverse?: boolean; // 是否為反向計分題
}

export interface QuizResult {
  type: string;
  label: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  starNote?: string; // 星座加料段
}

export interface Quiz {
  slug: string;
  title: string;
  description: string;
  series?: string; // 測驗系列 (例如: "emotional-journey")
  order?: number; // 系列中的順序
  themeColor?: string; // 主題色彩
  icon?: string; // 圖示 emoji
  introText?: string; // 章節開場文案
  estTimeMins: number;
  questions: QuizQuestion[];
  scoreToResult: (scores: Record<string, number>, extra?: { sign?: string }) => QuizResult;
}

// 情感依附型態測驗
const attachmentQuiz: Quiz = {
  slug: "attachment",
  title: "情感依附型態",
  description: "探索你在親密關係中的依附模式，了解你如何建立與維繫情感連結。",
  series: "emotional-journey",
  order: 1,
  themeColor: "#4AA3D4",
  icon: "🌊",
  introText: "一段關係的開始，往往取決於我們敢不敢相信愛。",
  estTimeMins: 5,
  questions: [
    {
      id: "q1",
      text: "我很容易與他人建立親密關係",
      type: "scale5",
      dimension: "avoidance",
      reverse: true,
    },
    {
      id: "q2",
      text: "我經常擔心伴侶不像我愛他那樣愛我",
      type: "scale5",
      dimension: "anxiety",
    },
    {
      id: "q3",
      text: "我對於完全信任他人感到不舒服",
      type: "scale5",
      dimension: "avoidance",
    },
    {
      id: "q4",
      text: "當別人太靠近我時，我會感到緊張",
      type: "scale5",
      dimension: "avoidance",
    },
    {
      id: "q5",
      text: "我很擔心被拋棄",
      type: "scale5",
      dimension: "anxiety",
    },
    {
      id: "q6",
      text: "我希望與伴侶完全融合，但這常常嚇跑對方",
      type: "scale5",
      dimension: "anxiety",
    },
    {
      id: "q7",
      text: "我在感情中能保持獨立自主",
      type: "scale5",
      dimension: "avoidance",
    },
    {
      id: "q8",
      text: "伴侶沒有立刻回訊息時，我會感到焦慮",
      type: "scale5",
      dimension: "anxiety",
    },
    {
      id: "q9",
      text: "我偏好不要太依賴伴侶",
      type: "scale5",
      dimension: "avoidance",
    },
    {
      id: "q10",
      text: "我需要大量的親密和確認才能感到安全",
      type: "scale5",
      dimension: "anxiety",
    },
  ],
  scoreToResult: (scores, extra) => {
    const anxiety = scores.anxiety || 0;
    const avoidance = scores.avoidance || 0;

    // 依據焦慮和迴避兩個維度判斷依附型態
    let result: QuizResult;

    if (anxiety < 25 && avoidance < 25) {
      // 低焦慮、低迴避
      result = {
        type: "secure",
        label: "安全依附者 🌟",
        summary:
          "你在關係中感到自在舒適，既能享受親密也能保持獨立。你相信自己值得被愛，也相信他人會回應你的需求。",
        strengths: [
          "能夠健康地表達需求與情感",
          "關係中保持平衡，不過度依賴也不過度疏離",
          "衝突時能有效溝通與修復",
        ],
        weaknesses: [
          "有時可能低估不安全依附者的焦慮",
          "可能對關係問題過於樂觀",
        ],
        advice:
          "持續保持開放溝通，同時也要理解伴侶可能有不同的依附需求。你的穩定能幫助伴侶建立安全感。",
      };
    } else if (anxiety >= 25 && avoidance < 25) {
      // 高焦慮、低迴避
      result = {
        type: "anxious",
        label: "焦慮依附者 💫",
        summary:
          "你渴望親密連結，但經常擔心被拋棄或不被愛。你可能需要大量的確認和安全感，有時這會讓伴侶感到壓力。",
        strengths: [
          "情感豐富，非常重視關係",
          "敏感細膩，能察覺關係中的細微變化",
          "願意投入大量心力維繫感情",
        ],
        weaknesses: [
          "容易過度解讀伴侶的行為",
          "需要頻繁的確認與關注",
          "可能因焦慮而做出衝動決定",
        ],
        advice:
          "練習自我安撫技巧，在尋求外在確認前先穩定自己的情緒。與伴侶溝通你的需求，而不是期待對方猜測。",
      };
    } else if (anxiety < 25 && avoidance >= 25) {
      // 低焦慮、高迴避
      result = {
        type: "avoidant",
        label: "迴避依附者 🌙",
        summary:
          "你重視獨立和自主，可能在親密關係中感到不舒服。你傾向保持情感距離，避免過度依賴他人。",
        strengths: [
          "獨立自主，不會過度依賴他人",
          "理性處理問題",
          "尊重個人空間與界線",
        ],
        weaknesses: [
          "難以表達情感和脆弱",
          "可能讓伴侶感到被拒絕或不被需要",
          "傾向用疏離來處理衝突",
        ],
        advice:
          "練習分享你的感受，即使這讓你感到不舒服。親密不等於失去自我，嘗試在獨立與連結間找到平衡。",
      };
    } else {
      // 高焦慮、高迴避
      result = {
        type: "fearful",
        label: "矛盾依附者 🌀",
        summary:
          "你渴望親密但同時害怕受傷，這種矛盾讓你在關係中搖擺不定。你可能一邊渴望靠近，一邊又想推開對方。",
        strengths: [
          "深刻理解關係中的複雜情感",
          "能同理不同依附風格的人",
          "自我覺察能力強",
        ],
        weaknesses: [
          "關係中感到混亂和不確定",
          "可能送出矛盾的訊號讓伴侶困惑",
          "難以建立穩定的親密關係",
        ],
        advice:
          "這種模式通常源於早期的不安全經驗。考慮尋求專業協助，學習建立更安全的依附模式。與伴侶坦誠溝通你的矛盾感受。",
      };
    }

    // 根據星座加入星語提醒
    if (extra?.sign) {
      result.starNote = getStarNoteForAttachment(result.type, extra.sign);
    }

    return result;
  },
};

// 根據依附型態與星座給予星語提醒
function getStarNoteForAttachment(attachmentType: string, sign: string): string {
  const notes: Record<string, Record<string, string>> = {
    secure: {
      aries: "火星守護的你天生勇敢，這份安全感讓你在愛情中更能做自己。",
      taurus: "金星賦予你的穩定性格與安全依附完美契合，繼續相信愛。",
      gemini: "雙子的靈活性加上安全依附，讓你能在自由與親密間優雅遊走。",
      cancer: "月亮守護的你本就擅長滋養關係，這份安全感是你的超能力。",
      leo: "太陽般的你散發自信，這份內在安全感讓你的愛更有力量。",
      virgo: "處女的細心加上安全依附，讓你成為關係中最可靠的存在。",
      libra: "金星守護的你天生懂得平衡，安全依附讓這份天賦更加閃耀。",
      scorpio: "冥王星的深度加上安全感，讓你能真正trust fall into love。",
      sagittarius: "木星的樂觀加上安全依附，讓你的愛既自由又深刻。",
      capricorn: "土星教會你的穩定性格，在安全依附中發揮到極致。",
      aquarius: "天王星的獨特視角加上安全感，讓你的愛充滿智慧與自由。",
      pisces: "海王星的浪漫加上安全依附，讓你能愛得深刻卻不失自我。",
    },
    anxious: {
      aries: "火星的衝動加上焦慮依附，記得先深呼吸再傳那第五則訊息。",
      taurus: "金牛的固執可能讓焦慮更難放下，試著相信對方的承諾。",
      gemini: "雙子的多變加上焦慮，小心不要在關係中overthink一切。",
      cancer: "巨蟹本就情感豐富，焦慮依附可能讓你更易受傷。記得自我照顧。",
      leo: "獅子需要關注，焦慮依附可能讓這需求更強烈。你本身就夠閃耀。",
      virgo: "處女的分析傾向加上焦慮，可能讓你過度檢視關係的每個細節。",
      libra: "天秤渴望和諧，焦慮依附可能讓你為了避免衝突而失去自我。",
      scorpio: "天蠍的強烈加上焦慮依附，可能讓佔有慾變得難以控制。",
      sagittarius: "射手愛自由，焦慮依附可能讓你在獨立與依賴間拉扯。",
      capricorn: "摩羯的理性與焦慮依附衝突，允許自己展現脆弱沒關係。",
      aquarius: "水瓶的疏離面具下可能藏著焦慮的心，試著表達真實需求。",
      pisces: "雙魚的情感深度加上焦慮，小心不要溺水在自己的想像中。",
    },
    avoidant: {
      aries: "火星的獨立加上迴避依附，記得關係需要的是勇氣而非距離。",
      taurus: "金牛的固執可能讓迴避更難改變，但慢慢開放心房是值得的。",
      gemini: "雙子的理智加上迴避，小心不要用邏輯武裝自己的心。",
      cancer: "巨蟹的硬殼是保護，但迴避依附可能讓你錯過真正的親密。",
      leo: "獅子的驕傲加上迴避，記得示弱不會讓你失去王者風範。",
      virgo: "處女的完美主義加上迴避，可能讓你用挑剔來保持距離。",
      libra: "天秤的表面和諧加上迴避，可能讓你避開真正的深度連結。",
      scorpio: "天蠍本就神秘，迴避依附可能讓你的城牆更高更厚。",
      sagittarius: "射手的自由精神加上迴避，小心別讓獨立變成逃避。",
      capricorn: "摩羯的自給自足加上迴避，記得你值得也需要情感支持。",
      aquarius: "水瓶的理性加上迴避，可能讓你活在頭腦而非心裡。",
      pisces: "雙魚的夢幻加上迴避，可能讓你用幻想取代真實的親密。",
    },
    fearful: {
      aries: "火星的衝動加上矛盾依附，你的關係可能像雲霄飛車。",
      taurus: "金牛渴望穩定，矛盾依附可能讓這份渴望更痛苦。",
      gemini: "雙子的雙重性格加上矛盾依附，可能讓伴侶更困惑。",
      cancer: "巨蟹的敏感加上矛盾依附，情緒波動可能更劇烈。",
      leo: "獅子的強勢加上內在的矛盾，可能讓你在愛裡特別受傷。",
      virgo: "處女的自我批判加上矛盾依附，記得對自己溫柔一點。",
      libra: "天秤的搖擺加上矛盾依附，可能讓決策變得更困難。",
      scorpio: "天蠍的極端加上矛盾依附，全有或全無的模式需要覺察。",
      sagittarius: "射手在自由與親密間的拉扯，矛盾依附讓這更複雜。",
      capricorn: "摩羯的控制慾加上矛盾依附，可能讓關係更緊繃。",
      aquarius: "水瓶的疏離加上內在渴望，矛盾依附讓你特別孤獨。",
      pisces: "雙魚的情感深度加上矛盾，可能讓你在愛裡迷失方向。",
    },
  };

  return notes[attachmentType]?.[sign.toLowerCase()] || "星星提醒你：了解自己是改變的第一步。";
}

// 情緒表達風格測驗
const emotionStyleQuiz: Quiz = {
  slug: "emotion-style",
  title: "情緒表達風格",
  description: "探索你面對情緒時的表達與處理方式。",
  series: "emotional-journey",
  order: 2,
  themeColor: "#F47C3C",
  icon: "🔥",
  introText: "當情緒湧現時，你會選擇表達、壓抑，還是靜靜觀察？",
  estTimeMins: 5,
  questions: [
    {
      id: "q1",
      text: "當我感到難過時，我會主動向他人傾訴",
      type: "scale5",
      dimension: "expression",
    },
    {
      id: "q2",
      text: "我傾向壓抑自己的負面情緒，不讓別人看見",
      type: "scale5",
      dimension: "suppression",
    },
    {
      id: "q3",
      text: "我能清楚辨識並說出自己現在的情緒",
      type: "scale5",
      dimension: "awareness",
    },
    {
      id: "q4",
      text: "面對衝突時，我習慣用理性分析取代情緒表達",
      type: "scale5",
      dimension: "rationalization",
    },
    {
      id: "q5",
      text: "我容易被情緒淹沒，難以控制",
      type: "scale5",
      dimension: "intensity",
    },
    {
      id: "q6",
      text: "當我生氣時，我會直接表達而不是隱忍",
      type: "scale5",
      dimension: "expression",
    },
    {
      id: "q7",
      text: "我覺得展現脆弱是一件困難的事",
      type: "scale5",
      dimension: "suppression",
    },
    {
      id: "q8",
      text: "我能同時感受並理解他人的情緒",
      type: "scale5",
      dimension: "empathy",
    },
  ],
  scoreToResult: (scores) => {
    const expression = scores.expression || 0;
    const suppression = scores.suppression || 0;
    const awareness = scores.awareness || 0;
    const empathy = scores.empathy || 0;

    // 外放型：高表達 + 低壓抑
    if (expression >= 50 && suppression <= 40) {
      return {
        type: "expressive",
        label: "外放型 🔥",
        summary: "你習慣直接且真實地表達情緒，不害怕展現真實的自己。這份真誠讓你的關係充滿溫度，但有時也需要覺察表達的時機。",
        strengths: [
          "情感真誠不做作",
          "溝通直接不累積",
          "不讓負面情緒悶在心裡",
          "容易與他人建立真實連結"
        ],
        weaknesses: [
          "有時情緒來得太快太強",
          "可能在不適當的時機表達",
          "需要學習情緒調節的技巧"
        ],
        advice: "情緒不是敵人，它只是想被聽見。你已經很擅長表達，接下來可以練習在適當的時機與方式中表達，讓你的真誠成為關係中的禮物而非負擔。",
      };
    }

    // 理性型：高理性化 + 低表達
    else if (scores.rationalization >= 4 && expression <= 40) {
      return {
        type: "controlled",
        label: "理性型 🧊",
        summary: "你習慣用思考來面對情緒，理智是你的盾牌。這讓你在衝突中保持冷靜，但有時也讓你與自己的感受保持距離。",
        strengths: [
          "冷靜理性不易衝動",
          "能客觀分析問題",
          "不會被情緒綁架決策",
          "擅長提供理性建議"
        ],
        weaknesses: [
          "可能與自己的情緒失去連結",
          "他人可能覺得你冷漠",
          "壓抑久了可能突然崩潰"
        ],
        advice: "理性是一種能力，但情緒也值得被感受。試著在安全的空間裡練習辨識自己的感受，情緒與理智可以並存，你不需要選邊站。",
      };
    }

    // 壓抑型：高壓抑 + 低表達
    else if (suppression >= 50) {
      return {
        type: "suppressed",
        label: "壓抑型 🌑",
        summary: "你習慣把情緒藏在心裡，不輕易向外展現脆弱。這份堅強保護了你，但也讓你承受了不該獨自承擔的重量。",
        strengths: [
          "不會輕易給他人添麻煩",
          "能為他人著想",
          "外表看起來堅強穩定",
          "擅長照顧他人的感受"
        ],
        weaknesses: [
          "累積的情緒可能突然爆發",
          "長期壓抑影響身心健康",
          "難以真正被他人理解",
          "可能失去與自己的連結"
        ],
        advice: "你不需要永遠堅強。找到一個安全的人或空間，練習慢慢說出你的感受。情緒不是弱點，壓抑才會讓你失去力量。",
      };
    }

    // 共感型：高同理 + 高覺察
    else if (empathy >= 4 && awareness >= 4) {
      return {
        type: "empathic",
        label: "共感型 💫",
        summary: "你對情緒有著敏銳的感知，不只能察覺自己，也能感受他人的情緒。這份柔軟是禮物，但也需要學會保護自己。",
        strengths: [
          "能深刻理解他人的感受",
          "情緒覺察能力強",
          "擅長安慰與陪伴",
          "建立深度連結的能力"
        ],
        weaknesses: [
          "容易被他人情緒影響",
          "可能過度承擔他人的痛苦",
          "需要學習情緒界線",
          "有時會忽略自己的需求"
        ],
        advice: "感受他人的情緒是一種天賦，但記得你不需要承擔所有的痛苦。學習在同理與保護自己之間找到平衡，你才能持續給予溫暖。",
      };
    }

    // 預設：成長型
    else {
      return {
        type: "growing",
        label: "成長型 🌱",
        summary: "你正在學習如何與自己的情緒相處，這是一段持續的旅程。每一次的覺察與練習，都讓你更靠近真實的自己。",
        strengths: [
          "願意探索自己的情緒",
          "對成長保持開放",
          "懂得覺察與反思",
          "正在建立健康的情緒模式"
        ],
        weaknesses: [
          "有時還不確定如何表達",
          "需要更多練習與經驗",
          "可能在不同模式間搖擺"
        ],
        advice: "成長沒有終點，你願意探索已經是很大的勇氣。持續覺察自己的情緒狀態，給自己時間與空間，情緒會慢慢成為你的朋友。",
      };
    }
  },
};

// 親密與獨立傾向測驗
const intimacyQuiz: Quiz = {
  slug: "intimacy",
  title: "親密與獨立傾向",
  description: "了解你在關係中對親密連結與個人空間的需求平衡。",
  series: "emotional-journey",
  order: 3,
  themeColor: "#5CB85C",
  icon: "🌿",
  introText: "親密與距離之間，藏著每個人最獨特的節奏。",
  estTimeMins: 5,
  questions: [
    {
      id: "q1",
      text: "我喜歡與伴侶分享生活中的大小事",
      type: "scale5",
      dimension: "intimacy",
    },
    {
      id: "q2",
      text: "我需要有自己的私人時間和空間",
      type: "scale5",
      dimension: "independence",
    },
    {
      id: "q3",
      text: "長時間獨處會讓我感到寂寞",
      type: "scale5",
      dimension: "intimacy",
    },
    {
      id: "q4",
      text: "我重視保有自己的興趣和社交圈",
      type: "scale5",
      dimension: "independence",
    },
    {
      id: "q5",
      text: "我希望與伴侶有深度的情感連結",
      type: "scale5",
      dimension: "intimacy",
    },
    {
      id: "q6",
      text: "我享受一個人的時光，不需要隨時有人陪伴",
      type: "scale5",
      dimension: "independence",
    },
    {
      id: "q7",
      text: "我希望與伴侶幾乎每天都見面或聯繫",
      type: "scale5",
      dimension: "intimacy",
    },
    {
      id: "q8",
      text: "我認為維持自我認同比融入關係更重要",
      type: "scale5",
      dimension: "independence",
    },
  ],
  scoreToResult: (scores) => {
    const intimacy = scores.intimacy || 0;
    const independence = scores.independence || 0;

    // 黏著型：高親密 + 低獨立
    if (intimacy >= 60 && independence <= 40) {
      return {
        type: "closeness-seeking",
        label: "黏著型 💕",
        summary: "你渴望深度的連結與陪伴，關係中的親密感是你的安全感來源。你願意投入大量心力在關係中，但有時也需要學習給自己與對方一些空間。",
        strengths: [
          "情感投入且忠誠專一",
          "擅長營造親密氛圍",
          "願意為關係付出",
          "重視深度情感連結"
        ],
        weaknesses: [
          "可能過度依賴伴侶",
          "需要學習獨處",
          "容易失去個人特質",
          "伴侶可能感到壓力"
        ],
        advice: "每個人對距離的需要不同，找到讓你呼吸的節奏就好。親密是美好的，但保留一些獨處的時間，反而能讓關係更有彈性。你的價值不只在關係中，也在你自己身上。",
      };
    }

    // 自立型：高獨立 + 低親密
    else if (independence >= 60 && intimacy <= 40) {
      return {
        type: "independent",
        label: "自立型 🦅",
        summary: "你重視個人空間與自主權，獨處讓你感到充電而非孤單。這份獨立讓你保持完整的自我，但有時也需要練習讓他人靠近。",
        strengths: [
          "自主獨立不依賴",
          "尊重彼此界線",
          "保持自我完整",
          "不會失去自我認同"
        ],
        weaknesses: [
          "可能讓伴侶感到疏離",
          "需要練習親密表達",
          "有時顯得冷漠",
          "難以建立深度連結"
        ],
        advice: "獨立是力量，但親密不等於失去自我。試著在保有空間的同時，也讓伴侶看見你的內心。真正的親密是兩個完整的人相遇，而非失去自己。",
      };
    }

    // 抽離型：低親密 + 高獨立（迴避）
    else if (intimacy <= 35 && independence >= 50) {
      return {
        type: "withdrawn",
        label: "抽離型 🌙",
        summary: "你傾向與他人保持距離，親密關係讓你感到不安或壓力。這可能是過去經驗的保護機制，但也讓你錯過了真正的連結。",
        strengths: [
          "能自給自足",
          "不輕易受他人影響",
          "保護好自己的界線",
          "獨立處理問題"
        ],
        weaknesses: [
          "害怕過度靠近",
          "難以建立深度關係",
          "可能感到孤獨",
          "他人難以走進你的心"
        ],
        advice: "保持距離是為了保護自己，但你值得被愛與連結。試著在安全的關係中，慢慢練習靠近。親密不會讓你失去自由，反而會讓你更完整。",
      };
    }

    // 平衡型：兩者都適中
    else if (Math.abs(intimacy - independence) <= 20) {
      return {
        type: "balanced",
        label: "平衡型 ⚖️",
        summary: "你在親密與獨立之間找到了自己的節奏，既能享受深度連結，也懂得保有個人空間。這份平衡讓你的關係更健康而有彈性。",
        strengths: [
          "能彈性調整距離",
          "關係健康不極端",
          "互相尊重空間",
          "懂得溝通需求"
        ],
        weaknesses: [
          "需要與伴侶持續溝通",
          "平衡需要練習維持",
          "可能在不同階段搖擺"
        ],
        advice: "持續與伴侶溝通彼此的需求，保持平衡。每個人在不同時期對距離的需求會改變，保持覺察與對話，讓關係隨著你們一起成長。",
      };
    }

    // 預設：成長型
    else {
      return {
        type: "exploring",
        label: "探索型 🌿",
        summary: "你正在探索自己在關係中的需求，學習在親密與獨立之間找到舒服的位置。這是一段持續的旅程，給自己時間去感受。",
        strengths: [
          "願意探索自己的需求",
          "對關係保持開放",
          "持續學習與成長",
          "有彈性調整的空間"
        ],
        weaknesses: [
          "有時還不確定自己的需求",
          "可能在兩端間搖擺",
          "需要更多經驗與練習"
        ],
        advice: "沒有標準答案，每個人的節奏都不同。持續覺察自己在關係中的感受，誠實面對自己的需求，你會慢慢找到屬於你的平衡點。",
      };
    }
  },
};

// 人際邊界傾向測驗
const boundaryQuiz: Quiz = {
  slug: "boundary",
  title: "人際邊界傾向",
  description: "探索你在人際關係中設立與維護界線的方式。",
  series: "emotional-journey",
  order: 4,
  themeColor: "#888888",
  icon: "🪨",
  introText: "界線，不是拒絕，而是一種成熟的自我尊重。",
  estTimeMins: 5,
  questions: [
    {
      id: "q1",
      text: "我能清楚地向他人說「不」",
      type: "scale5",
      dimension: "clarity",
    },
    {
      id: "q2",
      text: "我常常為了維持關係而犧牲自己的需求",
      type: "scale5",
      dimension: "overgiving",
    },
    {
      id: "q3",
      text: "當他人越界時，我會直接表達不舒服",
      type: "scale5",
      dimension: "assertion",
    },
    {
      id: "q4",
      text: "我擔心設立界線會傷害他人的感受",
      type: "scale5",
      dimension: "guilt",
    },
    {
      id: "q5",
      text: "我清楚知道自己的底線在哪裡",
      type: "scale5",
      dimension: "awareness",
    },
    {
      id: "q6",
      text: "我會因為不好意思而答應不想做的事",
      type: "scale5",
      dimension: "overgiving",
    },
    {
      id: "q7",
      text: "我能在不感到內疚的情況下拒絕他人",
      type: "scale5",
      dimension: "clarity",
    },
    {
      id: "q8",
      text: "我認為照顧自己的需求與照顧他人同樣重要",
      type: "scale5",
      dimension: "awareness",
    },
  ],
  scoreToResult: (scores) => {
    const clarity = scores.clarity || 0;
    const assertion = scores.assertion || 0;
    const overgiving = scores.overgiving || 0;
    const guilt = scores.guilt || 0;
    const awareness = scores.awareness || 0;

    // 健康型：高清晰度 + 高覺察 + 低過度付出
    if (clarity >= 60 && awareness >= 60 && overgiving <= 40) {
      return {
        type: "healthy",
        label: "健康型 ⚖️",
        summary: "你懂得在尊重他人的同時也保護自己，界線清晰且有彈性。你知道說「不」不等於不愛對方，而是一種成熟的自我尊重。",
        strengths: [
          "能溫柔而堅定地拒絕",
          "清楚自己的底線",
          "平衡自己與他人的需求",
          "不會因設限而內疚"
        ],
        weaknesses: [
          "偶爾可能顯得太理性",
          "需要在某些情境中保持彈性",
          "可能被誤解為冷漠"
        ],
        advice: "你的界線是你的力量。繼續維持這份平衡，同時記得界線也可以根據不同關係與情境調整。健康的界線不是牆，而是門，你決定何時開啟。",
      };
    }

    // 柔軟型：高過度付出 + 高內疚感
    else if (overgiving >= 50 && guilt >= 50) {
      return {
        type: "soft",
        label: "柔軟型 🌸",
        summary: "你是個溫柔善良的人，總是把他人需求放在自己之前。這份柔軟是美麗的，但過度的付出也在消耗你自己。你害怕拒絕會傷害關係，卻忘了持續犧牲也在傷害你自己。",
        strengths: [
          "體貼他人感受",
          "願意為關係付出",
          "善於同理",
          "營造和諧氛圍"
        ],
        weaknesses: [
          "容易被他人利用",
          "累積過多壓力與委屈",
          "失去自我需求感知",
          "可能導致關係失衡"
        ],
        advice: "你的善良不需要以犧牲自己為代價。拒絕不是自私，而是誠實。試著從小事開始練習說「不」，觀察對方的反應——真正愛你的人會尊重你的界線。你值得同樣的溫柔對待。",
      };
    }

    // 模糊型：低清晰度 + 低覺察 + 低表達
    else if (clarity <= 40 && awareness <= 40 && assertion <= 40) {
      return {
        type: "blurry",
        label: "模糊型 🌫️",
        summary: "你的界線比較模糊，可能不太確定自己的底線在哪裡，也難以清楚表達。這可能讓你經常感到被侵犯，卻又不知如何應對。",
        strengths: [
          "具有彈性與適應力",
          "不輕易與人衝突",
          "保持關係和諧",
          "願意配合他人"
        ],
        weaknesses: [
          "容易被他人影響決定",
          "累積未表達的不適",
          "難以識別越界行為",
          "可能吸引不尊重界線的人"
        ],
        advice: "建立界線的第一步是覺察——開始注意身體與情緒的訊號，當你感到不舒服、疲憊、勉強時，那就是界線被侵犯的提示。寫下這些時刻，慢慢認識自己的底線。界線不是天生就有的，是可以練習建立的。",
      };
    }

    // 過硬型：高清晰但低彈性（高assertion + 低awareness情境）
    else if (assertion >= 60 && clarity >= 60 && overgiving <= 30) {
      return {
        type: "rigid",
        label: "堅固型 🗿",
        summary: "你有非常清楚的界線，能堅定地拒絕與表達。這份堅定保護了你，但有時也可能讓你顯得過於防衛或不易親近。",
        strengths: [
          "不會被輕易侵犯",
          "清楚表達自己立場",
          "自我保護意識強",
          "不被他人情緒勒索"
        ],
        weaknesses: [
          "可能錯失深度連結",
          "他人感到難以靠近",
          "缺乏彈性與同理",
          "關係可能較為表面"
        ],
        advice: "界線是為了保護，而非孤立。試著在堅定中加入一些柔軟，觀察對方的意圖而非只看行為。健康的界線是有彈性的——對值得信任的人，你可以選擇適時打開那道門。堅強不代表不能柔軟。",
      };
    }

    // 成長型：其他情況
    else {
      return {
        type: "growing",
        label: "成長型 🌱",
        summary: "你正在學習建立健康的人際界線，可能有時堅定、有時柔軟，還在摸索屬於自己的方式。這是一段重要的成長旅程。",
        strengths: [
          "願意覺察與調整",
          "對界線議題保持開放",
          "有學習成長的意願",
          "逐漸建立自我保護"
        ],
        weaknesses: [
          "有時不確定如何設限",
          "可能在不同模式間搖擺",
          "需要更多練習與經驗"
        ],
        advice: "每一次的設限都是練習，不需要一次做到完美。從低風險的情境開始（比如對陌生人說不），逐漸建立信心。記住：界線不是為了拒絕愛，而是為了讓愛能夠健康地流動。",
      };
    }
  },
};

// 核心信念探索測驗
const coreBeliefQuiz: Quiz = {
  slug: "core-belief",
  title: "核心信念探索",
  description: "深入了解影響你人際關係的核心信念與價值觀。",
  series: "emotional-journey",
  order: 5,
  themeColor: "#9B59B6",
  icon: "🌙",
  introText: "在愛與恐懼之下，藏著我們看待自己的方式。",
  estTimeMins: 5,
  questions: [
    {
      id: "q1",
      text: "我相信自己值得被愛",
      type: "scale5",
      dimension: "self-worth",
    },
    {
      id: "q2",
      text: "我認為他人基本上是值得信任的",
      type: "scale5",
      dimension: "trust",
    },
    {
      id: "q3",
      text: "我覺得自己需要很努力才能被接納",
      type: "scale5",
      dimension: "conditional-worth",
    },
    {
      id: "q4",
      text: "我相信真誠表達自己不會被拒絕",
      type: "scale5",
      dimension: "authenticity",
    },
    {
      id: "q5",
      text: "我擔心一旦他人了解真實的我，就會離開",
      type: "scale5",
      dimension: "fear-of-rejection",
    },
    {
      id: "q6",
      text: "我認為世界基本上是安全的",
      type: "scale5",
      dimension: "world-safety",
    },
    {
      id: "q7",
      text: "我不需要偽裝就能被他人接納",
      type: "scale5",
      dimension: "authenticity",
    },
    {
      id: "q8",
      text: "我相信自己有能力處理關係中的困難",
      type: "scale5",
      dimension: "self-efficacy",
    },
  ],
  scoreToResult: (scores) => {
    const selfWorth = scores["self-worth"] || 0;
    const trust = scores.trust || 0;
    const conditionalWorth = scores["conditional-worth"] || 0;
    const fearOfRejection = scores["fear-of-rejection"] || 0;
    const authenticity = scores.authenticity || 0;
    const worldSafety = scores["world-safety"] || 0;

    // 穩定信任型：高自我價值 + 高信任 + 低恐懼
    if (selfWorth >= 60 && trust >= 60 && fearOfRejection <= 40) {
      return {
        type: "secure-belief",
        label: "穩定信任型 ✨",
        summary: "你擁有健康的核心信念，相信自己值得被愛，也相信他人基本上是善意的。這份內在的安全感讓你能在關係中既開放又自在。",
        strengths: [
          "對自己有穩定的價值感",
          "能信任並開放心胸",
          "不害怕展現真實自我",
          "關係中感到自在安全"
        ],
        weaknesses: [
          "可能低估他人的不安全感",
          "有時對他人期待過高",
          "需要理解不是每個人都有同樣的安全感"
        ],
        advice: "你的內在安全感是珍貴的禮物。繼續保持這份對自己與他人的信任，同時也溫柔理解那些還在建立安全感的人。你的存在本身，就能為他人帶來安全感。",
      };
    }

    // 自我懷疑型：低自我價值 + 高條件價值感
    else if (selfWorth <= 40 && conditionalWorth >= 50) {
      return {
        type: "self-doubt",
        label: "自我懷疑型 💭",
        summary: "你可能相信自己需要努力表現、符合期待才能被愛。這份信念讓你不斷證明自己的價值，卻也讓你疲憊不堪。你值得的愛，不需要用努力交換。",
        strengths: [
          "努力上進追求成長",
          "對自己有高標準",
          "願意為關係付出",
          "具有自我覺察能力"
        ],
        weaknesses: [
          "持續的自我懷疑與批判",
          "害怕不夠好而被拋棄",
          "難以接受無條件的愛",
          "容易過度付出以證明價值"
        ],
        advice: "你的價值不需要證明，它本來就在那裡。試著問自己：「如果我什麼都不做，我還值得被愛嗎？」答案永遠是肯定的。練習對自己說：「我就是值得的，不需要理由。」",
      };
    }

    // 警戒防備型：低信任 + 高恐懼拒絕
    else if (trust <= 40 && fearOfRejection >= 50) {
      return {
        type: "guarded",
        label: "警戒防備型 🛡️",
        summary: "你可能在過去受過傷，學會用警戒保護自己。你害怕再次被拒絕，所以選擇先不靠近。這是一種保護機制，但也讓你與深度連結保持距離。",
        strengths: [
          "自我保護意識強",
          "不會輕易受傷",
          "謹慎評估關係",
          "能察覺潛在風險"
        ],
        weaknesses: [
          "難以信任他人",
          "害怕展現脆弱",
          "可能錯過真正的連結",
          "活在防備與恐懼中"
        ],
        advice: "你的警戒來自過去的傷，這不是你的錯。但不是每個人都會傷害你。試著在安全的關係中，慢慢練習放下一點點防備。真正的親密，需要冒一點被拒絕的風險——但那也是活著的證明。",
      };
    }

    // 世界焦慮型：低世界安全感
    else if (worldSafety <= 35) {
      return {
        type: "world-anxious",
        label: "世界焦慮型 🌊",
        summary: "你可能對世界抱持著不安全感，總是擔心會發生不好的事。這份焦慮也延伸到關係中，讓你難以真正放鬆與信任。",
        strengths: [
          "謹慎評估風險",
          "對危險保持警覺",
          "做事周全謹慎",
          "有危機意識"
        ],
        weaknesses: [
          "持續的焦慮與擔憂",
          "難以放鬆享受關係",
          "可能過度控制以獲得安全感",
          "錯過當下的美好"
        ],
        advice: "世界確實有風險，但也充滿溫柔。試著練習「當下安全」——此時此刻，你是安全的。不需要為未發生的事提前擔憂。每天找一個小時刻，真正放鬆，感受「現在是安全的」。",
      };
    }

    // 真實性掙扎型：低真實性 + 高恐懼
    else if (authenticity <= 40 && fearOfRejection >= 50) {
      return {
        type: "authenticity-struggle",
        label: "面具掙扎型 🎭",
        summary: "你可能習慣戴著面具生活，害怕真實的自己不被接納。你努力扮演他人期待的角色，卻也因此失去了與自己的連結。",
        strengths: [
          "善於適應不同情境",
          "體貼他人期待",
          "社交技巧良好",
          "能扮演多種角色"
        ],
        weaknesses: [
          "不確定真實的自己是誰",
          "感到疲憊與空虛",
          "難以建立真實連結",
          "害怕被看見真實面貌"
        ],
        advice: "面具戴久了，我們會忘記臉的形狀。試著在安全的關係中，卸下一點點偽裝——也許是一個真實的情緒、一句誠實的「我不知道」。你會發現，真實的你，比你想像的更值得被愛。",
      };
    }

    // 成長重建型：其他情況
    else {
      return {
        type: "growing-belief",
        label: "成長重建型 🌱",
        summary: "你正在重新認識自己，重建更健康的核心信念。你可能有時相信自己、有時懷疑，這是正常的成長過程。每一次選擇相信，都在重塑你的內在世界。",
        strengths: [
          "願意面對與改變",
          "對自己保持覺察",
          "持續學習成長",
          "有勇氣重建信念"
        ],
        weaknesses: [
          "信念可能有波動",
          "有時還不確定自己的價值",
          "需要持續練習與強化"
        ],
        advice: "核心信念不是一天建立的，改變它也需要時間。每一次你選擇善待自己、每一次你允許自己被愛、每一次你相信「我值得」，都在一點一點重寫你的內在腳本。給自己時間，你正在長成更完整的自己。",
      };
    }
  },
};

// 所有測驗的集合
export const quizzes: Quiz[] = [
  attachmentQuiz,
  emotionStyleQuiz,
  intimacyQuiz,
  boundaryQuiz,
  coreBeliefQuiz,
];

// 根據 slug 取得測驗
export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

// 取得所有測驗的基本資訊（用於列表頁）
export function getAllQuizzes() {
  return quizzes.map((q) => ({
    slug: q.slug,
    title: q.title,
    description: q.description,
    series: q.series,
    order: q.order,
    themeColor: q.themeColor,
    icon: q.icon,
    estTimeMins: q.estTimeMins,
  }));
}
