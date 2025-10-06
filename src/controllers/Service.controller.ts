import { Response } from "express";
import { Service } from "../models/Service";

export const createService = async (req: any, res: Response) => {
  try {
    const { title, jobId } = req.body;

    const newService = new Service({
      title,
      jobId: jobId,
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
