import { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetch('/api/documents')
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
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const uploadFile = async () => {
    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('subcategory', subcategory);

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('File uploaded successfully:', data);

      setDocuments([...documents, {
        key: data.key,
        lastModified: new Date(),
        size: file.size,
        url: data.url,
      }]);
      setFile(null);
      setName('');
      setCategory('');
      setSubcategory('');
      setPreviewUrl(null);
    } catch (err) {
      console.error('Error during file upload:', err);
      setError(`Failed to upload file: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dashboard>
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      {error && <p className="text-red-500">{error}</p>}
      {isUploading && <p>Uploading...</p>}
      <ul>
        {documents.map((doc) => (
          <li key={doc.key}>
            <h3 className="text-xl">{doc.key ? doc.key.split('/').pop() : 'Unknown'}</h3>
            <p>{doc.size} bytes</p>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Document Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mr-2">
          <option value="">Select Category</option>
          <option value="Manuals">Manuals</option>
          <option value="Instructional Videos">Instructional Videos</option>
          <option value="Training Videos">Training Videos</option>
          <option value="Guides">Guides</option>
          <option value="Other Items">Other Items</option>
        </select>
        {category === 'Manuals' && (
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="border p-2 mr-2">
            <option value="">Select Subcategory</option>
            <option value="AVW">AVW</option>
            <option value="MCWW">MCWW</option>
            <option value="Laguna">Laguna</option>
          </select>
        )}
        {category === 'Other Items' && (
          <input
            type="text"
            placeholder="Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border p-2 mr-2"
          />
        )}
        <input type="file" onChange={handleFileChange} className="border p-2 mr-2" />
        <button onClick={uploadFile} className="bg-blue-500 text-white p-2">
          Upload Document
        </button>
        {previewUrl && (
          <div className="mt-4">
            <h4 className="text-lg">Document Preview:</h4>
            {file.type === 'application/pdf' ? (
              <iframe src={previewUrl} width="100%" height="400px" className="border" />
            ) : (
              <p>Preview not available for this file type</p>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Documents;
