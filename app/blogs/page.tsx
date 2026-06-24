import { getBlogs } from "@/app/services/blogs"
import BlogsList from "./BlogsList"

const BlogsPage = async () => {
  const blogs = await getBlogs()
  const data = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    likes: b.likes,
    userName: b.user.name,
  }))

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <BlogsList blogs={data} />
    </div>
  )
}

export default BlogsPage
