import express from "express";
import { AllService, createService } from "../controllers/service.controller";

const router = express.Router();

/**
 * Create a new service
 */
router.post("/services", createService);

/**
 * Get all services related to a specific job
 */
router.get("/services/job/:jobId", AllService);

export default router;
