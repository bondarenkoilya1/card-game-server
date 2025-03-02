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
