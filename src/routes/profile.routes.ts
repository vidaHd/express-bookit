import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth";
import { profileController } from "../controllers/profile.controller";

const router = Router();

/**
 * Configure multer for avatar uploads
 */
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/**

 * Get the authenticated user's profile
 */
router.get("/profile", authMiddleware, profileController.getProfile);

/**
 * Update the authenticated user's profile and optionally upload avatar
 */
router.post("/updateProfile", authMiddleware, upload.single("avatar"),  profileController.updateProfile);

export default router;
