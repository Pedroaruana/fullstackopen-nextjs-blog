"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateToken } from "@/app/actions/users"
import { useNotification } from "@/app/components/NotificationContext"

export default function TokenSection({
  initialToken,
}: {
  initialToken: string | null
}) {
  const [token, setToken] = useState<string | null>(initialToken)
  const { showNotification } = useNotification()
  const router = useRouter()

  const handleClick = async () => {
    const hadToken = !!token
    const next = crypto.randomUUID()
    setToken(next)
    showNotification(hadToken ? "token regenerated" : "token generated")
    await generateToken(next)
    router.refresh()
  }

  return (
    <section data-testid="api-token-section">
      <h3 className="text-xl font-semibold mb-2">API token</h3>
      {token ? (
        <div data-testid="token-display">
          <code
            data-testid="api-token"
            className="block bg-gray-100 dark:bg-gray-800 p-3 rounded break-all"
          >
            {token}
          </code>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-gray-500 mb-2">
          no token has been generated yet
        </p>
      )}
      <div className="mt-3">
        <button
          onClick={handleClick}
          data-testid="generate-token-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          {token ? "regenerate token" : "generate token"}
        </button>
      </div>
    </section>
  )
}
