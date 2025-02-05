import { db } from "@/lib/prisma";
import "server-only";

export const getTotalInStock = async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const totalStock = await db.product.aggregate({
        _sum: {
            stock: true,
        },
    });
    return Number(totalStock._sum.stock);
};
