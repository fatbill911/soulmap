// 配對分析類型定義
export interface MatchInput {
  aSign: string;
  bSign: string;
  status: "crush" | "dating" | "stable" | "stuck"; // 曖昧、交往中、穩定、卡住
}

export interface MatchResult {
  score: number; // 合拍度 0-100
  dynamic: string; // 相處模式描述
  hotspot: string; // 容易吵架的點
  tip: string; // 建議溝通法
}

// 星座元素分類
const elementMap: Record<string, string> = {
  aries: "fire",
  leo: "fire",
  sagittarius: "fire",
  taurus: "earth",
  virgo: "earth",
  capricorn: "earth",
  gemini: "air",
  libra: "air",
  aquarius: "air",
  cancer: "water",
  scorpio: "water",
  pisces: "water",
};

// 元素相性分數基礎值
const elementCompatibility: Record<string, Record<string, number>> = {
  fire: { fire: 85, earth: 60, air: 80, water: 50 },
  earth: { fire: 60, earth: 80, air: 65, water: 75 },
  air: { fire: 80, earth: 65, air: 85, water: 60 },
  water: { fire: 50, earth: 75, air: 60, water: 90 },
};

// 特定星座配對的修正值與特色描述
const specificPairings: Record<string, Record<string, any>> = {
  aries: {
    leo: {
      adjust: 10,
      dynamic: "雙火相遇，熱情如火山爆發。你們都愛當老大，但也因此互相欣賞對方的強勢。",
      hotspot: "兩個人都想主導，誰也不讓誰。",
      tip: "輪流當leader，今天你做主，明天換我。把競爭變成合作。",
    },
    cancer: {
      adjust: -5,
      dynamic: "火遇到水，你的衝動常常嚇到敏感的巨蟹。你覺得對方太黏，對方覺得你太冷。",
      hotspot: "你說話太直接，巨蟹玻璃心碎滿地。",
      tip: "說話前數到三，用「我感覺」開頭而不是「你都...」。多抱抱，少說教。",
    },
    libra: {
      adjust: 5,
      dynamic: "你衝動，天秤猶豫，節奏完全不同。但你的果斷能幫天秤做決定，天秤的柔和能軟化你的稜角。",
      hotspot: "你等不及天秤的慢慢考慮，直接就衝了。",
      tip: "給天秤時間思考，但設個截止日。天秤要學會說出真實想法，不要只是配合。",
    },
  },
  taurus: {
    scorpio: {
      adjust: 5,
      dynamic: "對宮組合，像照鏡子。你們都很固執、佔有慾強，但也因此理解彼此的需求。",
      hotspot: "兩個人都不肯退讓，冷戰可以持續到天荒地老。",
      tip: "設定「冷戰上限時間」，比如24小時後必須開口說話。先道歉的不是輸家。",
    },
    aquarius: {
      adjust: -10,
      dynamic: "你要穩定，水瓶要自由。你覺得對方飄忽不定，對方覺得你太死板。完全不同世界的人。",
      hotspot: "你想要承諾，水瓶想要空間。",
      tip: "接受你們的不同，不要試圖改變對方。在穩定與自由間找到雙方都能接受的平衡點。",
    },
  },
  gemini: {
    sagittarius: {
      adjust: 8,
      dynamic: "對宮組合，你們都愛自由、愛聊天。一個玩思想，一個玩冒險，永遠有新話題。",
      hotspot: "兩個人都太散漫，沒人負責實際面。",
      tip: "偶爾需要一個人當「大人」，輪流負責處理實際事務。玩樂很重要，但別忘了付帳單。",
    },
    virgo: {
      adjust: -5,
      dynamic: "你隨性多變，處女追求完美。你覺得對方太挑剔，對方覺得你太混亂。",
      hotspot: "處女的碎念讓你想逃跑。",
      tip: "處女要學會放過小細節，雙子要多一點責任感。互相欣賞對方的優點而非放大缺點。",
    },
  },
  cancer: {
    pisces: {
      adjust: 12,
      dynamic: "雙水組合，情感共鳴強烈。你們不用說話就懂對方，像靈魂伴侶。",
      hotspot: "兩個人都太敏感，一點小事就想太多。",
      tip: "直接說出來，不要猜來猜去。設立情緒界線，不要無限吸收對方的情緒。",
    },
    capricorn: {
      adjust: 3,
      dynamic: "對宮組合，你感性，摩羯理性。你提供溫暖，摩羯提供安全感，互補得剛好。",
      hotspot: "你需要情感回應，摩羯只會給實際行動。",
      tip: "摩羯要學會說甜言蜜語，巨蟹要看見摩羯的實際付出就是愛的證明。",
    },
  },
  leo: {
    aquarius: {
      adjust: -5,
      dynamic: "對宮組合，你要關注，水瓶要距離。你熱情如火，對方冷靜如冰。",
      hotspot: "你覺得對方太冷淡，對方覺得你太drama。",
      tip: "獅子要接受水瓶的理性不代表不愛，水瓶要多給獅子一些掌聲與肯定。",
    },
  },
  virgo: {
    pisces: {
      adjust: 0,
      dynamic: "對宮組合，你理性實際，雙魚感性夢幻。你幫雙魚落地，雙魚教你作夢。",
      hotspot: "你的批判讓雙魚受傷，雙魚的混亂讓你抓狂。",
      tip: "處女要溫柔一點批評，雙魚要實際一點行動。互相學習對方的世界觀。",
    },
  },
};

