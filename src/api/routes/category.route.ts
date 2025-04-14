import express from "express";
const router = express.Router();
import Category from "../models/category.model";
import {
  getCategory,
  createCategory,
  getCategory_by_id,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller";

// interface updatedUser: {
//   id:string ,
//   name:string,
//   createdAt: string,
//   updatedAt: string,
//   __v: number
// }

router.get("/", getCategory);

router.post("/", createCategory);

router.put("/:categoryId", updateCategory);

router.get("/:categoryId", getCategory_by_id);

router.delete("/:categoryId", deleteCategory);

export default router;
