import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const bucketName = "splash-service"; // Replace with your bucket name
      const [files] = await storage.bucket(bucketName).getFiles({
        maxResults: 10,
      });

      const documents = files.map((file) => ({
        key: file.name,
        name: file.name.split("/").pop(),
        mimeType: file.metadata.contentType,
        size: file.metadata.size,
        createdTime: file.metadata.timeCreated,
        url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
      }));

      res.status(200).json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
