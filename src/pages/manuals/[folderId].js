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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dashboard from "../../components/Dashboard";

const Manuals = () => {
  const router = useRouter();
  const { folderId, name } = router.query; // Get the folder ID and name from the URL
  const [subfolders, setSubfolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // To track the currently expanded accordion

  useEffect(() => {
    if (!folderId) return;

    const fetchDocumentsOrFolders = async () => {
      try {
        const res = await fetch(`/api/documents/${folderId}`); // Use folder ID from the URL
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();

        if (data.type === "folders") {
          setSubfolders(data.subfolders); // Display subfolders
        } else if (data.type === "files") {
          setDocuments(
            data.documents.filter((doc) => doc.name !== ".DS_Store") // Filter out .DS_Store files
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
      setExpanded(null); // Collapse the accordion if it's already expanded
      return;
    }

    try {
      const res = await fetch(`/api/documents/${subfolderId}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      setDocuments(
        data.documents.filter((doc) => doc.name !== ".DS_Store") // Filter out .DS_Store files
      );
      setExpanded(subfolderId); // Expand the clicked accordion
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
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="documents table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                File Size
                              </TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {documents.map((doc, index) => (
                              <TableRow
                                key={doc.key}
                                sx={{
                                  bgcolor: index % 2 === 0 ? 'grey.100' : 'white', // Striped effect
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {doc.name}
                                </TableCell>
                                <TableCell align="right">
                                  {(doc.size / 1024).toFixed(2)} KB
                                </TableCell>
                                <TableCell align="right">
                                  <Link href={doc.url} target="_blank" rel="noopener" color="primary">
                                    Preview
                                  </Link>{" "}
                                  |{" "}
                                  <Link href={doc.url} download color="primary">
                                    Download
                                  </Link>
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
