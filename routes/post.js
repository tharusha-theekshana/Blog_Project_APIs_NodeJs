import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {addPost, deletePost, getPosts, updatePost} from "../controllers/post.js";
import {addPostValidator, idValidator, updatePostValidator} from "../validators/postValidator.js";
import validate from "../validators/validateFunction.js";


const postRouter = express.Router();

postRouter.post("/", isAuth, addPostValidator, validate, addPost);

postRouter.put("/:id", isAuth, updatePostValidator, idValidator, validate, updatePost)

postRouter.delete("/:id", isAuth, idValidator, validate, deletePost)

postRouter.get("/", isAuth, idValidator, validate, getPosts)

export {postRouter};