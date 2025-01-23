import { z } from "zod";

export const createSaleSchema = z.object({
    products: z.array(
        z.object({
            id: z.number().int().positive(),
            quantity: z.number().int().positive(),
        }),
    ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;