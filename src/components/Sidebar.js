import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import {
  FileOutlined,
  VideoCameraOutlined,
  BookOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const { Sider } = Layout;

const Sidebar = ({ collapsedWidth = 100 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [stateOpenKeys, setStateOpenKeys] = useState(['sub1']);
  const [manualFolders, setManualFolders] = useState([]);
  const isMdOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders');
        const data = await response.json();
        console.log('Fetched folders:', data); // Log fetched data
        setManualFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const manualItems = manualFolders.map((folder, index) => ({
    key: `folder-${index}`,
    label: <Link href={`/manuals/${folder.name}`}><span style={{ color: '#084b73', fontWeight: '600' }}>{folder.name}</span></Link>,
  }));

  const items = [
    {
      key: 'sub1',
      icon: <FileOutlined style={{ color: '#084b73' }} />,
      label: <span style={{ color: '#084b73', fontWeight: '600' }}>Equipment Manuals</span>,
      children: manualItems,
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

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={280}
      collapsedWidth={collapsedWidth}
      style={{ 
        height: '100vh', 
        backgroundColor: '#f6f5f2',
        color: '#333333',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
      trigger={null}
    >
      <div className="logo" style={{ textAlign: 'center', margin: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '10px' }}>
        <Link href="/" className='flex items-center'>
          {isMounted && isMdOrLarger && (
            <Image src={"/splash-logo.png"} alt="splash" height={70} width={70} className='ml-2 mt-[-8px]' />
          )}
        </Link>
        <div
          style={{
            cursor: 'pointer',
            color: '#555'
          }}
          onClick={toggleCollapsed}
        >
          
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['2']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ 
          backgroundColor: '#f6f5f2',
          color: '#333333',
        }}
        items={items}
        theme="light"
      />
    </Sider>
  );
};

export default Sidebar;
