import { Router } from "express";
import { addCompany } from "../controllers/company.controller";

const router = Router();

router.post("/company", addCompany);

export default router;
