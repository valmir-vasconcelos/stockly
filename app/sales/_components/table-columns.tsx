"use client";

import { ProductDto } from "@/app/_data-access/product/get-products";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ComboboxOption } from "@/components/ui/combobox";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";


interface SaleTableColumn extends SaleDto {
    products: ProductDto[];
    productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
    {
        accessorKey: "productNames",
        header: "Produtos",
    },
    {
        accessorKey: "totalProducts",
        header: "Quantidade de Produtos",
    },
    {
        header: "Valor Total",
        cell: ({
            row: {
                original: { totalAmount },
            },
        }) => formatCurrency(totalAmount),
    },
    {
        header: "Data",
        cell: ({
            row: {
                original: { date },
            },
        }) => new Date(date).toLocaleDateString("pt-BR"),
    },
    {
        header: "Ações",
        cell: ({ row: { original: sale } }) => (
            <SalesTableDropdownMenu
                sale={sale}
                products={sale.products}
                productOptions={sale.productOptions}
            />
        ),
    },
];