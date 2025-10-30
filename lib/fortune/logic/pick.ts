import { tarotCards, type TarotCard } from "../data/tarot"
import { getZodiacBlurb, type ZodiacSign } from "../data/zodiac"

export type FortuneTheme = "love" | "work" | "random"

export type FortuneResult = {
  card: {
    id: string
    name: string
    position: "upright" | "reversed"
    soft: string
    fun: string
    meaning: string
  }
  blurb: string
}

/**
 * 隨機抽一張塔羅牌，50% 機率正位或逆位
 */
function pickRandomCard(): { card: TarotCard; position: "upright" | "reversed" } {
  const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
  const position = Math.random() > 0.5 ? "upright" : "reversed"
  return { card: randomCard, position }
}

/**
 * 根據主題與星座，回傳算命結果
 */
export function pickFortune(theme: FortuneTheme = "random", sign?: ZodiacSign): FortuneResult {
  const { card, position } = pickRandomCard()
  const data = position === "upright" ? card.upright : card.reversed

  return {
    card: {
      id: card.id,
      name: card.name,
      position,
      soft: data.soft,
      fun: data.fun,
      meaning: data.meaning
    },
    blurb: getZodiacBlurb(sign)
  }
}
