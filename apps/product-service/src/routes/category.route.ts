import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../controllers/category.controller";
import { adminAuthMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", adminAuthMiddleware, createCategory);
router.put("/:id", adminAuthMiddleware, updateCategory);
router.delete("/:id", adminAuthMiddleware, deleteCategory);
router.get("/", getCategories);

export default router;
