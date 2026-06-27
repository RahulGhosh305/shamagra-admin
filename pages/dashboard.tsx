import Protected from "@components/layout/protected";
import Dashboard from "@containers/dashboard";

const DashboardPage = () => {
    return (
        <Protected>
            <Dashboard />
        </Protected>
    )
}

export default DashboardPage;