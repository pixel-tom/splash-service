import React from "react";
import { Layout, Typography } from "antd";
import Dashboard from "../components/Dashboard";

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Dashboard>
      <Content
        style={{
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
          backgroundImage: 'url("/bright.png")', // Adjust the path to your image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px", // Ensure the content has some minimum height
          color: "#fff", // Ensure text is visible on the background
        }}
        className="bg-cover py-20 px-8"
      >
        <div className="text-center mt-5 mb-2">
          <p
            level={1}
            style={{
              margin: "0",
              padding: "0",
              color: "#fff",
              fontFamily: "Gotham Black, sans-serif",
              textTransform: "uppercase", // Make text all caps
            }}
            className="text-5xl md:text-6xl"
          >
            SPLASH SERVICE
          </p>
          <p className="text-sm md:text-lg font-medium text-gray-200">
            Equipment Documentation and Training
          </p>
        </div>
      </Content>
    </Dashboard>
  );
};

export default Home;
