import { z } from "zod";

export const ProductSchema = z.object({
  id_product: z.number(),
  id_color: z.number(),
  id_model: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["men", "women", "kids"]),
  price: z.number().min(0),
  size: z.number(),
  stock: z.number().min(0),
  image: z.string(),
});
