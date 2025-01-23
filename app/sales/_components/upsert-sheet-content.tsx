"use client"
import { formatCurrency } from "@/app/_helpers/currency";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpsertSaleTableDropdownMenu from "./upsert-table-dropdown-menu";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";

const formSchema = z.object({
    productId: z.coerce.number().int().positive({ message: "É necessário selecionar um produto" }),
    quantity: z.coerce.number().int().positive({ message: "A quantidade é obrigatória" })
})

type FormSchema = z.infer<typeof formSchema>

interface Props {
    products: Product[],
    productOptions: ComboboxOption[]
}

interface SelectedProduct {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export default function UpsertSheetContent({ products, productOptions }: Props) {

    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

    const form = useForm<FormSchema>({
        shouldUnregister: true, //limpa os campos do formulário
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: 0,
            quantity: 1
        }
    })

    function onSubmit(data: FormSchema) {
        const selectedProduct = products.find((product) => product.id === data.productId);
        if (!selectedProduct) return;
        setSelectedProducts((currentProducts) => {
            const existingProduct = currentProducts.find(
                (product) => product.id === selectedProduct.id,
            );
            if (existingProduct) {
                const productIsOutOfStock =
                    existingProduct.quantity + data.quantity > selectedProduct.stock;
                if (productIsOutOfStock) {
                    form.setError("quantity", {
                        message: "Quantidade indisponível em estoque.",
                    });
                    return currentProducts;
                }
                form.reset();
                return currentProducts.map((product) => {
                    if (product.id === selectedProduct.id) {
                        return {
                            ...product,
                            quantity: product.quantity + data.quantity,
                        };
                    }
                    return product;
                });
            }
            const productIsOutOfStock = data.quantity > selectedProduct.stock;
            if (productIsOutOfStock) {
                form.setError("quantity", {
                    message: "Quantidade indisponível em estoque.",
                });
                return currentProducts;
            }
            form.reset();
            return [
                ...currentProducts,
                {
                    ...selectedProduct,
                    price: Number(selectedProduct.price),
                    quantity: data.quantity,
                },
            ];
        });
    };
    const productsTotal = useMemo(() => {
        return selectedProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity;
        }, 0);
    }, [selectedProducts]);

    const onDelete = (productId: number) => {
        setSelectedProducts((currentProducts) => {
            return currentProducts.filter((product) => product.id !== productId);
        });
    };

    async function onSubmitSale() {
        try {
            await createSale({
                products: selectedProducts.map(product => ({
                    id: product.id,
                    quantity: product.quantity
                }))
            })
            toast.success("Venda realizada com sucesso")
        } catch (error) {
            toast.error("Erro ao tentar criar a venda")
        }
    }

    // const onSubmitSale = async () => {
    //     executeUpsertSale({
    //         id: saleId,
    //         products: selectedProducts.map((product) => ({
    //             id: product.id,
    //             quantity: product.quantity,
    //         })),
    //     });
    // };

    return (
        <SheetContent className="!max-w-[700px]">
            <SheetHeader>
                <SheetTitle>Nova Venda</SheetTitle>
                <SheetDescription>Insira as informações da venda abaixo</SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField control={form.control} name="productId" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Produto</FormLabel>
                            <FormControl>
                                <Combobox value={field.value.toString()} onChange={field.onChange} options={productOptions} placeholder="Selecione um produto..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                    </FormField>

                    <FormField control={form.control} name="quantity" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} placeholder="Digite a quantidade" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type="submit" className="w-full gap-2" variant="secondary">
                        <PlusIcon size={20} />
                        Adicionar produto à venda
                    </Button>
                </form>
            </Form>

            <Table>
                <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço Unitário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{formatCurrency(product.price * product.quantity)}</TableCell>
                            <TableCell>
                                <UpsertSaleTableDropdownMenu
                                    product={product}
                                    onDelete={onDelete}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell>{formatCurrency(productsTotal)}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <SheetFooter className="pt-6">
                <Button
                    className="w-full gap-2"
                    disabled={selectedProducts.length === 0}
                    onClick={onSubmitSale}>
                    <CheckIcon size={20} />
                    Finalizar Venda
                </Button>
            </SheetFooter>


        </SheetContent>
    )
}