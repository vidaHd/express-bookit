import { Request, Response } from "express";
import { timeService } from "../services/time.service";

export const addAvailableTime = async (req: Request, res: Response) => {
  try {
    const { companyId, day, times } = req.body;
    const result = await timeService.addOrUpdateAvailableTime(
      companyId,
      day,
      times
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

export const getTimeByDay = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    const times = await timeService.getByCompanyByDay(companyId);

    res.status(200).json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

export const getTimeByCompanyAndDay = async (req: Request, res: Response) => {
  try {
    const { companyId, day } = req.params;

    const time = await timeService.getByCompanyAndDay(companyId, day);

    if (!time) {
      return res.status(404).json({ message: "زمانی برای این روز پیدا نشد" });
    }

    res.status(200).json(time);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};
