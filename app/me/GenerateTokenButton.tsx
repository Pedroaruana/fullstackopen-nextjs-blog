"use client"

import { generateToken } from "@/app/actions/users"
import { useNotification } from "@/app/components/NotificationContext"

export default function GenerateTokenButton({
  hasToken,
}: {
  hasToken: boolean
}) {
  const { showNotification } = useNotification()

  const handleClick = async () => {
    await generateToken()
    showNotification(hasToken ? "token regenerated" : "token generated")
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
    >
      {hasToken ? "regenerate token" : "generate token"}
    </button>
  )
}
