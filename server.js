import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { BookRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3333;
const DB_URL = process.env.DB_URL;
const COLLECTION_NAME = "card-sets";

const app = express();
app.use(cors());
app.use(BookRoutes);

mongoose
  .connect(DB_URL, { dbName: COLLECTION_NAME })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Database connection error: ${error}`));

app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`Listening on PORT: ${PORT}`)
);
