import express from "express";
import { AllService, createService } from "../controllers/Service.controller";

const router = express.Router();

router.post("/service", createService);
router.get("/all-service/:jobId", AllService);

export default router;
