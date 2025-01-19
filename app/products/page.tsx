
import { DataTable } from "../_components/data-table"
import { getProducts } from "../_data-access/product/get-products"
import { productTableColumns } from "./_components/table-colum"
import AddProductButton from "./_components/add-product-button"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
    //fetch("", {cache:"no-cache"});
    const products = await getProducts();
    //const response = await fetch("http://localhost:3000/api/products", { method: "GET", cache: "no-cache" });
    //const products = await response.json();

    //await buscarCep("68515000")

    return (
        <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="font-semibold text-xs text-slate-500">Gestão de Produtos</span>
                    <p className="text-gray-500">Lista de produtos cadastrados</p>
                </div>
                <AddProductButton />
            </div>
            <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
        </div>
    )
}