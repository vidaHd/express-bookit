import { Router } from "express";
import { addAvailableTime } from "../controllers/available.time.controller";

const router = Router();
router.post("/availableTime", addAvailableTime);

export default router;
