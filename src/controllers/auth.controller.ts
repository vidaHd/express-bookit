import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = "bookitSecretKey";

// Login
export const login = async (req: any, res: Response) => {
  try {
    const { password, mobileNumber } = req.body;

    const { _id } = req.body;

    const user = await User.findById({ _id });
    if (!user) return res.status(400).json({ error: "نام کاربری اشتباه است" });

    if (user.mobileNumber !== mobileNumber) {
      return res.status(400).json({ error: "شماره موبایل اشتباه است" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "رمز عبور اشتباه است" });

    const { password: _, __v: __, ...userWithoutPass } = user.toObject();

    const token = jwt.sign(
      { id: user._id, name: user.name, familyName: user.familyName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: userWithoutPass, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// register
export const signup = async (req: Request, res: Response) => {
  try {
    const { password, familyName, mobileNumber, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      familyName,
      mobileNumber,
      password: hashedPassword,
    });

    await newUser.save();
    const { password: _, __v, ...userWithoutPass } = newUser.toObject();

    res.status(201).json({ message: "User created", user: userWithoutPass });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
