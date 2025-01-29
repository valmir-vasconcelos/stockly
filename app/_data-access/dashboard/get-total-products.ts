import "server-only";

import { db } from "@/lib/prisma";

export const getTotalProducts = async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.product.count();
};
