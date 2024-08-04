import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";
import DocumentList from "../../components/DocumentList";
import { Typography, Alert } from "@mui/material";

const Manuals = () => {
  const router = useRouter();
  const { folder } = router.query;
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!folder) return;

    console.log("Fetching documents for folder:", folder); // Debugging log

    fetch(`/api/documents/${folder}`)
      .then((res) => {
        console.log("Response status:", res.status); // Log response status
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Debugging log
        if (Array.isArray(data)) {
          setDocuments(data);
        } else {
          setError(data.error || "Failed to fetch documents");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch documents:", err);
        setError(err.message || "Failed to fetch documents");
      });
  }, [folder]);

  return (
    <Dashboard>
      <div className="px-2 py-2">
        <Typography
          fontSize={18}
          fontWeight={500}
          color="secondary"
          paddingBottom={3}
        >
          {folder} Equipment Manuals
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <DocumentList documents={documents} />
      </div>
    </Dashboard>
  );
};

export default Manuals;
