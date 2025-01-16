interface Params {
    id: string
}

export default function ProductDetailsPage({ params: { id } }: { params: Params }) {
    return <h1>Product ID: {id}</h1>
}