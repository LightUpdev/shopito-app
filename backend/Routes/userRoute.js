import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updatePhoto,
  updateUser,
  verifyUser,
} from "../Controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", authenticate, getUser);
router.patch("/update-user", authenticate, updateUser);
router.patch("/update-photo", authenticate, updatePhoto);
// Add a route to verify the token
router.get("/verify", authenticate, verifyUser);

export default router;
