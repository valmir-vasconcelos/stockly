import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
    AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
    productId: number
}

export default function DeleteProductDialogContent({ productId }: DeleteProductDialogContentProps) {

    const { execute: executeDeleteProduct } = useAction(deleteProduct, {
        onSuccess: () => { toast.success("Produto excluído com sucesso") },
        onError: () => { toast.error("ocorreu um erro ao excluir o produto") }
    })

    async function handleContinueClick() {
        executeDeleteProduct({ id: productId })
    }

    return (
        <AlertDialogContent>

            <AlertDialogHeader>
                <AlertDialogTitle>
                    Deseja realmente deletar este produto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Essa ação não pode ser desfeita
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
            </AlertDialogFooter>

        </AlertDialogContent>

    )
}