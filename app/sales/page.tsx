
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "@/components/ui/combobox";
import UpsertSaleButton from "./_components/create-sale-button";

export default async function SalesPage() {
    const products = await getProducts();
    const productOptions: ComboboxOption[] = products.map((product) => ({
        label: product.name,
        value: product.id.toString()
    }))
    return (
        <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="font-semibold text-xs text-slate-500">Gestão de Vendas</span>
                    <p className="text-gray-500">Venda</p>
                </div>
                <UpsertSaleButton products={products} productOptions={productOptions} />
            </div>
            {/* <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} /> */}
        </div>
    )
}