// src/pages/api/documents/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import { google } from 'googleapis';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

const upload = multer({ dest: '/tmp' });
const uploadMiddleware = upload.single('file');

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error occurred during the API route processing:', error);
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const drive = google.drive({
  version: 'v3',
  auth: config.process.env.GOOGLE_API_KEY,
});

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const { file } = req;
  const filePath = `/tmp/${file.filename}`;

  try {
    const fileMetadata = {
      name: file.originalname,
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(filePath),
    };
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
    await unlinkAsync(filePath);
    res.status(201).json({ id: response.data.id });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default apiRoute;
