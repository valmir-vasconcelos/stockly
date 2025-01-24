"use client"

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Product } from "@prisma/client"
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import DeleteProductDialogContent from "./delete-dialog-content"
import UpsertProductDialogContent from "./upsert-product-dialog-content"

interface Props {
    product: Product
}

export default function ProductTableDropdownMenu({ product }: Props) {
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    return (
        <AlertDialog>
            <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MoreHorizontalIcon size={16} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(product.id.toString())}>
                            <ClipboardCopyIcon size={16} /> Copiar ID
                        </DropdownMenuItem>

                        <DialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5" >
                                <EditIcon size={16} />Editar
                            </DropdownMenuItem>
                        </DialogTrigger>

                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5" >
                                <TrashIcon size={16} />Deletar
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                    </DropdownMenuContent>
                </DropdownMenu>

                <UpsertProductDialogContent defaultValues={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    stock: product.stock

                }}
                    setDialogIsOpen={setEditDialogIsOpen}
                />
                <DeleteProductDialogContent productId={product.id} />

            </Dialog>
        </AlertDialog>
    )

}