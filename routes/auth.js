import express from "express";

const router = express.Router();
import {signin, signup, verifyCode} from "../controllers/auth.js";
import {signupValidator, signInValidator, emailValidator, validate} from "../validators/validators.js";

router.post("/signup", signupValidator, validate, signup);

router.post("/signin", signInValidator, validate, signin);

router.post("/sendVerificationEmail", emailValidator, validate, verifyCode);

export {router};