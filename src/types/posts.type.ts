import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { postsTable } from "../config/schema";

export type Post = InferSelectModel<typeof postsTable> // Tipe data yang keluar dari tb saat SELECT
export type CreatePost = InferInsertModel<typeof postsTable>; // Tipe data uang dikirim untuk INSERT
export type UpdatePost = Partial<CreatePost>; // Data Update boleh sebagian