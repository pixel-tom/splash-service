import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Layout,
  Input,
  Button,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = () => {
  const router = useRouter();

  return (
    <Header
      style={{
        backgroundColor: "#fefeff",
        color: "#f5f5f5",
        borderTop: "1px solid #e5e5e5",
        borderLeft: "1px solid #e5e5e5",
      }}
      className="px-4 rounded-tl-lg mt-3"
    >
      <div className="flex w-full gap-4 justify-between items-center">
        <div className="relative flex-1">
          <Input
            prefix={<SearchOutlined style={{ color: "#0fa7de" }} />}
            placeholder="Search..."
            style={{
              backgroundColor: "#f5f5f5",
              color: "#084b73",
              borderColor: "#0fa7de",
              borderRadius: "50px",
              paddingLeft: "40px",
            }}
            className="py-2 ml-10 w-52 lg:w-[400px] md:ml-0 invisible md:visible"
          />
        </div>
        
      </div>
    </Header>
  );
};

export default CustomHeader;