// 根據關係狀態調整分數與建議
function adjustByStatus(
  status: string,
  baseScore: number,
  dynamic: string,
  hotspot: string,
  tip: string
): MatchResult {
  switch (status) {
    case "crush":
      return {
        score: baseScore,
        dynamic: `【曖昧期】${dynamic} 現在是互相試探的階段，享受這份不確定的心動感。`,
        hotspot: `最容易卡住的點：${hotspot} 在還不夠了解對方前，容易因誤解而錯過。`,
        tip: `曖昧攻略：${tip} 多創造兩人相處的機會，用行動而非猜測了解對方。`,
      };
    case "dating":
      return {
        score: baseScore - 5, // 熱戀期容易忽略問題，稍微降低分數提醒
        dynamic: `【熱戀期】${dynamic} 現在一切都是美好的，但也要看見真實的彼此。`,
        hotspot: `蜜月期後的考驗：${hotspot} 當激情退去，這會是你們第一個要面對的課題。`,
        tip: `交往建議：${tip} 享受甜蜜但也要建立溝通模式，為長遠關係打基礎。`,
      };
    case "stable":
      return {
        score: baseScore + 5, // 穩定期加分
        dynamic: `【穩定期】${dynamic} 你們已經建立了相處模式，這份穩定值得珍惜。`,
        hotspot: `平淡中的警訊：${hotspot} 太過安逸可能讓關係失去活力。`,
        tip: `長期經營：${tip} 持續為關係注入新意，固定的約會或共同目標能維持熱度。`,
      };
    case "stuck":
      return {
        score: baseScore - 10, // 卡住時降低分數，表示需要努力
        dynamic: `【卡關期】${dynamic} 關係遇到瓶頸了，但這也是深化的機會。`,
        hotspot: `目前的核心問題：${hotspot} 這個模式一直在重複，需要打破。`,
        tip: `突破建議：${tip} 考慮尋求專業諮商，或給彼此空間重新思考這段關係的意義。`,
      };
    default:
      return { score: baseScore, dynamic, hotspot, tip };
  }
}

// 主要配對分析函式
export function analyzeMatch(input: MatchInput): MatchResult {
  const { aSign, bSign, status } = input;

  const aElement = elementMap[aSign.toLowerCase()];
  const bElement = elementMap[bSign.toLowerCase()];

  if (!aElement || !bElement) {
    return {
      score: 50,
      dynamic: "星座資料不完整，無法進行完整分析。",
      hotspot: "請確認輸入的星座是否正確。",
      tip: "先了解彼此的星座特質吧！",
    };
  }

  // 基礎相性分數
  let baseScore = elementCompatibility[aElement][bElement];

  // 檢查是否有特定配對的調整
  let dynamic = `${aSign}與${bSign}的相處，帶著${aElement}與${bElement}元素的能量交流。`;
  let hotspot = "溝通方式與需求的差異。";
  let tip = "多傾聽、少評判，理解對方的世界觀與你不同。";

  // 檢查特定配對（A對B）
  if (specificPairings[aSign]?.[bSign]) {
    const specific = specificPairings[aSign][bSign];
    baseScore += specific.adjust;
    dynamic = specific.dynamic;
    hotspot = specific.hotspot;
    tip = specific.tip;
  }
  // 檢查反向配對（B對A）
  else if (specificPairings[bSign]?.[aSign]) {
    const specific = specificPairings[bSign][aSign];
    baseScore += specific.adjust;
    dynamic = specific.dynamic;
    hotspot = specific.hotspot;
    tip = specific.tip;
  }
  // 使用通用元素描述
  else {
    dynamic = getGenericDynamic(aElement, bElement);
    hotspot = getGenericHotspot(aElement, bElement);
    tip = getGenericTip(aElement, bElement);
  }

  // 根據關係狀態調整結果
  return adjustByStatus(status, baseScore, dynamic, hotspot, tip);
}

