const AWS = require('aws-sdk');

const uploadImage = async (req, res) => {
  const file = req.file;

  const REGION = process.env.AWS_S3_REGION;
  const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;

  AWS.config.update({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  const s3 = new AWS.S3();

  try {
    const uploadParams = {
      Bucket: 'kmj-test-bucket',
      Key: file.originalname, // 업로드된 객체의 키를 파일의 원래 이름으로 지정
      Body: file.buffer, // 업로드할 파일의 데이터
    };

    const data = await s3.upload(uploadParams).promise();

    res.send({ url: data.Location });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  uploadImage,
};
