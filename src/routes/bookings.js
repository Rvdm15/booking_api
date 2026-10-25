import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// Alle bookings ophalen
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    // Filter gebruikt maar niets gevonden? Dan 404
    if (userId && bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

// Eén booking ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe booking toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    );

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

// Booking wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await updateBookingById(req.params.id, req.body);
    if (!id) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json({ message: "Booking updated" });
    }
  } catch (error) {
    next(error);
  }
});

// Booking verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deleteBookingById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "Booking not found",
      });
    } else {
      res.status(200).json({ message: "Booking deleted" });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
