import { Router } from "express";
import {
  getTimeByDay,
  getTimeByCompanyAndDay,
  getAllTimes,
  getAllTimesByCompany,
  addOrUpdateAvailableTimesBulk,
} from "../controllers/available.time.controller";

const router = Router();
router.get("/all-time/:companyId", getTimeByDay);
router.get("/time/:companyId/:day", getTimeByCompanyAndDay);

router.get("/times-by-company/:companyId", getAllTimesByCompany);
router.post("/availableTimes/bulk", addOrUpdateAvailableTimesBulk);

export default router;
