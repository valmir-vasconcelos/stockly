"use server";
import { db } from "@/lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function createSale(data: CreateSaleSchema) {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
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

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDB.price,
      },
    });

    await db.product.update({
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
  revalidatePath("/products");
}
