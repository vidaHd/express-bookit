import {  Response } from "express";
import { User } from "../models/User";

export const updateProfile = async (req: any, res: Response) => {
  try {
    const avatarFilename = req.file ? req.file.filename : undefined;
    const { description, age, gender } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "کاربر یافت نشد" });

    user.profile = {
      ...user.profile,
      description: description ?? user.profile?.description,
      age: age ?? user.profile?.age,
      gender: gender ?? user.profile?.gender,
      avatar: avatarFilename ?? user.profile?.avatar,
    };

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "کاربر یافت نشد" });

    const { password, __v, ...userWithoutPass } = user.toObject();

    const profile = user.profile || {};
    const fullProfile = {
      description: profile.description || "",
      age: profile.age || "",
      gender: profile.gender || "",
      avatar: profile.avatar
        ? `http://localhost:5000/uploads/${profile.avatar}`
        : "",
    };

    res.status(200).json({ ...userWithoutPass, profile: fullProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
