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
      const folderId = '1SX2b8tkmOGT8Oez2d60PrPZXwk-iNX_z'; // Replace with your Google Drive folder ID for "Manuals"
      const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      // Log the raw response from the Google Drive API
      console.log('Google Drive API response:', response.data);

      const folders = response.data.files.map(file => ({
        id: file.id,
        name: file.name,
      }));

      // Log the transformed folder data
      console.log('Transformed folder data:', folders);

      res.status(200).json(folders);
    } catch (error) {
      console.error('Error fetching folders from Google Drive:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
