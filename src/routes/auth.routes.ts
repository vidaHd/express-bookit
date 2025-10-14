import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { LoginUserDto } from "../dto/LoginUserDto";
import { validationMiddleware } from "../middleware";

const router = Router();

/**
 * Authenticate user and return access token
 */
router.post("/login", login);

/**
 * Register a new user account
 */
router.post("/register", validationMiddleware(LoginUserDto), signup);

export default router;
