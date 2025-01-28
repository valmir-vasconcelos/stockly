"use client";

import { ProductDto } from "@/app/_data-access/product/get-products";
import { Button } from "@/components/ui/button";
import { ComboboxOption } from "@/components/ui/combobox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";

interface UpsertSaleButtonProps {
    products: ProductDto[];
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
            <UpsertSheetContent
                isOpen={sheetIsOpen}
                setSheetIsOpen={setSheetIsOpen}
                {...props}
            />
        </Sheet>
    );
};

export default UpsertSaleButton;