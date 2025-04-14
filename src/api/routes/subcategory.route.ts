import express from "express";
const router = express.Router();

import {
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controller/subcayrgory.controller";

router.get("/", getSubcategory);
router.post("/", createSubcategory);
router.put("/:Id", updateSubcategory);
router.delete("/:subcategoryId", deleteSubcategory);

export default router;
