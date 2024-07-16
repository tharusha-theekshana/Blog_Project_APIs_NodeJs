import {check, validationResult} from "express-validator";

const signupValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required"),

    check("email")
        .isEmail()
        .withMessage("Invalid Email.")
        .notEmpty()
        .withMessage("Email is required."),

    check("password")
        .isLength({min: 6})
        .withMessage("Password should be more than 6 characters.")
        .notEmpty()
        .withMessage("Password is required.")
];

const signInValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email.")
        .notEmpty()
        .withMessage("Email is required."),

    check("password")
        .notEmpty()
        .withMessage("Password is required.")
];

const emailValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email.")
        .notEmpty()
        .withMessage("Email is required."),

];

const verifyUserValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email.")
        .notEmpty()
        .withMessage("Email is required."),

    check("code")
        .notEmpty()
        .withMessage("Code is required."),

];

const recoverPasswordValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid Email.")
        .notEmpty()
        .withMessage("Email is required."),

    check("code")
        .notEmpty()
        .withMessage("Code is required."),

];


const validate = (req,res,next) => {
    const errors = validationResult(req);
    const mappedErrors = {};

    if(Object.keys(errors.errors).length === 0){
        next();
    }else{
        errors.errors.map((err) => {
            mappedErrors[err.path] = err.msg;
        })

        res.status(400).json(mappedErrors);
    }
}


export {signupValidator,signInValidator,emailValidator,verifyUserValidator,recoverPasswordValidator,validate};