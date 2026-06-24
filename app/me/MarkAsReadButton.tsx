"use client"

import { markAsRead } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

export default function MarkAsReadButton({
  readingListId,
}: {
  readingListId: number
}) {
  const { showNotification } = useNotification()

  const handleClick = async () => {
    await markAsRead(readingListId)
    showNotification("marked as read")
  }

  return (
    <button
      onClick={handleClick}
      data-testid={`mark-read-${readingListId}`}
      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
    >
      mark as read
    </button>
  )
}
