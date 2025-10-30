export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces"

export type ZodiacBlurb = {
  sign: ZodiacSign
  name: string
  oneLiner: string
}

export const zodiacBlurbs: Record<ZodiacSign, ZodiacBlurb> = {
  aries: {
    sign: "aries",
    name: "白羊座",
    oneLiner: "今天適合出門，但錢包說先不要。"
  },
  taurus: {
    sign: "taurus",
    name: "金牛座",
    oneLiner: "慢慢來比較快，但外送還是要快一點。"
  },
  gemini: {
    sign: "gemini",
    name: "雙子座",
    oneLiner: "今天想法很多，但執行力只有 10%。"
  },
  cancer: {
    sign: "cancer",
    name: "巨蟹座",
    oneLiner: "容易想太多，建議多喝水少想事。"
  },
  leo: {
    sign: "leo",
    name: "獅子座",
    oneLiner: "今天自信滿滿，但別忘了帶鑰匙。"
  },
  virgo: {
    sign: "virgo",
    name: "處女座",
    oneLiner: "細節控發作，但生活不是 Excel。"
  },
  libra: {
    sign: "libra",
    name: "天秤座",
    oneLiner: "選擇困難症又來了，建議擲硬幣。"
  },
  scorpio: {
    sign: "scorpio",
    name: "天蠍座",
    oneLiner: "神秘感滿點，但別嚇到自己人。"
  },
  sagittarius: {
    sign: "sagittarius",
    name: "射手座",
    oneLiner: "想到哪走到哪，但記得回家的路。"
  },
  capricorn: {
    sign: "capricorn",
    name: "摩羯座",
    oneLiner: "認真工作，但也要認真休息。"
  },
  aquarius: {
    sign: "aquarius",
    name: "水瓶座",
    oneLiner: "腦洞大開中，建議記錄靈感。"
  },
  pisces: {
    sign: "pisces",
    name: "雙魚座",
    oneLiner: "想太多沒關係，別把自己想沒了。"
  }
}

export function getZodiacBlurb(sign?: ZodiacSign): string {
  if (!sign) return "星座未知，但好運不會忘記你。"
  return zodiacBlurbs[sign].oneLiner
}

export function getZodiacName(sign?: ZodiacSign): string {
  if (!sign) return "未知星座"
  return zodiacBlurbs[sign].name
}
