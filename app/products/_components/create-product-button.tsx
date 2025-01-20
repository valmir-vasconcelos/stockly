"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import { createProduct, } from "@/app/_actions/product/create-product";
import { useState } from "react";
import { createProductSchema, CreateProductSchema } from "@/app/_actions/product/create-product/schema";

export default function CreateProductButton() {

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const form = useForm<CreateProductSchema>({
        shouldUnregister: true, //limpa os campos do formulário
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 1
        }
    })

    async function onSubmit(data: CreateProductSchema) {
        try {

            await createProduct(data);
            setDialogIsOpen(false);

        } catch (error) {
            console.error({ error })
        }
    }

    return (
        < Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>
                                Cadastro de Produto
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
        </Dialog >
    )
}