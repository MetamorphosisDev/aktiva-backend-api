import { z } from "zod";

export const createPostSchema = z.object({
  userId: z.number().int().positive(),
  kategoriId: z.number().int().positive(),
  slug: z.string().min(3).max(200),
  judulArtikel: z.string().min(3, "Judul minimal 3 karakter").max(200),
  isiArtikel: z.string().min(10, "Isi artikel minimal 10 karakter"),
  status: z.enum(["draft", "published"]).default("draft"),
  gambarSampul: z.string().max(500).optional(),
  listGambar: z.string().optional(),
  sumberInformasi: z.string().max(255).optional(),
  ringkasanArtikel: z.string().optional(),
  lokasi: z.string().max(200).optional(),
});

export const updatePostSchema =
  createPostSchema.partial();