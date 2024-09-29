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
  const { folderId } = req.query; // Use folderId from the request query

  if (req.method === 'GET') {
    try {
      // Check for subfolders (folders inside the selected folder)
      const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name, mimeType)',
      });

      // If subfolders exist, return them
      if (response.data.files.length > 0) {
        const subfolders = response.data.files.map(file => ({
          id: file.id,
          name: file.name,
        }));

        res.status(200).json({ type: 'folders', subfolders });
      } else {
        // If no subfolders, return files in the folder
        const filesResponse = await drive.files.list({
          q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
          fields: 'files(id, name, mimeType, modifiedTime, size)',
        });

        const documents = filesResponse.data.files.map(file => ({
          key: file.id,
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          modifiedTime: file.modifiedTime,
          url: `https://drive.google.com/uc?export=download&id=${file.id}`, // Corrected download link
        }));

        res.status(200).json({ type: 'files', documents });
      }
    } catch (error) {
      console.error('Error fetching documents from Google Drive:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
