import { Router } from "express";
import { companyController } from "../controllers/company.controller";
import { validationMiddleware } from "../middleware";
import { CreateCompanyDto, UpdateCompanyDto } from "../dto/company.dto";

const router = Router();

/**
 * Create a new company
 */
router.post(
  "/companies",
  validationMiddleware(CreateCompanyDto),
  companyController.addCompany
);

/**
 * Get details of a specific company by ID
 */
router.get("/companies/:companyId", companyController.getCompanyById);

/**
 * Update a specific company's details
 */
router.put("/companies/:companyId", validationMiddleware(UpdateCompanyDto), companyController.updateCompany);

/**
 * Delete a specific company by ID
 */
router.delete("/companies/:companyId", companyController.deleteCompany);

/**
 * Get a specific company by url
 */
router.get("/companies/url/:url", companyController.getCompanyByUrl);

export default router;
