import React, { useState } from 'react';
import { Collapse, Table, Button, Tag, Modal, Typography } from 'antd';
import { FileOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { formatFileSize } from '../utils/formatFileSize'; // Adjust the path as needed

const { Panel } = Collapse;
const { Text } = Typography;

const DocumentList = ({ documents = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Group documents by main category and subcategory
  const groupedDocuments = documents.reduce((acc, doc) => {
    const pathParts = doc.key.split('/');
    const mainCategory = pathParts.length > 1 ? pathParts[1] : 'Uncategorized';
    const subcategory = pathParts.length > 2 ? pathParts[2] : 'Uncategorized';
    const subKey = `${mainCategory}/${subcategory}`;

    if (!acc[subKey]) {
      acc[subKey] = [];
    }
    if (doc.key && doc.size && subcategory) { // Ensure the document is valid
      acc[subKey].push(doc);
    }
    return acc;
  }, {});

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  const columns = [
    {
      title: <p className='text-xs'>File Name</p>,
      dataIndex: 'key',
      key: 'key',
      render: (text) => (
        <span className='font-semibold text-[13px]'>
          <FileOutlined className="mr-2" />
          {text.split('/').pop()}
        </span>
      ),
    },
    {
      title: <p className='text-xs'>Size</p>,
      dataIndex: 'size',
      key: 'size',
      render: (text) => <div className='text-xs text-[#666]'>{formatFileSize(text)}</div>,
    },
    {
      title: <p className='text-xs'>Tags</p>,
      key: 'tags',
      render: (_, record) => {
        const pathParts = record.key.split('/');
        const mainCategory = pathParts.length > 1 ? pathParts[1] : 'Uncategorized';
        const subcategory = pathParts.length > 2 ? pathParts[2] : 'Uncategorized';
        return (
          <>
            <Tag color="blue" className='text-xs'>{mainCategory}</Tag>
            <Tag color="green" className='text-xs'>{subcategory}</Tag>
          </>
        );
      },
    },
    {
      title: <p className='text-xs'>Actions</p>,
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <div>
          <Button type="link" onClick={() => handlePreview(text)} icon={<EyeOutlined />} />
          <Button type="link" href={text} download icon={<DownloadOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <div className="px-2">
      <Collapse accordion>
        {Object.keys(groupedDocuments).map((subKey) => {
          const [mainCategory, subcategory] = subKey.split('/');
          const fileCount = groupedDocuments[subKey].length;
          if (fileCount === 0) return null; // Skip empty categories
          return (
            <Panel
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>{subcategory}</span>
                  <span style={{ fontSize: '12px', color: '#ff7f02' }}>{fileCount} files</span>
                </div>
              }
              key={subKey}
            >
              <Table
                columns={columns}
                dataSource={groupedDocuments[subKey].map((doc) => ({
                  key: doc.key,
                  size: doc.size,
                  url: doc.url,
                }))}
                pagination={false}
                rowClassName="hover:bg-gray-100"
              />
            </Panel>
          );
        })}
      </Collapse>
      <Modal
        visible={previewVisible}
        title=""
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="90%"
        style={{ top: '5%', margin: '0 auto' }}
        bodyStyle={{ height: '90vh', padding: 0 }}
      >
        <iframe
          src={previewUrl}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Document Preview"
        />
      </Modal>
    </div>
  );
};

export default DocumentList;
