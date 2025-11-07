import { NextRequest, NextResponse } from "next/server"
import { pickFortune, type FortuneTheme } from "@/lib/fortune/logic/pick"
import { type ZodiacSign } from "@/lib/fortune/data/zodiac"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const theme = (searchParams.get("t") as FortuneTheme) || "random"
  const sign = searchParams.get("sign") as ZodiacSign | undefined

  // 驗證主題
  const validThemes: FortuneTheme[] = ["love", "work", "random"]
  const finalTheme = validThemes.includes(theme) ? theme : "random"

  const result = pickFortune(finalTheme, sign)

  return NextResponse.json(result)
}
