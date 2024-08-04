import React, { useState, useEffect } from 'react';
import { Collapse, Table, Button, Tag, Modal, Typography, Popover } from 'antd';
import { FileOutlined, EyeOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { formatFileSize } from '../utils/formatFileSize'; // Adjust the path as needed
import { useMediaQuery } from 'react-responsive';

const { Panel } = Collapse;
const { Text } = Typography;

const DocumentList = ({ documents = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    console.log('Documents prop received:', documents); // Debugging log
  }, [documents]);

  // Filter out .DS_Store files and group documents by subfolder
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (doc.name === '.DS_Store') return acc; // Filter out .DS_Store files

    const pathParts = doc.key.split('/');
    const mainCategory = pathParts[2] || 'Uncategorized'; // Manuals/MCWW/Conveyor/ => Conveyor

    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    if (doc.key && doc.size && mainCategory && doc.size > 0) { // Ensure the document is valid and not a folder
      acc[mainCategory].push(doc);
    }
    return acc;
  }, {});

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  const columns = [
    {
      title: <p className='text-[10px]'>File Name</p>,
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
      title: <p className='text-[10px]'>Actions</p>,
      dataIndex: 'url',
      key: 'url',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handlePreview(text)} icon={<EyeOutlined />} />
          <Button type="link" href={text} download icon={<DownloadOutlined />} />
          {isMobile && (
            <Popover
              content={
                <div>
                  <p><strong>Size:</strong> {formatFileSize(record.size)}</p>
                  <p><strong>Tags:</strong></p>
                  <div>
                    {record.key.split('/').slice(1, -1).map((tag, index) => (
                      <Tag color={index % 2 === 0 ? "blue" : "green"} key={index}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              }
              title="File Info"
              trigger="click"
            >
              <Button type="link" icon={<InfoCircleOutlined />} />
            </Popover>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Collapse accordion>
        {Object.keys(groupedDocuments).map((mainCategory) => {
          const fileCount = groupedDocuments[mainCategory].length;
          if (fileCount === 0) return null; // Skip empty subcategories
          return (
            <Panel
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>{mainCategory}</span>
                  <span style={{ fontSize: '12px', color: '#ff7f02' }}>{fileCount} files</span>
                </div>
              }
              key={mainCategory}
            >
              <Table
                columns={isMobile ? columns.slice(0, 2) : columns}
                dataSource={groupedDocuments[mainCategory].map((doc) => ({
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
        height="90%"
        style={{ top: 50 }}
      >
        <iframe
          src={previewUrl}
          width="100%"
          height="650px"
          style={{ border: 'none' }}
          title="Document Preview"
        />
      </Modal>
    </div>
  );
};

export default DocumentList;
