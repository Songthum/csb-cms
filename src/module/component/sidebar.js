import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  LaptopOutlined,
  UserOutlined,
  FormOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import '../theme/css/sidebar.css';

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    key: "/",
    icon: React.createElement(UserOutlined),
    label: "หน้าหลัก",
  },
  {
    key: "/exam-management",
    icon: React.createElement(FormOutlined),
    label: "จัดการข้อสอบ",
  },
  {
    key: "/room-management",
    icon: React.createElement(LaptopOutlined),
    label: "จัดการห้องสอบ",
    // children: [
    //   {
    //     key: "/room-management/add-room",
    //     label: "เพิ่มห้องสอบ",
    //   },
    //   {
    //     key: "/room-management/edit-room",
    //     label: "แก้ไขห้องสอบ",
    //   }
    // ]
  },
  {
    key: "/member-spacial-project",
    icon: React.createElement(UserOutlined),
    label: "รายชื่อนักศึกษา",
    children: [
      {
        key: "/member-spacial-project/sp-1",
        label: "Special Project 1", 
      },
      {
        key: "/member-spacial-project/sp-2",
        label: "Special Project 2",
      }
    ]
  }
];

const SiderBar = ({ page, pageName, pageSub, path }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [selectedKey, setSelectedKey] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedKey(path);
  }, [path]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    navigate(e.key);
  };

  return (
    <Layout>
      <Header className="header" style={{ background: colorBgContainer }}>
        <img
          src="https://hrd.kmutnb.ac.th/wp-content/uploads/2024/01/logo-kmutnb-final.png"
          alt="logo"
          className="logo"
        />
        <span>
          Special Project Examination Management System for CSB Program
        </span>
        <span>{""}</span>
      </Header>

      <Layout>
        <Sider className="sider" style={{ background: colorBgContainer }}>
          <p>เจ้าหน้าที่</p>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={["sub1"]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            className="breadcrumb"
            items={[{ title: pageName }, { title: pageSub ?? "" }]}
          />

          <Content
            className="content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {page}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SiderBar;
