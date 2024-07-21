import { useState } from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import {
  FileOutlined,
  VideoCameraOutlined,
  BookOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import Image from 'next/image';

const { Sider } = Layout;

const items = [
  {
    key: 'sub1',
    icon: <FileOutlined style={{ color: '#084b73' }} />,
    label: <span style={{ color: '#084b73', fontWeight: '600' }}>Equipment Manuals</span>,
    children: [
      {
        key: '2',
        label: <Link href="/manuals/AVW"><span style={{ color: '#084b73', fontWeight: '600' }}>AVW</span></Link>,
      },
      {
        key: '3',
        label: <Link href="/manuals/Laguna"><span style={{ color: '#084b73', fontWeight: '600' }}>Laguna</span></Link>,
      },
      {
        key: '4',
        label: <Link href="/manuals/MCWW"><span style={{ color: '#084b73', fontWeight: '600' }}>MCWW</span></Link>,
      },
      {
        key: '5',
        label: <Link href="/manuals/Hydraflex"><span style={{ color: '#084b73', fontWeight: '600' }}>Hydraflex</span></Link>,
      },
    ],
  },
  {
    key: 'sub2',
    icon: <VideoCameraOutlined style={{ color: '#0fa7de' }} />,
    label: <span style={{ color: '#0fa7de', fontWeight: '600' }}>Instructional Videos</span>,
    children: [
      {
        key: '6',
        label: <Link href="/instructional-videos/setup"><span style={{ color: '#0fa7de', fontWeight: '600' }}>Setup</span></Link>,
      },
      {
        key: '7',
        label: <Link href="/instructional-videos/troubleshooting"><span style={{ color: '#0fa7de', fontWeight: '600' }}>Troubleshooting</span></Link>,
      },
    ],
  },
  {
    key: '8',
    icon: <BookOutlined style={{ color: '#c3d700' }} />,
    label: <Link href="/training-videos"><span style={{ color: '#c3d700', fontWeight: '600' }}>Training Videos</span></Link>,
  },
  {
    key: '9',
    icon: <BookOutlined style={{ color: '#ff7f02' }} />,
    label: <Link href="/guides"><span style={{ color: '#ff7f02', fontWeight: '600' }}>Guides</span></Link>,
  },
  {
    key: '10',
    icon: <EllipsisOutlined style={{ color: '#333333' }} />,
    label: <Link href="/other-items"><span style={{ color: '#333333', fontWeight: '600' }}>Resources</span></Link>,
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

const Sidebar = ({ collapsedWidth = 100 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [stateOpenKeys, setStateOpenKeys] = useState(['sub1', '2']);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={280}  // Increased width
      collapsedWidth={collapsedWidth}  // Collapsed width
      style={{ 
        height: '100vh', 
        backgroundColor: '#f6f5f2',  // Light background
        color: '#333333',  // Dark text
        paddingLeft: '10px',  // Extra padding
        paddingRight: '10px'  // Extra padding
      }}
    >
      <div className="logo" style={{ textAlign: 'center', margin: '16px 0' }}>
        <Link href="/" className='flex items-center'>
          <Image src={"/splash-logo.png"} alt="splash" height={70} width={70} className='ml-2 mt-[-8px]' />
        </Link>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['2']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ 
          backgroundColor: '#f6f5f2', 
          color: '#333333'  // Dark text
        }}
        items={items}
        theme="light"
      />
    </Sider>
  );
};

export default Sidebar;
