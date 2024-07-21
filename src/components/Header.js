import { useRouter } from 'next/router';
import { Layout, Input, Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header style={{ backgroundColor: '#fefeff', color: '#f5f5f5', borderTop: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5' }} className="px-4 rounded-tl-lg">
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <Input
            prefix={<SearchOutlined style={{ color: '#0fa7de' }} />}
            placeholder="Search..."
            style={{ 
              backgroundColor: '#f5f5f5', 
              color: '#084b73', 
              borderColor: '#0fa7de', 
              borderRadius: '50px', 
              paddingLeft: '40px',
              width: '50%',
            }}
            className="py-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button type="primary" style={{ backgroundColor: '#0fa7de', borderColor: '#0fa7de', color: '#f5f5f5' }}>
            Sign in
          </Button>
          <UserOutlined style={{ fontSize: '24px', color: '#666', cursor: 'pointer' }} />
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
