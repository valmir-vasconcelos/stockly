"use client";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

interface UpsertSaleButtonProps {
    products: Product[];
    productOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Nova Venda
                </Button>
            </SheetTrigger>
            {/* <UpsertSheetContent isOpen={sheetIsOpen} setSheetIsOpen={setSheetIsOpen} {...props} /> */}
            <UpsertSheetContent  {...props} />
        </Sheet>
    );
};

export default UpsertSaleButton;