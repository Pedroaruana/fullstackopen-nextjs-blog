"use client"

import { addToReadingList } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

export default function AddToReadingListButton({
  blogId,
}: {
  blogId: number
}) {
  const { showNotification } = useNotification()

  const handleClick = async () => {
    await addToReadingList(blogId)
    showNotification("added to reading list")
  }

  return (
    <button
      onClick={handleClick}
      data-testid="add-to-reading-list-button"
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
    >
      add to reading list
    </button>
  )
}
