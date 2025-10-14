import { Request, Response } from "express";
import { serviceService } from "../services/service.service";

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, jobId } = req.body;

    if (!title || !jobId) {
      return res.status(400).json({ error: req.t("service.not_found") });
    }

    const newService = await serviceService.createService({ title, jobId });
    await newService.save();

    res.status(201).json({
      message: req.t("service.create_success"),
      ...newService.toObject(),
      _id: newService._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("service.internal_error") });
  }
};

export const AllService = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const services = await serviceService.getAllServicesByJobId(jobId);

    if (!services.length) {
      return res.status(404).json({ error: req.t("service.not_found") });
    }

    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("service.internal_error") });
  }
};

export const ServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServicesByServiceId(id);

    if (!service || service.length === 0) {
      return res.status(404).json({ error: req.t("service.not_found") });
    }

    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("service.internal_error") });
  }
};
