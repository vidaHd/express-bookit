import { Request, Response } from "express";
import { timeService } from "../services/time.service";

export const addAvailableTimesBulk = async (req: Request, res: Response) => {
  try {
    const { companyId, timesByDay } = req.body;

    if (!companyId || !timesByDay) {
      return res
        .status(400)
        .json({ message: "companyId و timesByDay الزامی هستند." });
    }

    const result = await timeService.addOrUpdateAvailableTimesBulk(
      companyId,
      timesByDay
    );

    res.status(200).json({
      message: "ساعت‌های در دسترس با موفقیت به‌روزرسانی شدند.",
      data: result,
    });
  } catch (error) {
    console.error("خطا در افزودن یا بروزرسانی تایم‌ها:", error);
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

export const getAllTimes = async (req: Request, res: Response) => {
  try {
    const times = await timeService.getAll();
    res.status(200).json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

export const getAllTimesByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ message: "companyId الزامی است" });
    }

    const timesByDay = await timeService.getAllByCompany(companyId);
    res.status(200).json(timesByDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

export const addOrUpdateAvailableTimesBulk = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, timesByDay } = req.body;
    if (!companyId || !timesByDay || typeof timesByDay !== "object") {
      return res
        .status(400)
        .json({ message: "companyId و timesByDay الزامی‌اند" });
    }

    const result = await timeService.addOrUpdateAvailableTimesBulk(
      companyId,
      timesByDay
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
};
