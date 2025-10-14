import { Request, Response } from "express";
import { User } from "../models/User";

export const updateProfile = async (req: any, res: Response) => {
  try {
    const avatarFilename = req.file ? req.file.filename : undefined;
    const { description, age, gender } = req.body;

    if (req.file && !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: req.t("profile.invalid_avatar") });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: req.t("profile.not_found") });

    user.profile = {
      ...user.profile,
      description: description ?? user.profile?.description,
      age: age ?? user.profile?.age,
      gender: gender ?? user.profile?.gender,
      avatar: avatarFilename ?? user.profile?.avatar,
    };

    await user.save();

    res.status(200).json({
      message: req.t("profile.update_success"),
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: req.t("profile.internal_error") });
  }
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: req.t("profile.not_found") });

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
    res.status(500).json({ error: req.t("profile.internal_error") });
  }
};
