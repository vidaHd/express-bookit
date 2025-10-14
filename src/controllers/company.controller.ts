import { Request, Response } from "express";
import { companyService } from "../services/company";

export const addCompany = async (req: any, res: Response) => {
  try {
    const { companyName, jobId } = req.body;
    const userId = req.user?.id;

    if (!companyName) {
      return res.status(400).json({ message: req.t("company.name_required") });
    }

    const newCompany = await companyService.createCompany({
      companyName,
      jobId,
      userId,
    });

    await newCompany.save();
    res.status(200).json({
      ...newCompany.toObject(),
      _id: newCompany._id,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("company.internal_error") });
  }
};

export const getAllCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await companyService.getAllCompanies();
    res
      .status(200)
      .json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: _req.t("company.internal_error") });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await companyService.getCompanyById(companyId);

    if (!company) {
      return res.status(404).json({ message: req.t("company.not_found") });
    }

    res.status(200).json({ message: req.t("company.success"), data: company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("company.internal_error") });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { companyName, jobId } = req.body;

    const updated = await companyService.updateCompany(companyId, {
      companyName,
      jobId,
    });

    if (!updated)
      return res.status(404).json({ message: req.t("company.not_found") });

    res
      .status(200)
      .json({ message: req.t("company.updated_success"), data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("company.internal_error") });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const deleted = await companyService.deleteCompany(companyId);

    if (!deleted)
      return res.status(404).json({ message: req.t("company.not_found") });

    res.status(200).json({ message: req.t("company.deleted_success") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t("company.internal_error") });
  }
};
