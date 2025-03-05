import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { CardSetRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = "card-sets";

const app = express();
app.use(cors());
app.use(CardSetRoutes);

mongoose
  .connect(DATABASE_URL, { dbName: DATABASE_NAME })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Database connection error: ${error}`));

app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`Listening on PORT: ${PORT}`)
);
