import Protected from "@components/layout/protected";
import Authors from "@containers/web-setup/authors";

const AuthorsPage = () => {
    return (
        <Protected>
            <Authors />
        </Protected>
    )
}

export default AuthorsPage;