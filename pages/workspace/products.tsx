import Protected from "@components/layout/protected";
import Products from "@containers/workspace/products";

const ProductsPage = () => {
    return (
        <Protected>
            <Products />
        </Protected>
    )
}

export default ProductsPage;