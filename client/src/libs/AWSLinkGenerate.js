export default function AWSLinkGenerate (filePath) {
    
    return filePath == "" ? null:`https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${filePath}`
}