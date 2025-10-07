import express from "express";
import {
  createUserService,
  getAllServicesByCompanyId,
  deleteUserService,
  updateUserServicesBulk,
  updateService,
} from "../controllers/user.service";

const router = express.Router();

router.post("/create-user-service", createUserService);

router.get("/user-service/:companyId", getAllServicesByCompanyId);

router.put("/user-service/bulk/:companyId", updateUserServicesBulk);
router.put("/update-service/:companyId", updateService);

router.delete("/user-service/:serviceId/:companyId", deleteUserService);

export default router;
