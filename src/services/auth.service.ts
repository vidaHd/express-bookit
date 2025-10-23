import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = "bookitSecretKey";

export const AuthService = {
  login: async (mobileNumber: string, password: string) => {
    // پیدا کردن کاربر بر اساس موبایل
    const user = await User.findOne({ mobileNumber });
    if (!user) throw new Error("wrong_user");

    // بررسی پسورد
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("wrong_password");

    // حذف پسورد از آبجکت کاربر
    const { password: _, __v, ...userWithoutPass } = user.toObject();

    // ساخت JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, familyName: user.familyName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user: userWithoutPass, token };
  },

  signup: async (data: { name: string; familyName: string; mobileNumber: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();

    const { password: _, __v, ...userWithoutPass } = newUser.toObject();
    return userWithoutPass;
  },
};
