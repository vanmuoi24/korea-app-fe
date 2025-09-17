import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  ApiOutlined,
  UserOutlined,
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AliwangwangOutlined,
  ScheduleOutlined,
  BugOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar, Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

const AdminSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/admin");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveMenu(location.pathname || "/admin");
  }, [location.pathname]);

  const menuItems = [
    {
      label: (
        <Link to="/admin/managerInformation" style={{ textDecoration: "none" }}>
          Quản lí thông tin{" "}
        </Link>
      ),
      key: "/admin/managerInformation",
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Link to="/admin/managerTime" style={{ textDecoration: "none" }}>
          Quản lí Thời Gian{" "}
        </Link>
      ),
      key: "/admin/managerTime",
      icon: <FieldTimeOutlined />,
    },
  ];

  const itemsDropdown = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "home",
    },
    {
      label: (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => console.log("logout")}
        >
          Đăng xuất
        </span>
      ),
      key: "logout",
    },
  ];

  return (
    <>
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>
            <BugOutlined /> Hệ Thống Quản Trị
          </div>
          <Menu
            selectedKeys={[activeMenu]}
            mode="inline    "
            items={menuItems}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>

        <Layout>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 20,
              padding: "0 1rem",
              alignItems: "center",
              height: 64,
              background: "#fff",
              textDecoration: "none",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                Welcome Admin
                <Avatar>A</Avatar>
              </Space>
            </Dropdown>
          </div>

          <Content
            style={{
              padding: "1rem",
              overflow: "hidden",
              height: "calc(100vh - 64px)",
            }}
          >
            <div
              style={{
                height: "100%",
                overflowY: "auto",
                paddingRight: 8,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminSidebar;
