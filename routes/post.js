import express from "express";
import isAuth from "../middlewares/isAuth.js";
import addPost from "../controllers/post.js";
import addPostValidator from "../validators/postValidator.js";
import validate from "../validators/validateFunction.js";

const postRouter = express.Router();

postRouter.post("/", isAuth ,addPostValidator, validate, addPost);


export {postRouter};