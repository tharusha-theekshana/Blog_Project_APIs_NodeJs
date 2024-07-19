import express from "express";
import {addCategory, deleteCategory, getCategory, updateCategory} from "../controllers/category.js";
import {addCategoryValidator, idValidator} from "../validators/categoryValidators.js";
import validate from "../validators/validateFunction.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoryRouter = express.Router();

categoryRouter.post("/", isAuth, isAdmin, addCategoryValidator, validate, addCategory);

categoryRouter.put("/:id", isAuth, isAdmin, idValidator, addCategoryValidator, validate, updateCategory);

categoryRouter.delete("/:id", isAuth, isAdmin, idValidator, validate, deleteCategory);

categoryRouter.get("/",isAuth,getCategory);

export {categoryRouter};