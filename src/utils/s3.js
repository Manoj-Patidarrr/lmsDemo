//jshint esversion:11

import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload file to s3 bucket

export function upload(file) {
  try {
    console.log("Inside file upload");
    const fileStream = fs.createReadStream(file.path);

    const uploadFile = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadFile).promise();
  } catch (e) {
    throw new Error(e.message);
  }
}

//download file from s3 bucket

export function getFileStream(fileKey) {
  try {
    console.log("Inside file stream");
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
  } catch (e) {
    throw new Error(e.message);
  }
}

//delete files in bucket

export async function deleteFiles(fileKey) {
  try {
    console.log("Inside delete Files");
    return await s3
      .deleteObject({ Bucket: bucketName, Key: fileKey })
      .promise();
  } catch (e) {
    throw new Error(e.message);
  }
}

//list bucket files

export async function listBucketFiles() {
  try {
    let r = await s3.listObjectsV2({ Bucket: bucketName }).promise();
    let x = r.Contents.map((item) => item.Key);
    return x;
  } catch (e) {
    throw new Error(e.message);
  }
}
