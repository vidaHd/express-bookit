import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";

const router = Router();

/**
 * Get bookings of the current user for a specific company
 */
router.get("/bookings/reserveTime/:companyId/:userId/", bookingController.getUserBookings);


/**
 * Create a new booking
 */
router.post("/bookings/:companyId/:userId", bookingController.create);

/**
 * Get all bookings (with optional filters)
 */
router.get("/bookings", bookingController.getAll);

/**
 * Get reserved times for a company (for disabling)
 */
router.get("/bookings/:companyId/:date", bookingController.getReservedTimes);


/**
 * Get a specific booking by ID
 */
router.get("/bookings/:bookingId", bookingController.getOne);

/**
 * Delete a booking by ID
 */
router.delete("/bookings/:bookingId", bookingController.remove);

export default router;
