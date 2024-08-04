// src/pages/api/documents/index.js
import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: config.process.env.GOOGLE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, size, createdTime)',
      });
      res.status(200).json(response.data.files);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
