import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";
import generateCode from "./generateCode.js";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION,
});

const uploadFileToAWS = async ({file,ext}) => {
        const Key = `${generateCode(12)}${ext}`;


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: file.buffer,
            Key,
            ContentType: file.mimetype
        }

        const command = new PutObjectCommand(params);


        try{
            await client.send(command);
            console.log(Key);
            return Key;

        }catch (e){
            console.error('Error uploading file:', e);
            throw new Error('Failed to upload file to AWS S3');
        }
}

const signedUrlS3 = async (Key) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key
    }

    const command = new GetObjectCommand(params);

    try{
        const url = await getSignedUrl(client,command,{
            expiresIn: 60 * 60
        })
        return url;
    }catch (e) {
        console.log(e);
    }
}

const deleteFileFromS3 = async (Key) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key
    }

    const command = new DeleteObjectCommand(params);

    try{
        await client.send(command);
        return;
    }catch (e) {
        console.log(e);
    }
}

export {uploadFileToAWS,signedUrlS3,deleteFileFromS3};