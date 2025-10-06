import express from "express";
import { userService } from "../controllers/user.service";

const router = express.Router();

router.post("/user-service", userService);

export default router;
