"use client";

import { Button } from "@/components/ui/button";
import { ComboboxOption } from "@/components/ui/combobox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@prisma/client";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";

interface CreateSaleButtonProps {
    products: Product[];
    productOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button>Nova Venda</Button>
            </SheetTrigger>
            <UpsertSheetContent setSheetIsOpen={setSheetIsOpen} {...props} />
        </Sheet>
    );
};

export default CreateSaleButton;