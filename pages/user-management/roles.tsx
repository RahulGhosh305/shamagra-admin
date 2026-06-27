import Protected from "@components/layout/protected";
import Roles from "@containers/user-management/roles";

const RolesPage = () => {
    return (
        <Protected>
            <Roles />
        </Protected>
    )
}

export default RolesPage;