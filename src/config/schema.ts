import {
  mysqlTable,
  mysqlEnum,
  int,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";

export const POST_STATUS = [
  "draft",
  "published",
] as const;

// 5.1 User
export const usersTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  nama: varchar("nama", { length: 100, }).notNull(),
  email: varchar("email", { length: 100, }).notNull().unique(),
  password: varchar("password", { length: 255, }).notNull(),
  nomorTelepon: varchar("nomor_telepon", { length: 20, }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5.2 Posts
export const postsTable = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => usersTable.id),
  kategoriId: int("kategori_id").notNull().references(() => categoriesTable.id),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  judulArtikel: varchar("judul_artikel", { length: 200 }).notNull(),
  isiArtikel: text("isi_artikel").notNull(),
  status: mysqlEnum("status", POST_STATUS).notNull().default("draft"),
  gambarSampul: varchar("gambar_sampul", { length: 500, }),
  listGambar: text("list_gambar"),
  sumberInformasi: varchar("sumber_informasi", { length: 255, }),
  ringkasanArtikel: text("ringkasan_artikel"),
  lokasi: varchar("lokasi", { length: 200, }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5.3 Kategori
export const categoriesTable = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100, }).notNull().unique(),
  namaKategori: varchar("nama_kategori", { length: 100, }).notNull(),
  deskripsiKategori: text("deskripsi_kategori"),
});