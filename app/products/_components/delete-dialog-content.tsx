import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
    AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
    productId: number
}

export default function DeleteProductDialogContent({ productId }: DeleteProductDialogContentProps) {

    async function handleContinueClick() {
        try {
            await deleteProduct({ id: productId })
            toast.success("Produto excluído com sucesso")
        } catch (error) {
            console.error(error);
            toast.error("ocorreu um erro ao excluir o produto")
        }
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