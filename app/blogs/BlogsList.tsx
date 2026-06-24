"use client"

import Link from "next/link"
import { useState } from "react"

type BlogItem = {
  id: number
  title: string
  author: string
  likes: number
  userName: string
}

export default function BlogsList({ blogs }: { blogs: BlogItem[] }) {
  const [filterDraft, setFilterDraft] = useState("")
  const [filter, setFilter] = useState("")

  const visible = filter
    ? blogs.filter((b) =>
        b.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : blogs

  return (
    <>
      <div className="mb-4 flex gap-2">
        <input
          data-testid="filter-input"
          type="text"
          value={filterDraft}
          onChange={(e) => setFilterDraft(e.target.value)}
          placeholder="filter blogs by title"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          data-testid="search-button"
          onClick={() => setFilter(filterDraft)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          search
        </button>
      </div>
      <ul data-testid="blogs-list" className="space-y-2">
        {visible.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              {blog.title}
            </Link>
            <span className="text-sm text-gray-500 ml-2">
              by {blog.author}
            </span>
            <div className="text-xs text-gray-400">
              added by {blog.userName} · {blog.likes} likes
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
