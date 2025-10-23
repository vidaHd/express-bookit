// models/Booking.ts
import { Schema, model } from "mongoose";
import { IBooking } from "../types/IBooking";

const BookingSchema = new Schema<IBooking>(
  {
    companyServiceId: { type: String, required: true },
    userId: { type: String, required: true },
    selectedTimes: [{ type: String, required: true }],
    selectedDate: { type: String, required: true },
    deletedAt: { type: String, default: null },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", BookingSchema);
