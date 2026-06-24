"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"
import { revalidatePath } from "next/cache"

export type RegisterState = {
  errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values?: {
    username: string
    name: string
  }
  success?: boolean
}

export const registerUser = async (
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = ((formData.get("username") as string) || "").trim()
  const name = ((formData.get("name") as string) || "").trim()
  const password = (formData.get("password") as string) || ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

  const errors: RegisterState["errors"] = {}
  if (username.length < 4) {
    errors.username = "username must be at least 4 characters long"
  }
  if (!name) {
    errors.name = "name is required"
  }
  if (password.length < 4) {
    errors.password = "password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "passwords do not match"
  }

  if (Object.keys(errors).length === 0) {
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (existing) {
      errors.username = "username is already taken"
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name }, success: false }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateToken = async (token?: string) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const newToken = token ?? crypto.randomUUID()
  await db.update(users).set({ token: newToken }).where(eq(users.id, user.id))

  revalidatePath("/me")
  return newToken
}
