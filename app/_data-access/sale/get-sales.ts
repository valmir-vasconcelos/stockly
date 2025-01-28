import "server-only";

import { db } from "@/lib/prisma";

interface SaleProductDto {
    productId: number;
    quantity: number;
    unitPrice: number;
    productName: string;
}

export interface SaleDto {
    id: number;
    productNames: string;
    totalProducts: number;
    totalAmount: number;
    date: Date;
    saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<SaleDto[]> => {
    const sales = await db.sale.findMany({
        include: {
            products: {
                include: { product: true },
            },
        },
    });
    return sales.map((sale) => ({
        id: sale.id,
        date: sale.date,
        productNames: sale.products
            .map((saleProduct) => saleProduct.product.name)
            .join(" • "),
        totalAmount: sale.products.reduce(
            (acc, saleProduct) =>
                acc + saleProduct.quantity * Number(saleProduct.unitPrice),
            0,
        ),
        totalProducts: sale.products.reduce(
            (acc, saleProduct) => acc + saleProduct.quantity,
            0,
        ),
        saleProducts: sale.products.map(
            (saleProduct): SaleProductDto => ({
                productId: saleProduct.productId,
                productName: saleProduct.product.name,
                quantity: saleProduct.quantity,
                unitPrice: Number(saleProduct.unitPrice),
            }),
        ),
    }));
};