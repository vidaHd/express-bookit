import { Booking } from "../models/IBooking";
import { IBooking } from "../types/IBooking";

export const bookingService = {
  async createBooking(data: IBooking) {
    const booking = new Booking(data);
    return await booking.save();
  },

  async getAllBookings(filters?: { companyServiceId?: string }) {
    const query: any = {};
    if (filters?.companyServiceId)
      query.companyServiceId = filters.companyServiceId;
    return await Booking.find(query);
  },

  async getBookingById(id: string) {
    return await Booking.findById(id);
  },

  async deleteBooking(id: string) {
    return await Booking.findByIdAndDelete(id);
  },

  async getReservedTimesByCompany(companyId: string, date: string) {
    const bookings = await Booking.find({
      companyId,
      "selectedDate.key": date,
    });
    return bookings.map((b) => b.selectedTimes.key);
  },

  async getUserBookings(userId: string) {
    return await Booking.find({ userId });
  },
};
