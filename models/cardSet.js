import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSetSchema = new Schema({
  cardSetName: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  cards: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      points: { type: Number, required: true }
    }
  ]
});

// Ensures slugs like "Math" and "math" are treated as duplicates
// important: Only for english language
cardSetSchema.index({ slug: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

/* The first argument is crucial.
   For example, the word "Math" will be converted to "maths"
   which will then be used as the collection name that
   the program will attempt to access. */
export const CardSet = mongoose.model("Set", cardSetSchema);
