import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";
import { asyncHandler, successResponse } from "../helpers/response.helper";
import { Types } from "mongoose";
import { sendSMS } from "../helpers/sms.helper";
import { companyService } from "../services/company.service";

export const bookingController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const { companyId, userId } = req.params;
    const { serviceId, selectedDate, selectedTimes } = req.body;

    const booking = await bookingService.createBooking({
      companyId: new Types.ObjectId(companyId),
      userId: new Types.ObjectId(userId),
      serviceId: new Types.ObjectId(serviceId),
      selectedDate,
      selectedTimes,
    });
    const company = await companyService.getCompanyById(companyId);
    if (company) {
      const mobileNumber = company.mobileNumber;
      await sendSMS(
        mobileNumber,
        `سلام شما یک رزو جدید برای ساعت ${selectedTimes} در تاریخ ${selectedDate} دارید.`
      );
    }
    successResponse(res, "Booking created successfully", { data: booking });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const bookings = await bookingService.getAllBookings({
      companyId: new Types.ObjectId(companyId),
    });
    successResponse(res, "Bookings fetched successfully", { data: bookings });
  }),

  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const booking = await bookingService.getBookingById(bookingId);
    successResponse(res, "Booking fetched successfully", { data: booking });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    await bookingService.deleteBooking(bookingId);
    successResponse(res, "Booking deleted successfully");
  }),

  getReservedTimes: asyncHandler(async (req: Request, res: Response) => {
    const { companyId, date } = req.params;

    const reservedTimes = await bookingService.getReservedTimesByCompany(
      new Types.ObjectId(companyId),
      date
    );

    successResponse(res, "Reserved times fetched successfully", {
      data: reservedTimes,
    });
  }),

  getUserBookings: asyncHandler(async (req: Request, res: Response) => {
    const { companyId, userId } = req.params;

    const bookings = await bookingService.getUserBookings(
      new Types.ObjectId(companyId),
      new Types.ObjectId(userId)
    );

    successResponse(res, "User bookings fetched successfully", {
      data: bookings,
    });
  }),
};
