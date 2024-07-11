import express from "express";
const router = express.Router();
import {signin,signup} from "../controllers/auth.js";
import {signupValidator,signInValidator,validate} from "../validators/validators.js";

router.post("/signup", signupValidator ,validate , signup);

router.post("/signin",signInValidator, validate, signin);

export {router};