import Link from "next/link"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"
import GenerateTokenButton from "./GenerateTokenButton"
import MarkAsReadButton from "./MarkAsReadButton"

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const items = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true },
  })

  const unread = items.filter((i) => !i.read)
  const read = items.filter((i) => i.read)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-2">My page</h2>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">API token</h3>
        {user.token ? (
          <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded break-all">
            {user.token}
          </code>
        ) : (
          <p className="text-gray-500 mb-2">no token has been generated yet</p>
        )}
        <div className="mt-3">
          <GenerateTokenButton hasToken={!!user.token} />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Reading list</h3>

        <h4 className="font-semibold mt-4 mb-1">Unread</h4>
        {unread.length === 0 ? (
          <p className="text-sm text-gray-500">nothing unread</p>
        ) : (
          <ul className="space-y-2">
            {unread.map((item) => (
              <li
                key={item.id}
                className="border rounded p-3 flex items-center justify-between"
              >
                <Link
                  href={`/blogs/${item.blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.blog.title}{" "}
                  <span className="text-sm text-gray-500">
                    by {item.blog.author}
                  </span>
                </Link>
                <MarkAsReadButton readingListId={item.id} />
              </li>
            ))}
          </ul>
        )}

        <h4 className="font-semibold mt-6 mb-1">Read</h4>
        {read.length === 0 ? (
          <p className="text-sm text-gray-500">nothing read yet</p>
        ) : (
          <ul className="space-y-2">
            {read.map((item) => (
              <li key={item.id} className="border rounded p-3">
                <Link
                  href={`/blogs/${item.blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.blog.title}{" "}
                  <span className="text-sm text-gray-500">
                    by {item.blog.author}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default MePage
