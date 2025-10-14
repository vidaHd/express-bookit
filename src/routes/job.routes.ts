import express from "express";
import { getJobs } from "../controllers/jobs.controller";

const router = express.Router();

/**
 * Get all available jobs
 */
router.get("/jobs", getJobs);

export default router;
