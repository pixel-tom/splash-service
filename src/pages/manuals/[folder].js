import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '../../components/Dashboard';
import DocumentList from '../../components/DocumentList';
import { Container, Typography, Alert } from '@mui/material';

const Manuals = () => {
  const router = useRouter();
  const { folder } = router.query;
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!folder) return;

    fetch(`/api/documents/${folder}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDocuments(data);
        } else {
          setError('Failed to fetch documents');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch documents:', err);
        setError('Failed to fetch documents');
      });
  }, [folder]);

  return (
    <Dashboard>
      <div className='px-4 py-2'>
        <Typography fontSize={18} fontWeight={500} color='secondary' paddingBottom={3}>
          {folder} Equipment Manuals
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <DocumentList documents={documents} />
      </div>
    </Dashboard>
  );
};

export default Manuals;
