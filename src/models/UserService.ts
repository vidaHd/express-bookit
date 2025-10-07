import { Schema, model } from "mongoose";
import { IUserService } from "../types/IUserService";


const UserServiceSchema = new Schema<IUserService>({
  price: { type: String, required: false },
  duration: { type: String, required: false },
  serviceId: { type: String, required: true }, 
  companyId: { type: String, required: true }, 
});

export const UserService = model<IUserService>("userService", UserServiceSchema);
