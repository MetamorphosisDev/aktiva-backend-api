import { z } from "zod";

export const createPostSchema = z.object({
  userId: z.coerce.number().int().positive(),

  categoryId: z.coerce.number().int().positive(),

  slug: z.string().min(1).max(200),

  title: z.string().min(1).max(200),

  content: z.string().min(1),

  summary: z.string().optional(),

  coverImage: z.string().optional(),

  images: z.string().optional(),

  source: z.string().optional(),

  location: z.string().optional(),

  status: z.enum(["draft", "published"]),
});

export const updatePostSchema = createPostSchema
  .omit({
    userId: true,
  })
  .partial();