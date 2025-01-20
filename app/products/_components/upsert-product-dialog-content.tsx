"use client"
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2Icon, } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createProduct, updateProduct, } from "@/app/_actions/product/upsert-product";
import { upsertProductSchema, UpsertProductSchema } from "@/app/_actions/product/upsert-product/schema";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
    defaultValues?: UpsertProductSchema;
    onSuccess?: () => void;
}

export default function UpsertProductDialogContent({ defaultValues, onSuccess }: Props) {

    const form = useForm<UpsertProductSchema>({
        shouldUnregister: true, //limpa os campos do formulário
        resolver: zodResolver(upsertProductSchema),
        defaultValues: defaultValues ?? {
            name: "",
            price: 0,
            stock: 1
        }
    })

    const isEditting = !!defaultValues

    async function onSubmit(data: UpsertProductSchema) {
        try {
            if (isEditting) {
                await updateProduct({ ...data, id: defaultValues?.id });
                toast.success("Produto alterado com sucesso!");
            } else {
                await createProduct(data);
                toast.success("Produto cadastrado com sucesso!");
            }

            onSuccess?.(); // função que fecha o dialog

        } catch (error) {
            console.error({ error })
            toast.success("Ocorreu um erro ao tentar salvar o produto!");
        }
    }

    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues, form]);



    return (
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditting ? "Editar" : "Cadastrar"} Produto
                        </DialogTitle>
                        <DialogDescription>
                            Insira as informações abaixo
                        </DialogDescription>
                    </DialogHeader>

                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                    </FormField>

                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix="R$ "
                                    allowNegative={false}
                                    customInput={Input}
                                    onValueChange={(values) => field.onChange(values.floatValue)}
                                    {...field}
                                    onChange={() => { }}
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                    </FormField>

                    <FormField control={form.control} name="stock" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estoque</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Digite o estoque do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                    </FormField>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" type="reset">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="gap-1.5">
                            {
                                form.formState.isSubmitting && <Loader2Icon className="animate-spin" size={16} />
                            }
                            Salvar
                        </Button>
                    </DialogFooter>

                </form>
            </Form>
        </DialogContent>
    )
}