import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genres: [String],
  rating: Number,
  duration: { hours: Number, minutes: Number },
  reviews: [{ name: String, text: String }]
});

export const Book = mongoose.model("Book", bookSchema);
