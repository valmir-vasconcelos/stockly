import { z } from "zod";

export const upsertSaleSchema = z.object({
    id: z.number().int().optional(),
    products: z.array(
        z.object({
            id: z.number().int().positive(),
            quantity: z.number().int().positive(),
        }),
    ),
});

export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;