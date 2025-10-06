import { Response } from "express";
import { Service } from "../models/Service";

export const AllService = async (req: any, res: Response) => {
  try {
    const { jobId } = req.params;
    console.log("Received jobId:", jobId);

    const services = await Service.find({ jobId: jobId });

    res.status(200).json(services);
  } catch (err: any) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
