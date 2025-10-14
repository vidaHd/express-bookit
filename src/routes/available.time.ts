import { Router } from "express";
import {
  addOrUpdateAvailableTimes,
  getAllTimesByCompany,
  getTimeByCompanyAndDay,
  getAllTimes,
} from "../controllers/available.time.controller";

const router = Router();

/**
 * Get all available times for a specific company
 */
router.get("/companies/:companyId/times", getAllTimesByCompany);

/**
 * Get available times for a company on a specific day
 */
router.get("/companies/:companyId/times/:day", getTimeByCompanyAndDay);

/**
 * Add or update multiple available times for a company
 */
router.post("/companies/:companyId/times/bulk", addOrUpdateAvailableTimes);

/**
 * Get all available times from all companies
 */
router.get("/times", getAllTimes);

export default router;
