import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import { PlusIcon } from "lucide-react"
import { DataTable } from "../_components/data-table"
import { productTableColumns } from "./_components/table-colum"

export default async function ProductsPage() {
    const products = await db.product.findMany({})

    return (
        <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="font-semibold text-xs text-slate-500">Gestão de Produtos</span>
                    <p className="text-gray-500">Lista de produtos cadastrados</p>
                </div>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo produto
                </Button>
            </div>
            <DataTable columns={productTableColumns} data={products} />
        </div>
    )
}