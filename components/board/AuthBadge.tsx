"use client"

import { getAnonymousDisplayName } from "@/lib/board/utils"

type AuthBadgeProps = {
  nickname?: string
  isAnonymous?: boolean
}

export default function AuthBadge({ nickname, isAnonymous = true }: AuthBadgeProps) {
  const displayName = nickname || getAnonymousDisplayName()

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{isAnonymous ? "☁️" : "👤"}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {displayName}
      </span>
    </div>
  )
}
