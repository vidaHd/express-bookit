import { Router } from "express";
import { addCompany, deleteCompany, getCompanyById, getCompanyByUrl, updateCompany } from "../controllers/company.controller";

const router = Router();

/**
 * Create a new company
 */
router.post("/companies", addCompany);

/**
 * Get details of a specific company by ID
 */
router.get("/companies/:companyId", getCompanyById);

/**
 * Update a specific company's details
 */
router.put("/companies/:companyId", updateCompany);

/**
 * Delete a specific company by ID
 */
router.delete("/companies/:companyId", deleteCompany);

/**
 * Get a specific company by url
 */
router.get("/companies/:url", getCompanyByUrl);


export default router;
