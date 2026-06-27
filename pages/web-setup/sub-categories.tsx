import Protected from "@components/layout/protected";
import SubCategories from "@containers/web-setup/sub-categories";

const SubCategoriesPage = () => {
    return (
        <Protected>
            <SubCategories />
        </Protected>
    )
}

export default SubCategoriesPage;