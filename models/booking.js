import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String, required: true }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
