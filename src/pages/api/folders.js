import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

const bucketName = 'splash-service'; // Replace with your bucket name

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [files, , response] = await storage.bucket(bucketName).getFiles({
        prefix: 'Manuals/', // Ensure the prefix ends with a slash
        delimiter: '/',
      });

      console.log('Prefixes:', response.prefixes); // Log prefixes

      const folders = response.prefixes.map(prefix => ({
        name: prefix.replace('Manuals/', '').replace('/', ''),
      }));

      console.log('Folders:', folders); // Log detected folders

      res.status(200).json(folders);
    } catch (error) {
      console.error('Error fetching folders from Google Cloud Storage:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
