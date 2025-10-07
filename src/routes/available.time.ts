import { Router } from "express";
import { addAvailableTime, getTimeByDay, getTimeByCompanyAndDay } from "../controllers/available.time.controller";

const router = Router();
router.post("/availableTime", addAvailableTime);
router.get("/all-time/:companyId", getTimeByDay);
router.get("/time/:companyId/:day", getTimeByCompanyAndDay);

export default router;
