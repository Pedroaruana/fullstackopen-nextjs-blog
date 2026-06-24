# Blog app — Full Stack Open: Next.js

Blog app submission for chapter 4 of
[Full Stack Open: Next.js](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs).

## Stack

- Next.js 15 (App Router) + React 19
- NextAuth.js (Credentials provider, JWT sessions)
- Drizzle ORM + Postgres
- Tailwind CSS v4
- MDX for the homepage

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

## Features

- User registration and login with hashed passwords (bcrypt)
- Server-side and client-side form validation via `useActionState`
- Notifications via React Context
- Personal **My page** (`/me`) with API token generation
- REST endpoint `GET /api/me` authenticated by `Authorization: Bearer <token>`
- Personal reading list (auto-add on blog creation, manual add from other blogs)
- Testing endpoints `DELETE /api/testing/reset` and `POST /api/testing/users` (disabled in production)
- MDX-powered static homepage
