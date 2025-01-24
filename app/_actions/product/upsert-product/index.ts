"use server";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

export const createProduct = actionClient
    .schema(upsertProductSchema)
    .action(async ({ parsedInput: data }) => {
        // verifique se o usuário está logado e tem permissão
        // upsertProductSchema.parse(data);
        await db.product.create({
            data,
        });
        revalidatePath("/products");
    })

export const updateProduct = actionClient
    .schema(upsertProductSchema)
    .action(async ({ parsedInput: { id, ...data } }) => {
        // verifique se o usuário está logado e tem permissão
        // upsertProductSchema.parse(data);
        await db.product.update({
            where: {
                id,
            },
            data,
        });
        revalidatePath("/products");
    })

/*
server action 
essa função será tranformada em uma rota http.
portanto, verifique se o usuário tem permissão para chamar ess rota (server action)
*/
