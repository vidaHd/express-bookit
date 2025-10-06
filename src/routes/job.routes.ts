import express from "express";
import { getJobs } from "../controllers/jobs.controller";

const router = express.Router();

router.get("/jobs", getJobs);

export default router;
