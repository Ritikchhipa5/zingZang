import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION',
});
const s3 = new AWS.S3();

const bucketName = 'your-bucket-name';
const s3Key =
  'outputs/MjrK0Yx7O2UlkLqU/recording_1694945325603.m4a_full_song.wav';

const params = {
  Bucket: bucketName,
  Key: s3Key,
};

s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error getting S3 object:', err);
  } else {
    // const objectPath = data.Key;
    // console.log('S3 object path:', objectPath);
  }
});
