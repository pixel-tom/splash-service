import multer from 'multer';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single('file');

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Custom middleware to run multer
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Run multer middleware
      await runMiddleware(req, res, uploadMiddleware);

      if (!req.file) {
        return res.status(400).json({ error: 'File not uploaded successfully' });
      }

      const { name, category, subcategory } = req.body;
      const fileContent = Buffer.from(req.file.buffer, 'binary');
      const filePath = `${category}/${subcategory}/${uuidv4()}-${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: fileContent,
        ContentType: req.file.mimetype,
      };

      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data);

      res.status(201).json({ url: data.Location, key: data.Key, name, category, subcategory });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
