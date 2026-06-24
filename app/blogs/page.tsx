import Link from "next/link"
import { getBlogs } from "@/app/services/blogs"

const BlogsPage = async () => {
  const blogs = await getBlogs()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <ul className="space-y-2">
        {blogs.map((blog) => (
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
              added by {blog.user.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogsPage
