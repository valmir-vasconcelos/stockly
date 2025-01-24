"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-product-dialog-content";

export default function CreateProductButton() {

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        < Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo produto
                </Button>
            </DialogTrigger>
            <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen} />

        </Dialog >
    )
}