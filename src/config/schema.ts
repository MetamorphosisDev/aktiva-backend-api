import {
  mysqlTable,
  mysqlEnum,
  int,
  varchar,
  text,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core";

export const POST_STATUS = ["draft", "published"] as const;

// USERS
export const usersTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  email: varchar("email", { length: 150 })
    .notNull()
    .unique(),

  password: varchar("password", { length: 255 }).notNull(),

  phoneNumber: varchar("phone_number", { length: 20 }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// CATEGORIES
export const categoriesTable = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),

  slug: varchar("slug", { length: 100 })
    .notNull()
    .unique(),

  categoryName: varchar("category_name", {
    length: 100,
  }).notNull(),

  categoryDescription: text("category_description"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});


// POSTS
export const postsTable = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),

  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  categoryId: int("category_id")
    .notNull()
    .references(() => categoriesTable.id, {
      onDelete: "cascade",
    }),

  slug: varchar("slug", { length: 200 })
    .notNull()
    .unique(),

  title: varchar("title", { length: 200 }).notNull(),

  content: text("content").notNull(),

  summary: text("summary"),

  coverImage: varchar("cover_image", {
    length: 500,
  }),

  images: text("images"),

  source: varchar("source", {
    length: 255,
  }),

  location: varchar("location", {
    length: 200,
  }),

  status: mysqlEnum("status", POST_STATUS)
    .notNull()
    .default("draft"),

  viewCount: int("view_count")
    .notNull()
    .default(0),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});


// COMMENTS
export const commentsTable = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),

  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  postId: int("post_id")
    .notNull()
    .references(() => postsTable.id, {
      onDelete: "cascade",
    }),

  comment: text("comment").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});


// BOOKMARKS
export const bookmarksTable = mysqlTable(
  "bookmarks",
  {
    id: int("id").autoincrement().primaryKey(),

    userId: int("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    postId: int("post_id")
      .notNull()
      .references(() => postsTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueUserPost: unique().on(
      table.userId,
      table.postId
    ),
  })
);