import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const Dashboard = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="flex">
      {isMobile ? (
        <>
          <Button
            type="default"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{ position: "fixed", top: 29, left: 16, zIndex: 1000 }}
          />
          <Drawer
            placement="left"
            style={{ backgroundColor: "#f6f5f2" }}
            onClose={toggleDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            className="pt-[20px]"
          >
            <Sidebar />
          </Drawer>
        </>
      ) : (
        <Sidebar />
      )}
      <Layout className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1 bg-[#fefeff] border border-l-[#e5e5e5]">
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
