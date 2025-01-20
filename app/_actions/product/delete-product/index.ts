"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteProductSchema, DeleteProductSchema } from "./schema";

export async function deleteProduct({ id }: DeleteProductSchema) {
  // verifique se o usuário está logado e tem permissão
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: { id },
  });
  revalidatePath("/products");
}

/*
server action 
essa função será tranformada em uma rota http.
portanto, verifique se o usuário tem permissão para chamar ess rota (server action)
*/
