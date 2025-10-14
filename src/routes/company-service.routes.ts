import express from "express";
import {
  createUserService,
  getAllServicesByCompanyId,
  deleteUserService,
  updateUserServicesBulk,
  updateService,
} from "../controllers/company.service.controller";

const router = express.Router();

/**
 * Create a new service for a company
 * @access Private
 */
router.post("/create-company-service", createUserService);

/**
 *
 * Get all services for a specific company
 */
router.get("/company-service/:companyId", getAllServicesByCompanyId);

/**
 * Update multiple services for a company in bulk
 */
router.put("/company-service/bulk/:companyId", updateUserServicesBulk);

/**
 * Update a single service of a company
 */
router.put("/update-service/:companyId", updateService);

/**
 * Delete a specific service of a company
 */
router.delete("/delete-service/:serviceId/:companyId", deleteUserService);

export default router;
