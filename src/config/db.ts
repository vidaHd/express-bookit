import mongoose from "mongoose";

export const connectDB = async () => {
  try {
  await mongoose.connect("mongodb://my-mongo:27017/bookit");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
