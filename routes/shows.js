import express from "express";
import Show from "../models/Show.js"; // Adjust path based on your project structure

const router = express.Router();

// GET /api/shows
// GET /api/shows/:id
router.get("/", async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ error: "Failed to fetch shows" });
  }
});

// POST a new show
router.post("/", async (req, res) => {
  try {
    const { movieId, date, time } = req.body;

    // Optional: Validate input
    if (!movieId || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newShow = new Show({ movieId, date, time });
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (error) {
    console.error("Error creating show:", error);
    res.status(500).json({ error: "Failed to create show" });
  }
});

export default router;
