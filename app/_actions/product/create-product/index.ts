"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";

export async function createProduct(data: CreateProductSchema) {
  // verifique se o usuário está logado e tem permissão
  createProductSchema.parse(data);
  await db.product.create({
    data,
  });
  revalidatePath("/products");
}

/*
server action 
essa função será tranformada em uma rota http.
portanto, verifique se o usuário tem permissão para chamar ess rota (server action)
*/
