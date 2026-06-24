import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany({
    with: { blogs: true },
  })
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { blogs: true },
  })
}
