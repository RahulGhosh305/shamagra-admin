import { Layout, Menu, MenuProps } from "antd";
import FeatherIcon from "feather-icons-react";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Scope } from "@utils/scope";

const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["user-management"];

const SiderPage: FC<{
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
}> = ({ collapse, setCollapse }) => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("");
  const [openedKey, setOpenedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([""]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect: MenuProps["onSelect"] = (props) => {
    setSelectedKey(props.key);
  };

  useEffect(() => {
    if (router.pathname === "/") setSelectedKey("dashboard");
    else setSelectedKey(router.pathname);

    const openArr = [];

    // const match = router.pathname.match(/^\/([^/]+)/);
    const match = router.pathname.split("/");
    if (match?.length && match.length > 1 && match[1] !== "")
      openArr.push(match[1]);
    if (match?.length && match.length > 2 && match[2] !== "")
      openArr.push(match[2]);
    if (match?.length && match.length > 3 && match[3] !== "")
      openArr.push(match[3]);

    if (openArr.length) setOpenKeys(openArr);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    if (window?.innerWidth <= 991) {
      setCollapse(true);
    }
  };

  type MenuItem = Required<MenuProps>["items"][number];

  const getItem = ({
    label,
    key,
    icon,
    children,
    type,
    isPermitted,
  }: {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    type?: "group";
    isPermitted?: boolean;
  }): MenuItem => {
    return !isPermitted
      ? null
      : ({
        key,
        icon,
        children,
        label,
        type,
        // isPermitted
      } as MenuItem);
  };

  const items: MenuProps["items"] = [
    getItem({
      label: <Link href={"/dashboard"}>Dashboard</Link>,
      key: "/dashboard",
      icon: <FeatherIcon icon="home" />,
      isPermitted: true,
    }),
    getItem({
      label: "User Management",
      key: "user-management",
      icon: <FeatherIcon icon="user-check" />,
      // isPermitted: Scope.checkScopesParent("um_"),
      isPermitted: true,
      children: [
        getItem({
          label: <Link href={"/user-management/roles"}>Roles</Link>,
          key: "/user-management/roles",
          isPermitted: Scope.checkScopes(["um_roles_index"]),
        }),
        getItem({
          label: (
            <Link href={"/user-management/roles-permission"}>Permissions</Link>
          ),
          key: "/user-management/roles-permission",
          isPermitted: Scope.checkScopes(["um_roles_permissions_index"]),
        }),
        getItem({
          label: <Link href={"/user-management/users"}>Users</Link>,
          key: "/user-management/users",
          isPermitted: Scope.checkScopes(["um_users_index"]),
        }),
      ],
    }),
    getItem({
      label: "Web Setup",
      key: "web-setup",
      icon: <FeatherIcon icon="settings" />,
      // isPermitted: Scope.checkScopesParent("ws_"),
      isPermitted: true,
      children: [
        getItem({
          label: <Link href={"/web-setup/authors"}>Authors</Link>,
          key: "/web-setup/authors",
          isPermitted: Scope.checkScopes(["ws_authors_index"]),
        }),
        getItem({
          label: <Link href={"/web-setup/banners"}>Banners</Link>,
          key: "/web-setup/banners",
          isPermitted: Scope.checkScopes(["ws_banners_index"]),
        }),
        getItem({
          label: <Link href={"/web-setup/categories"}>Categories</Link>,
          key: "/web-setup/categories",
          isPermitted: Scope.checkScopes(["ws_categories_index"]),
        }),
        // getItem({
        //   label: <Link href={"/web-setup/sub-categories"}>Sub Categories</Link>,
        //   key: "/web-setup/sub-categories",
        //   isPermitted: Scope.checkScopes(["ws_sub_categories_index"]),
        // }),
      ],
    }),
    getItem({
      label: "Workspace",
      key: "workspace",
      icon: <FeatherIcon icon="briefcase" />,
      // isPermitted: Scope.checkScopesParent("workspace_"),
      isPermitted: true,
      children: [
        getItem({
          label: <Link href={"/workspace/products"}>Products</Link>,
          key: "/workspace/products",
          isPermitted: Scope.checkScopes(["workspace_products_index"]),
        }),
        getItem({
          label: <Link href={"/workspace/orders"}>Orders</Link>,
          key: "/workspace/orders",
          isPermitted: Scope.checkScopes(["workspace_orders_index"]),
        }),
      ],
    }),
    getItem({
      label: "Clients",
      key: "clients",
      icon: <FeatherIcon icon="users" />,
      // isPermitted: Scope.checkScopesParent("workspace_"),
      isPermitted: true,
      children: [
        getItem({
          label: <Link href={"/clients/users"}>Users</Link>,
          key: "/clients/users",
          isPermitted: Scope.checkScopes(["clients_users_index"]),
        }),
      ],
    }),
  ];

  return (
    <Fragment>
      <Sider
        width={280}
        style={{
          margin: "50px 0 0 0",
          padding: "15px 15px 55px 15px",
          overflowY: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          zIndex: 998,
        }}
        collapsed={collapse}
        theme={"light"}
      >
        <p className="sidebar-nav-title">ADMINISTRATION</p>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          onSelect={onSelect}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </Sider>
    </Fragment>
  );
};

export default SiderPage;
