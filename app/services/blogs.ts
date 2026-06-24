import { eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    with: { user: true },
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: { user: true },
  })
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [created] = await db
    .insert(blogs)
    .values({ title, author, url, userId: user.id })
    .returning()

  await db.insert(readingList).values({
    userId: user.id,
    blogId: created.id,
    read: false,
  })

  return created
}
