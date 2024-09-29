import React, { useState, useEffect } from "react";
import { formatFileSize } from "../utils/formatFileSize";
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

const DocumentList = ({ documents = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    console.log("Documents prop received:", documents);
  }, [documents]);

  // Group documents by subfolder if needed
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (doc.name === ".DS_Store") return acc;

    const mainCategory = doc.name.split("/")[0] || "Uncategorized";
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    if (doc.key && doc.size && mainCategory && doc.size > 0) {
      acc[mainCategory].push(doc);
    }
    return acc;
  }, {});

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setPreviewUrl("");
  };

  return (
    <Accordion allowMultiple>
      {Object.keys(groupedDocuments).map((mainCategory) => {
        const fileCount = groupedDocuments[mainCategory].length;
        if (fileCount === 0) return null;

        return (
          <AccordionItem key={mainCategory}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {mainCategory} ({fileCount} files)
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box overflowX="auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">File Name</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedDocuments[mainCategory].map((doc, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">
                          <Text fontWeight="bold">{doc.name}</Text>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button
                              variant="link"
                              colorScheme="blue"
                              onClick={() => handlePreview(doc.url)}
                            >
                              Preview
                            </Button>
                            <Button
                              as="a"
                              href={doc.url}
                              variant="link"
                              colorScheme="blue"
                              download
                            >
                              Download
                            </Button>
                            {isMobile && (
                              <Button
                                variant="link"
                                colorScheme="blue"
                                onClick={() => {
                                  alert(
                                    `Size: ${formatFileSize(
                                      doc.size
                                    )}\nTags: ${doc.name
                                      .split("/")
                                      .slice(1, -1)
                                      .join(", ")}`
                                  );
                                }}
                              >
                                Info
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        );
      })}

      {/* Modal for Document Preview */}
      {previewVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div
            className={`bg-white w-full ${
              isMobile ? "h-full" : "max-w-4xl h-[90vh]"
            } relative`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closePreview}
            >
              Close
            </button>
            <iframe
              src={previewUrl}
              width="100%"
              height="100%"
              title="Document Preview"
            />
          </div>
        </div>
      )}
    </Accordion>
  );
};

export default DocumentList;
