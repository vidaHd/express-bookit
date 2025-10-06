import { Router } from "express";
import { requestResetPassword, checkResetPassword } from "../controllers/reset.controller";

const router = Router();

router.post("/request-reset-password", requestResetPassword);
router.post("/check-reset-password", checkResetPassword);

export default router;
