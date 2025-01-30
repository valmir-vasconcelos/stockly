
import { DataTable } from "../_components/data-table"
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header"
import { getProducts } from "../_data-access/product/get-products"
import CreateProductButton from "./_components/create-product-button"
import { productTableColumns } from "./_components/table-colum"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
    //fetch("", {cache:"no-cache"});
    const products = await getProducts();
    //const response = await fetch("http://localhost:3000/api/products", { method: "GET", cache: "no-cache" });
    //const products = await response.json();

    //await buscarCep("68515000")

    return (
        <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 overflow-auto">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
                    <HeaderTitle>Produtos</HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <CreateProductButton />
                </HeaderRight>
            </Header>
            <DataTable columns={productTableColumns} data={products} />
            {/* <DataTable columns={productTableColumns} data={[...products, ...products, ...products]} /> */}
        </div>
    )
}