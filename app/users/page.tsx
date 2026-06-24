import Link from "next/link"
import { getUsers } from "@/app/services/users"

const UsersPage = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="border-b py-2">Name</th>
            <th className="border-b py-2">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b py-2">
                <Link
                  href={`/users/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.name}
                </Link>
              </td>
              <td className="border-b py-2">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
