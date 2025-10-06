import { Schema, model } from "mongoose";
import { IJob } from "../types/IJob";

const jobSchema = new Schema<IJob>({
  name: { type: String, required: true },
  jobCode: { type: String, required: true, unique: true },
});

export const Job = model<IJob>("Jobs", jobSchema);
