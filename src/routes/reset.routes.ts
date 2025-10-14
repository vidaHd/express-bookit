import { Router } from "express";
import { requestResetPassword, checkResetPassword } from "../controllers/reset.controller";

const router = Router();

/**
 * Request a password reset (sends reset code/email)
 */
router.post("/request-reset-password", requestResetPassword);

/**
 * Verify reset code and allow password change
 */
router.post("/check-reset-password", checkResetPassword);

export default router;
