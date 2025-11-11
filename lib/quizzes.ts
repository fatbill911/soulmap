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
  estTimeMins: 4,
  questions: [
    {
      id: "q1",
      text: "當我感到難過時，我會主動向他人傾訴",
      type: "scale5",
      dimension: "expression",
    },
    {
      id: "q2",
      text: "我傾向壓抑自己的負面情緒",
      type: "scale5",
      dimension: "suppression",
    },
    {
      id: "q3",
      text: "我能清楚辨識並說出自己的情緒",
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
  ],
  scoreToResult: (scores) => {
    const expression = scores.expression || 0;
    const suppression = scores.suppression || 0;

    if (expression >= 4 && suppression <= 2) {
      return {
        type: "expressive",
        label: "表達型 🔥",
        summary: "你善於表達情緒，不害怕展現真實感受。",
        strengths: ["情感真誠", "溝通直接", "不累積負面情緒"],
        weaknesses: ["可能過於情緒化", "需要注意表達時機"],
        advice: "繼續保持真誠，同時學習在適當時機表達情緒。",
      };
    } else if (suppression >= 4) {
      return {
        type: "suppressive",
        label: "壓抑型 ❄️",
        summary: "你傾向壓抑情緒，不輕易向外表達感受。",
        strengths: ["理性冷靜", "不易衝動"],
        weaknesses: ["累積情緒壓力", "可能突然爆發"],
        advice: "找到安全的方式釋放情緒，避免長期壓抑。",
      };
    } else {
      return {
        type: "balanced",
        label: "平衡型 🌊",
        summary: "你在表達與控制情緒間取得平衡。",
        strengths: ["情緒穩定", "懂得適時表達"],
        weaknesses: ["可能需要更多練習"],
        advice: "持續覺察自己的情緒狀態，保持平衡。",
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
  estTimeMins: 4,
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
  ],
  scoreToResult: (scores) => {
    const intimacy = scores.intimacy || 0;
    const independence = scores.independence || 0;

    if (intimacy >= 4 && independence <= 2) {
      return {
        type: "intimacy-focused",
        label: "親密優先型 💕",
        summary: "你重視深度連結，渴望與伴侶緊密相依。",
        strengths: ["情感投入", "忠誠專一", "營造親密感"],
        weaknesses: ["可能過度依賴", "需要保留個人空間"],
        advice: "在親密中保持自我成長，避免失去個人特質。",
      };
    } else if (independence >= 4 && intimacy <= 2) {
      return {
        type: "independence-focused",
        label: "獨立優先型 🦅",
        summary: "你重視個人空間，需要自由與獨立。",
        strengths: ["自主獨立", "尊重界線", "自我完整"],
        weaknesses: ["可能疏離感", "需要練習親密"],
        advice: "在獨立中學習開放，親密不等於失去自我。",
      };
    } else {
      return {
        type: "balanced",
        label: "平衡型 ⚖️",
        summary: "你在親密與獨立間找到良好平衡。",
        strengths: ["彈性調整", "關係健康", "互相尊重"],
        weaknesses: ["需要溝通需求"],
        advice: "持續與伴侶溝通彼此的需求，保持平衡。",
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
  estTimeMins: 4,
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
      dimension: "flexibility",
      reverse: true,
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
  ],
  scoreToResult: (scores) => {
    const clarity = scores.clarity || 0;
    const assertion = scores.assertion || 0;

    if (clarity >= 4 && assertion >= 4) {
      return {
        type: "clear",
        label: "清晰型 🗿",
        summary: "你有清楚的界線，能堅定維護自己的需求。",
        strengths: ["自我保護", "溝通直接", "尊重自己"],
        weaknesses: ["可能顯得嚴格", "需要彈性"],
        advice: "在堅定中保持溫柔，界線可以有彈性。",
      };
    } else if (clarity <= 2 || assertion <= 2) {
      return {
        type: "fuzzy",
        label: "模糊型 🌫️",
        summary: "你的界線較為模糊，容易被他人影響。",
        strengths: ["善解人意", "關係和諧"],
        weaknesses: ["容易被侵犯", "累積壓力"],
        advice: "練習覺察自己的感受，學習溫柔而堅定地說不。",
      };
    } else {
      return {
        type: "developing",
        label: "成長型 🌱",
        summary: "你正在學習建立健康的人際界線。",
        strengths: ["自我覺察", "願意成長"],
        weaknesses: ["仍在練習中"],
        advice: "持續練習設立界線，每次小小的堅持都是進步。",
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
      reverse: true,
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
      reverse: true,
    },
  ],
  scoreToResult: (scores) => {
    const selfWorth = scores["self-worth"] || 0;
    const trust = scores.trust || 0;

    if (selfWorth >= 4 && trust >= 4) {
      return {
        type: "secure-belief",
        label: "安全核心 ✨",
        summary: "你擁有健康的核心信念，相信自己值得愛與信任。",
        strengths: ["自我價值穩定", "對他人開放", "關係健康"],
        weaknesses: ["可能低估他人的不安全感"],
        advice: "保持這份內在安全感，同時理解他人可能有不同的核心信念。",
      };
    } else if (selfWorth <= 2 || trust <= 2) {
      return {
        type: "insecure-belief",
        label: "不安核心 🌑",
        summary: "你的核心信念中存在不安全感，可能影響關係品質。",
        strengths: ["自我覺察", "謹慎保護自己"],
        weaknesses: ["自我懷疑", "難以信任"],
        advice: "核心信念可以改變，考慮尋求專業協助，重建內在安全感。",
      };
    } else {
      return {
        type: "growing-belief",
        label: "成長核心 🌓",
        summary: "你正在重建更健康的核心信念。",
        strengths: ["願意改變", "自我覺察"],
        weaknesses: ["仍有波動"],
        advice: "持續練習自我肯定，每個正向經驗都在重塑信念。",
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
