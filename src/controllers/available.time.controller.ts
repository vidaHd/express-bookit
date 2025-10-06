import { Response } from "express";
import { Time } from "../models/Time";

export const addAvailableTime = async (req: any, res: Response) => {
  try {
    const { companyId, day, times } = req.body;

    let timeAvailable = await Time.findOne({ companyId, day });

    if (!timeAvailable) {
      timeAvailable = new Time({ companyId, day, times });
    } else {
      timeAvailable.times = times;
    }

    await timeAvailable.save();

    res.status(200).json(timeAvailable);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};