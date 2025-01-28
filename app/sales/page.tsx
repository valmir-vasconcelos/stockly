
import { ComboboxOption } from "@/components/ui/combobox";
import { DataTable } from "../_components/data-table";
import { getProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sale/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

export default async function SalesPage() {
    const sales = await getSales();
    const products = await getProducts();
    const productOptions: ComboboxOption[] = products.map((product) => ({
        label: product.name,
        value: product.id.toString()
    }))

    const tableData = sales.map((sale) => ({
        ...sale,
        products,
        productOptions,
    }));

    return (
        <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="font-semibold text-xs text-slate-500">Gestão de Vendas</span>
                    <p className="text-gray-500">Vendas</p>
                </div>
                <UpsertSaleButton products={products} productOptions={productOptions} />
            </div>
            <DataTable columns={saleTableColumns} data={tableData} />
            {/* <DataTable columns={saleTableColumns} data={JSON.parse(JSON.stringify(sales))} /> */}
        </div>
    )
}