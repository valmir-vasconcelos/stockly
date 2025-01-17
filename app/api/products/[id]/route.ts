import { db } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const productId = Number.parseInt(params.id);
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        return Response.json({ message: `Produto com id=${productId} não encontrado` }, { status: 404 });
    }

    return Response.json({ product }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const productId = Number.parseInt(params.id);
    await db.product.delete({
        where: {
            id: productId
        }
    })

    return Response.json({ message: "Produto deletado com sucesso" }, { status: 200 });

}
