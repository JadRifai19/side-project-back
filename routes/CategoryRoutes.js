import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryControllers.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
