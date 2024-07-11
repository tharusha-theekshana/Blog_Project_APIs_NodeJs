import express from "express";
const router = express.Router();
import {signup} from "../controllers/index.js";
import {signupValidator,validate} from "../validators/validators.js";

router.post("/signup", signupValidator ,validate , signup);

export {router};