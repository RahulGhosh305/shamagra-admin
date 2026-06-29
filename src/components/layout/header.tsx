import { Button, Col, Layout, Row } from "antd";
import Link from "next/link";
import User from "@components/layout/user";
import FeatherIcon from "feather-icons-react";
import React, { FC, Fragment } from "react";
import { SmallScreenAuthInfo } from "@styles/auth-info-style";
import Image from "next/image";

const { Header } = Layout;

const HeaderPage: FC<{
  setCollapse: (collapse: boolean) => void;
  collapse: boolean;
  setMobileNav: (mobileNav: boolean) => void;
  mobileNav: boolean;
  mobileView: boolean;
}> = ({ setCollapse, collapse, setMobileNav, mobileNav, mobileView }) => {
  return (
    <Fragment>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          height: "64px",
          padding: "0 15px",
          color: "#272b41",
          lineHeight: "64px",
          background: "#fff",
        }}
      >
        <Row>
          <Col lg={3} sm={6} xs={12} className="align-center-v navbar-brand">
            <Button type="link" onClick={() => setCollapse(!collapse)}>
              <Image
                src={`/assets/images/${collapse ? "right.svg" : "left.svg"}`}
                alt="menu"
                width={24}
                height={24}
              />
            </Button>
            <Link
              href={"/dashboard"}
              className={
                !mobileView ? "striking-logo top-menu" : "striking-logo"
              }
            >
              <Image
                alt=""
                width={160}
                height={100}
                src={"/assets/images/LOGO_BANGLA@2x.png"}
              />
            </Link>
          </Col>
          <Col lg={15} md={8} sm={0} xs={0} />
          <Col lg={6} md={10} sm={0} xs={0}>
            <User />
          </Col>
          <Col md={0} sm={18} xs={12}>
            <>
              <div className="mobile-action">
                <Link
                  className="btn-auth"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileNav(!mobileNav);
                  }}
                  href=""
                >
                  <FeatherIcon icon="more-vertical" />
                </Link>
              </div>
            </>
          </Col>
        </Row>
      </Header>

      <div className="header-more">
        <Row>
          <Col md={0} sm={24} xs={24}>
            <div className="small-screen-headerRight">
              {/* @ts-ignore */}
              <SmallScreenAuthInfo hide={!mobileNav}>
                <User />
              </SmallScreenAuthInfo>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default HeaderPage;
