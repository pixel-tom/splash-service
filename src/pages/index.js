import React from 'react';
import { Typography, Card, Row, Col, Layout, Button } from 'antd';
import { FileOutlined, VideoCameraOutlined, BookOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Dashboard from '../components/Dashboard';

const { Title, Text } = Typography;
const { Content } = Layout;

const Home = () => {
  return (
    <Dashboard>
      <Content style={{ padding: '30px 50px',  borderRadius: "10px", border: "1px solid #e5e5e5" }} className='bg-[#f6f5f2]/50'>
        
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#084b73', 
                color: '#f5f5f5', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#f5f5f5' }}><FileOutlined /> Equipment Manuals</span>}
                description={<span style={{ color: '#ddd' }}>Find manuals for various equipment.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#0fa7de' }}>View Manuals</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#c3d700', 
                color: '#084b73', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#084b73' }}><VideoCameraOutlined /> Instructional Videos</span>}
                description={<span style={{ color: '#555' }}>Watch videos on equipment setup and troubleshooting.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#ff7f02' }}>Watch Videos</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#0fa7de', 
                color: '#084b73', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#084b73' }}><BookOutlined /> Training Videos</span>}
                description={<span style={{ color: '#555' }}>Access training materials to enhance your skills.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#ff7f02' }}>Start Training</Button>
            </Card>
          </Col>
        </Row>
        <Row gutter={[20, 20]} style={{ marginTop: '32px' }}>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#ff7f02', 
                color: '#f5f5f5', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#f5f5f5' }}><BookOutlined /> Guides</span>}
                description={<span style={{ color: '#ddd' }}>Detailed guides for maintenance procedures.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#084b73' }}>View Guides</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#084b73', 
                color: '#f5f5f5', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#f5f5f5' }}><EllipsisOutlined /> Other Resources</span>}
                description={<span style={{ color: '#ddd' }}>Additional resources for comprehensive support.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#ff7f02' }}>Explore Resources</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ 
                backgroundColor: '#c3d700', 
                color: '#084b73', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Card.Meta
                title={<span style={{ fontSize: '19px', fontWeight: '600', color: '#084b73' }}><QuestionCircleOutlined /> Support</span>}
                description={<span style={{ color: '#555' }}>Get help and support from our team.</span>}
              />
              <Button type="primary" style={{ marginTop: '16px', backgroundColor: '#272727', borderColor: '#ff7f02' }}>Get Support</Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Dashboard>
  );
};

export default Home;
