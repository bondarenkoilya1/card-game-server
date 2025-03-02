import express from "express";
import dotenv from "dotenv";
import { connectToDb, getDb } from "./db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

let db;

connectToDb((error) => {
  if (error) {
    console.log(`Database connection error: ${error}`);
    return error;
  }

  app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
  });

  db = getDb();
});

// First param here is just a route, it can be any normal string
app.get("/card-sets", (req, res) => {
  const books = [];

  db.collection("books")
    .find()
    // testing, print only specified field
    .project({ title: 1 })
    // testing, sort by specified field in alphabetical order
    .sort({ title: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
