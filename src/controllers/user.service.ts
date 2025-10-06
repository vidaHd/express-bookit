import { Response } from "express";
import { Service } from "../models/Service";
import { ServiceDetail } from "../models/serviceDetail";

export const userService = async (req: any, res: Response) => {
  try {
    const { price, duration, serviceId } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "سرویس یافت نشد" });
    }

    const newDetail = new ServiceDetail({
      price,
      duration,
      serviceId,
    });

    await newDetail.save();

    res.status(200).json(newDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
