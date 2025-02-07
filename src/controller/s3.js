const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const uploadImage = async (req, res) => {
  const file = req.file;

  const REGION = process.env.AWS_S3_REGION;
  const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;

  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  try {
    const bucketName = 'kmj-test-bucket';
    const objectKey = file.originalname;

    const objUrl = `https://${bucketName}.s3.${REGION}.amazonaws.com/${objectKey}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    res.send({ url: objUrl });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  uploadImage,
};
