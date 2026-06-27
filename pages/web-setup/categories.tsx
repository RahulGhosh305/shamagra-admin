import Protected from "@components/layout/protected";
import Categories from "@containers/web-setup/categories";

const CategoriesPage = () => {
    return (
        <Protected>
            <Categories />
        </Protected>
    )
}

export default CategoriesPage;