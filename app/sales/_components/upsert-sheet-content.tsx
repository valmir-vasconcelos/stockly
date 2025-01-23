"use client";

import { createSale } from "@/app/_actions/sale/create-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SalesTableDropdownMenu from "./table-dropdown-menu";

const formSchema = z.object({
    productId: z.coerce.number().int().positive({ message: "É necessário selecionar um produto" }),
    quantity: z.coerce.number().int().positive({ message: "A quantidade é obrigatória" })
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
    products: Product[];
    productOptions: ComboboxOption[];
    setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectedProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const UpsertSheetContent = ({ products, productOptions, setSheetIsOpen }: UpsertSheetContentProps) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const { execute: executeCreateSale } = useAction(createSale, {
        onError: ({ error: { validationErrors, serverError } }) => {
            const flattenedErrors = flattenValidationErrors(validationErrors);
            toast.error(serverError ?? flattenedErrors.formErrors[0]);
        },
        onSuccess: () => {
            toast.success("Venda realizada com sucesso.");
            setSheetIsOpen(false);
        },
    });

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: 0,
            quantity: 1,
        },
    });
    const onSubmit = (data: FormSchema) => {
        const selectedProduct = products.find(
            (product) => product.id === data.productId,
        );
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
    const onSubmitSale = async () => {
        executeCreateSale({
            products: selectedProducts.map((product) => ({
                id: product.id,
                quantity: product.quantity,
            })),
        });
    };
    return (
        <SheetContent className="!max-w-[700px]">
            <SheetHeader>
                <SheetTitle>Nova venda</SheetTitle>
                <SheetDescription>
                    Insira as informações da venda abaixo.
                </SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Produto</FormLabel>
                                <FormControl>
                                    <Combobox placeholder="Selecione um produto" options={productOptions} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Digite a quantidade"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                            <TableCell>
                                {formatCurrency(product.price * product.quantity)}
                            </TableCell>
                            <TableCell>
                                <SalesTableDropdownMenu product={product} onDelete={onDelete} />
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
                    onClick={onSubmitSale}
                >
                    <CheckIcon size={20} />
                    Finalizar venda
                </Button>
            </SheetFooter>
        </SheetContent>
    );
};

export default UpsertSheetContent;