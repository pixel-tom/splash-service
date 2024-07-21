import aws from 'aws-sdk';

// Initialize S3 client
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  const { folder } = req.query;

  if (req.method === 'GET') {
    try {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: `Manuals/${folder}/`,
      };
      const data = await s3.listObjectsV2(params).promise();

      const documents = await Promise.all(data.Contents.map(async (item) => {
        const url = await s3.getSignedUrlPromise('getObject', {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: item.Key,
          Expires: 60 * 60, // 1 hour
        });
        return {
          key: item.Key,
          lastModified: item.LastModified,
          size: item.Size,
          url,
        };
      }));

      res.status(200).json(documents);
    } catch (error) {
      console.error('Error fetching documents from S3:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
