import express from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const COLLECTION_NAME = "card-sets";

const app = express();

mongoose
  .connect(DB_URL, { dbName: COLLECTION_NAME })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Database connection error: ${error}`));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on PORT: ${PORT}`);
});

const handleError = (res, errorCode, error) => {
  res.status(errorCode).json({ error });
};

// First param here is just a route, it can be any normal string
app.get("/card-sets", async (req, res) => {
  try {
    const books = await mongoose.connection.db
      .collection("books")
      .find()
      .sort({ title: 1 })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

app.get("/cards/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((book) => {
        res.status(200).json(book);
      })
      .catch((error) => handleError(res, 500, error.message));
    return req.params.id;
  }

  handleError(res, 404, `Element with such id was not found. You entered: ${req.params.id}`);
});
