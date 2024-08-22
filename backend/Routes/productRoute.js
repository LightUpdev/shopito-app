import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  getProducts,
} from "../Controllers/productController.js";

const router = Router();

router.post("/", authenticate, isAdmin, createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);
router.patch("/:id", authenticate, isAdmin, updateProduct);

export default router;
