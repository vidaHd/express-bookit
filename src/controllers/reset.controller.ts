import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { asyncHandler, successResponse } from "../helpers/response.helper";
import { sendSMS } from "../helpers/sms.helper";

export const resetPasswordController = {
  requestResetPassword: asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, newPassword, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetCode = code;
    user.newPasswordTemp = await bcrypt.hash(newPassword, 10);
    await user.save();

    await sendSMS(user.mobileNumber, `کد تغییر رمز شما: ${code}`);

    successResponse(res, "SMS sent successfully");
  }),

  checkResetPassword: asyncHandler(async (req: Request, res: Response) => {
    const { code, name } = req.body;

    const user = await User.findOne({ name });
    if (!user) throw new Error("User not found");

    if (user.resetCode !== code) throw new Error("Reset code is invalid");

    user.password = user.newPasswordTemp ?? "";
    user.resetCode = undefined;
    user.newPasswordTemp = undefined;
    await user.save();

    successResponse(res, "Password reset successfully");
  }),
};
