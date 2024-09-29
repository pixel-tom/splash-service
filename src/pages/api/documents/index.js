import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Replace with your folder ID where the documents are stored
      const folderId = '1SX2b8tkmOGT8Oez2d60PrPZXwk-iNX_z';

      const response = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(id, name, mimeType, size, createdTime)',
        pageSize: 10, // Limit the number of files
      });

      const documents = response.data.files.map(file => ({
        key: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        createdTime: file.createdTime,
        url: `https://drive.google.com/uc?export=download&id=${file.id}`, // Google Drive download link
      }));

      res.status(200).json(documents);
    } catch (error) {
      console.error('Error fetching documents from Google Drive:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
