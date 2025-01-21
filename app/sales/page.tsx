import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "@/components/ui/combobox";

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
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>Nova Venda</Button>
                    </SheetTrigger>
                    <UpsertSheetContent products={products} productOptions={productOptions} />
                </Sheet>
            </div>
            {/* <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} /> */}
        </div>
    )
}