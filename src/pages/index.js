import React from "react";
import { Layout, Typography, Button, Row, Col } from "antd";
import Dashboard from "../components/Dashboard";
import Image from "next/image";

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
            className="text-3xl md:text-5xl"
          >
            SPLASH SERVICE
          </p>
          <p className="text-sm md:text-md font-medium text-gray-200">
            Equipment Documentation and Training
          </p>
        </div>
      </Content>

      <Content style={{ padding: '30px' }}>
        <Title style={{ marginBottom: "16px", textAlign: "center" }} level={4}>Equipment Manuals & Parts</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/avw-logo.png'} alt="" height={55} width={60} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/laguna_logo-1.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/sonnys-logo.webp'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/macneil-logo.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/tommys-logo.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/mcww-logo.webp'} alt="" height={80} width={100} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/belanger-logo.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/gardner-denver-logo.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/fs-curtis-logo.png'} alt="" height={80} width={120} />
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Button className="flex space-x-2" type="default" block size="large" style={{ height: '100px', fontSize: '18px' }}>
              <Image src={'/drb-logo.svg'} alt="" height={80} width={60} />
            </Button>
          </Col>
        </Row>
      </Content>
    </Dashboard>
  );
};

export default Home;
