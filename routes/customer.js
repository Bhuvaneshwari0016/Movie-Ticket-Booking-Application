const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies (Customer)
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get movies', err });
  }
});

module.exports = router;
