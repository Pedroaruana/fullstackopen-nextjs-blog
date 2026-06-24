# Blog app — Full Stack Open: Next.js

Blog app submission for chapter 4 of
[Full Stack Open: Next.js](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs).

> **A note on AI-assisted development:** This project was built with
> **Claude Code** (Anthropic) as a pair-programming assistant. See the
> [AI pair programming](#ai-pair-programming) section below for a map of
> where and how the assistant was used.

## Stack

- Next.js 15 (App Router) + React 19
- NextAuth.js (Credentials provider, JWT sessions)
- Drizzle ORM + Postgres (Neon)
- Tailwind CSS v4
- MDX for the homepage
- Playwright for end-to-end tests

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env file and fill in the values:

   ```bash
   cp .env.local.example .env.local
   ```

   - `DATABASE_URL` — Postgres connection string (e.g. from [Neon](https://neon.tech))
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `AUTH_URL` — `http://localhost:3000` locally

3. Run migrations:

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Run end-to-end tests (optional):

   ```bash
   npm run test:e2e
   ```

## Features

- User registration and login with hashed passwords (bcrypt)
- Server-side and client-side form validation via `useActionState`
- Notifications via React Context
- Blog filtering by title on the listing page
- Personal **My page** (`/me`) with API token generation
- REST endpoint `GET /api/me` authenticated by `Authorization: Bearer <token>`
- Personal reading list (auto-add on blog creation, manual add from other blogs)
- Testing endpoints `DELETE /api/testing/reset` and `POST /api/testing/users` (disabled in production)
- MDX-powered static homepage
- Playwright E2E test suite running on GitHub Actions

---

## AI pair programming

I used **Claude Code** as a coding assistant during development. All
architectural decisions, scope choices and the final review were mine —
the agent acted as a pair-programming partner to speed up repetitive
work, clarify points in the course material, and help me debug.

### Where the AI was used

| Area | What Claude Code helped with | What stayed with me |
|---|---|---|
| 🏗️ **Scaffolding** | Suggested the initial folder layout (`db/`, `app/services/`, `app/actions/`, `app/components/`) and the `tsconfig.json` setup with the `@/*` path alias pointing to the project root | Chose the project name, decided against using a `src/` directory |
| 🗄️ **Drizzle ORM** | Generated the initial `schema.ts` boilerplate (users, blogs, reading_list) with relations | Decided the domain model and which fields each table needed |
| 🔐 **NextAuth** | Translated the example from the course material into the blog app (Credentials provider, JWT sessions) | Configured the secrets, drove the login/logout flow |
| 📝 **Forms** | The `useActionState` pattern with `RegisterState` / `CreateBlogState` returning both errors and values | Business rules (min 5 chars, password confirmation, etc.) |
| 🎨 **Tailwind** | Suggested utility-class combinations for components (navbar, blog cards, forms) | Color choices and overall layout |
| 🔔 **Notification context** | Structure of `NotificationContext.tsx` with `useState` + `setTimeout` for auto-dismiss | When to surface notifications in the UX flow |
| 🧪 **Playwright (Ex. 24)** | **Heavy lifting here:** added all the required `data-testid` attributes to the DOM, configured `playwright.config.ts` with `webServer`, and worked around the conflict between the `NODE_ENV === "production"` gate on the testing endpoints and Next.js's production server | I ran the tests, pointed out failures, and the agent iterated |
| ⚙️ **GitHub Actions** | Copied the workflow from the reference repo `fullstack-hy2020/next-js-tests` and adjusted `drizzle.config.ts` to load `.env.test` in CI | I created the GitHub secrets (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL) |
| 🪲 **Debugging** | Identified that the `can regenerate API token` test was failing because Neon's network latency exceeded the test's `waitForTimeout(500)`, and proposed generating the UUID client-side for an optimistic update | Approved the approach and validated it didn't break anything else |

### How the workflow looked

1. I read the exercise in the course material and described the goal to the agent
2. The agent proposed an implementation (usually as file edits)
3. I reviewed the diff, asked for adjustments, or ran it locally to validate
4. When something broke, I pasted the error and we debugged together
5. Commits were organized by phase (scaffolding → schema → auth → ...) to make later review easier

### Why I document this

Because being **honest about the tools used** is more valuable than
pretending solo authorship. The conceptual understanding of the course
material, the modeling decisions and the debugging are still mine — the
agent only sped up typing and helped me unstick when I was blocked. If
you're a student looking at this repo, I'd recommend **doing it without
AI first** and only reaching for an agent after you've understood the
material; that's how you actually learn it.

— Pedro Aruanã Silva Mascarenhas
