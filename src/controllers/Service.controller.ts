import { Response } from "express";
import { serviceService } from "../services/service.service";

export const createService = async (req: any, res: Response) => {
  try {
    const { title, jobId } = req.body;

    const newService = await serviceService.createService({
      title,
      jobId,
    });

    await newService.save();

    res.status(200).json({
      ...newService.toObject(),
      _id: newService._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

export const AllService = async (req: any, res: Response) => {
  try {
    const { jobId } = req.params;
    const services = await serviceService.getAllServicesByJobId(jobId);
    res.status(200).json(services);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const ServiceById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const services = await serviceService.getServicesByServiceId(id);
    res.status(200).json(services);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


