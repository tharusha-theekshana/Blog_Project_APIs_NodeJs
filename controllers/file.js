import fileExtValidator from "../validators/fileValidator.js";
import uploadFileToAWS from "../utils/awsS3.js";
import File from "../models/File.js";
import path from "path";

const uploadFile = async (req, res, next) => {
    try {
        const {file} = req;

        if (!file) {
            res.code = 400;
            throw new Error("File is not selected.");
        }


        const ext = path.extname(file.originalname);
        const isValidate = fileExtValidator(ext);

        if (!isValidate) {
            res.code = 400;
            throw new Error("Only .png .jpg .jpeg and .png files are allowed.");
        }

        const key = await uploadFileToAWS({file, ext});

        if (key) {
            const newFile = new File({
                key,
                size: file.size,
                mimetype: file.mimetype,
                createdBy: req.user
            })

            await newFile.save();
        }

        res.status(200).json({
            code: 201,
            status: true,
            message: "File uploaded.",
            data: {key}
        })

    } catch (e) {
        next(e);
    }
}

export {uploadFile};