// 通用元素相處模式描述
function getGenericDynamic(aElement: string, bElement: string): string {
  if (aElement === bElement) {
    return `同元素的你們有相似的節奏與價值觀，容易理解彼此，但也可能因為太像而缺乏互補。`;
  }

  const dynamics: Record<string, string> = {
    "fire-earth": "火元素的熱情遇上土元素的穩重，你想衝他想穩，節奏大不同。",
    "fire-air": "火元素遇上風元素，風助火勢，你們是互相激發的組合。",
    "fire-water": "火遇到水，激情遇上感性，可以是蒸汽也可能互相澆熄。",
    "earth-air": "土元素的實際與風元素的理想，一個務實一個飄逸。",
    "earth-water": "土元素與水元素，滋養與穩定的組合，能互相支持成長。",
    "air-water": "風元素的理性與水元素的感性，一個活在腦袋一個活在心裡。",
  };

  const key = [aElement, bElement].sort().join("-");
  return dynamics[key] || "你們帶著不同的能量相遇，這份差異是挑戰也是禮物。";
}

// 通用衝突點描述
function getGenericHotspot(aElement: string, bElement: string): string {
  if (aElement === bElement) {
    return "太過相似，容易陷入同樣的盲點或固執己見。";
  }

  const hotspots: Record<string, string> = {
    "fire-earth": "火元素嫌土元素太慢太悶，土元素嫌火元素太急太衝。",
    "fire-air": "火元素要行動，風元素還在想，偶爾節奏不同步。",
    "fire-water": "火元素的直接常傷到水元素的敏感，水元素的情緒讓火元素無所適從。",
    "earth-air": "土元素要實際答案，風元素給抽象想法，雞同鴨講。",
    "earth-water": "土元素的現實主義vs水元素的情緒需求，一個要解決問題一個要被理解。",
    "air-water": "風元素的邏輯分析讓水元素覺得冷漠，水元素的情緒讓風元素不知所措。",
  };

  const key = [aElement, bElement].sort().join("-");
  return hotspots[key] || "不同的世界觀與溝通方式。";
}

// 通用建議
function getGenericTip(aElement: string, bElement: string): string {
  if (aElement === bElement) {
    return "找到你們之間的差異點並珍惜，不要變成對方的複製人。";
  }

  const tips: Record<string, string> = {
    "fire-earth": "火元素學習耐心與規劃，土元素偶爾跟著衝動一下。在快與慢之間找平衡。",
    "fire-air": "保持你們的創意火花，但也要有人負責落地執行。夢想很大，但別忘了實踐。",
    "fire-water": "火元素要溫柔一點，水元素要勇敢一點。多擁抱少爭論。",
    "earth-air": "土元素給風元素實踐的方向，風元素給土元素想像的空間。務實與理想都重要。",
    "earth-water": "土元素要學會同理感受不只是解決問題，水元素要感謝實際付出就是愛。",
    "air-water": "風元素偶爾放下邏輯用心感受，水元素試著用語言表達而非期待對方猜測。",
  };

  const key = [aElement, bElement].sort().join("-");
  return tips[key] || "理解與尊重彼此的不同，在差異中找到互補的美好。";
}

// 取得所有星座選項（用於表單）
export const zodiacOptions = [
  { value: "aries", label: "牡羊座 ♈" },
  { value: "taurus", label: "金牛座 ♉" },
  { value: "gemini", label: "雙子座 ♊" },
  { value: "cancer", label: "巨蟹座 ♋" },
  { value: "leo", label: "獅子座 ♌" },
  { value: "virgo", label: "處女座 ♍" },
  { value: "libra", label: "天秤座 ♎" },
  { value: "scorpio", label: "天蠍座 ♏" },
  { value: "sagittarius", label: "射手座 ♐" },
  { value: "capricorn", label: "摩羯座 ♑" },
  { value: "aquarius", label: "水瓶座 ♒" },
  { value: "pisces", label: "雙魚座 ♓" },
];

export const statusOptions = [
  { value: "crush", label: "曖昧中 💭" },
  { value: "dating", label: "熱戀期 💕" },
  { value: "stable", label: "穩定交往 💑" },
  { value: "stuck", label: "關係卡住 🤔" },
];
