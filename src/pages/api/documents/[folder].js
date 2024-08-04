import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export default async function handler(req, res) {
  const { folder } = req.query;

  if (req.method === "GET") {
    try {
      const bucketName = "splash-service"; // Replace with your bucket name
      const folderPath = `Manuals/${folder}/`; // Ensure the folder path includes "Manuals" and ends with a slash

      console.log(`Fetching files from: ${bucketName}/${folderPath}`); // Debugging log

      const [files] = await storage.bucket(bucketName).getFiles({
        prefix: folderPath,
      });

      console.log(`Files fetched: ${files.length}`); // Log the number of files fetched

      const documents = files.map((file) => ({
        key: file.name,
        name: file.name.split("/").pop(), // Extracting the file name
        mimeType: file.metadata.contentType,
        size: file.metadata.size,
        modifiedTime: file.metadata.updated,
        url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
      }));

      res.status(200).json(documents);
    } catch (error) {
      console.error(
        "Error fetching documents from Google Cloud Storage:",
        error
      );
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
