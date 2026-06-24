import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserById } from "@/app/services/users"

const UserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const userId = Number(id)
  if (Number.isNaN(userId)) notFound()

  const user = await getUserById(userId)
  if (!user) notFound()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <h3 className="text-lg font-semibold mb-2">added blogs</h3>
      <ul className="list-disc pl-6 space-y-1">
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
