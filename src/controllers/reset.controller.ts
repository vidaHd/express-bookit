import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import Kavenegar from "kavenegar";

const api = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API_KEY || "",
});

export const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: req.t("reset.user_not_found") });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: req.t("reset.wrong_old_password") });

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetCode = code;
    user.newPasswordTemp = await bcrypt.hash(newPassword, 10);
    await user.save();

    api.Send(
      {
        message: `کد تغییر رمز شما: ${code}`,
        sender: "2000660110",
        receptor: user.mobileNumber,
      },
      (_response, status) => {
        if (status !== 200) {
          return res.status(500).json({ error: req.t("reset.sms_failed") });
        } else {
          return res.json({ message: req.t("reset.sms_sent") });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("reset.internal_error") });
  }
};

export const checkResetPassword = async (req: Request, res: Response) => {
  try {
    const { code, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: req.t("reset.user_not_found") });

    if (user.resetCode !== code) {
      return res.status(400).json({ error: req.t("reset.wrong_code") });
    }

    user.password = user.newPasswordTemp ?? "";
    user.resetCode = undefined;
    user.newPasswordTemp = undefined;
    await user.save();

    res.json({ message: req.t("reset.reset_success") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("reset.internal_error") });
  }
};
