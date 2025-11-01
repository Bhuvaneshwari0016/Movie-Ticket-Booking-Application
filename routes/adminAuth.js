// routes/adminAuth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js"; // ✅ ES module import
import {Movie} from "../models/Movie.js"; // ✅ Changed to ES module import with extension

const router = express.Router();

// Admin signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      passwordHash,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin signin route
router.post("/signin", async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  try {
    const admin = await Admin.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });
    if (!admin)
      return res
        .status(401)
        .json({ message: "Invalid credentials - admin not found" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Invalid credentials - password mismatch" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { username: admin.username, isAdmin: true } });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a movie (Admin)
router.post("/add-movie", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding movie", err });
  }
});

// Delete a movie (Admin)
router.delete("/delete-movie/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie", err });
  }
});

export default router; // ✅ Only use this — remove module.exports
