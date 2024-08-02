import {check} from "express-validator";
import validateEmail from "./validateEmail.js";
import mongoose from "mongoose";

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

const changePasswordValidator = [
    check("oldPassword")
        .notEmpty()
        .withMessage("Old password is required."),

    check("newPassword")
        .notEmpty()
        .withMessage("New password is required."),


];

const updateProfileValidator = [
    check("email")
        .custom(async (email) => {
            if (email){
                const isValidEmail = validateEmail(email);
                if (!isValidEmail){
                    throw new Error("Invalid email.");
                }
            }
        }),

    check("profilePic")
        .custom(async (profilePic) => {
            if (profilePic && !mongoose.Types.ObjectId.isValid(profilePic)){
                    throw new Error("Invalid profile pic.");
            }
        }),

];




export {signupValidator, signInValidator, emailValidator, verifyUserValidator, recoverPasswordValidator,changePasswordValidator,updateProfileValidator};