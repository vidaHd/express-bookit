import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";

const router = Router();

/**
 * Create a new booking
 */
router.post("/bookings", bookingController.create);

/**
 * Get all bookings (with optional filters)
 */
router.get("/bookings", bookingController.getAll);

/**
 * Get reserved times for a company (for disabling)
 */
router.get("/bookings/:companyServiceId", bookingController.getReservedTimes);

/**
 * Get bookings of the current user for a specific company
 */
router.get("/bookings/:userId/:companyServiceId", bookingController.getUserBookings);

/**
 * Get a specific booking by ID
 */
router.get("/bookings/:bookingId", bookingController.getOne);

/**
 * Delete a booking by ID
 */
router.delete("/bookings/:bookingId", bookingController.remove);

export default router;
