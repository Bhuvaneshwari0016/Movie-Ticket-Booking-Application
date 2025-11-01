
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

import bookingRoutes from "./routes/bookingroutes.js";
import adminAuthRoutes from './routes/adminAuth.js';
import User from './models/user.js';
import showRoutes from "./routes/shows.js";
import movieRoutes from "./routes/Movies.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/movies", movieRoutes);
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
async function createAdminUser() {
  const existingAdmin = await User.findOne({ username: "bhuvana" });
  if (!existingAdmin) {
    const adminUser = new User({
      username: "bhuvana",
      passwordHash: await bcrypt.hash("bhuvana123", 10),
      isAdmin: true, // <-- THIS IS IMPORTANT!
    });
    await adminUser.save();
    console.log("✅ Admin user created");
  }
}


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    createAdminUser(); // <-- Add this!
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));



// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup error" });
  }
});

// Signin
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signin error" });
  }
});


// Booking routes
app.use("/api", bookingRoutes);

app.use('/admin', adminAuthRoutes);
app.use("/api/shows", showRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
