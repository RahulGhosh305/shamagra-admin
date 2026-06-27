import RolesPermissions from "@containers/user-management/rolesPermissions";
import Protected from "@components/layout/protected";

const RolesPermissionPage = () => {
    return (
        <Protected>
            <RolesPermissions />
        </Protected>

    )
}
export default RolesPermissionPage;