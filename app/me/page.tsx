import Link from "next/link"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"
import TokenSection from "./TokenSection"
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
      <section data-testid="user-profile">
        <h2 className="text-2xl font-bold mb-2">My page</h2>
        <p>
          <span className="font-semibold">Name:</span>{" "}
          <span data-testid="user-name">{user.name}</span>
        </p>
        <p>
          <span className="font-semibold">Username:</span>{" "}
          <span data-testid="user-username">{user.username}</span>
        </p>
      </section>

      <TokenSection initialToken={user.token ?? null} />

      <section data-testid="reading-list-section">
        <h3 className="text-xl font-semibold mb-2">Reading list</h3>

        {items.length === 0 && (
          <p data-testid="empty-reading-list" className="text-sm text-gray-500">
            your reading list is empty
          </p>
        )}

        {items.length > 0 && (
          <>
            <h4 className="font-semibold mt-4 mb-1">Unread</h4>
            <div data-testid="unread-section">
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-sm text-gray-500">
                  nothing unread
                </p>
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
            </div>

            <h4 className="font-semibold mt-6 mb-1">Read</h4>
            <div data-testid="read-section">
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
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default MePage
