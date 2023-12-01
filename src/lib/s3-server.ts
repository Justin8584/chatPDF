import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFromS3(fileKey: string) {
    if (
        !process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
        !process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID ||
        !process.env.NEXT_PUBLIC_S3_BUCKET_NAME ||
        !process.env.NEXT_PUBLIC_S3_REGION
    ) {
        throw new Error("Missing required environment variables");
    }

    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
        });
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: process.env.NEXT_PUBLIC_S3_REGION,
        });
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: fileKey,
        };
        const obj = await s3.getObject(params).promise();
        const file_name = `/tmp/pdf-${Date.now().toString()}.pdf`;
        fs.writeFileSync(file_name, obj.Body as Buffer);
        return file_name;
    } catch (error) {
        console.error("Error downloading file from s3:", error);
        return null;
    }
}
