import multer from "multer";
import path from "path";
import generateCode from "../utils/generateCode.js";

const storage = multer.diskStorage({
    destination : (req,res,callback) => {
        callback(null,'./uploads');
    },
    filename: (req,file,callback) => {

        //Original_file_name_12_digit_random_number.ext
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = originalName.replace(extension,"");
        const compressFileName = fileName.split(" ").join("_");
        const lowerCaseFileName = compressFileName.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowerCaseFileName}_${code}${extension}`;

        callback(null,finalFile);

    },
})

//Upload middleware
const upload = multer({
    storage
})

export default upload;