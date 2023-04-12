import express from "express";
import {createAdmin, deleteAdmin, getAdminById, getAllAdmins, updateAdmin} from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
