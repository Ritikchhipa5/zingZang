import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAX7S6GKEMIQOXVR5P',
  secretAccessKey: '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',
  region: 'eu-central-1',
});
const s3 = new AWS.S3();

const bucketName = 'zing-zang-vc';
const s3Key =
  'outputs/MjrK0Yx7O2UlkLqU/recording_1694945325603.m4a_full_song.wav';

const params = {
  Bucket: bucketName,
  Key: s3Key,
};

export const getInfo = () => {
  s3.getObject(params, (err, data: any) => {
    if (err) {
      console.error('Error getting S3 object:', err);
    } else {
      const objectPath = data.Key;
      console.log('S3 object path:', data?.path);
    }
  });
};
