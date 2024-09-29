import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from '@mui/icons-material/Download'; // MUI icon for download
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Dashboard from "../../components/Dashboard";
import { formatFileSize } from '../../utils/formatFileSize'; // Import your custom file size formatter

const Manuals = () => {
  const router = useRouter();
  const { folderId, name } = router.query;
  const [subfolders, setSubfolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!folderId) return;

    const fetchDocumentsOrFolders = async () => {
      try {
        const res = await fetch(`/api/documents/${folderId}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();

        if (data.type === "folders") {
          setSubfolders(data.subfolders);
        } else if (data.type === "files") {
          setDocuments(
            data.documents.filter((doc) => doc.name !== ".DS_Store")
          );
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch documents or subfolders");
        setLoading(false);
      }
    };

    fetchDocumentsOrFolders();
  }, [folderId]);

  const handleAccordionToggle = async (subfolderId) => {
    if (expanded === subfolderId) {
      setExpanded(null);
      return;
    }

    try {
      const res = await fetch(`/api/documents/${subfolderId}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      setDocuments(
        data.documents.filter((doc) => doc.name !== ".DS_Store")
      );
      setExpanded(subfolderId);
    } catch (err) {
      setError(err.message || "Failed to fetch documents for subfolder");
    }
  };

  return (
    <Dashboard>
      <div className="min-h-screen" style={{ padding: "16px" }}>
        <Typography color="black" variant="h6" gutterBottom>
          {name} Equipment Manuals {/* Display folder name from the URL */}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="mt-4">
            {subfolders.length > 0 &&
              subfolders.map((subfolder) => (
                <Accordion
                  key={subfolder.id}
                  expanded={expanded === subfolder.id}
                  onChange={() => handleAccordionToggle(subfolder.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{subfolder.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {documents.length > 0 ? (
                      <TableContainer component={Paper} className="border">
                        <Table sx={{ minWidth: 650 }} aria-label="documents table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{  fontSize: "13px" }} >File Name</TableCell>
                              <TableCell sx={{  fontSize: "13px" }} align="right">
                                File Size
                              </TableCell>
                              <TableCell sx={{  fontSize: "13px" }} align="right">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {documents.map((doc, index) => (
                              <TableRow
                                key={doc.key}
                                sx={{
                                  bgcolor: index % 2 === 0 ? "grey.100" : "white",
                                }}
                              >
                                <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                                  {doc.name}
                                </TableCell>
                                <TableCell align="right" className="text-gray-500">
                                  {formatFileSize(doc.size)} {/* Use formatFileSize */}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    color="primary"
                                    href={doc.url}
                                    download
                                    aria-label={`Download ${doc.name}`}
                                  >
                                    <VisibilityOutlinedIcon color="secondary" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Typography>No files available in this subfolder.</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Manuals;
