import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"
import { existsSync } from "fs"

const envFile =
  process.env.NODE_ENV === "test" || (existsSync(".env.test") && !existsSync(".env.local"))
    ? ".env.test"
    : ".env.local"
dotenv.config({ path: envFile })

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev -- -p 3000",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      DATABASE_URL: process.env.DATABASE_URL ?? "",
      AUTH_SECRET:
        process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "",
      NEXTAUTH_SECRET:
        process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "",
      AUTH_URL: process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "",
      NEXTAUTH_URL:
        process.env.NEXTAUTH_URL ?? process.env.AUTH_URL ?? "",
      AUTH_TRUST_HOST: "true",
    },
  },
})
