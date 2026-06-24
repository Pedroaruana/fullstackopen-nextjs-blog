"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  createBlog,
  type CreateBlogState,
} from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

const initialState: CreateBlogState = {
  errors: {},
  values: { title: "", author: "", url: "" },
  success: false,
}

const NewBlogPage = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values?.author}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.author && (
            <p className="text-red-600 text-sm mt-1">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label htmlFor="url" className="block mb-1 font-medium">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.url && (
            <p className="text-red-600 text-sm mt-1">{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlogPage
