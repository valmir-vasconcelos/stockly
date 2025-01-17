import "server-only";
import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany({});
};

/* apenas para referência 

export async function buscarCep(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
}
  */
