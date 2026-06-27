import React from "react";
import Dashboard from "@containers/dashboard";
import Protected from "@components/layout/protected";

const Home: React.FC = () => {
    return (
        <Protected>
            <Dashboard />
        </Protected>
    );
};

export default Home;
