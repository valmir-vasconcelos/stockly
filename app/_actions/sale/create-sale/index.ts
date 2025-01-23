"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export async function createSale(data: CreateSaleSchema) {
    createSaleSchema.parse(data);
    await db.$transaction(async (trx) => {

        const sale = await trx.sale.create({
            data: {
                date: new Date(),
            },
        });

        for (const product of data.products) {
            const productFromDB = await db.product.findUnique({
                where: {
                    id: product.id,
                },
            });

            if (!productFromDB) {
                throw new Error("Product not found");
            }

            const productIsOutOfStock = product.quantity > productFromDB.stock;
            if (productIsOutOfStock) {
                throw new Error("Product out of stock");
            }

            await trx.saleProduct.create({
                data: {
                    saleId: sale.id,
                    productId: product.id,
                    quantity: product.quantity,
                    unitPrice: productFromDB.price,
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

    })


    revalidatePath("/products");
}
