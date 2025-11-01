import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: String,
  date: String,
  time: String,
});

const Show = mongoose.model("Show", showSchema);
export default Show; // ✅ This is default export
