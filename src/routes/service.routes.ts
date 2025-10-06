import express from "express";
import { createService } from "../controllers/Service.controller";
import { AllService } from "../controllers/All.service.controlle";

const router = express.Router();

router.post("/service", createService);
router.get("/all-service/:jobId", AllService);


export default router;
