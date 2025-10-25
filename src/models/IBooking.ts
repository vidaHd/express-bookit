// models/Booking.ts
import { Schema, model } from "mongoose";
import { IBooking } from "../types/IBooking";

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    selectedTimes: [{ type: String, required: true }],
    selectedDate: { type: String, required: true },
    companyId :{ type: String, required: true },
    serviceId: { type: String, required: true }
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", BookingSchema);
