import express from "express";
const router = express.Router();

import {
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategory_by_id,
} from "../controller/subcayrgory.controller";

router.get("/", getSubcategory);
router.post("/", createSubcategory);
router.put("/:Id", updateSubcategory);
router.get("/:subcategoryId", getSubcategory_by_id);
router.delete("/:subcategoryId", deleteSubcategory);

export default router;
