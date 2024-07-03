import express from "express";
const router = express.Router();
import {signup} from "../controllers/index.js";

router.post("/signup",signup);

export {router};