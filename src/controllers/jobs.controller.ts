import { Request, Response } from "express";
import { Job } from "../models/Job";

export const getJobs = async (_req: Request, res: Response) => {
  try {
    const jobList = await Job.find();
    res.status(200).json(jobList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: _req.t("job.internal_error") });
  }
};
