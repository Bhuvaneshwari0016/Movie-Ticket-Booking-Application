import express from "express";
import { Movie } from "../models/Movie.js";

const router = express.Router();

// POST /api/movies - Add a movie
router.post("/", async (req, res) => {
  try {
    const { title, description, poster, shows } = req.body;

    if (!title || !description || !poster) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMovie = new Movie({
      title,
      description,
      poster,
      shows: shows || []
    });
    // GET /api/movies - Get all movies
// GET all movies



    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error("Error saving movie:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
