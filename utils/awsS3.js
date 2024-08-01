import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import generateCode from "./generateCode.js";

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

export default uploadFileToAWS;