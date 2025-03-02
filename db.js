import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;
const URL = `${DB_URL}/card-game`;

let dbConnection;

export const connectToDb = async (callback) => {
  try {
    const client = await MongoClient.connect(URL);
    console.log("Connected to MongoDB");
    dbConnection = client.db();
    callback();
  } catch (error) {
    callback(error);
  }
};

export const getDb = () => dbConnection;
