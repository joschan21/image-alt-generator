import S3 from "aws-sdk/clients/s3"

export const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
  signatureVersion: "v4",
})
