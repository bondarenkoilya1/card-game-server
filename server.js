import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models";

dotenv.config();

const PORT = process.env.PORT || 3333;
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

const handleError = (response, errorCode, error) => {
  response.status(errorCode).json({ error });
};

// Todo: create a separate file for routes
app.get("/card-sets", (request, response) =>
  Book.find()
    .sort({ title: 1 })
    .then((books) => response.status(200).json(books))
    .catch((error) => handleError(response, 500, error.message))
);

app.get("/cards/:id", (request, response) =>
  Book.findById(request.params.id)
    .then((book) => response.status(200).json(book))
    .catch((error) => handleError(response, 500, error.message))
);
