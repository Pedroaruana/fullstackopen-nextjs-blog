import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const readingList = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogs.id, { onDelete: "cascade" }),
    read: boolean("read").notNull().default(false),
  },
  (t) => [uniqueIndex("reading_list_user_blog_idx").on(t.userId, t.blogId)],
)

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, { fields: [blogs.userId], references: [users.id] }),
  readingList: many(readingList),
}))

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, { fields: [readingList.userId], references: [users.id] }),
  blog: one(blogs, { fields: [readingList.blogId], references: [blogs.id] }),
}))
