import { Schema, model } from "mongoose";
import { IServiceDetail } from "../types/IServiceDetail";


const ServiceDetailSchema = new Schema<IServiceDetail>({
  price: { type: String, required: true },
  duration: { type: String, required: true },
  serviceId: { type: String, required: true }, 
});

export const ServiceDetail = model<IServiceDetail>("userService", ServiceDetailSchema);
