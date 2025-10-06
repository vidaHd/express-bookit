import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import Kavenegar from "kavenegar";

const api = Kavenegar.KavenegarApi({
  apikey:
    "645834377058767159486E716D632F4C46656D42374331545A485176362B4F554B5171387A6530595165453D",
});

export const requestResetPassword = async (req: any, res: Response) => {
  try {
    const { oldPassword, newPassword, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: "کاربر یافت نشد" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "رمز قبلی اشتباه است" });

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
          return res.status(500).json({ error: "ارسال پیامک ناموفق بود" });
        } else {
          return res.json({ message: "کد تغییر رمز ارسال شد" });
        }
      }
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const checkResetPassword = async (req: any, res: Response) => {
  try {
    const { code, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: "کاربر یافت نشد" });

    if (user.resetCode !== code) {
      return res.status(400).json({ error: "کد اشتباه است" });
    }

    user.password = user.newPasswordTemp ?? "";
    user.resetCode = undefined;
    user.newPasswordTemp = undefined;
    await user.save();

    res.json({ message: "رمز عبور با موفقیت تغییر یافت" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
