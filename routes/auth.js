import express from "express";

const router = express.Router();
import {
    signin,
    signup,
    verifyCode,
    verifyUser,
    forgotPasswordCode,
    recoverPassword,
    changePassword
} from "../controllers/auth.js";
import {
    signupValidator,
    signInValidator,
    emailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator,
    validate,
} from "../validators/validators.js";
import isAuth from "../middlewares/isAuth.js";

router.post("/signup", signupValidator, validate, signup);

router.post("/signin", signInValidator, validate, signin);

router.post("/sendVerificationEmail", emailValidator, validate, verifyCode);

router.post("/verifyUser", verifyUserValidator, validate, verifyUser);

router.post("/forgotPasswordCode", emailValidator, validate, forgotPasswordCode);

router.post("/recoverPassword", recoverPasswordValidator, validate, recoverPassword);

router.put("/changePassword", changePasswordValidator, validate , isAuth, changePassword);

export {router};