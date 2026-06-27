import React, {ReactNode, useEffect, useState} from 'react';
import {Layout} from 'antd';
import {Div, Main} from "@styles/auth-info-style";
import Header from "@components/layout/header";
import Sider from "@components/layout/sider";
import Footer from "@components/layout/footer";
import {Constants} from "@utils/constants";
import {useLogOutMutation} from "@redux/services/auth/api";
import {useRouter} from "next/router";

const { Content } = Layout;

const LayoutPage: React.FC<{children: ReactNode}> = ({children}) => {
    const router = useRouter();
    const [logOut] = useLogOutMutation();

    const [collapse, setCollapse] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [loader, setLoader] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => validateAuth(), [])

    useEffect(() => {
        if (window?.innerWidth <= 991) {
            setMobileView(true);
            setCollapse(true)
        }
    }, [])

    const validateAuth = () => {
        const access = localStorage.getItem(Constants.ACCESS_TOKEN)
        const refresh = localStorage.getItem(Constants.REFRESH_TOKEN)

        if (access && refresh) {
            const accessToken: { expires: string, token: string } = JSON.parse(access)
            const refreshToken: { expires: string, token: string } = JSON.parse(refresh)

            if (new Date(accessToken.expires) < new Date()) {
                if (new Date(refreshToken.expires) < new Date()) {
                    logOut({ action: () => setRender(true) })
                } else {
                    setLoader(true)
                    // renew({
                    //     body: { access: accessToken.token, refresh: refreshToken.token },
                    //     logout: () => logOut({ action: () => setRender(true) }),
                    //     render: () => setRender(true)
                    // })

                    logOut({ action: () => setRender(true) })
                }
            } else setRender(true)
        } else setRender(true)
    }

    return (
        <Div>
            {router.pathname !== "/signin" ? (
                <Layout className="layout">
                    <Header
                        setCollapse={setCollapse}
                        collapse={collapse}
                        setMobileNav={setMobileNav}
                        mobileNav={mobileNav}
                        mobileView={mobileView}
                    />

                    <Layout>
                        <Sider
                            collapse={collapse}
                            setCollapse={setCollapse}
                        />

                        <Layout className="atbd-main-layout">
                            <Content>
                                <Main>
                                    {children}
                                </Main>

                                <Footer />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            ) : (
                <Layout>
                    {children}
                </Layout>
            )}
        </Div>
    )
};

export default LayoutPage;