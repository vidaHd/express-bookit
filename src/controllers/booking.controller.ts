import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";

export const bookingController = {
  async create(req: Request, res: Response) {
    try {
      const booking = await bookingService.createBooking(req.body);
      res
        .status(201)
        .json({ message: "Booking created successfully", data: booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ message: "Error creating booking", error });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { companyServiceId } = req.query;
      const bookings = await bookingService.getAllBookings({
        companyServiceId: companyServiceId as string,
      });
      res.json({ data: bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const booking = await bookingService.getBookingById(req.params.bookingId);
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      res.json({ data: booking });
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking", error });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const deleted = await bookingService.deleteBooking(req.params.bookingId);
      if (!deleted)
        return res.status(404).json({ message: "Booking not found" });
      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },

  async getReservedTimes(req: Request, res: Response) {
    try {
      const { companyId, date } = req.query;
      if (!companyId || !date)
        return res
          .status(400)
          .json({ message: "companyId and date are required" });

      const reservedTimes = await bookingService.getReservedTimesByCompany(
        companyId as string,
        date as string
      );
      res.json({ data: reservedTimes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching reserved times" });
    }
  },

  async getUserBookings(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      if (!userId)
        return res
          .status(400)
          .json({ message: "userId and companyId are required" });

      const bookings = await bookingService.getUserBookings(userId as string);
      res.json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user bookings" });
    }
  },
};
