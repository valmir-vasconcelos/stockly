import "server-only";

import { db } from "@/lib/prisma";
import { Product } from "@prisma/client";


export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "price"> {
    price: number;
    status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
    const products = await db.product.findMany({});
    return products.map((product) => ({
        ...product,
        price: Number(product.price),
        status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    }));
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
