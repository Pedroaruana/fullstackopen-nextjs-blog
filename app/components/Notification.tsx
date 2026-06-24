"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const bg = type === "success" ? "bg-green-600" : "bg-red-600"

  return (
    <div className={`${bg} text-white px-4 py-2 mx-6 mt-4 rounded shadow`}>
      {message}
    </div>
  )
}
