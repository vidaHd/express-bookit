import { Request, Response } from "express";
import { timeService } from "../services/time.service";

export const addOrUpdateAvailableTimes = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, timesByDay } = req.body;
    if (!companyId || !timesByDay || typeof timesByDay !== "object") {
      return res
        .status(400)
        .json({ message: req.t("errors.companyId_timesByDay_required") });
    }

    const result = await timeService.addOrUpdateAvailableTimesBulk(
      companyId,
      timesByDay
    );

    res.status(200).json({
      message: req.t("time.update_success"),
      data: result,
    });
  } catch (err) {
    console.error("Error in addOrUpdateAvailableTimes:", err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const getTimeByCompanyAndDay = async (req: Request, res: Response) => {
  try {
    const { companyId, day } = req.params;
    const time = await timeService.getByCompanyAndDay(companyId, day);

    if (!time)
      return res.status(404).json({ message: req.t("time.not_found_for_day") });

    res.status(200).json({ message: req.t("time.success"), data: time });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const getAllTimesByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId)
      return res
        .status(400)
        .json({ message: req.t("errors.companyId_required") });

    const timesByDay = await timeService.getAllByCompany(companyId);
    res.status(200).json(timesByDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("errors.internal") });
  }
};

export const getAllTimes = async (_req: Request, res: Response) => {
  try {
    const times = await timeService.getAll();
    res.status(200).json({ message: _req.t("time.success"), data: times });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: _req.t("errors.internal") });
  }
};
