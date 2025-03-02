import express from "express";
import dotenv from "dotenv";
import { connectToDb, getDb } from "./db";
import { ObjectId } from "mongodb";

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

app.get("/cards/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((book) => {
        res.status(200).json(book);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
    return req.params.id;
  }

  res.status(404).json({
    error: `Element with such id was not found. You entered: ${req.params.id}`
  });
});
