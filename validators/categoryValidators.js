import {check} from "express-validator";

const addCategoryValidator = [
    check("title")
        .notEmpty()
        .withMessage("Title is required.")
]

export {addCategoryValidator};