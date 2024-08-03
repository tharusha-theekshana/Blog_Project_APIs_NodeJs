import express from "express";

const authRouter = express.Router();
import {
    signin,
    signup,
    verifyCode,
    verifyUser,
    forgotPasswordCode,
    recoverPassword,
    changePassword,
    updateProfile,
    getCurrentUser
} from "../controllers/auth.js";
import {
    signupValidator,
    signInValidator,
    emailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator,
    updateProfileValidator
} from "../validators/authValidators.js";
import isAuth from "../middlewares/isAuth.js";
import validate from "../validators/validateFunction.js";

authRouter.post("/signup", signupValidator, validate, signup);

authRouter.post("/signin", signInValidator, validate, signin);

authRouter.post("/sendVerificationEmail", emailValidator, validate, verifyCode);

authRouter.post("/verifyUser", verifyUserValidator, validate, verifyUser);

authRouter.post("/forgotPasswordCode", emailValidator, validate, forgotPasswordCode);

authRouter.post("/recoverPassword", recoverPasswordValidator, validate, recoverPassword);

authRouter.put("/changePassword", changePasswordValidator, validate , isAuth, changePassword);

authRouter.put("/updateProfile", isAuth, updateProfileValidator , validate, updateProfile);

authRouter.get("/currentUser",isAuth ,getCurrentUser)

export {authRouter};