import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"
import { existsSync } from "fs"

const envFile =
  process.env.NODE_ENV === "test" || (existsSync(".env.test") && !existsSync(".env.local"))
    ? ".env.test"
    : ".env.local"
dotenv.config({ path: envFile })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
