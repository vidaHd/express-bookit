// controllers/resetPassword.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import { sendSMS } from "../helpers/sms.helper";
import { sendEmail } from "../helpers/email.helper";
import bcrypt from "bcrypt";

const verificationCodes: Record<string, string> = {};

export const sendResetCode = async (req: Request, res: Response) => {
  const { mobileNumber } = req.body;
  const user = await User.findOne({ mobileNumber });
  if (!user) return res.status(404).json({ message: "User not found" });

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  verificationCodes[mobileNumber] = code;

  //   await sendSMS(mobileNumber, `Your verification code is ${code}`);

  await sendEmail(
    user.email,
    req.t("auth.verification_code_subject"),
    `Your verification code is ${code}`
  );
  res.json({ message: "Verification code sent" });
};

export const verifyResetCode = async (req: Request, res: Response) => {
  const { mobileNumber, code } = req.body;
  if (verificationCodes[mobileNumber] === code) {
    res.json({ message: "Code verified" });
  } else {
    res.status(400).json({ message: "Invalid code" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { mobileNumber, newPassword } = req.body;
  const user = await User.findOne({ mobileNumber });
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  delete verificationCodes[mobileNumber];
  res.json({ message: "Password reset successfully" });
};
