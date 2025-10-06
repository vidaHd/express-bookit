import { Response } from "express";
import { Company } from "../models/Company";
import { User } from "../models/User";

export const addCompany = async (req: any, res: Response) => {
  try {
    const { companyName, jobId, _id } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: "نام شرکت الزامی است" });
    }

    const newCompany = new Company({
      companyName,
      userId: _id,
      jobId: jobId,
    });

    await newCompany.save();
    res.status(200).json({
      ...newCompany.toObject(),
      _id: newCompany._id
    });
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
