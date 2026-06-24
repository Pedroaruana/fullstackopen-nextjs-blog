"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { addBlog } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"

export type CreateBlogState = {
  errors: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title: string
    author: string
    url: string
  }
  success?: boolean
}

export const createBlog = async (
  _prevState: CreateBlogState,
  formData: FormData,
): Promise<CreateBlogState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = ((formData.get("title") as string) || "").trim()
  const author = ((formData.get("author") as string) || "").trim()
  const url = ((formData.get("url") as string) || "").trim()

  const errors: CreateBlogState["errors"] = {}
  if (title.length < 5) {
    errors.title = "title must be at least 5 characters long"
  }
  if (author.length < 5) {
    errors.author = "author must be at least 5 characters long"
  }
  if (url.length < 5) {
    errors.url = "url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors: {}, success: true }
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId),
    ),
  })

  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markAsRead = async (readingListId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, readingListId),
        eq(readingList.userId, user.id),
      ),
    )

  revalidatePath("/me")
}
