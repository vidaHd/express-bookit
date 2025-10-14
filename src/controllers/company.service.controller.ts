import { Request, Response } from "express";
import { serviceService } from "../services/service.service";
import { CompanyServices } from "../services/company.service";
import { companyService } from "../services/company";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { companyId, serviceId, price, duration } = req.body;

    if (!companyId || !serviceId || !price || !duration) {
      return res
        .status(400)
        .json({ message: req.t("service.fields_required") });
    }

    const newService = await CompanyServices.createService({
      price,
      duration,
      serviceId,
      companyId,
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const getAllServicesByCompanyId = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId } = req.params;
    const userServices = await CompanyServices.getAllServicesByCompanyId(
      companyId
    );
    console.log(userServices, "userServices");

    const services = await serviceService.getServices({
      ids: userServices.map((us: any) => us.serviceId),
    });
    console.log(services, "services");

    const response = userServices.map((us: any) => ({
      price: us.price ?? "تماس بگیرید",
      duration: us.duration ?? "تماس بگیرید",
      serviceId: us.serviceId,
      companyId: us.companyId,
      title: services.find((s) => s._id.toString() === us.serviceId)?.title,
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { serviceId, price, duration } = req.body;

    if (!companyId || !serviceId) {
      return res
        .status(400)
        .json({ message: req.t("service.fields_required") });
    }

    const updated = await CompanyServices.updateService(
      serviceId,
      companyId,
      price,
      duration
    );

    if (!updated) {
      return res.status(404).json({ message: req.t("service.not_found") });
    }

    res.status(200).json({
      message: req.t("service.updated_success"),
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const updateUserServicesBulk = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { serviceIds } = req.body;

    const updatedServices = await CompanyServices.updateServicesBulk(
      companyId,
      serviceIds
    );

    res.status(200).json({
      message: req.t("service.bulk_updated_success"),
      data: updatedServices,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const { serviceId, companyId } = req.params;

    if (!serviceId || !companyId) {
      return res
        .status(400)
        .json({ message: req.t("service.fields_required") });
    }

    const deleted = await CompanyServices.deleteService(serviceId, companyId);

    if (!deleted)
      return res.status(404).json({ message: req.t("service.not_found") });

    res.status(200).json({ message: req.t("service.deleted_success") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};
