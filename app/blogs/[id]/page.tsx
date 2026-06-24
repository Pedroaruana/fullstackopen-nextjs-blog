import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import AddToReadingListButton from "./AddToReadingListButton"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blogId = Number(id)
  if (Number.isNaN(blogId)) notFound()

  const blog = await getBlogById(blogId)
  if (!blog) notFound()

  const currentUser = await getCurrentUser()

  let alreadyInList = false
  if (currentUser) {
    const existing = await db.query.readingList.findFirst({
      where: and(
        eq(readingList.userId, currentUser.id),
        eq(readingList.blogId, blogId),
      ),
    })
    alreadyInList = !!existing
  }

  const isOwn = currentUser?.id === blog.userId

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h2 data-testid="blog-title" className="text-2xl font-bold mb-2">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-600 mb-1">
        by {blog.author}
      </p>
      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all"
      >
        {blog.url}
      </a>
      <p className="text-sm text-gray-500 mt-4">
        added by {blog.user.name}
      </p>
      <p className="text-sm text-gray-500">{blog.likes} likes</p>

      {currentUser && !isOwn && !alreadyInList && (
        <div className="mt-6">
          <AddToReadingListButton blogId={blog.id} />
        </div>
      )}
      {currentUser && !isOwn && alreadyInList && (
        <p className="mt-6 text-sm text-gray-500">in your reading list</p>
      )}
    </div>
  )
}

export default BlogPage
