import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { LoginUserDto } from "../dto/LoginUserDto";
import { validationMiddleware } from "../middleware";

const router = Router();

router.post("/login", login);
router.post("/register", validationMiddleware(LoginUserDto), signup);

export default router;
