const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const getObject = async (bucket, objectKey) => {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey 
    }

    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
};

module.exports = {
    getObject,
};
