import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";
import { asyncHandler, successResponse } from "../helpers/response.helper";
import { Types } from "mongoose";
import { companyService } from "../services/company.service";
import { sendEmail } from "../helpers/email.helper";

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
    if (company?.email) {
      await sendEmail(
        company.email,
        req.t("email.new_booking_subject"), 
        req.t("email.new_booking_body", {
          companyName: company.companyName,
          selectedDate,
          selectedTimes,
        })
      );
    }

    successResponse(res, req.t("booking.created_success"), { data: booking });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const bookings = await bookingService.getAllBookings({
      companyId: new Types.ObjectId(companyId),
    });

    successResponse(res, req.t("booking.fetched_success"), { data: bookings });
  }),
  
  getOne: asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const booking = await bookingService.getBookingById(bookingId);

    successResponse(res, req.t("booking.fetched_success"), { data: booking });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    await bookingService.deleteBooking(bookingId);

    successResponse(res, req.t("booking.deleted_success"));
  }),

  getReservedTimes: asyncHandler(async (req: Request, res: Response) => {
    const { companyId, date } = req.params;

    const reservedTimes = await bookingService.getReservedTimesByCompany(
      new Types.ObjectId(companyId),
      date
    );

    successResponse(res, req.t("booking.reserved_times_fetched"), {
      data: reservedTimes,
    });
  }),

  getUserBookings: asyncHandler(async (req: Request, res: Response) => {
    const { companyId, userId } = req.params;

    const bookings = await bookingService.getUserBookings(
      new Types.ObjectId(companyId),
      new Types.ObjectId(userId)
    );

    successResponse(res, req.t("booking.user_bookings_fetched"), {
      data: bookings,
    });
  }),
};
