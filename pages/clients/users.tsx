import Protected from "@components/layout/protected";
import Users from "@containers/clients/users";

const UsersPage = () => {
    return (
        <Protected>
            <Users />
        </Protected>
    )
}

export default UsersPage;