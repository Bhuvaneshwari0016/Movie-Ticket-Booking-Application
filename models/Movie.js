import mongoose from "mongoose"; 

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  shows: [
    {
      id: String,
      time: String
    }
  ]
});

export const Movie = mongoose.model("Movie", movieSchema);
