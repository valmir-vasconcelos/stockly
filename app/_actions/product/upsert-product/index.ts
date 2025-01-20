"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export async function createProduct(data: UpsertProductSchema) {
  // verifique se o usuário está logado e tem permissão
  upsertProductSchema.parse(data);
  await db.product.create({
    data,
  });
  revalidatePath("/products");
}

export async function updateProduct(data: UpsertProductSchema) {
  // verifique se o usuário está logado e tem permissão
  upsertProductSchema.parse(data);
  await db.product.update({
    where: {
      id: data.id,
    },
    data,
  });
  revalidatePath("/products");
}

/*
server action 
essa função será tranformada em uma rota http.
portanto, verifique se o usuário tem permissão para chamar ess rota (server action)
*/
