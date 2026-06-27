import Protected from "@components/layout/protected";
import Banners from "@containers/web-setup/banners";

const BannersPage = () => {
    return (
        <Protected>
            <Banners />
        </Protected>
    )
}

export default BannersPage;