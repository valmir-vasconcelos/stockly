"use server";

import { revalidatePath } from "next/cache";
import { upsertSaleSchema } from "./schema";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
    .schema(upsertSaleSchema)
    .action(async ({ parsedInput: { products, id } }) => {
        const isUpdate = Boolean(id);
        await db.$transaction(async (trx) => {
            if (isUpdate) {
                const existingSale = await trx.sale.findUnique({
                    where: { id },
                    include: { products: true },
                });
                if (!existingSale) return;
                await trx.sale.delete({
                    where: { id },
                });
                for (const product of existingSale.products) {
                    await trx.product.update({
                        where: { id: product.productId },
                        data: {
                            stock: {
                                increment: product.quantity,
                            },
                        },
                    });
                }
            }
            const sale = await trx.sale.create({
                data: {
                    date: new Date(),
                },
            });
            for (const product of products) {
                const productFromDb = await trx.product.findUnique({
                    where: {
                        id: product.id,
                    },
                });
                if (!productFromDb) {
                    returnValidationErrors(upsertSaleSchema, {
                        _errors: ["Product not found."],
                    });
                }
                const productIsOutOfStock = product.quantity > productFromDb.stock;
                if (productIsOutOfStock) {
                    returnValidationErrors(upsertSaleSchema, {
                        _errors: ["Product out of stock."],
                    });
                }
                await trx.saleProduct.create({
                    data: {
                        saleId: sale.id,
                        productId: product.id,
                        quantity: product.quantity,
                        unitPrice: productFromDb.price,
                    },
                });
                await trx.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        stock: {
                            decrement: product.quantity,
                        },
                    },
                });
            }
        });
        revalidatePath("/", "layout");
    });