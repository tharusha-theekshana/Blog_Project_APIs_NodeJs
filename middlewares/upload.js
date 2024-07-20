import multer from "multer";
import path from "path";
import generateCode from "../utils/generateCode.js";

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {

        //Original_file_name_12_digit_random_number.ext
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = originalName.replace(extension, "");
        const compressFileName = fileName.split(" ").join("_");
        const lowerCaseFileName = compressFileName.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowerCaseFileName}_${code}${extension}`;

        callback(null, finalFile);

    },
})

//Upload middleware
const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {

        let type = file.mimetype;

        if (type === "image/png" || type === "image/jpeg" || type === "image/jpg" || type === "application/pdf") {
            callback(null, true);
        } else {
            callback(new Error("Only .png .jpg .jpeg and .png files are allowed"));

        }

    }
})

export default upload;