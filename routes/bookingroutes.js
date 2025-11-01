import express from "express";
import Booking from "../models/booking.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// ✅ Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: 'userId' } expected from token
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ POST /bookings - Create a new booking (authenticated)
router.post("/bookings", authenticate, async (req, res) => {
  const { movie, showTime, seats, name, email, amount } = req.body;

  try {
    const booking = new Booking({
      userId: req.user.id, // Provided by authenticate middleware
      movie,
      showTime,
      seats,
      name,
      email,
      amount,
    });

    const savedBooking = await booking.save();

 await sendEmail(email, savedBooking);

    res.status(201).json({ message: "Booking successful", booking: savedBooking });
    
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
});
router.get("/bookings/me", authenticate, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;  // <- SAFER!
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


// ✅ GET /bookings/:id - Get booking by ID (authenticated)
router.get("/bookings/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});




// ✅ DELETE /bookings/:id - Delete booking (only owner)
router.delete("/bookings/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking" });
  }
} );

export default router;

