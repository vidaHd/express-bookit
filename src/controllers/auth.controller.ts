import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { _id, mobileNumber, password } = req.body;
    const { user, token } = await AuthService.login(_id, mobileNumber, password);
    res.status(200).json({ message: req.t("auth.login_success"), user, token });
  } catch (err: any) {
    console.error(err);
    const errorMsg = err.message ? req.t(`auth.${err.message}`) : req.t("errors.internal");
    res.status(400).json({ error: errorMsg });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, familyName, mobileNumber, password } = req.body;
    const user = await AuthService.signup({ name, familyName, mobileNumber, password });
    res.status(201).json({ message: req.t("auth.signup_success"), user });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: req.t("errors.internal") });
  }
};
