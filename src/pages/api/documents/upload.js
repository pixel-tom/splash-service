import nextConnect from "next-connect";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const bucketName = "splash-service"; // Replace with your bucket name
const upload = multer({ dest: "/tmp" });
const uploadMiddleware = upload.single("file");

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("Error occurred during the API route processing:", error);
    res
      .status(501)
      .json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const { file } = req;
  const filePath = `/tmp/${file.filename}`;

  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: `Manuals/${file.originalname}`,
      metadata: {
        contentType: file.mimetype,
      },
    });
    await unlinkAsync(filePath);
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default apiRoute;
