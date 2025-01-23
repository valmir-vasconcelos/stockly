import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

interface SalesTableDropdownMenuProps {
    product: Pick<Product, "id">;
    onDelete: (productId: number) => void;
}

const SalesTableDropdownMenu = ({ product, onDelete }: SalesTableDropdownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <MoreHorizontalIcon size={16} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => navigator.clipboard.writeText(product.id.toString())}
                >
                    <ClipboardCopyIcon size={16} />
                    Copiar ID
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => onDelete(product.id)}
                >
                    <TrashIcon size={16} />
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SalesTableDropdownMenu;