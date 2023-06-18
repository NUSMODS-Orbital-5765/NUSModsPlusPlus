import { S3Client } from "@aws-sdk/client-s3";

// Set the AWS Region
// Create an Amazon S3 service client object.
const s3Client = new  S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }
})
export { s3Client };