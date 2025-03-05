import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSetSchema = new Schema({
  cardSetName: { type: String, required: true, unique: true },
  cards: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      points: { type: Number, required: true }
    }
  ]
});

/* The first argument is crucial.
   For example, the word "Math" will be converted to "maths"
   which will then be used as the collection name that
   the program will attempt to access. */
export const CardSet = mongoose.model("Set", cardSetSchema);
