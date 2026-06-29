import { Col, Layout, Row } from "antd";
import Link from "next/link";
import React from "react";

const { Footer } = Layout;

const FooterPage = () => {
  return (
    <Footer
      className="admin-footer"
      style={{
        padding: "20px 30px 18px",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "14px",
        background: "rgba(255, 255, 255, .90)",
        width: "100%",
        boxShadow: "0 -5px 10px rgba(146,153,184, 0.05)",
      }}
    >
      <Row>
        <Col md={12} xs={24}>
          <span className="admin-footer__copyright">
            {new Date().getFullYear()} © Shamagra
          </span>
        </Col>
        <Col md={12} xs={24}>
          <div className="admin-footer__links">
            <Link href="">About</Link>
            <Link href="">Team</Link>
            <Link href="">Contact</Link>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterPage;
