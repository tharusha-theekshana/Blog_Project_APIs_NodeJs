import express from "express";
import {addCategory} from "../controllers/category.js";
import {addCategoryValidator} from "../validators/categoryValidators.js";
import validate from "../validators/validateFunction.js";
import isAuth from "../middlewares/isAuth.js";



const categoryRouter = express.Router();

categoryRouter.post("/",isAuth, addCategoryValidator,validate, addCategory);

export {categoryRouter};