"use server";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { deleteProductSchema } from "./schema";

export const deleteProduct = actionClient
    .schema(deleteProductSchema)
    .action(async ({ parsedInput: { id } }) => {
        // verifique se o usuário está logado e tem permissão
        await db.product.delete({
            where: { id },
        });
        revalidatePath("/products");
    });

/*
server action 
essa função será transformada em uma rota http.
portanto, verifique se o usuário tem permissão para chamar ess rota (server action)
*/
